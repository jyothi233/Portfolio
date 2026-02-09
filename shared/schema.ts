import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Experience -> Levels/Quests
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // Title
  company: text("company").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // null for Present
  description: jsonb("description").$type<string[]>(), // Array of bullet points (Quest objectives)
  order: integer("order").notNull(), // For reverse chronological
});

// Projects -> Missions
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  role: text("role"),
  description: text("description").notNull(),
  metrics: jsonb("metrics").$type<string[]>(), // "Loot/Rewards" e.g. 30% increase
  techStack: jsonb("tech_stack").$type<string[]>(), // Tools used
  link: text("link"),
  order: integer("order").notNull(),
});

// Skills -> Abilities
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "Active" (Technical), "Passive" (Soft skills), "Language"
  proficiency: integer("proficiency").default(1), // 1-5 stars/level
});

// Certifications & Awards -> Badges & Achievements
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer"),
  date: text("date"),
  type: text("type").notNull(), // "Certification" or "Award"
  icon: text("icon"), // Icon name
});

// Character Bio -> Summary
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  stats: jsonb("stats").$type<{ label: string; value: string }[]>(), // Custom stats
});

// === SCHEMAS ===
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertProjectSchema = createInsertSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const insertAchievementSchema = createInsertSchema(achievements);
export const insertProfileSchema = createInsertSchema(profile);

// === EXPLICIT TYPES ===
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Profile = typeof profile.$inferSelect;
