-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "cleanTitle" TEXT,
ADD COLUMN     "titleProcessedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Deal_titleProcessedAt_idx" ON "Deal"("titleProcessedAt");
