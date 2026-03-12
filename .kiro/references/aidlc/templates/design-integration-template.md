# Integration Template

**Path**: `{SPECS_DIR}/{feature}/design/integration.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details, `{GUIDES_DIR}/distributed-patterns.md` for distributed system patterns

Integration points, external services, inter-unit communication, and distributed patterns.

```markdown
# Integration Specifications

## Overview
[Brief overview of integration strategy]

**See**: `{GUIDES_DIR}/distributed-patterns.md` for distributed system patterns (CQRS, Saga, Event Sourcing, etc.)

---

## External Integrations

### Integration 1: [Service Name]

**Purpose**: [Why this integration is needed]

**Provider**: [Service provider]
**Type**: [REST API/GraphQL/gRPC/Message Queue]
**Documentation**: [Link to external docs]

**Authentication**: [API Key/OAuth/JWT]
**Credentials**: [How stored - e.g., "AWS Secrets Manager"]

**Key Endpoints**:
- `[METHOD] [URL]` - [Purpose]
- `[METHOD] [URL]` - [Purpose]

**Error Handling**:
- Retry: [Strategy - e.g., "Exponential backoff, 3 attempts"]
- Timeout: [Duration]
- Circuit Breaker: [Enabled/Disabled]
- Fallback: [What happens when unavailable]

**Monitoring**:
- Metrics: Request count, error rate, response time
- Alerts: [Key alert conditions]

---

### Integration 2: [Service Name]

[Same structure as Integration 1]

---

## Inter-Unit Communication

[For systems with multiple units]

**Pattern**: [Synchronous/Asynchronous/Event-driven]

### Unit 1 ↔ Unit 2

**Method**: [REST API/Message Queue/Event Bus/gRPC]
**Format**: [JSON/Protocol Buffers/etc.]

**Contract**:
```json
{
  "eventType": "event.name",
  "payload": {"field": "value"}
}
```

**Error Handling**: [Retry strategy, timeout]

---

## Message Queue

[If applicable]

**Technology**: [RabbitMQ/Kafka/SQS]

### Queue 1: [Name]

**Purpose**: [What this queue is for]

**Message Format**:
```json
{
  "messageId": "uuid",
  "type": "message.type",
  "payload": {"field": "value"}
}
```

**Producers**: [Services that produce]
**Consumers**: [Services that consume]
**Configuration**: Durable: [Yes/No], DLQ: [Yes/No], Retry: [Policy]

---

## Event-Driven Architecture

[If applicable]

**Event Bus**: [EventBridge/Kafka/Custom]

### Event 1: [Name]

**Schema**:
```json
{
  "eventId": "uuid",
  "eventType": "domain.entity.action",
  "data": {"field": "value"}
}
```

**Publishers**: [Services that publish]
**Subscribers**: [Services that subscribe and what they do]

---

## Distributed System Patterns

[If microservices/distributed architecture]

### Consistency Model
**Chosen**: [Strong/Eventual/Causal consistency]
**Rationale**: [Why this model]
**Trade-offs**: [What this means for the system]

### Distributed Transactions
**Approach**: [Saga Choreography/Saga Orchestration/2PC/Avoid]
**Rationale**: [Why this approach]

**If Saga**:
- Pattern: [Choreography/Orchestration]
- Compensation: [How failures are handled]
- Services involved: [List]

### CQRS
**Implemented**: [Yes/No]
**If Yes**:
- Write model: [Description]
- Read model: [Description]
- Synchronization: [How models stay in sync]

### Event Sourcing
**Implemented**: [Yes/No]
**If Yes**:
- Event store: [Technology]
- Projection: [How current state is built]
- Event schema: [Versioning strategy]

### Locking Strategy
**Approach**: [Optimistic/Pessimistic/Distributed/None]
**Implementation**: [Version fields/SELECT FOR UPDATE/Redis locks]
**Conflict handling**: [How conflicts are resolved]

### Outbox Pattern
**Implemented**: [Yes/No]
**If Yes**:
- Outbox table: [Schema]
- Publisher: [How events are published]
- Cleanup: [How processed events are cleaned]

### Idempotency
**Required**: [Yes/No]
**Implementation**: [Idempotency keys, deduplication]
**Key storage**: [Where keys are stored]

**See**: `{GUIDES_DIR}/distributed-patterns.md` for detailed pattern explanations

---

## Integration Testing

**Strategy**: [How integrations are tested]
**Mocking**: [Which services are mocked]
**Contract Testing**: [Tool - e.g., "Pact"] (if applicable)

---

## Security

**API Keys**: Stored in [Secrets Manager/Vault]
**Rotation**: [Frequency]
**Network**: [VPC/Security groups if applicable]
**Encryption**: [TLS version]
```
