-- AlterTable
ALTER TABLE `Company` MODIFY `companyLogo` VARCHAR(191) NULL DEFAULT 'default/default_company_logo.jpg';

-- AlterTable
ALTER TABLE `Student` MODIFY `profilePicture` VARCHAR(191) NOT NULL DEFAULT 'default/default_profile_picture.jpg';
