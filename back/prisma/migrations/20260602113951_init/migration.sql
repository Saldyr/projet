-- CreateTable
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `club` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `logo` VARCHAR(255) NOT NULL,
    `acronym` VARCHAR(5) NOT NULL,
    `creation_date` VARCHAR(5) NOT NULL,
    `president_name` VARCHAR(50) NOT NULL,
    `trainer_name` VARCHAR(50) NOT NULL,
    `RNA` VARCHAR(11) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `club_name_key`(`name`),
    UNIQUE INDEX `club_RNA_key`(`RNA`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `manages` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `club_id` INTEGER UNSIGNED NOT NULL,
    `role` ENUM('Manager', 'CM') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `club_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `notification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `text` TEXT NOT NULL,
    `relation_type` ENUM('article', 'match', 'comment') NOT NULL,
    `relation_id` INTEGER UNSIGNED NOT NULL,
    `metadata` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `notifies` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `notification_id` INTEGER UNSIGNED NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `article` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `club_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `article_index_0`(`club_id`, `user_id`),
    INDEX `idx_article_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `comments` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `article_id` INTEGER UNSIGNED NOT NULL,
    `text` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `comments_index_0`(`user_id`, `article_id`),
    INDEX `idx_comments_article`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `matches` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `club_home_id` INTEGER UNSIGNED NOT NULL,
    `club_away_id` INTEGER UNSIGNED NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `match_address` VARCHAR(255) NOT NULL,
    `score_team_home` INTEGER UNSIGNED NULL,
    `score_team_away` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `matches_index_0`(`club_home_id`, `club_away_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `like_article` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `article_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `like_comment` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `comment_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `like_club` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `club_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `club_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `tokens` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `token_type` ENUM('REFRESH', 'EMAIL') NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `user_agent` VARCHAR(255) NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `revoked_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tokens_token_key`(`token`),
    INDEX `idx_tokens_user`(`user_id`),
    INDEX `idx_tokens_type`(`token_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Les contraintes FK sont deja creees par la migration mig_sport_1.
