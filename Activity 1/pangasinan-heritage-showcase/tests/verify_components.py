"""Component-level responsive and interaction checks using Playwright."""
from pathlib import Path
from playwright.sync_api import sync_playwright

TEMPLATE = Path(__file__).resolve().parents[1] / "template"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1240, "height": 900})

    def load(name):
        page.goto((TEMPLATE / "previews" / f"{name}.html").as_uri())

    def prop(selector, key):
        return page.locator(selector).first.evaluate(
            "(e,k)=>getComputedStyle(e)[k]", key
        )

    def width(selector, value):
        page.locator(selector).first.evaluate(
            "(e,v)=>e.style.width=v+'px'", value
        )

    load("molecule-heritage-card")
    width(".card-container", 320)
    assert prop(".heritage-card__desc", "display") == "none"
    width(".card-container", 321)
    assert prop(".heritage-card__desc", "display") != "none"
    width(".card-container", 511)
    assert prop(".heritage-card", "display") == "flex"
    width(".card-container", 512)
    assert prop(".heritage-card", "display") == "grid"
    print("PASS card compact/stacked and stacked/horizontal boundaries")

    load("molecule-search-form")
    width(".search-container", 447)
    assert prop(".search-form", "flexDirection") == "column"
    width(".search-container", 448)
    assert prop(".search-form", "flexDirection") == "row"
    page.locator("#q-small").fill("bolinao")
    page.locator("form").first.locator("button").click()
    assert page.locator("[data-site]:visible").count() == 1
    assert page.locator("#search-status").inner_text() == "1 sample site found."
    page.locator("#q-small").fill("no-such-place")
    page.locator("form").first.locator("button").click()
    assert page.locator("[data-site]:visible").count() == 0
    assert "0 sample sites" in page.locator("#search-status").inner_text()
    print("PASS search layout, match and empty state")

    load("organism-heritage-grid")
    for size, expected in [(639, 1), (640, 2), (1023, 2), (1024, 3)]:
        width(".grid-container", size)
        cols = prop(".heritage-grid", "gridTemplateColumns").split()
        assert len(cols) == expected, (size, cols)
    print("PASS grid one/two/three-column boundaries")

    load("molecule-navigation-item")
    width(".nav-item", 144)
    assert prop(".nav-item__label", "position") == "absolute"
    width(".nav-item", 145)
    assert prop(".nav-item__label", "position") != "absolute"
    width(".nav-item", 255)
    assert prop(".nav-item__desc", "display") == "none"
    width(".nav-item", 256)
    assert prop(".nav-item__desc", "display") == "block"
    print("PASS navigation label and helper boundaries")

    load("organism-header-navigation")
    page.locator("[data-menu-toggle]").click()
    assert page.locator("#mobile-menu").is_visible()
    page.locator("#mobile-menu a").first.focus()
    page.keyboard.press("Escape")
    assert page.locator("#mobile-menu").is_hidden()
    assert page.locator("[data-menu-toggle]").evaluate(
        "(e)=>e===document.activeElement"
    )
    for size, target in [(767, "flex"), (768, "none")]:
        width(".header-container", size)
        assert prop(".site-header__menu-btn", "display") == target
    print("PASS mobile menu keyboard behaviour and header boundary")

    load("atom-button")
    assert page.locator(".btn--sm").first.bounding_box()["height"] >= 44
    load("atom-image")
    assert prop(".media__frame", "aspectRatio") == "4 / 3"
    print("PASS button target size and narrow image crop")

    browser.close()
