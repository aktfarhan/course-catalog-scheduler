-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "type" SET DEFAULT 'LECTURE';
