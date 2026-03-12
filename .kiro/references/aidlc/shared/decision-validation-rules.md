# Decision Validation Rules

Comprehensive validation rules for detecting conflicts and inconsistencies in user decisions across all decision gates.

---

## D1 Validation Rules (Requirements Decisions)

### Rule: Scope vs Timeline Mismatch

**Trigger**: When scope is large AND timeline is short

**Conflict Type**: Planning

**Severity**: Medium

**Detection Logic**:
- Feature scope = "Full product" OR "Enterprise"
- Timeline = "< 3 months" OR "Urgent"
- Story count > 15

**Clarifying Questions**:
1. Is this timeline realistic given the scope?
2. Can we prioritize features for phased delivery?

**Resolution Options**:
1. Reduce scope to MVP for initial release
2. Extend timeline to match scope
3. Increase team size (if feasible)
4. Keep current plan (requires justification)

---

### Rule: Complex Features Without Personas

**Trigger**: When multiple user types exist but personas not generated

**Conflict Type**: Requirements Quality

**Severity**: Low

**Detection Logic**:
- User types count >= 3
- Personas generation = "No"
- Requirements include varied user workflows

**Clarifying Questions**:
1. Do different user types have significantly different needs?
2. Would personas help clarify requirements?

**Resolution Options**:
1. Generate personas to clarify user needs
2. Skip personas (requirements are clear enough)

---

## D2 Validation Rules (Units Decisions)

### Rule: Over-Decomposition for Small Project

**Trigger**: When project is small but decomposed into many units

**Conflict Type**: Architecture Complexity

**Severity**: Medium

**Detection Logic**:
- Total stories <= 10
- Number of units >= 4
- Team size <= 3

**Clarifying Questions**:
1. What's the rationale for this level of decomposition?
2. Is the added complexity worth the benefits?

**Resolution Options**:
1. Reduce to 2-3 units (simpler coordination)
2. Skip decomposition (single unit, monolithic approach)
3. Keep current decomposition (team has experience, anticipating growth)

---

### Rule: Microservices for Small Team

**Trigger**: When microservices chosen for small team

**Conflict Type**: Architecture vs Resources

**Severity**: High

**Detection Logic**:
- Architecture pattern = "Microservices"
- Team size <= 3
- Story count <= 15

**Clarifying Questions**:
1. Does the team have microservices experience?
2. Is the operational overhead manageable?
3. Are you anticipating rapid team growth?

**Resolution Options**:
1. Start with Modular Monolith (easier to manage, can split later)
2. Use Microservices (team experienced, clear rationale)
3. Hybrid approach (monolith with service boundaries defined)

---

### Rule: Circular Dependencies

**Trigger**: When units have circular dependencies

**Conflict Type**: Architecture Design

**Severity**: High

**Detection Logic**:
- Unit A depends on Unit B
- Unit B depends on Unit A (directly or transitively)

**Clarifying Questions**:
1. Can we break this circular dependency?
2. Should these be combined into one unit?

**Resolution Options**:
1. Introduce shared library/module for common functionality
2. Merge units into single unit
3. Refactor to remove circular dependency
4. Use event-driven pattern to decouple

---

## D3 Validation Rules (Design Decisions)

### Technology Compatibility Rules

#### Rule: Prisma + MongoDB Limited Support

**Trigger**: When Prisma ORM selected with MongoDB

**Conflict Type**: Technology Compatibility

**Severity**: Medium

**Detection Logic**:
- ORM/Client answer contains "Prisma"
- Database answer contains "MongoDB"

**Clarifying Questions**:
1. Are you aware Prisma's MongoDB support is limited (no migrations, limited features)?
2. Do you need schema migrations and full ORM features?

**Resolution Options**:
1. Switch to Mongoose (full MongoDB support, native features)
2. Keep Prisma + MongoDB (accept limitations: no migrations, manual indexes)
3. Switch to PostgreSQL (full Prisma support with all features)

---

#### Rule: GraphQL Without Proper Client

**Trigger**: When GraphQL API with incompatible frontend client

**Conflict Type**: Technology Compatibility

**Severity**: Medium

**Detection Logic**:
- API pattern = "GraphQL"
- HTTP Client = "Axios" OR "Fetch API" (without GraphQL mention)

