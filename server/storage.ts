import { db } from "./db";
import {
  experiences, projects, skills, achievements, profile,
  type Experience, type Project, type Skill, type Achievement, type Profile
} from "@shared/schema";
import { asc, desc } from "drizzle-orm";

export interface IStorage {
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getAchievements(): Promise<Achievement[]>;
  getProfile(): Promise<Profile | undefined>;
  
  // Seed methods
  createExperience(exp: any): Promise<Experience>;
  createProject(proj: any): Promise<Project>;
  createSkill(skill: any): Promise<Skill>;
  createAchievement(ach: any): Promise<Achievement>;
  createProfile(prof: any): Promise<Profile>;
}

export class DatabaseStorage implements IStorage {
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(asc(experiences.order));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.order));
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getProfile(): Promise<Profile | undefined> {
    const profiles = await db.select().from(profile).limit(1);
    return profiles[0];
  }

  async createExperience(exp: any): Promise<Experience> {
    const [newExp] = await db.insert(experiences).values(exp).returning();
    return newExp;
  }

  async createProject(proj: any): Promise<Project> {
    const [newProj] = await db.insert(projects).values(proj).returning();
    return newProj;
  }

  async createSkill(skill: any): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async createAchievement(ach: any): Promise<Achievement> {
    const [newAch] = await db.insert(achievements).values(ach).returning();
    return newAch;
  }

  async createProfile(prof: any): Promise<Profile> {
    const [newProf] = await db.insert(profile).values(prof).returning();
    return newProf;
  }
}

export const storage = new DatabaseStorage();
