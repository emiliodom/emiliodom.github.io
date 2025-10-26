# Documentation

This directory contains detailed documentation for the emiliodom.github.io project.

## 📚 Available Documentation

### Project Documentation
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete technical documentation covering architecture, features, and implementation details

### Migration Guides
- **[WORKER_MIGRATION.md](WORKER_MIGRATION.md)** - Cloudflare Worker migration guide (from GitHub Actions token injection to proxy architecture)

### API Documentation
See the `../api/` directory for API-specific documentation:
- **[api/README.md](../api/README.md)** - API overview and usage
- **[api/PROXY_SETUP.md](../api/PROXY_SETUP.md)** - Cloudflare Worker proxy setup instructions
- **[api/SECURITY_ARCHITECTURE.md](../api/SECURITY_ARCHITECTURE.md)** - Security design and considerations

## 📖 Quick Links

### Getting Started
Start with the main [README.md](../README.md) in the root directory for:
- Project overview
- Setup instructions
- Configuration guide
- Deployment steps

### For Developers
1. Read [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for technical details
2. Review [api/SECURITY_ARCHITECTURE.md](../api/SECURITY_ARCHITECTURE.md) for security model
3. Check [api/PROXY_SETUP.md](../api/PROXY_SETUP.md) for Worker setup

### For Deploying
1. Follow [api/PROXY_SETUP.md](../api/PROXY_SETUP.md) to set up Cloudflare Worker
2. Use [WORKER_MIGRATION.md](WORKER_MIGRATION.md) if migrating from old setup
3. Reference main [README.md](../README.md) for GitHub Pages deployment

## 🗂️ Documentation Structure

```
emiliodom.github.io/
├── README.md                           # Main project documentation
├── docs/                               # Detailed documentation
│   ├── README.md                       # This file
│   ├── PROJECT_DOCUMENTATION.md        # Complete technical docs
│   └── WORKER_MIGRATION.md             # Migration guide
└── api/                                # API-specific documentation
    ├── README.md                       # API overview
    ├── PROXY_SETUP.md                  # Proxy setup guide
    └── SECURITY_ARCHITECTURE.md        # Security documentation
```

## 💡 Documentation Standards

### File Naming
- Use `UPPERCASE_WITH_UNDERSCORES.md` for major documentation
- Use descriptive names that indicate content
- Keep filenames concise but clear

### Content Structure
- Start with a clear title and overview
- Use table of contents for long documents
- Include code examples where appropriate
- Add links to related documentation

### Maintenance
- Keep documentation up to date with code changes
- Remove or archive obsolete documentation
- Use relative links for cross-references
- Include last updated date for time-sensitive content
