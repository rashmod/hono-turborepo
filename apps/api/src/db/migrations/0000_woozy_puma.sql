CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
