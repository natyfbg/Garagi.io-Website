import { JobArea, JobType, Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

const prisma = new PrismaClient();

const seedCompanies = async () => {
  const result = await axios.get(
    'https://www.themuse.com/api/public/companies?industry=Engineering&industry=Software&industry=Technology&location=San%20Francisco%2C%20CA&page=1',
  );
  const res = await result.data;

  console.log(res);

  const companiesDtoPromises = result.data.results.map(async (r) => ({
    name: r.name,
    description: r.description,
    email: `contact@${r.short_name}.com`,
    password: await bcrypt.hash('123456789', 10),
  }));

  const companiesDto = await Promise.all(companiesDtoPromises);
  console.log(companiesDto.map((c) => c.email));

  const companiesPromises = companiesDto.map((d) =>
    prisma.company.create({ data: d }),
  );
  return prisma.$transaction(companiesPromises);
};

(async () => {
  // const companies = await seedCompanies();

  await prisma.administrator.create({
    data: {
      username: 'root',
      password: await bcrypt.hash('1234567890', 10),
    },
  });

  // const companiesPromises = companiesData.map((d) => prisma.company.create(d));
  // await prisma.$transaction(companiesPromises);

  // const jobPostsPromises = jobPostsData.map((d) => prisma.jobPost.create(d));
  // await prisma.$transaction(jobPostsPromises);

  // await prisma.student.create({
  //   data: {
  //     email: 'test@test.test',
  //     firstname: 'Toto',
  //     name: 'Titi',
  //     password: await bcrypt.hash('test', 10),
  //   },
  // });

  // await prisma.administrator.create({
  //   data: {
  //     username: 'root',
  //     password: await bcrypt.hash('testtest', 10),
  //   },
  // });

  console.log('Done.');
})();
