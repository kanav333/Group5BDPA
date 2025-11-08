import type { RoleDefinition } from '../types';
import './RoleSelection.css';

interface RoleSelectionProps {
  roles: RoleDefinition[];
  selectedRoleId: string | null;
  onRoleSelect: (roleId: string) => void;
}

export function RoleSelection({ roles, selectedRoleId, onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="role-selection-container">
      <h2 className="role-selection-title">Choose Your Target Role</h2>
      <div className="roles-grid">
        {roles.map(role => (
          <div
            key={role.id}
            className={`role-card ${selectedRoleId === role.id ? 'selected' : ''}`}
            onClick={() => onRoleSelect(role.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onRoleSelect(role.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={selectedRoleId === role.id}
          >
            <h3 className="role-card-title">{role.name}</h3>
            <p className="role-card-description">{role.description}</p>
            <div className="role-responsibilities">
              <strong>Typical responsibilities:</strong>
              <ul>
                {role.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            {selectedRoleId === role.id && (
              <div className="role-selected-indicator">✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

