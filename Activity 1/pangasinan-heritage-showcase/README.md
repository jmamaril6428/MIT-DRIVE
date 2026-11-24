# Pangasinan Heritage Digital Showcase — Activity 1.1

Submission materials for **MITS02a — Advanced Web and Mobile Development**, PSU School of Advanced Studies.

## Deliverables

| Assignment item | File |
|---|---|
| Deliverable 1.1 — Framework Selection Report (PDF) | `report/framework-selection-report.pdf` |
| Deliverable 1.1 — Accessible source version | `report/framework-selection-report.html` |
| Deliverable 1.2 — Atomic Design System Manual (PDF) | `docs/atomic-design-system-manual.pdf` |
| Deliverable 1.2 — Accessible source version | `docs/atomic-design-system-manual.html` |
| Ten component previews | `docs/previews/*.png` |
| Framework-neutral component templates | `template/` |

The manuals contain a `[Enter student name and student number]` placeholder. Personalize it and check your course's authorship/AI-assistance policy before submission.

## View the component examples

Open `template/index.html` in a browser (or publish the `template/` directory to GitHub Pages). It links to all five atoms, three molecules and two organisms. Examples include an adjustable card/grid, a local demonstration search filter and an accessible mobile-menu disclosure.

### Folder structure

```text
report/
  framework-selection-report.pdf
  framework-selection-report.html
  runtime-measurements.csv
  reproduce-runtime-proxy.sh
docs/
  atomic-design-system-manual.pdf
  atomic-design-system-manual.html
  verification-notes.md
  previews/                  # rendered component PNGs
template/
  index.html
  demo.js
  styles/                    # token, base and component CSS
  previews/                  # standalone example pages
  integration/               # illustrative Nuxt 3 configuration
.github/workflows/pages.yml  # publishes template/ to GitHub Pages
```

## Upload to GitHub

1. Create a new repository in your GitHub account. Extract this ZIP and upload its contents, including `.github/`, `report/`, `docs/` and `template/`, at the repository root.
2. In GitHub, select **Settings → Pages → Build and deployment → GitHub Actions**.
3. Push or upload to the `main` branch. The included workflow publishes `template/` as a static component library. GitHub Pages availability depends on repository and account settings.
4. Wait for the Actions workflow to succeed. Open the published URL and test a direct preview page plus a refresh.
5. This workflow does **not** build or publish a Nuxt application. `template/integration/nuxt.config.ts.example` is a configuration starting point, not a full Nuxt project. Build and test the real Nuxt app separately before claiming it is deployed.

## Framework recommendation

The report provisionally recommends **Vue + Nuxt 3 static generation** for this content-first scenario and assigns Nuxt 84/100 versus Next.js 14's 81/100 in an explicitly judgement-based weighted matrix. A measured runtime-only proxy is not the same as a full framework/application benchmark. The recommendation is close and should be reconsidered if the production-build comparison or the team's existing experience favours Next.js.

## Verification and limitations

See `docs/verification-notes.md` for browser assertions executed against the component examples. The package is not a deployed or production Nuxt application; a component-level check is not a complete WCAG conformance evaluation. Image provenance and licensing cautions are recorded in the manual.

To rerun the browser checks, install `requirements-dev.txt`, run `python -m playwright install chromium`, then run `python tests/verify_components.py`.

The uploaded two-page assignment contains Activity 1.1 deliverables only. No separate final-exam questions were included in the supplied file.
