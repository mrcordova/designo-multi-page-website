const parser = new DOMParser();
const body = document.querySelector("body");
const main = document.querySelector("main");
const popover = document.querySelector("#mobile-popover-menu");
const templates = {
  "web-design": await extractTemplate("web-design"),
  "app-design": await extractTemplate("app-design"),
  "graphic-design": await extractTemplate("graphic-design"),
  about: await extractTemplate("about"),
  locations: await extractTemplate("locations"),
  contact: await extractTemplate("contact"),
};

async function extractTemplate(id) {
  return parser
    .parseFromString(await (await fetch(`./${id}.html`)).text(), "text/html")
    .querySelector(`#${id}-template`);
}

body.addEventListener("click", (e) => {
  e.preventDefault();
  const goToBtn = e.target.closest("[data-go-to]");
  const popoverBtn = e.target.closest("[popovertarget]");

  if (goToBtn) {
    console.log(templates[goToBtn.dataset.goTo]);
    const clone = templates[goToBtn.dataset.goTo].content.cloneNode(true);
    main.replaceChildren(clone);
  } else if (popoverBtn) {
    popover.togglePopover();
  }
});
