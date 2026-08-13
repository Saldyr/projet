-- Ajoute le createur d'un match pour restreindre modification/suppression au proprietaire.
ALTER TABLE `matches` ADD COLUMN IF NOT EXISTS `user_id` INTEGER UNSIGNED NULL;

UPDATE `matches`
SET `user_id` = (SELECT MIN(`id`) FROM `users`)
WHERE `user_id` IS NULL;

ALTER TABLE `matches` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

CREATE INDEX IF NOT EXISTS `idx_matches_user` ON `matches`(`user_id`);

SET @fk_exists := (
  SELECT COUNT(*)
  FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = DATABASE()
    AND TABLE_NAME = 'matches'
    AND CONSTRAINT_NAME = 'matches_user_id_fkey'
);

SET @sql := IF(
  @fk_exists = 0,
  'ALTER TABLE `matches` ADD CONSTRAINT `matches_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
