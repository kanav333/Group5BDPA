# Git Guide - How to Push Changes to Your Repository

## Quick Steps to Push Changes

### 1. Check Status
See what files have changed:
```bash
git status
```

### 2. Add Files to Staging
Add all changes:
```bash
git add .
```

Or add specific files:
```bash
git add src/components/LearningPath.tsx
git add scripts/
```

### 3. Commit Changes
Create a commit with a descriptive message:
```bash
git commit -m "Add roadmap.sh integration and resource scraping"
```

### 4. Push to GitHub
Push your changes to the remote repository:
```bash
git push origin main
```

## Complete Workflow Example

```bash
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Add roadmap.sh integration, scraping scripts, and attribution"

# 4. Push to GitHub
git push origin main
```

## Best Practices

### Commit Messages
Write clear, descriptive commit messages:
- ✅ Good: "Add roadmap.sh resource scraping and attribution"
- ✅ Good: "Update LearningPath component to prioritize free resources"
- ❌ Bad: "fix stuff"
- ❌ Bad: "updates"

### Commit Frequently
Commit small, logical changes:
- One feature per commit
- Fix one bug per commit
- Update documentation separately

### Check Before Pushing
Always check your changes before pushing:
```bash
git status          # See what will be committed
git diff            # See the actual changes
git log --oneline   # See recent commits
```

## Common Commands

### View Changes
```bash
git status                    # See modified files
git diff                      # See changes in detail
git diff --staged             # See staged changes
```

### Undo Changes
```bash
git restore <file>            # Discard changes to a file
git restore --staged <file>   # Unstage a file
git reset HEAD~1              # Undo last commit (keep changes)
```

### Branch Management
```bash
git branch                    # List branches
git checkout -b new-feature   # Create and switch to new branch
git checkout main             # Switch back to main
git merge new-feature         # Merge branch into main
```

### Sync with Remote
```bash
git pull origin main          # Get latest changes from GitHub
git push origin main          # Push your changes to GitHub
git fetch                     # Get updates without merging
```

## Your Current Changes

Based on `git status`, you have:

**Modified Files:**
- README.md
- package.json
- src/App.css
- src/App.tsx
- src/components/LandingPage.tsx
- src/components/LearningPath.css
- src/components/LearningPath.tsx
- src/data/resources.json
- src/data/skills.json
- src/types.ts
- src/utils/gapAnalysis.ts

**New Files:**
- ROADMAP_INTEGRATION_SUMMARY.md
- SCRAPING_SETUP.md
- scripts/ (directory with scraping scripts)
- src/utils/roadmapMapper.ts

## Recommended Commit Messages

For this update, you could use:
```bash
git add .
git commit -m "Add roadmap.sh integration with resource scraping

- Add Puppeteer and Python scraping scripts
- Integrate roadmap.sh resources into LearningPath
- Add attribution to roadmap.sh in footer and learning path
- Update types and gap analysis with weighted readiness
- Add documentation for scraping setup"
git push origin main
```

## Troubleshooting

### Authentication Issues
If you get authentication errors:
```bash
# Use GitHub CLI
gh auth login

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:kanav333/Group5BDPA.git
```

### Merge Conflicts
If you get conflicts:
```bash
git pull origin main          # Get latest changes
# Resolve conflicts in files
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Push Rejected
If push is rejected:
```bash
git pull --rebase origin main  # Get latest and rebase
git push origin main
```

## Next Steps

1. **Add all changes:**
   ```bash
   git add .
   ```

2. **Commit with a message:**
   ```bash
   git commit -m "Add roadmap.sh integration and resource scraping"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

That's it! Your changes will be on GitHub.

