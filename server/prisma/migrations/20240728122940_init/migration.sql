/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "RecentSearchtrains" (
    "id" SERIAL NOT NULL,
    "trainNo" TEXT NOT NULL,
    "trainName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RecentSearchtrains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecentSearchtrains_userId_idx" ON "RecentSearchtrains"("userId");

-- CreateIndex
CREATE INDEX "SearchHistory_userId_idx" ON "SearchHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "RecentSearchtrains" ADD CONSTRAINT "RecentSearchtrains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
