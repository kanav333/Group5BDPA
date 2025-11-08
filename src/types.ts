// src/types.ts

/** Allowed categories for skills (must match skills.json) */
export type SkillCategory = "language" | "framework" | "tool" | "soft";

/** A single skill definition (from skills.json) */
export interface Skill {
  id: string;              // e.g., "javascript"
  label: string;           // e.g., "JavaScript"
  aliases: string[];       // e.g., ["js", "JS", "ecmascript"]
  category: SkillCategory; // "language" | "framework" | "tool" | "soft"
}

/** Importance level for a role requirement (stricter, as 1 | 2 | 3) */
export type ImportanceLevel = 1 | 2 | 3;

/** Required skill entry in a role (from roles.json) */
export interface RoleSkillRequirement {
  skillId: string;          // references Skill.id
  importance: ImportanceLevel;
}

/** Role definition (from roles.json) */
export interface RoleDefinition {
  id: string;                         // "frontend-dev"
  name: string;                       // "Frontend Developer"
  description: string;
  responsibilities: string[];
  requiredSkills: RoleSkillRequirement[];
}

/** Possible resource "type" values for learning resources */
export type ResourceType =
  | "video"
  | "interactive"
  | "docs"
  | "course"
  | "article"
  | "other";

/** Learning resource definition (from resources.json) */
export interface LearningResource {
  id: string;
  skillId: string;        // references Skill.id
  title: string;
  url: string;
  platform: string;
  type: ResourceType;     // type-safe instead of plain string
}

/**
 * Result returned by the gap analysis engine.
 * All skill IDs here are canonical (Skill.id).
 */
export interface GapAnalysisResult {
  roleId: string;

  /** User skills, normalized to canonical skill IDs */
  normalizedUserSkills: string[];

  /** Required skills that the user already has (skill IDs) */
  matchedSkills: string[];

  /** Required skills that the user is missing (skill IDs) */
  missingSkills: string[];

  /** Simple readiness score based on counts (e.g., 6/10 = 60) */
  readinessPercent: number;

  /** Readiness score weighted by "importance" levels */
  weightedReadinessPercent: number;

  /** Missing skills grouped by category */
  missingSkillsByCategory: Record<SkillCategory, string[]>;
}

/**
 * User profile for future extensions (kept very flexible so it won't break
 * existing code that already uses a UserProfile type).
 */
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  skills?: string[];     // raw skill inputs (e.g., ["html", "css", "js"])
  targetRoleId?: string; // e.g., "frontend-dev"

  // Allow additional fields without type errors
  [key: string]: any;
}
