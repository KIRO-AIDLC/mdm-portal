# Implementation Template

**Path**: `{SPECS_DIR}/{feature}/design/implementation.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details

Implementation approach, technology stack, build process, and deployment strategy.

```markdown
# Implementation Specifications

## Overview
[Brief overview of implementation approach and strategy]

---

## Implementation Phases

### Phase 1: [Name]
**Duration**: [Estimated time]
**Objectives**: [2-3 key objectives]
**Deliverables**: [Key deliverables]
**Dependencies**: [Dependencies or "None"]

### Phase 2: [Name]
[Same structure]

---

## Technology Stack

### Frontend (if web application)
- **Framework**: [React/Vue/Angular] v[X]
- **Build Tool**: [Vite/Webpack]
- **Key Libraries**: [List 3-5 major dependencies]

### Mobile (if mobile application)
- **Framework**: [React Native/Flutter/Native] v[X]
- **Platform**: [iOS/Android/Both]
- **Key Libraries**: [List 3-5 major dependencies]

### Backend (if applicable)
- **Runtime**: [Node.js/Python/Java] v[X]
- **Framework**: [Express/NestJS/FastAPI]
- **Key Libraries**: [List 3-5 major dependencies]

### Database
- **Technology**: [PostgreSQL/MongoDB] v[X]
- **ORM/Client**: [Prisma/TypeORM/Mongoose]

### Infrastructure
- **Cloud Provider**: [AWS/Azure/GCP]
- **Key Services**: [List 3-5 main services]

---

## Code Organization

**Architecture Pattern**: [Layered/Clean/Hexagonal/Feature-based/MVC]

**Repository Structure**: [Single Repo/Monorepo/Multi-Repo]

**Directory Structure**: See `{GUIDES_DIR}/architecture-patterns.md` for detailed structures and repository patterns

**Module Boundaries**:
- [Rule 1 - e.g., "Controllers must not contain business logic"]
- [Rule 2 - e.g., "Domain layer independent of infrastructure"]

**Naming Conventions**:
- Files: [kebab-case/camelCase]
- Classes: [PascalCase]
- Functions: [camelCase]
- Constants: [UPPER_SNAKE_CASE]

**Monorepo Configuration** (if applicable):
- Tool: [Nx/Turborepo/pnpm workspaces/Yarn workspaces]
- Packages: [List main packages]
- Shared configs: [List shared configurations]

---

## Development Workflow

### Environment Setup
**Prerequisites**: [List prerequisites]

**Setup**:
```bash
git clone [repo-url]
[package-manager] install
cp .env.example .env
[migration-command]
[start-command]
```

### Git Workflow
**Branching**: [Git Flow/GitHub Flow/Trunk-based]
**Branch Naming**: `feature/[name]`, `bugfix/[name]`, `hotfix/[name]`
**Commit Messages**: [Conventional Commits/Other]

---

## Build Process

**Build Tool**: [Tool name]
**Build Command**: `[build-command]`
**Output**: `[output-directory]`

**Environment Builds**:
- Development: [Configuration]
- Staging: [Configuration]
- Production: [Configuration]

---

## Testing Strategy

**Unit Tests**: [Framework] - Coverage target: [X%]
**Integration Tests**: [Approach and tools]
**E2E Tests**: [Framework] - Critical paths: [List 2-3]
**Property-Based Tests**: [Framework] (if PBT selected) - See `design/correctness.md`

**Run Commands**:
```bash
npm test              # Unit tests
npm run test:int      # Integration tests
npm run test:e2e      # E2E tests
npm run test:pbt      # Property-based tests
```

---

## CI/CD Pipeline

**Tool**: [GitHub Actions/GitLab CI/Jenkins]

**Stages**: Build → Test → Security Scan → Deploy

**See**: `{GUIDES_DIR}/ci-cd-setup.md` for detailed pipeline configurations

**Deployment Triggers**:
- Development: Auto on push to develop
- Staging: Auto on push to main
- Production: Manual approval required

---

## Deployment

**Strategy**: [Blue-Green/Canary/Rolling/Recreate]

**See**: `{GUIDES_DIR}/deployment-strategies.md` for detailed deployment approaches

**Environments**:
- Development: [URL] - Auto-deploy
- Staging: [URL] - Auto-deploy
- Production: [URL] - Manual approval

**Rollback**: [Rollback approach and estimated time]

---

## Configuration

**Environment Variables**: [List 5-10 key variables]

**Secret Management**: [AWS Secrets Manager/Vault/etc.]

**Configuration Files**:
- `.env` - Local development
- `.env.staging` - Staging
- `.env.production` - Production

---

## Monitoring & Observability

**Logging**: [Framework] → [Destination]
**Metrics**: [Tool] - Key metrics: request rate, error rate, response time
**Tracing**: [Tool] - Sampling rate: [X%]
**Alerting**: [Tool] - See `design/nfr.md` for alert conditions

---

## Performance Optimization

**Strategies**:
- [Strategy 1 - e.g., "Caching with Redis"]
- [Strategy 2 - e.g., "Database indexing"]
- [Strategy 3 - e.g., "CDN for static assets"]

---

## Security

**Measures**:
- [Measure 1 - e.g., "Dependency scanning with Snyk"]
- [Measure 2 - e.g., "Secret rotation every 90 days"]
- [Measure 3 - e.g., "TLS 1.3 for all connections"]

---

## Documentation

**Code Documentation**: [JSDoc/Docstrings/etc.]
**API Documentation**: [Swagger/Postman] at [URL]
**Developer Docs**: `docs/` directory

---

## Maintenance

**Dependency Updates**: [Schedule and process]
**Bug Fix Process**: [Brief description]
**Hotfix Process**: [Brief description]

**See**: `{GUIDES_DIR}/operations.md` for detailed operational procedures
```