**Clarifying Questions**:
1. How will the frontend consume GraphQL APIs?
2. Do you need GraphQL-specific features (subscriptions, caching)?

**Resolution Options**:
1. Use Apollo Client or urql (GraphQL-optimized)
2. Use Fetch API with manual GraphQL queries (simpler, less features)
3. Switch to REST API (if GraphQL features not needed)

---

#### Rule: AWS CDK with Non-AWS Cloud

**Trigger**: When AWS CDK selected with non-AWS cloud provider

**Conflict Type**: Technology Compatibility

**Severity**: High

**Detection Logic**:
- IaC tool = "AWS CDK"
- Cloud provider = "Azure" OR "GCP"

**Clarifying Questions**:
1. Did you mean to use AWS as cloud provider?
2. Or did you mean to use Terraform/Pulumi for multi-cloud?

**Resolution Options**:
1. Switch cloud provider to AWS (CDK is AWS-specific)
2. Switch IaC tool to Terraform or Pulumi (multi-cloud support)
3. Use cloud-specific IaC (Azure ARM/Bicep, GCP Deployment Manager)

---

#### Rule: Serverless with Long-Running Tasks

**Trigger**: When serverless compute with long-running requirements

**Conflict Type**: Architecture Limitation

**Severity**: High

**Detection Logic**:
- Compute platform contains "Lambda" OR "Serverless"
- Requirements mention "batch processing" OR "long-running" OR "background jobs"
- Performance targets > 15 minutes execution time

**Clarifying Questions**:
1. What's the expected duration of these tasks?
2. Can tasks be broken into smaller chunks?

**Resolution Options**:
1. Use ECS/Fargate for long-running tasks (no time limit)
2. Use Step Functions to chain Lambda invocations (up to 1 year)
3. Redesign to use async processing with queues
4. Use hybrid: Lambda for API, ECS for background jobs

---

### Architecture Pattern Rules

#### Rule: Event Sourcing for Simple CRUD

**Trigger**: When Event Sourcing chosen for simple application

**Conflict Type**: Over-Engineering

**Severity**: Medium

**Detection Logic**:
- Event Sourcing = "Yes"
- Requirements are mostly simple CRUD operations
- No audit trail or time-travel requirements mentioned
- Story count <= 10

**Clarifying Questions**:
1. Do you need full audit history of all changes?
2. Do you need to replay events or time-travel?
3. Is the added complexity justified?

**Resolution Options**:
1. Use traditional state storage (simpler, adequate for most cases)
2. Use audit logging instead (simpler than event sourcing)
3. Keep Event Sourcing (clear business need for event history)

---

#### Rule: CQRS Without Justification

**Trigger**: When CQRS selected without clear read/write separation need

**Conflict Type**: Over-Engineering

**Severity**: Medium

**Detection Logic**:
- CQRS = "Yes (separate read/write models)"
- No mention of different read/write patterns
- No high-scale read requirements
- Architecture = "Monolith" OR "Modular Monolith"

**Clarifying Questions**:
1. Do you have significantly different read vs write patterns?
2. Do you need to scale reads independently from writes?
3. Is the added complexity worth the benefits?

**Resolution Options**:
1. Use unified model (simpler, adequate for most cases)
2. Keep CQRS (clear performance or scaling need)
3. Start simple, add CQRS later if needed

---

#### Rule: Microservices with Shared Database

**Trigger**: When microservices architecture with single shared database

**Conflict Type**: Architecture Anti-Pattern

**Severity**: High

**Detection Logic**:
- Architecture pattern = "Microservices" (from D2)
- Database strategy mentions "shared database" OR "single database"
- No mention of database-per-service

**Clarifying Questions**:
1. Are you aware this violates microservices principles?
2. Should each service have its own database?
3. Or should we use a different architecture pattern?

**Resolution Options**:
1. Database per service (true microservices, better isolation)
2. Shared database with schema separation (pragmatic compromise)
3. Switch to Modular Monolith (shared DB is acceptable)
4. Keep shared DB (acknowledge trade-offs, plan migration path)

---

### Scale & Performance Rules

#### Rule: High Availability Without Redundancy

**Trigger**: When high availability target without redundancy

**Conflict Type**: Architecture Inadequacy

**Severity**: High

**Detection Logic**:
- Availability target >= "99.9%"
- Compute platform = single instance OR no mention of multi-AZ
- No load balancer mentioned
- No database replication mentioned

