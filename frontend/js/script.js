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
  home: await extractTemplate("home"),
};

const config = { childList: true };
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (
      mutation.type === "childList" &&
      mutation.target.querySelector('[data-page="contact"]')
    ) {
      const contactForm = mutation.target
        .querySelector('[data-page="contact"]')
        .querySelector("form.contact-form");
      const contactInputs = contactForm.querySelectorAll("input, textarea");
      const submitBtn = contactForm.querySelector("button");
      for (const contactInput of contactInputs) {
        contactInput.addEventListener("input", checkIfEmpty);
      }

      submitBtn.addEventListener("click", (e) => {
        for (const contactInput of contactInputs) {
          if (
            contactInput.validity.valueMissing ||
            (contactInput.value == "" && contactInput.id != "phone")
          ) {
            // console.log(contactInput.validity);
            contactInput.nextElementSibling.classList.remove("hide");
            // console.log(contactInput);
          } else if (contactInput.validity.patternMismatch) {
            contactInput.reportValidity();
          }
        }
        // console.log(contactForm.checkValidity());
        if (contactForm.checkValidity()) {
          for (const contactInput of contactInputs) {
            contactInput.value = "";
          }
          //   alert("Message sent!");
        }
      });
    }
  }
};

function checkIfEmpty(e) {
  const input = e.target;
  if (input.nextElementSibling) {
    input.nextElementSibling.classList.toggle("hide", input.value != "");
  }
}
const observer = new MutationObserver(callback);
observer.observe(main, config);

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
    // console.log(templates[goToBtn.dataset.goTo]);
    const clone = templates[goToBtn.dataset.goTo].content.cloneNode(true);
    main.replaceChildren(clone);
  } else if (popoverBtn) {
    popover.togglePopover();
  }
});
