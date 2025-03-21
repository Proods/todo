import { pgTable, serial, varchar, text, date, time, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable("tasks", {
  id: serial().primaryKey().notNull(),
  dateCreated: timestamp({ mode: "string", withTimezone: false, precision: 0 }).defaultNow().notNull(),
  title: varchar({ length: 60 }).notNull(),
  targetDate: date({ mode: "string" }).default(null),
  targetTime: time({ withTimezone: false, precision: 0 }).default(null),
  location: varchar({ length: 90 }).default(''),
  note: text().default(''),
  completion: date({ mode: "string" }).default(null),
});
