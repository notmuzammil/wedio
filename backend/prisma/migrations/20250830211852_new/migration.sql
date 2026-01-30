/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Listing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('VENDOR', 'CUSTOMER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Availability" DROP CONSTRAINT "Availability_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookingItem" DROP CONSTRAINT "BookingItem_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookingItem" DROP CONSTRAINT "BookingItem_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Listing" DROP CONSTRAINT "Listing_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VendorProfile" DROP CONSTRAINT "VendorProfile_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "refreshToken";

-- DropTable
DROP TABLE "public"."Availability";

-- DropTable
DROP TABLE "public"."Booking";

-- DropTable
DROP TABLE "public"."BookingItem";

-- DropTable
DROP TABLE "public"."Listing";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."VendorProfile";

-- DropEnum
DROP TYPE "public"."BookingStatus";

-- DropEnum
DROP TYPE "public"."ListingCategory";

-- DropEnum
DROP TYPE "public"."VendorCategory";

-- DropEnum
DROP TYPE "public"."VendorStatus";
