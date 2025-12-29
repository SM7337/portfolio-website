const loadTime = 1000;

const loadingScreen = document.querySelector("#boot");
const bootlogo = document.querySelector("#bootlogo");
const bglogo = document.querySelector("#bglogo");

// Taskbar Buttons and App Manager
const aboutApp = document.querySelector("#about_page");
const projectsApp = document.querySelector("#projects_page");
const contactApp = document.querySelector("#contact_page");

const aboutButton = document.querySelector("#about");
const projectsButton = document.querySelector("#projects");
const contactButton = document.querySelector("#contact");

const rebootButton = document.querySelector("#reboot");
const closeButtons = document.querySelectorAll(".close_window");

const timeText = document.querySelector("#time");
const loadAnimation = document.querySelector("#load");

function openApp(appToOpen, appsToClose, buttonPerApp) {
  for (let i = 0; i < appsToClose.length; i++) {
    closeWithAnimation(appsToClose[i], buttonPerApp[i]);
  }

  appToOpen.style.display = "block";
  appToOpen.style.visibility = "visible";

  requestAnimationFrame(() => {
    appToOpen.classList.add("on");
  });
}

function closeWithAnimation(app, btn) {
  if (!app.classList.contains("on")) return;

  const btnRect = btn.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();

  const x =
    btnRect.left + btnRect.width / 2 - (appRect.left + appRect.width / 2);

  app.style.setProperty("--from-x", `${x}px`);

  app.classList.remove("on");

  app.addEventListener(
    "transitionend",
    () => {
      app.style.display = "none";
      app.style.visibility = "hidden";
    },
    { once: true }
  );
}

function reboot() {
  loadingScreen.style.display = "block";
  bootlogo.style.display = "grid";
  bootlogo.style.opacity = 0;
  bglogo.style.display = "none";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loadingScreen.style.opacity = 1;
      loadAnimation.style.opacity = 1;
      bootlogo.style.opacity = 1;
    });
  });

  setTimeout(rebootFade, loadTime);
}

function rebootFade() {
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function updateClock() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  timeText.innerText = `${h}:${m}:${s}`;
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

loadingScreen.style.opacity = 1;
bootlogo.style.display = "grid";
bglogo.style.display = "none";

function startPage() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loadingScreen.style.opacity = 0;
      loadAnimation.style.opacity = 0;
    });
  });

  setTimeout(() => {
    loadingScreen.style.display = "none";
    bootlogo.style.display = "none";
    bglogo.style.display = "grid";
  }, 1000);

  let currentApp = null;
  let currentBtn = null;

  aboutButton.addEventListener("click", () => {
    if (aboutApp.classList.contains("on")) {
      closeWithAnimation(aboutApp, aboutButton);
      currentApp = null;
      currentBtn = null;
    } else {
      openApp(
        aboutApp,
        [projectsApp, contactApp],
        [projectsButton, contactButton]
      );
      currentApp = aboutApp;
      currentBtn = aboutButton;
    }
  });

  projectsButton.addEventListener("click", () => {
    if (projectsApp.classList.contains("on")) {
      closeWithAnimation(projectsApp, projectsButton);
      currentApp = null;
      currentBtn = null;
    } else {
      openApp(
        projectsApp,
        [aboutApp, contactApp],
        [aboutButton, contactButton]
      );
      currentApp = projectsApp;
      currentBtn = projectsButton;
    }
  });

  contactButton.addEventListener("click", () => {
    if (contactApp.classList.contains("on")) {
      closeWithAnimation(contactApp, contactButton);
      currentApp = null;
      currentBtn = null;
    } else {
      openApp(
        contactApp,
        [aboutApp, projectsApp],
        [aboutButton, projectsButton]
      );
      currentApp = contactApp;
      currentBtn = contactButton;
    }
  });

  rebootButton.addEventListener("click", reboot);

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentApp && currentBtn) {
        closeWithAnimation(currentApp, currentBtn);
        currentApp = null;
        currentBtn = null;
      }
    });
  });

  updateClock();
  setInterval(updateClock, 1000);
}

setTimeout(startPage, loadTime);
