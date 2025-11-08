export type SkillCategory = 'language' | 'framework' | 'tool' | 'soft';

export interface Skill {
  id: string;
  label: string;
  aliases: string[];
  category: SkillCategory;
}

export interface RoleSkillRequirement {
  skillId: string;
  importance: 1 | 2 | 3; // 3 = highest
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  requiredSkills: RoleSkillRequirement[];
}

export type ResourceType = 'video' | 'interactive' | 'docs';

export interface LearningResource {
  id: string;
  skillId: string;
  title: string;
  url: string;
  platform: string;
  type: ResourceType;
}

export interface GapAnalysisResult {
  roleId: string;
  normalizedUserSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  readinessPercent: number;
  missingSkillsByCategory: Record<SkillCategory, string[]>;
}

