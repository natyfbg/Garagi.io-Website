-- AlterTable
ALTER TABLE `Company` MODIFY `companyLogo` VARCHAR(191) NULL DEFAULT '/default/default_company_logo.png';

-- AlterTable
ALTER TABLE `Student` MODIFY `profilePicture` VARCHAR(191) NOT NULL DEFAULT '/default/default_picture.png';
