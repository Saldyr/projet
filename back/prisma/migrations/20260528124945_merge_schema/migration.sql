/*
  Warnings:

  - Made the column `created_at` on table `article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `club` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `club` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `like_article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `like_club` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `like_comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `manages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score_team_home` on table `matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score_team_away` on table `matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `notifies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `club` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `comments` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `like_article` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `like_club` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `like_comment` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `manages` ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `matches` MODIFY `score_team_home` INTEGER UNSIGNED NOT NULL,
    MODIFY `score_team_away` INTEGER UNSIGNED NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `notification` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `notifies` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tokens` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