**Clarifying Questions**:
1. How will you achieve 99.9% availability with single instance?
2. Do you need multi-AZ deployment?

**Resolution Options**:
1. Add multi-AZ deployment with load balancer
2. Add database replication (read replicas, multi-AZ)
3. Lower availability target to match architecture
4. Use managed services with built-in HA

---

#### Rule: High Throughput Without Caching

**Trigger**: When high throughput requirements without caching

**Conflict Type**: Performance Inadequacy

**Severity**: Medium

**Detection Logic**:
- Performance target > 1000 requests/second
- Caching strategy = "None" OR "None for MVP"
- Read-heavy workload indicated

**Clarifying Questions**:
1. Are you aware caching could significantly improve performance?
2. Is data freshness more important than performance?

**Resolution Options**:
1. Add Redis/Memcached for application caching
2. Add CDN for static assets
3. Add database query caching
4. Keep no caching (data freshness critical, accept performance impact)

---

#### Rule: Global Users with Single Region

**Trigger**: When global user base with single region deployment

**Conflict Type**: Performance Inadequacy

**Severity**: Medium

**Detection Logic**:
- Requirements mention "global users" OR "international"
- Infrastructure mentions single region only
- No CDN mentioned

**Clarifying Questions**:
1. What's the expected latency for users in other regions?
2. Is multi-region deployment feasible?

**Resolution Options**:
1. Add CDN for static assets (CloudFront, Cloudflare)
2. Deploy to multiple regions with geo-routing
3. Start single region, expand later based on usage
4. Keep single region (acceptable latency for use case)

---

### Security & Compliance Rules

#### Rule: PII Data Without Encryption

**Trigger**: When PII data without encryption at rest

**Conflict Type**: Security Risk

**Severity**: High

**Detection Logic**:
- Requirements mention PII (email, phone, address, payment info)
- Data encryption = "None" OR "In transit only"

**Clarifying Questions**:
1. Are you aware PII should be encrypted at rest?
2. Are there compliance requirements (GDPR, HIPAA, PCI-DSS)?

**Resolution Options**:
1. Enable encryption at rest (database, S3, etc.)
2. Use field-level encryption for sensitive fields
3. Justify why encryption not needed (non-production, test data only)

---

#### Rule: Public API Without Rate Limiting

**Trigger**: When public API without rate limiting

**Conflict Type**: Security Risk

**Severity**: Medium

**Detection Logic**:
- API is public or has external users
- Rate limiting = "None"

**Clarifying Questions**:
1. How will you prevent API abuse?
2. Is this API truly public or just for known clients?

**Resolution Options**:
1. Add rate limiting (per-user, per-IP, or per-API-key)
2. Add API gateway with built-in rate limiting
3. Keep no rate limiting (internal API, trusted clients only)

---

#### Rule: Enterprise Security Without Secret Management

**Trigger**: When enterprise security level without proper secret management

**Conflict Type**: Security Risk

**Severity**: High

**Detection Logic**:
- Security level = "Enterprise" OR "Compliance-driven"
- Secret management = "Environment variables" OR "Config files"

**Clarifying Questions**:
1. How will you manage secrets securely?
2. Are there compliance requirements for secret management?

**Resolution Options**:
1. Use AWS Secrets Manager or HashiCorp Vault
2. Use cloud provider's secret management service
3. Justify current approach (development environment only)

---

### Development Workflow Rules

#### Rule: Monorepo Without Monorepo Tool

**Trigger**: When monorepo strategy without proper tooling

**Conflict Type**: Workflow Inadequacy

**Severity**: Medium

**Detection Logic**:
- Repository strategy = "Monorepo"
- Monorepo tool = "None" OR not specified
- Multiple packages/services indicated

**Clarifying Questions**:
1. How will you manage dependencies between packages?
2. How will you handle builds and deployments?

**Resolution Options**:
1. Use Nx, Turborepo, or pnpm workspaces (optimized builds, caching)
2. Use native package manager workspaces (npm, yarn)
3. Keep no tool (simple monorepo, manual coordination)

---

#### Rule: Trunk-Based with Long-Lived Branches

**Trigger**: When trunk-based development with long-lived feature branches

**Conflict Type**: Workflow Conflict

**Severity**: Medium

**Detection Logic**:
- Branch strategy = "Trunk-based development"
- Mentions "feature branches" OR "long-lived branches"

