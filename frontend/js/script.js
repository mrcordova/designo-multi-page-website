const parser = new DOMParser();
const main = document.querySelector("main");
const templates = {
  "web-design": await extractTemplate("web-design"),
  "app-design": await extractTemplate("app-design"),
  "graphic-design": await extractTemplate("graphic-design"),
};

async function extractTemplate(id) {
  return parser
    .parseFromString(await (await fetch(`./${id}.html`)).text(), "text/html")
    .querySelector(`#${id}-template`);
}

main.addEventListener("click", (e) => {
  e.preventDefault();
  const goToBtn = e.target.closest("[data-go-to]");
  console.log(e.target);

  if (goToBtn) {
    console.log(templates[goToBtn.dataset.goTo]);
    const clone = templates[goToBtn.dataset.goTo].content.cloneNode(true);
    main.replaceChildren(clone);
  }
});
