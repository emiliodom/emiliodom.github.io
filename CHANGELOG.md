# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced SEO meta tags with Open Graph and Twitter Card support
- Comprehensive meta descriptions and keywords for all pages
- Async/defer attributes to external scripts for better performance
- Changelog file for tracking project changes

### Changed
- Improved meta tag organization and structure in HTML files
- Updated page titles for better SEO

## [2.0.0] - 2025-10-26

### Added
- ESLint configuration for JavaScript linting (.eslintrc.json)
- Prettier configuration for code formatting (.prettierrc.json, .prettierignore)
- JavaScript and CSS minification in GitHub Actions workflow
- Separated inline scripts to external file (greetings-page.js)
- NocoDB unavailability UI state with error overlay
- Data caching to avoid duplicate API fetches
- Console logging for better debugging
- Documentation folder (docs/) with organized structure
- docs/README.md for documentation navigation

### Changed
- Switched from Vercel to Cloudflare Workers for NocoDB proxy
- Updated README.md with current project architecture and features
- Improved NocoDB availability check from HEAD to GET request
- Enhanced error handling with localStorage fallback
- Reorganized project documentation into docs/ folder

### Removed
- Vercel infrastructure (api/vercel/ folder)
- deploy-vercel.sh and quick-commands.sh scripts
- badwords.json and client-side profanity checking
- nocodb-config.secure.js (encryption code)
- greetings-proxy-version.js (unused file)
- All obsolete Git branches except main and dev

### Fixed
- NocoDB availability check causing false unavailability warnings
- CORS issues with Cloudflare Worker proxy
- Duplicate code in greetings.js

## [1.0.0] - 2025-10-01

### Added
- Initial release with interactive greetings wall
- Dark/light theme support with localStorage persistence
- Multi-language support with Google Translate
- Responsive design with mobile-first approach
- Categorized link cards with custom images
- Dynamic emoji favicons using Twemoji
- Animated background with particles.js
- NocoDB integration for greetings storage
- IP-based rate limiting (24-hour window)
- Google reCAPTCHA Enterprise integration
- Masonry grid layout for photos and videos
- Font size controls (A-, A, A+)

### Security
- Client-side XSS prevention with DOMPurify
- IP privacy disclaimer
- reCAPTCHA for bot protection

---

## Legend

- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security improvements

[Unreleased]: https://github.com/emiliodom/emiliodom.github.io/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/emiliodom/emiliodom.github.io/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/emiliodom/emiliodom.github.io/releases/tag/v1.0.0
