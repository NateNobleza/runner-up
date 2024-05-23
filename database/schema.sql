set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
  CREATE TABLE "public"."users" (
    "userId" serial PRIMARY KEY,
    "userName" text not null,
    "hashPassword" text not null,
    "updatedAt" timestamptz(6),
    "createdAt" timestamptz(6) not null default now()
  );
  CREATE TABLE "public"."runs" (
    "runId" serial PRIMARY KEY,
    "time" text not null,
    "distance" text not null,
    "userId" integer not null,
    "date" text not null,
    "weather" text not null,
    "updatedAt" timestamptz(6),
    "createdAt" timestamptz(6) not null default now()
  );
  ALTER TABLE "public"."runs" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("userId");
