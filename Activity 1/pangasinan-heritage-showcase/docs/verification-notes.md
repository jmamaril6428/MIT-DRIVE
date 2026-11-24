# Verification notes

## Executed

Rendered all ten component preview pages in headless Chromium and captured screenshots at 1240×900 CSS pixels with device scale factor 2. Screenshots are in `docs/previews/`.

The local Playwright assertions verified:

- Heritage card description switches off at 320px and back on at 321px; orientation changes between 511px and 512px.
- Search form changes from stacked at 447px to inline at 448px.
- Search example returns one matching Bolinao entry and announces an empty result for an unmatched phrase.
- Grid changes from one to two columns at 640px and two to three columns at 1024px.
- Navigation item changes at 144px/145px and 255px/256px.
- Mobile header disclosure opens; Escape closes it and returns keyboard focus to the trigger.
- Header mobile button is displayed at 767px and hidden at 768px.
- Small button has a minimum 44px height; image crop at narrow width is 4:3.

## Not claimed / still required before a live tourism launch

- No production Nuxt app has been created, built, deployed or performance-profiled.
- No full-site Lighthouse run, automated axe scan, physical device, manual screen-reader test or instructor review has been performed.
- The WCAG contrast calculations test the specific documented color pairs only; they do not establish conformance for all content and interactions.
- Preview photographs are third-party examples. Permission and production usage rights have not been established for every image. Replace or clear rights before public use.
- Tourism fees, hours, booking, current safety guidance, ratings and accessibility facilities have intentionally not been invented.

## Reproduce the checks (maintainer)

Python Playwright and Chromium are required. Install the development dependency with `python -m pip install -r requirements-dev.txt`, install Chromium with `python -m playwright install chromium`, then run `python tests/verify_components.py`. These are component-level assertions, not a full accessibility audit.
