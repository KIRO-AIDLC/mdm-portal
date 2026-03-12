# Path Resolution

Path variables, tool detection, and file locations for all AI-DLC artifacts.

---

## Path Variables

### SPECS_DIR (Spec Artifacts)
- **Kiro IDE/CLI**: `.kiro/specs`
- **Claude Code / Cursor / Windsurf**: `.aidlc/specs`

### WORKFLOW_DIR (Workflow Files)
- **All tools**: `.aidlc/workflow`

### TEMPLATES_DIR (Templates)
- **Kiro IDE/CLI**: `.kiro/references/aidlc/templates`
- **Claude Code**: `.claude/references/aidlc/templates`
- **Cursor**: `.cursor/references/aidlc/templates`
- **Windsurf**: `.windsurf/references/aidlc/templates`

### GUIDES_DIR (Reference Guides)
- Derived from TEMPLATES_DIR: same parent + `/guides/`

### SHARED_DIR (Workflow Rules & Validation)
- Derived from TEMPLATES_DIR: same parent + `/shared/`

### STEERING_DIR (Project Context Files)
- **Kiro IDE/CLI**: `.kiro/steering` (with `inclusion: always` front-matter)
- **Claude Code**: `.claude/rules`
- **Cursor**: `.cursor/rules`
- **Windsurf**: `.windsurf/rules`

### Tool Detection
Check if `.kiro/` folder exists in workspace root:
- **Exists**: Kiro IDE/CLI
- **Not exists**: Check for `.claude/`, `.cursor/`, `.windsurf/`

---

## File Locations

### Spec Artifacts
```
{SPECS_DIR}/{feature}/
├── context.md
├── personas.md (conditional)
├── requirements.md
├── units.md (conditional)
├── team-alignment.md (conditional, incremental mode only)
├── design.md
├── design/
│   ├── components.md
│   ├── data-model.md
│   ├── api-spec.md
│   ├── integration.md
│   ├── implementation.md
│   ├── correctness.md (conditional)
│   └── nfr.md (conditional)
└── tasks.md
```

### Workflow Files
```
{WORKFLOW_DIR}/{feature}/
├── decisions-requirements.md (D1)
├── decisions-units.md (D2, conditional)
├── decisions-design.md (D3)
├── decisions-tasks.md (D4)
├── audit.md
└── .workflow-state.json
```

### Steering / Rules Files
```
{STEERING_DIR}/
├── product.md
├── tech.md
├── structure.md
└── aidlc-workflow.md
```

### Incremental Mode (Per Unit)
```
{SPECS_DIR}/{feature}-{unit}/
└── [same structure as main feature]

{WORKFLOW_DIR}/{feature}-{unit}/
└── [same structure as main feature]
```
