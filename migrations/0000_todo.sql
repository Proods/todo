CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"dateCreated" timestamp(0) DEFAULT now() NOT NULL,
	"title" varchar(60) NOT NULL,
	"targetDate" date DEFAULT null,
	"targetTime" time(0) DEFAULT null,
	"location" varchar(90) DEFAULT '',
	"note" text DEFAULT '',
	"completion" date DEFAULT null
);
