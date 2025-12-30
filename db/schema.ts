import { pgTable, serial, varchar, text, date, boolean, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

// User roles enum
export const userRoleEnum = pgEnum("user_role", ["admin", "provider", "clinic"]);

// Users table (linked to Supabase auth.users)
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // References auth.users id
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: userRoleEnum("role").notNull().default("provider"),
  firstName: varchar("first_name", { length: 128 }),
  lastName: varchar("last_name", { length: 128 }),
  clinicName: varchar("clinic_name", { length: 255 }), // For clinic role
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BV Requests table
export const bvRequests = pgTable("bv_requests", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id), // FK to users table
  provider: varchar("provider", { length: 128 }),
  placeOfService: varchar("place_of_service", { length: 64 }),
  insurance: varchar("insurance", { length: 64 }),
  woundType: varchar("wound_type", { length: 64 }),
  woundSize: varchar("wound_size", { length: 32 }),
  woundLocation: varchar("wound_location", { length: 128 }),
  icd10: varchar("icd10", { length: 32 }),
  conservativeTherapy: boolean("conservative_therapy"),
  diabetic: boolean("diabetic"),
  tunneling: boolean("tunneling"),
  infected: boolean("infected"),
  initials: varchar("initials", { length: 16 }),
  applicationDate: date("application_date"),
  deliveryDate: date("delivery_date"),
  instructions: text("instructions"),
  status: varchar("status", { length: 32 }).notNull().default("pending"), // pending, downloaded, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
