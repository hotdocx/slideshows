# Slideshows

Independent, replayable presentations. Each folder under `site/` is a complete
static package with its own HTML, runtime, fonts, narration and notices. A new
presentation may use a different framework; it need not import code from another
presentation or a shared client bundle.

- [Presentation library](https://hotdocx.github.io/slideshows/)
- [Dependent Homs, Homology and Exact Sequences](https://hotdocx.github.io/slideshows/emdash-rhpl-2026/)
- [The presentation's GetPaidX post and AI workspace](https://getpaidx.com/posts/cmw6p5fgu00osmb0uayvkfaw3)

The Emdash presentation uses the canonical `native-presentation` v1 package.
GitHub Pages serves its standalone shell. GetPaidX registers the same manifest
and files, adds access control, and supplies its post player and Live Session
controls. The presentation timeline and narration remain the same.

`site/` is the deployment payload. No Node.js runtime, `node_modules`, MP4,
source manuscript archive or production credential is deployed. The optional
local/workspace server uses only Node's standard library:

```sh
npm run dev
```

To add a presentation, place its finished static package in its own `site/`
subdirectory and add a link to `site/index.html`. Preserve its own notices and
source credits. Do not add private source archives, expiring access URLs, tokens
or development caches. Deployments upload only `site/` through GitHub Actions.

Each presentation retains its own authorship and third-party license notices.

The Emdash talk's editable text, LaTeX and narration source is retained under
[`authoring/emdash-rhpl-2026/`](authoring/emdash-rhpl-2026/). It is not part of
the deployed audience payload.
