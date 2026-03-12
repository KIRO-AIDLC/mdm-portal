# Correctness Properties Template

**Path**: `{SPECS_DIR}/{feature}/design/correctness.md`
**See**: `{SHARED_DIR}/path-resolution.md` for path details

Correctness properties and property-based testing specifications (generated only if PBT selected in D3).

**See**: `{GUIDES_DIR}/property-based-testing.md` for PBT concepts and additional examples

```markdown
# Correctness Properties

## Overview
[Brief overview of correctness properties for this system]

**PBT Framework**: [fast-check/Hypothesis/QuickCheck/etc.]

---

## Core Properties

### Property 1: [Name]

**Validates**: Requirements [US-XXX, US-YYY]

**Property**: [Clear description of the invariant]

**Example**:
```javascript
fc.assert(fc.property(
  inputGenerator,
  (input) => {
    const result = operation(input);
    return assertProperty(result);
  }
));
```

**Generators**: [How test inputs are generated]

**Edge Cases**: [Specific edge cases to handle]

---

### Property 2: [Name]

[Same structure as Property 1]

---

### Property 3: [Name]

[Same structure as Property 1]

---

## Common Property Types

**See**: `{GUIDES_DIR}/property-based-testing.md` for detailed explanations

- **Idempotency**: Operation twice = operation once
- **Inverse**: operation(inverse(x)) = x
- **Invariants**: Conditions that must always hold
- **Commutativity**: order doesn't matter

---

## Test Configuration

**Number of Tests**: [100-1000 per property]
**Timeout**: [Maximum time per test]
**Failure Handling**: Log failing input, save counterexample, shrink

**Run Command**:
```bash
npm run test:properties
```

---

## Test Organization

```
tests/properties/
├── business-logic.properties.test.js
├── data-integrity.properties.test.js
└── api-contract.properties.test.js
```

---

## References

- **Requirements**: `requirements.md` for functional requirements
- **Design**: `design.md` for system design
- **Tasks**: `tasks.md` for property test implementation tasks
- **Guide**: `{GUIDES_DIR}/property-based-testing.md` for PBT concepts
```
