
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `transactions`;
CREATE TABLE `transactions` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`wallet_address` VARCHAR ( 100 ) NOT NULL,
	`namespace_id` VARCHAR ( 100 ) NOT NULL,
	`height` BIGINT NOT NULL,
	`txhash` VARCHAR ( 200 ) NOT NULL,	
	`raw_log` TEXT NOT NULL,	
	`gas_wanted` INT NOT NULL,
	`gas_used` INT NOT NULL,	
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,
	INDEX `transactions_wallet_address` ( `wallet_address` ) USING BTREE,
	CONSTRAINT `transactions_wallet_address_FK` FOREIGN KEY ( `wallet_address` ) REFERENCES `addresses` ( `wallet_address` ) ON DELETE RESTRICT ON UPDATE RESTRICT	
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
