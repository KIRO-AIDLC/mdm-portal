# API Specification Template

**Path**: `{SPECS_DIR}/{feature}/design/api-spec.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details, `{GUIDES_DIR}/api-design.md` for API patterns

Complete API documentation including endpoints, authentication, and error handling.

```markdown
# API Specification

## Overview
**API Style**: [REST/GraphQL/gRPC/Hybrid]
**Base URL**: `https://api.example.com/v1`
**Version**: v1

---

## Authentication

**Method**: [JWT/OAuth 2.0/API Keys/Session-based]

**Header**: `Authorization: Bearer <token>`

**Token Expiration**: [Duration]

---

## Authorization

**Model**: [RBAC/ABAC/Permission-based]

**Roles**:
| Role | Permissions | Description |
|------|-------------|-------------|
| Admin | [List] | [Description] |
| User | [List] | [Description] |

---

## Endpoints

### Endpoint 1: [Name]

```
[GET/POST/PUT/DELETE] /api/v1/[resource]
```

**Description**: [What this endpoint does]
**Auth Required**: [Yes/No]
**Rate Limit**: [X requests/minute]

**Request**:
```json
{
  "field1": "string",
  "field2": 123
}
```

**Response (200)**:
```json
{
  "id": "uuid",
  "field1": "string",
  "field2": 123,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Errors**:
- **400**: Invalid request - `{"error": {"code": "INVALID_REQUEST", "message": "..."}}`
- **401**: Unauthorized - `{"error": {"code": "UNAUTHORIZED", "message": "..."}}`
- **404**: Not found - `{"error": {"code": "NOT_FOUND", "message": "..."}}`

---

### Endpoint 2: [Name]

[Same structure as Endpoint 1]

---

## Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": [{"field": "fieldName", "message": "Error"}],
    "requestId": "uuid"
  }
}
```

**Common Error Codes**: See `{GUIDES_DIR}/api-design.md` for complete list

---

## Pagination

**Approach**: [Offset-based/Cursor-based]

**Request**: `?page=1&limit=20`

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "hasNext": true
  }
}
```

---

## Filtering & Sorting

**Filter**: `?filter[field]=value`
**Sort**: `?sort=field:desc`

**See**: `{GUIDES_DIR}/api-design.md` for detailed filtering patterns

---

## Rate Limiting

**Limits**: [X requests/minute for authenticated, Y for unauthenticated]

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## Versioning

**Strategy**: [URL-based/Header-based]
**Format**: `/api/v{version}/[resource]`
**Deprecation**: [Notice period and process]

---

## API Testing

**Test Endpoint**: `https://api-test.example.com/v1`
**Documentation**: [Swagger UI URL or Postman collection]
```
