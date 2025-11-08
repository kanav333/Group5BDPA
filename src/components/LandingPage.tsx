import { useState } from 'react';
import type { Skill, RoleDefinition, UserProfile } from '../types';
import { SkillsInput } from './SkillsInput';
import './LandingPage.css';

interface LandingPageProps {
  skills: Skill[];
  roles: RoleDefinition[];
  onComplete: (profile: UserProfile) => void;
}

export function LandingPage({ skills, roles, onComplete }: LandingPageProps) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<UserProfile['experienceLevel']>('student');
  const [dreamRoleId, setDreamRoleId] = useState<string | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: name.trim() || undefined,
      school: school.trim() || undefined,
      graduationYear: graduationYear.trim() || undefined,
      experienceLevel,
      dreamRole: dreamRoleId || undefined,
      skills: userSkills,
    };
    onComplete(profile);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return school.trim().length > 0;
    }
    if (currentStep === 2) {
      return userSkills.length > 0;
    }
    if (currentStep === 3) {
      return dreamRoleId !== null;
    }
    return false;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-header">
          <h1 className="landing-title">Welcome to CareerPath</h1>
          <p className="landing-subtitle">
            Let's get to know you better so we can create a personalized career path
          </p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="step-indicator">Step {currentStep} of {totalSteps}</p>
        </div>

        <form className="landing-form" onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2 className="step-title">Tell Us About Yourself</h2>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name <span className="optional">(optional)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="school" className="form-label">
                  School or University <span className="required">*</span>
                </label>
                <input
                  id="school"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Enter your school name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduationYear" className="form-label">
                  Graduation Year <span className="optional">(optional)</span>
                </label>
                <input
                  id="graduationYear"
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  placeholder="e.g., 2024, 2025"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experienceLevel" className="form-label">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as UserProfile['experienceLevel'])}
                  className="form-select"
                >
                  <option value="student">Current Student</option>
                  <option value="recent-grad">Recent Graduate</option>
                  <option value="career-switcher">Career Switcher</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2 className="step-title">What Are Your Skills?</h2>
              <p className="step-description">
                Add the skills you currently have. Don't worry if the list is short - we'll help you identify what to learn next!
              </p>
              <SkillsInput
                skills={skills}
                userSkills={userSkills}
                onSkillsChange={setUserSkills}
              />
            </div>
          )}

          {/* Step 3: Dream Role */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2 className="step-title">What's Your Dream Role?</h2>
              <p className="step-description">
                Select the role you're most interested in. We'll analyze your skills and create a personalized learning path.
              </p>
              <div className="roles-grid-compact">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className={`role-card-compact ${dreamRoleId === role.id ? 'selected' : ''}`}
                    onClick={() => setDreamRoleId(role.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setDreamRoleId(role.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={dreamRoleId === role.id}
                  >
                    <h3 className="role-card-compact-title">{role.name}</h3>
                    <p className="role-card-compact-description">{role.description}</p>
                    {dreamRoleId === role.id && (
                      <div className="role-selected-indicator-compact">✓ Selected</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
              >
                ← Back
              </button>
            )}
            <div className="navigation-spacer" />
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn btn-primary"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed()}
                className="btn btn-primary btn-large"
              >
                Get My Career Path →
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

