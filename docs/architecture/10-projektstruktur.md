# 10. Projektstruktur

```
simpleinv/
├── src/
│   ├── main/                  # Electron Main Process
│   │   ├── index.ts
│   │   ├── window.ts
│   │   ├── database/
│   │   │   ├── index.ts
│   │   │   ├── schema.ts
│   │   │   └── repositories/
│   │   ├── ipc/
│   │   │   ├── index.ts
│   │   │   └── handlers/
│   │   └── services/
│   │
│   ├── renderer/              # React Frontend
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── articles/
│   │   │   ├── categories/
│   │   │   ├── dashboard/
│   │   │   ├── settings/
│   │   │   └── layout/
│   │   ├── stores/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── preload/               # Preload Scripts
│   │   └── index.ts
│   │
│   └── shared/                # Gemeinsame Typen
│       ├── types/
│       │   ├── article.ts
│       │   ├── category.ts
│       │   └── settings.ts
│       ├── ipc/
│       │   ├── channels.ts
│       │   ├── types.ts
│       │   └── window.d.ts
│       └── utils/
│           └── calculations.ts
│
├── resources/                 # App-Icons
├── docs/                      # Dokumentation
│   ├── prd.md
│   └── architecture.md
├── forge.config.ts            # Electron Forge Config
├── vite.main.config.ts
├── vite.renderer.config.ts
├── vite.preload.config.ts
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

---
