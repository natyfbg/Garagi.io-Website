-- CreateTable
CREATE TABLE `_JobPostToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JobPostToStudent_AB_unique`(`A`, `B`),
    INDEX `_JobPostToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_JobPostToStudent` ADD CONSTRAINT `_JobPostToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `JobPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobPostToStudent` ADD CONSTRAINT `_JobPostToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
