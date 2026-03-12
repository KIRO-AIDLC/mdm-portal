# Data Model Template

**Path**: `{SPECS_DIR}/{feature}/design/data-model.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details

Complete data model including entities, relationships, schemas, and storage strategy.

```markdown
# Data Model

## Overview
[Brief overview of data model and storage strategy]

**Database**: [PostgreSQL/MongoDB/DynamoDB/etc.] v[X]
**ORM/Client**: [Prisma/TypeORM/Mongoose/etc.]

---

## Entities

### Entity 1: [Name]

**Purpose**: [What this entity represents]

**Attributes**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| id | UUID | Yes | Unique identifier | Auto-generated |
| name | String | Yes | [Description] | Max 255 chars |
| email | String | Yes | [Description] | Valid email |
| status | Enum | Yes | [Description] | [ACTIVE, INACTIVE] |
| createdAt | Timestamp | Yes | Creation time | Auto-generated |

**Relationships**:
- Has Many: `[RelatedEntity]` via `[foreign_key]`
- Belongs To: `[ParentEntity]` via `[foreign_key]`

**Indexes**:
- Primary: `id`
- Unique: `email`
- Composite: `status, createdAt` (for filtering)

**Business Rules**:
1. [Rule 1]
2. [Rule 2]

---

### Entity 2: [Name]

[Same structure as Entity 1]

---

## Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐
│   Entity1   │         │   Entity2   │
├─────────────┤         ├─────────────┤
│ PK: id      │────1:N──│ FK: entity1 │
│     name    │         │     value   │
└─────────────┘         └─────────────┘
```

---

## Database Schema

### Table: [table_name]

```sql
CREATE TABLE [table_name] (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_[table]_status ON [table_name](status, created_at);
```

---

## Storage Strategy

**Partitioning**: [Strategy if applicable]
**Sharding**: [Strategy if applicable]
**Replication**: [Master-Slave/Multi-Master, read replicas]

---

## Caching

**Technology**: [Redis/Memcached]

**What to Cache**:
- [Data type 1]: TTL [X minutes], invalidation: [Strategy]
- [Data type 2]: TTL [Y minutes], invalidation: [Strategy]

---

## Data Migration

**Tool**: [Prisma Migrate/Flyway/Liquibase]
**Process**: [Brief migration process]
**Rollback**: [Rollback strategy]

---

## Data Access Patterns

### Common Queries

**Query 1**: [Description]
```sql
[SQL or ORM code]
```
**Frequency**: [High/Medium/Low]
**Optimization**: [Indexes used]

---

## Performance

**Indexing**: [Strategy]
**Connection Pooling**: [Pool size and rationale]
**Query Optimization**: [Approach]

---

## Security

**Encryption**: At rest: [Method], In transit: [TLS version]
**PII Fields**: [List]
**PII Protection**: [Encryption/masking strategy]
**Access Control**: [Database roles and permissions]

---

## Data Retention

**Retention Policy**:
- [Entity 1]: [Duration]
- [Entity 2]: [Duration]

**Archival**: [Strategy and trigger]
**Deletion**: [Soft delete/Hard delete approach]
```
