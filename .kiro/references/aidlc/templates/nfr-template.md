# Non-Functional Requirements Template

**Path**: `{SPECS_DIR}/{feature}/design/nfr.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details, `{GUIDES_DIR}/operations.md` for operational procedures

Non-functional requirements and infrastructure design (generated only if NFR questions answered in D3).

```markdown
# Non-Functional Requirements & Infrastructure

## Overview
[Brief overview of NFR approach]

---

## Performance

**Response Time**: [Target - e.g., "< 200ms p95, < 500ms p99"]
**Throughput**: [Expected: X req/sec, Peak: Y req/sec]
**Resource Utilization**: CPU < [X%], Memory < [Y%]

---

## Scalability

**Horizontal Scaling**:
- Min: [X] instances
- Max: [Y] instances
- Trigger: [Condition - e.g., "CPU > 70% for 3 min"]

**Data Scaling**:
- Current: [Size]
- Growth: [Rate]
- Retention: [Policy]

**Concurrent Users**: Normal: [X], Peak: [Y]

---

## Security

**Authentication**: [Method]
**Authorization**: [Model - RBAC/ABAC]
**Data Encryption**: At rest: [Method], In transit: [TLS version]
**Compliance**: [Standards - GDPR/HIPAA/SOC 2/etc.]

**Roles & Permissions**:
| Role | Permissions |
|------|-------------|
| Admin | [List] |
| User | [List] |

---

## Availability

**Uptime SLA**: [99.9%/99.95%/99.99%]
**Downtime Budget**: [Calculated from SLA]

**Disaster Recovery**:
- RPO: [Max data loss - e.g., "15 minutes"]
- RTO: [Max downtime - e.g., "1 hour"]
- Backup: [Frequency and retention]

**Failover**: [Strategy - Active-Active/Active-Passive]
**Health Checks**: [Endpoint and frequency]

---

## Reliability

**Error Budget**: [Percentage of requests that can fail]
**Circuit Breakers**: [Where implemented]
**Graceful Degradation**: [How system degrades]
**Data Consistency**: [Strong/Eventual]

---

## Infrastructure

### Compute
| Component | Service | Configuration |
|-----------|---------|---------------|
| API Server | [Lambda/ECS/EC2] | [Config] |
| Background Jobs | [Service] | [Config] |

### Storage
| Data Type | Service | Configuration |
|-----------|---------|---------------|
| Transactional | [RDS/DynamoDB] | [Config] |
| Files | [S3/Blob Storage] | [Config] |
| Cache | [Redis/Memcached] | [Config] |

### Networking
| Component | Service | Configuration |
|-----------|---------|---------------|
| Load Balancer | [ALB/NLB] | [Config] |
| CDN | [CloudFront/Cloudflare] | [Config] |

### Observability
| Concern | Service | Configuration |
|---------|---------|---------------|
| Logging | [CloudWatch/ELK] | [Retention] |
| Metrics | [CloudWatch/Prometheus] | [Key metrics] |
| Tracing | [X-Ray/Jaeger] | [Sampling rate] |
| Alerting | [CloudWatch/PagerDuty] | [Thresholds] |

---

## Cost Estimation

**Monthly Estimate**: $[X]

**Main Cost Drivers**:
1. [Driver 1 - e.g., "Database IOPS"]
2. [Driver 2 - e.g., "Data transfer"]

**Budget**: $[X]/month
**Alert Threshold**: [80% of budget]

---

## Deployment Architecture

[High-level deployment diagram]

**Multi-Region**: [Yes/No]
**Availability Zones**: [Number]

---

## Testing NFRs

**Performance Testing**: [Tool - JMeter/k6] - Load, stress, spike tests
**Security Testing**: [Penetration testing frequency]
**DR Testing**: [Frequency]

---

## Operational Procedures

**See**: `{GUIDES_DIR}/operations.md` for detailed procedures

**Deployment**: [Brief process]
**Rollback**: [Brief process]
**Incident Response**: Detection → Triage → Response → Resolution → Post-mortem
```
