/*
  Warnings:

  - The `type` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Lecture';

-- DropEnum
DROP TYPE "SectionType";

-- CreateTable
CREATE TABLE "_DepartmentInstructors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DepartmentInstructors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DepartmentInstructors_B_index" ON "_DepartmentInstructors"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentInstructors" ADD CONSTRAINT "_DepartmentInstructors_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentInstructors" ADD CONSTRAINT "_DepartmentInstructors_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
