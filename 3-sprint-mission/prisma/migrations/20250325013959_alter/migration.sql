/*
  Warnings:

  - A unique constraint covering the columns `[userId,articleId]` on the table `ArticleLikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productId]` on the table `ProductLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArticleLikes_userId_articleId_key" ON "ArticleLikes"("userId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLikes_userId_productId_key" ON "ProductLikes"("userId", "productId");
