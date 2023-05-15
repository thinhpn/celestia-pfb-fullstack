
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `addresses`;
CREATE TABLE `addresses` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`ip` VARCHAR ( 50 ) NOT NULL,
	`node_id` VARCHAR ( 100 ) NOT NULL,
	`last_uptime_score` FLOAT DEFAULT 0.00000,
	`quality_index` INT DEFAULT 0,
	`wallet_address` VARCHAR ( 100 ) NOT NULL,
	`wallet_balance` FLOAT DEFAULT 0.00000,
	`chat_id` VARCHAR ( 100 ) NOT NULL,
	`bot_token_id` VARCHAR ( 100 ) NOT NULL,
	`status` enum ( 'enable', 'disable' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT 'enable',
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,
	UNIQUE INDEX `addresses_node_id` ( `node_id` ) USING BTREE,
	UNIQUE INDEX `addresses_wallet_address` ( `wallet_address` ) USING BTREE,
	UNIQUE INDEX `addresses_chat_id` ( `chat_id` ) USING BTREE,
	UNIQUE INDEX `addresses_bot_token_id` ( `bot_token_id` ) USING BTREE
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `modular`.`addresses` (`ip`, `node_id`, `last_uptime_score`, `quality_index`, `wallet_address`, `wallet_balance`, `chat_id`, `bot_token_id`, `status`, `created_at`, `updated_at`) VALUES ('::1', '12D3KooWDk4QApcpR86PtsWa1WHhHm9uuGvL6ZQDzVzrLUEk357R', 0, 0, 'celestia1smnvr0u6yg5n38jle5c9k9sr3nvngcwz54t58q', 0, '-1001936712026', '6053098850:AAEqZX5nn0aAIRBolzIvTQCT4H-RHX2mdPk', 'enable', 1681010268, NULL);

