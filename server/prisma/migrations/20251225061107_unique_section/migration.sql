/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,day,startTime,endTime]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_instructorId_fkey";

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "instructorId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_sectionId_day_startTime_endTime_key" ON "Meeting"("sectionId", "day", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
