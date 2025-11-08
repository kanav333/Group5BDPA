import { useState, useEffect } from 'react';
import type { Skill, RoleDefinition, LearningResource, GapAnalysisResult } from './types';
import { loadSkills, loadRoles, loadResources } from './utils/dataLoader';
import { analyzeGaps } from './utils/gapAnalysis';
import { SkillsInput } from './components/SkillsInput';
import { RoleSelection } from './components/RoleSelection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { LearningPath } from './components/LearningPath';
import './App.css';

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GapAnalysisResult | null>(null);

  // Load data on mount
  useEffect(() => {
    setSkills(loadSkills());
    setRoles(loadRoles());
    setResources(loadResources());
  }, []);

  // Perform gap analysis when skills or role changes
  useEffect(() => {
    if (selectedRoleId && userSkills.length >= 0) {
      const role = roles.find(r => r.id === selectedRoleId);
      if (role && skills.length > 0) {
        const result = analyzeGaps(userSkills, role, skills);
        setAnalysisResult(result);
      } else {
        setAnalysisResult(null);
      }
    } else {
      setAnalysisResult(null);
    }
  }, [userSkills, selectedRoleId, roles, skills]);

  const selectedRole = roles.find(r => r.id === selectedRoleId) || null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">CareerPath Gap Analyzer</h1>
          <p className="app-subtitle">
            See your path to your first tech role. Compare your skills to job requirements and get a personalized learning path.
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="app-content">
            <section className="input-section">
              <SkillsInput
                skills={skills}
                userSkills={userSkills}
                onSkillsChange={setUserSkills}
              />
            </section>

            <section className="role-section">
              <RoleSelection
                roles={roles}
                selectedRoleId={selectedRoleId}
                onRoleSelect={setSelectedRoleId}
              />
            </section>

            {selectedRole && (
              <>
                <section className="results-section">
                  <ResultsDashboard
                    role={selectedRole}
                    skills={skills}
                    analysisResult={analysisResult}
                  />
                </section>

                {analysisResult && analysisResult.missingSkills.length > 0 && (
                  <section className="learning-path-section">
                    <LearningPath
                      skills={skills}
                      resources={resources}
                      analysisResult={analysisResult}
                      role={selectedRole}
                    />
                  </section>
                )}
              </>
            )}

            {!selectedRole && (
              <section className="empty-state">
                <div className="empty-state-content">
                  <h2>Get Started</h2>
                  <p>Add your skills above and select a target role to see your gap analysis and personalized learning path.</p>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>CareerPath Gap Analyzer - Built for BDPA Indianapolis Hackathon</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
