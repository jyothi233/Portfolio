import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (existingProfile) return; // Already seeded

  console.log("Seeding game world...");

  // Profile
  await storage.createProfile({
    name: "Nagajyothi MS",
    title: "Business Analyst | Data Pipeline Expert",
    bio: "I help organizations turn data chaos into business clarity. My superpower: I speak both languages—technical complexity for executives and business needs for engineers.",
    stats: [
      { label: "INT", value: "98" }, // Intelligence
      { label: "WIS", value: "95" }, // Wisdom
      { label: "CHA", value: "90" }, // Charisma (Communication)
      { label: "STR", value: "85" }, // Strength (Technical)
    ]
  });

  // Experiences (Quests) - Reverse Chronological Order preserved via 'order' field
  // 1. Community Dreams Foundation
  await storage.createExperience({
    role: "Business Analyst",
    company: "Community Dreams Foundation",
    location: "Sebring, FL",
    startDate: "Sep 2025",
    endDate: "Present",
    order: 1,
    description: [
      "Objective: Achieve 40% growth in online brand visibility through dashboard development.",
      "Quest: Streamline sales performance tracking (Result: +15% data-driven decisions).",
      "Quest: Optimize process workflows (Result: -40% manual claim processing time).",
      "Tech: BPMN, UAT validation, Agile methodologies."
    ]
  });

  // 2. Ruffalo Noel Levitz
  await storage.createExperience({
    role: "Engagement Operations Analyst",
    company: "Ruffalo Noel Levitz",
    location: "University at Buffalo, NY",
    startDate: "Mar 2025",
    endDate: "May 2025",
    order: 2,
    description: [
      "Objective: Manage multi-channel outreach to 5,000+ alumni.",
      "Achievement: 98% transaction accuracy under pressure.",
      "Result: Increased alumni campaign participation by 15%."
    ]
  });

  // 3. Legacy Guard
  await storage.createExperience({
    role: "Product Management Associate",
    company: "Legacy Guard (Capstone)",
    location: "University at Buffalo, NY",
    startDate: "Jan 2025",
    endDate: "May 2025",
    order: 3,
    description: [
      "Mission: Launch digital vault product for credential inheritance.",
      "Quest: Conduct 20+ user research interviews.",
      "Quest: Manage backlog & prioritization (Result: +30% conversions).",
      "Strategy: Competitive analysis vs LastPass, Bitwarden."
    ]
  });

  // 4. KPMG US
  await storage.createExperience({
    role: "Business Data Associate",
    company: "KPMG US",
    location: "Bengaluru, India",
    startDate: "Aug 2022",
    endDate: "May 2024",
    order: 4,
    description: [
      "Quest: Build data pipelines for 5M+ monthly transactions (99% accuracy).",
      "Achievement: Identified $2M in cost savings via audit procedures.",
      "Quest: Create executive dashboards in Tableau/Power BI.",
      "Mentorship: Guided team of 10 analysts."
    ]
  });

  // 5. TEQUED LABS
  await storage.createExperience({
    role: "Cybersecurity Analyst",
    company: "TEQUED LABS PVT LTD",
    location: "",
    startDate: "Aug 2021",
    endDate: "Sep 2021",
    order: 5,
    description: [
      "Mission: LSB Image Steganography implementation.",
      "Skills: Ethical hacking, Java, Python, MySQL."
    ]
  });

  // Projects (Missions)
  await storage.createProject({
    title: "Legacy Guard Launch",
    role: "Product Lead",
    description: "Led product development for a secure digital vault for credential inheritance from concept to launch.",
    metrics: ["30% increase in conversions", "20+ user interviews"],
    techStack: ["Product Strategy", "User Research", "Agile"],
    order: 1
  });

  await storage.createProject({
    title: "Auto Git Commit Messages",
    role: "Researcher",
    description: "Publication: Automatically Generate Git Commit Messages Using NMT.",
    metrics: ["Published Research"],
    techStack: ["Machine Learning", "NLP", "Python"],
    order: 2
  });

  // Skills (Abilities)
  const skillsList = [
    { name: "Product Strategy", category: "Active", proficiency: 5 },
    { name: "Data Pipelines", category: "Active", proficiency: 5 },
    { name: "SQL", category: "Active", proficiency: 5 },
    { name: "Python", category: "Active", proficiency: 4 },
    { name: "Tableau", category: "Active", proficiency: 5 },
    { name: "Power BI", category: "Active", proficiency: 5 },
    { name: "AWS", category: "Active", proficiency: 4 },
    { name: "Machine Learning", category: "Active", proficiency: 3 },
    { name: "Business Analysis", category: "Passive", proficiency: 5 },
    { name: "Communication", category: "Passive", proficiency: 5 },
    { name: "Korean", category: "Language", proficiency: 2 },
    { name: "English", category: "Language", proficiency: 5 },
  ];

  for (const skill of skillsList) {
    await storage.createSkill(skill);
  }

  // Achievements & Certifications (Badges)
  const badges = [
    { title: "CSPO®", issuer: "Scrum Alliance", type: "Certification", icon: "shield" },
    { title: "Google Data Analytics", issuer: "Google", type: "Certification", icon: "database" },
    { title: "Client Service Excellency", issuer: "KPMG", type: "Award", icon: "star" },
    { title: "Rising Star - Q1", issuer: "KPMG", type: "Award", icon: "zap" },
    { title: "Best Project Award", issuer: "Academic", type: "Award", icon: "trophy" },
    { title: "Guinness World Record", issuer: "Microsoft AI Skills Fest", type: "Award", icon: "crown" },
  ];

  for (const badge of badges) {
    await storage.createAchievement(badge);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  seedDatabase();

  app.get(api.experiences.list.path, async (_req, res) => {
    const data = await storage.getExperiences();
    res.json(data);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  app.get(api.achievements.list.path, async (_req, res) => {
    const data = await storage.getAchievements();
    res.json(data);
  });

  app.get(api.profile.get.path, async (_req, res) => {
    const data = await storage.getProfile();
    if (!data) return res.status(404).json({ message: "Profile not found" });
    res.json(data);
  });

  return httpServer;
}
