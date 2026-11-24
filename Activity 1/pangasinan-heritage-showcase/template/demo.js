/* Progressive enhancements for the educational component examples. */
"use strict";
document.querySelectorAll("[data-menu-toggle]").forEach(button => {
  const menu = document.getElementById(button.getAttribute("aria-controls"));
  if (!menu) return;
  const setOpen = open => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.hidden = !open;
  };
  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("keydown", event => {
    if (event.key === "Escape") { setOpen(false); button.focus(); }
  });
});
document.querySelectorAll("[data-demo-search]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const values = new FormData(form);
    const query = String(values.get("q") || "").trim().toLocaleLowerCase();
    const category = String(values.get("category") || "");
    let count = 0;
    document.querySelectorAll("[data-site]").forEach(item => {
      const match = item.dataset.site.includes(query) &&
        (!category || item.dataset.category === category);
      item.hidden = !match;
      if (match) count++;
    });
    document.getElementById("search-status").textContent =
      `${count} sample site${count === 1 ? "" : "s"} found.`;
  });
});
const slider = document.getElementById("grid-width");
if (slider) slider.addEventListener("input", () => {
  document.getElementById("demo-grid").style.setProperty("--demo-width", `${slider.value}px`);
  document.getElementById("grid-width-value").textContent = slider.value;
});
