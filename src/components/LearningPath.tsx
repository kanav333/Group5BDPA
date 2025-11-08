import type { Skill, LearningResource, GapAnalysisResult, RoleDefinition } from '../types';
import { getSkillLabel } from '../utils/gapAnalysis';
import './LearningPath.css';

interface LearningPathProps {
  skills: Skill[];
  resources: LearningResource[];
  analysisResult: GapAnalysisResult | null;
  role: RoleDefinition | null;
}

export function LearningPath({
  skills,
  resources,
  analysisResult,
  role
}: LearningPathProps) {
  if (!analysisResult || !role || analysisResult.missingSkills.length === 0) {
    return null;
  }

  // Get resources for a skill
  const getResourcesForSkill = (skillId: string): LearningResource[] => {
    return resources.filter(resource => resource.skillId === skillId).slice(0, 2);
  };

  // Get resource type icon/emoji
  const getResourceTypeIcon = (type: string): string => {
    switch (type) {
      case 'video':
        return '📹';
      case 'interactive':
        return '🎯';
      case 'docs':
        return '📚';
      default:
        return '🔗';
    }
  };

  // Sort missing skills by importance and category priority
  const sortedMissingSkills = [...analysisResult.missingSkills].sort((a, b) => {
    const reqA = role.requiredSkills.find(r => r.skillId === a);
    const reqB = role.requiredSkills.find(r => r.skillId === b);
    const importanceDiff = (reqB?.importance || 0) - (reqA?.importance || 0);
    if (importanceDiff !== 0) return importanceDiff;

    const skillA = skills.find(s => s.id === a);
    const skillB = skills.find(s => s.id === b);
    const categoryOrder: Record<string, number> = {
      language: 0,
      framework: 1,
      tool: 2,
      soft: 3
    };
    const categoryDiff =
      (categoryOrder[skillA?.category || ''] || 99) -
      (categoryOrder[skillB?.category || ''] || 99);
    return categoryDiff;
  });

  return (
    <div className="learning-path-container">
      <h2 className="learning-path-title">Your Learning Path</h2>
      <p className="learning-path-subtitle">
        Recommended resources to help you learn the missing skills for {role.name}
      </p>

      <div className="learning-path-list">
        {sortedMissingSkills.map((skillId, index) => {
          const skillResources = getResourcesForSkill(skillId);
          const skillLabel = getSkillLabel(skillId, skills);
          const skill = skills.find(s => s.id === skillId);

          return (
            <div key={skillId} className="learning-path-item">
              <div className="path-item-header">
                <span className="path-item-number">{index + 1}</span>
                <h3 className="path-item-skill">{skillLabel}</h3>
                {skill && (
                  <span className="path-item-category">{skill.category}</span>
                )}
              </div>

              {skillResources.length > 0 ? (
                <div className="path-item-resources">
                  <p className="resource-instruction">
                    {skillResources.length === 1
                      ? 'Start here:'
                      : 'Start here → then continue:'}
                  </p>
                  <div className="resources-list">
                    {skillResources.map((resource, resIndex) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <span className="resource-icon">
                          {getResourceTypeIcon(resource.type)}
                        </span>
                        <div className="resource-info">
                          <span className="resource-title">{resource.title}</span>
                          <span className="resource-meta">
                            {resource.platform} • {resource.type}
                          </span>
                        </div>
                        {resIndex === 0 && skillResources.length > 1 && (
                          <span className="resource-arrow">→</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="path-item-fallback">
                  <p>
                    💡 Search for "<strong>{skillLabel} beginner tutorial</strong>" on
                    YouTube or freeCodeCamp to get started.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

