# Contributing to Lighthouse UI

Thank you for your interest in contributing to Lighthouse UI! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/lighthouse-ui.git
   cd lighthouse-ui
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/lighthouse-web3/lighthouse-ui.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## Branch Naming

Use descriptive branch names following this pattern:
- `feat/description` — for new features
- `fix/description` — for bug fixes
- `docs/description` — for documentation updates
- `refactor/description` — for code refactoring
- `chore/description` — for maintenance tasks

Example: `feat/add-wallet-connection`

## Commit Style

Write clear, concise commit messages:
- Use imperative mood ("add feature" not "added feature")
- Keep the first line under 50 characters
- Reference issues when applicable: `Fixes #123`

Example:
```
feat: add wallet connection support

- Integrate wagmi for wallet management
- Add connection UI component
- Update documentation

Fixes #45
```

## Code Style

This project uses ESLint for code quality checks:

```bash
# Run linter
npm run lint

# Build the project
npm run build
```

Ensure your code passes linting before submitting a PR.

## Pull Request Process

1. **Update your branch** with the latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. **Push your changes**:
   ```bash
   git push origin your-branch-name
   ```
3. **Create a Pull Request** on GitHub with a clear description
4. **Link related issues** in the PR description
5. **Ensure CI passes** — all checks must pass before merge

## Code of Conduct

Please note that this project is released with a [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Questions?

Feel free to open an issue or discussion if you have questions about contributing.
