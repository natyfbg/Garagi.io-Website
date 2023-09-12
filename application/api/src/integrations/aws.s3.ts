import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Stream } from 'stream';
import { S3 } from 'aws-sdk';
import { AWS_ID, AWS_SECRET, CLIENTS_BUCKET_NAME } from 'src/config/env';

const s3 = new S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

const headObject = ({
  Bucket,
  Key,
}: {
  Bucket: string;
  Key: string;
}): Promise<AWS.S3.HeadObjectOutput> =>
  new Promise((resolve, reject) =>
    s3.headObject({ Bucket, Key }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    }),
  );

const headClientBucket = (Key: string): Promise<AWS.S3.HeadObjectOutput> => {
  const Bucket = CLIENTS_BUCKET_NAME;
  return headObject({ Bucket, Key });
};

const listObjectsClientBucket = (
  clientID: string,
  path: string,
): Promise<AWS.S3.ListObjectsOutput> => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: CLIENTS_BUCKET_NAME,
      Prefix: `${clientID}/${path}`,
    };

    s3.listObjects(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const uploadClientBucket = (
  clientID: string,
  filename: string,
  fileContent: Buffer | string,
  metadata: { mimetype: string; originalname: string; typeIdentity?: string },
): Promise<AWS.S3.ManagedUpload.SendData> =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: CLIENTS_BUCKET_NAME,
      Key: `${clientID}/${filename}`,
      Body: fileContent,
      ContentType: metadata.mimetype,
      Metadata: metadata.typeIdentity
        ? {
            originalname: metadata.originalname,
            typeIdentity: metadata.typeIdentity,
            owner: clientID,
          }
        : {
            originalname: metadata.originalname,
            owner: clientID,
          },
    };

    s3.upload(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

export type PrivateFileStream = {
  stream: Stream;
  fileInfo: AWS.S3.HeadObjectOutput;
};

const getFileClientBucket = async (Key: string): Promise<PrivateFileStream> => {
  const params = {
    Bucket: CLIENTS_BUCKET_NAME,
    Key,
  };

  const fileInfo = await headObject(params).catch(() => {
    throw new NotFoundException('The requested file was not found');
  });

  // if (fileInfo.Metadata.owner !== userID)
  //   throw new ForbiddenException(
  //     "You don't have the permissions to access this file",
  //   );

  try {
    const stream = await s3
      .getObject({
        Bucket: CLIENTS_BUCKET_NAME,
        Key,
      })
      .createReadStream();
    return {
      stream,
      fileInfo,
    };
  } catch (e) {
    throw new InternalServerErrorException(
      "Couldn't retreive the requested file",
    );
  }
};

export {
  uploadClientBucket,
  getFileClientBucket,
  listObjectsClientBucket,
  headClientBucket,
};
export default s3;
