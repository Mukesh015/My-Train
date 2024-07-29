-- DropForeignKey
ALTER TABLE "RecentSearchtrains" DROP CONSTRAINT "RecentSearchtrains_userId_fkey";

-- DropForeignKey
ALTER TABLE "SearchHistory" DROP CONSTRAINT "SearchHistory_userId_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AddForeignKey
ALTER TABLE "RecentSearchtrains" ADD CONSTRAINT "RecentSearchtrains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