**Clarifying Questions**:
1. Are you doing true trunk-based (short-lived branches, frequent merges)?
2. Or do you mean GitHub Flow (feature branches)?

**Resolution Options**:
1. True trunk-based: short-lived branches (<1 day), feature flags
2. GitHub Flow: feature branches, PR-based, merge to main
3. Git Flow: develop branch, release branches, more structured

---

### Cost & Complexity Rules

#### Rule: MVP with Enterprise Observability

**Trigger**: When MVP scope with enterprise-grade observability

**Conflict Type**: Over-Engineering

**Severity**: Low

**Detection Logic**:
- Scope = "MVP" OR "Prototype"
- Observability includes distributed tracing, APM, full metrics
- Multiple monitoring tools selected

**Clarifying Questions**:
1. Is this level of observability needed for MVP?
2. Can you start simpler and add later?

**Resolution Options**:
1. Start with basic logging and metrics (CloudWatch, simple dashboards)
2. Keep full observability (production-ready from day 1)
3. Phased approach (basic now, add advanced later)

---

#### Rule: Small Team with Complex Architecture

**Trigger**: When small team with overly complex architecture

**Conflict Type**: Resource Mismatch

**Severity**: Medium

**Detection Logic**:
- Team size <= 3
- Architecture = "Microservices" OR multiple complex patterns
- Multiple databases, message queues, caching layers

**Clarifying Questions**:
1. Can the team manage this operational complexity?
2. Is this complexity necessary for the requirements?

**Resolution Options**:
1. Simplify architecture (monolith or modular monolith)
2. Use managed services to reduce operational burden
3. Keep complex architecture (team experienced, clear need)

---

## D4 Validation Rules (Tasks Decisions)

### Rule: TDD Without Team Experience

**Trigger**: When TDD approach without team experience

**Conflict Type**: Workflow Risk

**Severity**: Low

**Detection Logic**:
- Testing approach = "TDD (Test-Driven Development)"
- Context indicates team new to TDD

**Clarifying Questions**:
1. Does the team have TDD experience?
2. Is there time for the learning curve?

**Resolution Options**:
1. Start with test-after approach (easier learning curve)
2. Use TDD for critical components only
3. Keep TDD (team committed to learning)

---

### Rule: No Testing Strategy

**Trigger**: When no testing strategy defined

**Conflict Type**: Quality Risk

**Severity**: High

**Detection Logic**:
- Testing approach = "None" OR "Manual only"
- Production deployment planned

**Clarifying Questions**:
1. How will you ensure code quality?
2. Is this a prototype or production system?

**Resolution Options**:
1. Add unit tests at minimum (Jest, Pytest, JUnit)
2. Add integration tests for critical paths
3. Keep no automated tests (prototype only, will add later)

---

### Rule: Parallel Development Without Coordination

**Trigger**: When parallel development without coordination plan

**Conflict Type**: Workflow Risk

**Severity**: Medium

**Detection Logic**:
- Task breakdown = "Parallel" OR "By unit"
- Multiple developers indicated
- No mention of integration points or sync schedule

**Clarifying Questions**:
1. How will developers coordinate on shared interfaces?
2. When will integration happen?

**Resolution Options**:
1. Define integration milestones and sync points
2. Assign interface contracts upfront
3. Use sequential development (less coordination needed)

---

## Context-Based Severity Adjustments

Some conflicts have variable severity based on context:

### Team Size Factor
- Small team (1-3): Complexity conflicts become HIGH severity
- Medium team (4-8): Complexity conflicts remain MEDIUM
- Large team (9+): Complexity conflicts become LOW severity

### Project Scope Factor
- MVP/Prototype: Over-engineering conflicts become HIGH severity
- Full Product: Over-engineering conflicts remain MEDIUM
- Enterprise: Under-engineering conflicts become HIGH severity

### Timeline Factor
- Urgent (<3 months): Complexity conflicts become HIGH severity
- Normal (3-6 months): Conflicts remain as defined
- Long-term (>6 months): Complexity conflicts become LOW severity

---

## Validation Notes

- Rules are checked in order of severity (High → Medium → Low)
- Multiple conflicts can be detected in single validation pass
- User can override any conflict with justification
- All validation results are logged in audit trail
- Decision file is updated with validation notes
