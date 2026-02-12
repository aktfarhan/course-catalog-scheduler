/*
  Warnings:

  - You are about to drop the column `instructorId` on the `Section` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[classNumber,term]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `day` on the `Meeting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('LECTURE', 'DISCUSSION');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su', 'TBA');

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_instructorId_fkey";

-- DropIndex
DROP INDEX "Section_classNumber_key";

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "day",
ADD COLUMN     "day" "Day" NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TIME,
ALTER COLUMN "endTime" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "instructorId",
ADD COLUMN     "discussionGroupId" INTEGER,
ADD COLUMN     "type" "SectionType" NOT NULL DEFAULT 'LECTURE';

-- CreateTable
CREATE TABLE "DiscussionGroup" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "DiscussionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SectionInstructors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SectionInstructors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscussionGroup_courseId_term_key" ON "DiscussionGroup"("courseId", "term");

-- CreateIndex
CREATE INDEX "_SectionInstructors_B_index" ON "_SectionInstructors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");

-- CreateIndex
CREATE INDEX "Instructor_lastName_idx" ON "Instructor"("lastName");

-- CreateIndex
CREATE INDEX "Meeting_day_startTime_endTime_idx" ON "Meeting"("day", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "Meeting_sectionId_idx" ON "Meeting"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_sectionId_day_startTime_endTime_key" ON "Meeting"("sectionId", "day", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "Section_courseId_idx" ON "Section"("courseId");

-- CreateIndex
CREATE INDEX "Section_term_idx" ON "Section"("term");

-- CreateIndex
CREATE UNIQUE INDEX "Section_classNumber_term_key" ON "Section"("classNumber", "term");

-- AddForeignKey
ALTER TABLE "DiscussionGroup" ADD CONSTRAINT "DiscussionGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_discussionGroupId_fkey" FOREIGN KEY ("discussionGroupId") REFERENCES "DiscussionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionInstructors" ADD CONSTRAINT "_SectionInstructors_A_fkey" FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionInstructors" ADD CONSTRAINT "_SectionInstructors_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
