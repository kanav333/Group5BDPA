import type { Skill, RoleDefinition, GapAnalysisResult, SkillCategory } from '../types';

/**
 * Normalize a skill name by finding it in the skills list
 * Returns the canonical skill ID or null if not found
 */
export function normalizeSkill(skillInput: string, skills: Skill[]): string | null {
  const normalized = skillInput.trim().toLowerCase();
  
  // Try exact match first
  for (const skill of skills) {
    if (skill.id.toLowerCase() === normalized || skill.label.toLowerCase() === normalized) {
      return skill.id;
    }
    
    // Check aliases
    if (skill.aliases.some(alias => alias.toLowerCase() === normalized)) {
      return skill.id;
    }
  }
  
  return null;
}

/**
 * Normalize multiple skills and return unique set of skill IDs
 */
export function normalizeSkills(skillInputs: string[], skills: Skill[]): string[] {
  const normalized: string[] = [];
  const seen = new Set<string>();
  
  for (const input of skillInputs) {
    const normalizedId = normalizeSkill(input, skills);
    if (normalizedId && !seen.has(normalizedId)) {
      normalized.push(normalizedId);
      seen.add(normalizedId);
    }
  }
  
  return normalized;
}

/**
 * Perform gap analysis between user skills and role requirements
 */
export function analyzeGaps(
  userSkills: string[],
  role: RoleDefinition,
  skills: Skill[]
): GapAnalysisResult {
  // Normalize user skills
  const normalizedUserSkills = normalizeSkills(userSkills, skills);
  
  // Get required skill IDs from role
  const requiredSkillIds = role.requiredSkills.map(req => req.skillId);
  
  // Find matched and missing skills
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  
  for (const requiredId of requiredSkillIds) {
    if (normalizedUserSkills.includes(requiredId)) {
      matchedSkills.push(requiredId);
    } else {
      missingSkills.push(requiredId);
    }
  }
  
  // Calculate readiness percentage
  const readinessPercent = requiredSkillIds.length > 0
    ? Math.round((matchedSkills.length / requiredSkillIds.length) * 100)
    : 0;
  
  // Group missing skills by category
  const missingSkillsByCategory: Record<SkillCategory, string[]> = {
    language: [],
    framework: [],
    tool: [],
    soft: []
  };
  
  for (const skillId of missingSkills) {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      missingSkillsByCategory[skill.category].push(skillId);
    }
  }
  
  // Sort missing skills by importance (within category)
  const sortByImportance = (a: string, b: string) => {
    const reqA = role.requiredSkills.find(r => r.skillId === a);
    const reqB = role.requiredSkills.find(r => r.skillId === b);
    return (reqB?.importance || 0) - (reqA?.importance || 0);
  };
  
  // Sort each category by importance
  for (const category of Object.keys(missingSkillsByCategory) as SkillCategory[]) {
    missingSkillsByCategory[category].sort(sortByImportance);
  }
  
  return {
    roleId: role.id,
    normalizedUserSkills,
    matchedSkills,
    missingSkills,
    readinessPercent,
    missingSkillsByCategory
  };
}

/**
 * Get skill label from skill ID
 */
export function getSkillLabel(skillId: string, skills: Skill[]): string {
  const skill = skills.find(s => s.id === skillId);
  return skill?.label || skillId;
}

/**
 * Get skill category from skill ID
 */
export function getSkillCategory(skillId: string, skills: Skill[]): SkillCategory | null {
  const skill = skills.find(s => s.id === skillId);
  return skill?.category || null;
}

