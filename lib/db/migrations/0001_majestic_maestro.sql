CREATE TYPE "public"."family_status" AS ENUM('Both parents alive', 'Single parent', 'Adopted', 'Parent/parents deceased');--> statement-breakpoint
CREATE TYPE "public"."institution_type" AS ENUM('Public', 'Private', 'Kmtc');--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('Degree', 'Tvet', 'Kmtc');