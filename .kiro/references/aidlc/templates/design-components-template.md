# Components Template

**Path**: `{SPECS_DIR}/{feature}/design/components.md`
**See**: `{GUIDES_DIR}/frontend-architecture.md` for web frontend, `{GUIDES_DIR}/mobile-architecture.md` for mobile, `{GUIDES_DIR}/architecture-patterns.md` for backend

Detailed component breakdown including responsibilities, interfaces, and interactions.

```markdown
# Components

## Component Overview

[Brief overview of the component architecture and how components interact]

**Architecture**: [Component-Based/Feature-Based/Layered/etc.]

**See**: `{GUIDES_DIR}/frontend-architecture.md` for web patterns, `{GUIDES_DIR}/mobile-architecture.md` for mobile patterns, `{GUIDES_DIR}/architecture-patterns.md` for backend patterns

---

## Frontend Components (if applicable)

### UI Component 1: [Name]

**Type**: [Page/Container/Presentational/Shared]

**Purpose**: [What this UI component does]

**Responsibilities**:
- [Responsibility #1 - e.g., "Display product list"]
- [Responsibility #2 - e.g., "Handle user interactions"]
- [Responsibility #3 - e.g., "Manage local UI state"]

**Technology**:
- **Framework**: [React/Vue/Angular]
- **Styling**: [CSS Modules/Styled Components/Tailwind]
- **Key Libraries**: [List dependencies]

**Props/Inputs**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | Array | Yes | [Description] |
| onAction | Function | Yes | [Description] |

**State**:
- [Local state 1]: [Purpose]
- [Local state 2]: [Purpose]

**Events Emitted**:
- `[event-name]` - [When triggered]

**Consumes**:
- API: `[endpoint]` - [What data]
- Store: `[state slice]` - [What data]

---

## Mobile Components (if applicable)

### Mobile Screen/Widget 1: [Name]

**Type**: [Screen/Widget/Component]

**Purpose**: [What this mobile component does]

**Responsibilities**:
- [Responsibility #1 - e.g., "Display product details"]
- [Responsibility #2 - e.g., "Handle user gestures"]
- [Responsibility #3 - e.g., "Manage navigation"]

**Technology**:
- **Framework**: [React Native/Flutter/Native]
- **Platform**: [iOS/Android/Both]
- **Key Libraries**: [List dependencies]

**Props/Parameters**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| productId | String | Yes | [Description] |
| onPurchase | Function | Yes | [Description] |

**State**:
- [Local state 1]: [Purpose]
- [Navigation state]: [Purpose]

**Navigation**:
- Navigates to: `[ScreenName]` - [When]
- Receives params: `[param]` - [From where]

**Platform-Specific**:
- iOS: [iOS-specific considerations]
- Android: [Android-specific considerations]

---

## Backend Components (if applicable)

### Component 1: [Name]

### Purpose
[What this component does and why it exists]

### Responsibilities
- [Responsibility #1]
- [Responsibility #2]
- [Responsibility #3]

### Technology Stack
- **Language**: [Programming language]
- **Framework**: [Framework/library]
- **Key Dependencies**: [Major libraries with versions]

### Interfaces

#### Exposes
[APIs, events, or data this component provides]

**Public API:**
- `[method/endpoint]` - [Description]
- `[method/endpoint]` - [Description]

**Events Published:**
- `[event-name]` - [When triggered, payload structure]

#### Consumes
[APIs, events, or data this component uses]

**Dependencies:**
- `[Component/Service]` - [What it uses]
- `[Component/Service]` - [What it uses]

**Events Subscribed:**
- `[event-name]` - [How it handles]

### Internal Structure

**Modules/Classes:**
```
component-name/
  ├── controllers/     # [Purpose]
  ├── services/        # [Purpose]
  ├── models/          # [Purpose]
  ├── utils/           # [Purpose]
  └── tests/           # [Purpose]
```

### Key Design Decisions
1. **[Decision #1]**: [Rationale]
2. **[Decision #2]**: [Rationale]
3. **[Decision #3]**: [Rationale]

### Error Handling
[How this component handles errors]

### Testing Strategy
- **Unit Tests**: [What to test]
- **Integration Tests**: [What to test]

---

## Component 2: [Name]

[Same structure as Component 1]

---

## Component Interactions

### Interaction Diagram
```
[ASCII diagram showing how components interact]

┌──────────────┐         ┌──────────────┐
│ Component 1  │────────>│ Component 2  │
└──────────────┘         └──────────────┘
       │                        │
       │                        │
       v                        v
┌──────────────┐         ┌──────────────┐
│ Component 3  │<────────│ Component 4  │
└──────────────┘         └──────────────┘
```

### Interaction Patterns
1. **[Pattern 1]**: [Description of how components interact]
2. **[Pattern 2]**: [Description of how components interact]

### Data Flow
[Describe how data flows through the components]

---

## Shared Components

### Shared Component 1: [Name]
**Purpose**: [What this shared component provides]

**Used By**: [List of components that use it]

**Interface**: [Key methods/functions]

---

## Component Lifecycle

### Initialization
[How components are initialized and in what order]

### Shutdown
[How components are gracefully shut down]

---

## Performance Considerations

### Component 1
- [Performance consideration]
- [Optimization strategy]

### Component 2
- [Performance consideration]
- [Optimization strategy]

---

## Security Considerations

### Component 1
- [Security measure]
- [Access control]

### Component 2
- [Security measure]
- [Access control]
```
