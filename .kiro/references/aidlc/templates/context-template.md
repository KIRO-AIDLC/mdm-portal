# Context Assessment Template

**Path**: `{SPECS_DIR}/{feature}/context.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details

```markdown
# Context Assessment

## Project Overview
- **Type**: [Greenfield/Brownfield]
- **Assessment Date**: [ISO timestamp]

## Technology Stack
- **Languages**: [Detected or "N/A"]
- **Frameworks**: [Detected or "N/A"]
- **Build System**: [npm/maven/gradle or "N/A"]
- **Testing**: [Jest/Pytest/JUnit or "N/A"]
- **Infrastructure**: [AWS/Azure/GCP or "N/A"]

## Codebase Analysis
[For brownfield only]

**Architecture**: [Monolith/Microservices/Serverless]
**Entry Points**: [API endpoints, handlers, main functions]
**Data Layer**: [Database types, ORMs, patterns]

**Key Components**:
| Component | Purpose | Location |
|-----------|---------|----------|
| [Name] | [Description] | [Path] |

**Integration Points**: [External APIs, databases, services]

## Feature Impact

**Affected Areas**:
- [ ] New standalone feature
- [ ] Extends existing component
- [ ] Modifies existing behavior
- [ ] Cross-cutting concern

**Files Likely to Change**:
| File | Change Type | Reason |
|------|-------------|--------|
| [Path] | [New/Modify/Delete] | [Why] |

## Recommendations

**Complexity Indicators**:
- Story Count: [Low (1-4) / Medium (5-10) / High (11+)]
- Domain Boundaries: [Detected domains]
- User Types: [Detected user types]
- Integration Points: [External systems]

**Decision Gate Recommendations**:
- **Personas**: [Yes/No] - [Reason]
- **Units**: [Yes/No] - [Reason]
- **NFR**: [Yes/No] - [Reason]

## Next Steps
Proceed to Requirements phase (D1 → Personas → Requirements)
```
