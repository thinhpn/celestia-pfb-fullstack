
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `alerts`;
CREATE TABLE `alerts` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,	
	`address_id` BIGINT NOT NULL,
	`chat_id` VARCHAR ( 100 ) NOT NULL,
	`bot_token_id` VARCHAR ( 100 ) NOT NULL,
	`message` VARCHAR ( 500 ) NOT NULL,
	`status` enum ( 'success', 'failed' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT 'failed',	
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,
	UNIQUE INDEX `alerts_address_id` ( `address_id` ) USING BTREE,
	CONSTRAINT `alerts_address_id_FK` FOREIGN KEY ( `address_id` ) REFERENCES `addresses` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `alerts_chat_id_FK` FOREIGN KEY ( `chat_id` ) REFERENCES `addresses` ( `chat_id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `alerts_bot_token_id_FK` FOREIGN KEY ( `bot_token_id` ) REFERENCES `addresses` ( `bot_token_id` ) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
