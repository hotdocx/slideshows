# Presentation repository

Keep each presentation self-contained under `site/<slug>/`. Different packages
may use different frameworks. The gallery links to packages; it must not make
them depend on another presentation's files or on a shared client bundle.

Deploy only finished static files in `site/`. Exclude `node_modules`, MP4s,
credentials, private manuscripts, source archives and development caches.
Preserve each package's manifest, citation data and third-party notices.

Changes to a native-presentation package require refreshing its declared hashes
and fingerprint with the canonical exporter. Verify the same package against
both standalone playback and the GetPaidX native import contract before upload.

The Node server is an optional local/workspace preview; GitHub Pages requires
no Node process. Do not repoint the existing lastrevision.pro domain or change
Emdash's repository or publication workflow as part of this repository.

Use explicit `index.html` links in the gallery. Blob-backed static artifact
hosts do not necessarily resolve a directory URL to its index file.
