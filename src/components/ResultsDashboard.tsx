import type { RoleDefinition, Skill, GapAnalysisResult } from '../types';
import { getSkillLabel } from '../utils/gapAnalysis';
import './ResultsDashboard.css';

interface ResultsDashboardProps {
  role: RoleDefinition | null;
  skills: Skill[];
  analysisResult: GapAnalysisResult | null;
}

export function ResultsDashboard({ role, skills, analysisResult }: ResultsDashboardProps) {
  if (!role || !analysisResult) {
    return (
      <div className="results-dashboard empty">
        <p className="empty-message">
          {analysisResult === null && role === null
            ? "Select a role and add your skills to see your gap analysis."
            : "Add your skills to see your readiness for this role."}
        </p>
      </div>
    );
  }

  const totalRequired = role.requiredSkills.length;
  const matchedCount = analysisResult.matchedSkills.length;
  const missingCount = analysisResult.missingSkills.length;

  return (
    <div className="results-dashboard">
      <div className="dashboard-header">
        <div className="role-summary">
          <h2 className="role-name">{role.name}</h2>
          <p className="role-description">{role.description}</p>
        </div>
        <div className="readiness-indicator">
          <div className="readiness-circle">
            <svg viewBox="0 0 120 120" className="circular-progress">
              <circle
                className="progress-ring-background"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="12"
              />
              <circle
                className="progress-ring"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#4a90e2"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - analysisResult.readinessPercent / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="readiness-percentage">
              <span className="percentage-value">{analysisResult.readinessPercent}%</span>
              <span className="percentage-label">Ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="skills-summary">
        <div className="summary-stat">
          <span className="stat-value">{totalRequired}</span>
          <span className="stat-label">Total Required</span>
        </div>
        <div className="summary-stat matched">
          <span className="stat-value">{matchedCount}</span>
          <span className="stat-label">You Have</span>
        </div>
        <div className="summary-stat missing">
          <span className="stat-value">{missingCount}</span>
          <span className="stat-label">To Learn</span>
        </div>
      </div>

      <div className="skills-comparison">
        <div className="skills-section matched-skills">
          <h3 className="section-title">
            ✓ Skills You Already Have ({matchedCount})
          </h3>
          {matchedCount > 0 ? (
            <div className="skills-list">
              {analysisResult.matchedSkills.map(skillId => (
                <span key={skillId} className="skill-badge matched">
                  {getSkillLabel(skillId, skills)}
                </span>
              ))}
            </div>
          ) : (
            <p className="empty-skills-message">
              Everyone starts somewhere. Pick a role and we'll show you what to learn first.
            </p>
          )}
        </div>

        <div className="skills-section missing-skills">
          <h3 className="section-title">
            📚 Skills You Need to Learn ({missingCount})
          </h3>
          {missingCount > 0 ? (
            <div className="missing-skills-by-category">
              {(['language', 'framework', 'tool', 'soft'] as const).map(category => {
                const categorySkills = analysisResult.missingSkillsByCategory[category];
                if (categorySkills.length === 0) return null;

                const categoryLabels: Record<typeof category, string> = {
                  language: 'Programming Languages',
                  framework: 'Frameworks & Libraries',
                  tool: 'Tools & Platforms',
                  soft: 'Soft Skills'
                };

                return (
                  <div key={category} className="category-group">
                    <h4 className="category-title">{categoryLabels[category]}</h4>
                    <div className="skills-list">
                      {categorySkills.map(skillId => (
                        <span key={skillId} className="skill-badge missing">
                          {getSkillLabel(skillId, skills)}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-skills-message success">
              🎉 Congratulations! You have all the required skills for this role.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

