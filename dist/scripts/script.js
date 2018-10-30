"use strict";

// variables
const fLinkPrev = document.querySelector(".link-prev"), // footer link "prev"
  fLinkNext = document.querySelector(".link-next"), // title link "next"
  tLinkPrev = document.querySelectorAll(".title-link-prev"), // title link "prev"
  tLinkNext = document.querySelectorAll(".title-link-next"), // footer link "next"
  linkHome = document.querySelector(".link-home"), // logo link to "home"
  sections = document.querySelectorAll("section"), // all sections
  mainText = document.querySelectorAll(".main_title"), // all main text's
  sideTitleLeft = document.querySelectorAll(".side_title-left"),
  sideTitleRight = document.querySelectorAll(".side_title-right"),
  content = document.querySelectorAll(".content"),
  container = document.querySelector(".container"),
  menuButton = document.querySelector(".menu-button"),
  main = document.querySelector(".main"),
  mainMenu = document.querySelector(".main_menu"),
  mainLinks = document.querySelectorAll(".main_link"),
  html = document.querySelector("html"),
  body = document.querySelector("body");

let sectionOnScreen = 0; // current section

// home link
linkHome.addEventListener("click", () => {
  swipe(0);
});

// handle clicking "prev" link in footer
fLinkPrev.addEventListener("click", () => {
  swipe("left");
});

// handle clicking "next" link in footer
fLinkNext.addEventListener("click", () => {
  swipe("right");
});

// handle clicking title link - go to previous section
[].forEach.call(tLinkPrev, link => {
  link.addEventListener("click", () => {
    swipe("left");
  });
});

// handle clicking title link - go to previous section
[].forEach.call(tLinkNext, link => {
  link.addEventListener("click", () => {
    swipe("right");
  });
});

// start first animation, change style for horizontal view
window.addEventListener("DOMContentLoaded", () => {
  animateCurrentText(0); // trigger first text animation
  if (html.clientWidth > 620) {
    html.style.overflow = "hidden";
    [].forEach.call(content, (section, i) => {
      section.style.left = i * 100 + "%";
      section.style.position = "absolute";
    });
  }
  menuButton.style.display = "inline-block";
  // place sections next to each other in row
});

// animate current section's title and side text links
const animateCurrentText = sectionOnScreen => {
  [].forEach.call(mainText, text => {
    text.classList.remove("main-title-animation");
  });
  [].forEach.call(sideTitleLeft, text => {
    text.classList.remove("left-title-animation");
  });
  [].forEach.call(sideTitleRight, text => {
    text.classList.remove("right-title-animation");
  });
  mainText[sectionOnScreen].classList.add("main-title-animation");
  sideTitleLeft[sectionOnScreen].classList.add("left-title-animation");
  sideTitleRight[sectionOnScreen].classList.add("right-title-animation");
};

// open / hide menu
menuButton.addEventListener("click", () => {
  menuTrigger();
});

// open close menu
const menuTrigger = () => {
  if (mainMenu.dataset.status === "closed") {
    openMenu();
    mainMenu.dataset.status = "active";
  } else {
    closeMenu();
    mainMenu.dataset.status = "closed";
  }
};

// hide menu
const closeMenu = () => {
  if (mainMenu.dataset.status === "active") {
    changeBurger();
    mainMenu.classList.remove("main_menu-active");
    main.classList.remove("main-active");
    menuButton.classList.remove("button-active");
    mainMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    if (html.clientWidth > 620) {
      body.classList.remove("ovhide");
    }
  }
};

// show menu
const openMenu = () => {
  if (mainMenu.dataset.status === "closed") {
    changeBurger();
    mainMenu.classList.add("main_menu-active");
    main.classList.add("main-active");
    menuButton.classList.add("button-active");
    mainMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    if (html.clientWidth > 620) {
      body.classList.add("ovhide");
    }
  }
};

// change menu icon
const changeBurger = () => {
  const bars = `<i class="fas fa-bars"></i> <span class="menu-text">Menu</span>`;
  const cross = `<i class="fas fa-times"></i> <span class="menu-text">Menu</span>`;

  if (menuButton.dataset.status == "active") {
    menuButton.innerHTML = cross;
    menuButton.dataset.status = "closed";
  } else {
    menuButton.innerHTML = bars;
    menuButton.dataset.status = "active";
  }
};

// display selected section
const swipeSection = sectionOnScreen => {
  if (html.clientWidth > 620) {
    [].forEach.call(content, el => {
      el.style.marginLeft = -sectionOnScreen * 100 + "%";
    });
  }
  // if (html.clientWidth < 620) {
  //   [].forEach.call(content, el => {
  //     el.style.marginTop = -current * 100 + "%";
  //   });
  // }
};

// side menu links
[].forEach.call(mainLinks, (link, sectionOnScreen) => {
  link.addEventListener("click", e => {
    if (html.clientWidth > 620) {
      e.preventDefault();
    }
    swipe(sectionOnScreen);
    menuTrigger();
    changeBurger();
  });
});

const swipe = direction => {
  if (direction === "left") {
    sectionOnScreen <= 0 ? 0 : sectionOnScreen--; // swipe left
  } else if (direction === "right") {
    sectionOnScreen >= sections.length - 1
      ? sections.length - 1
      : sectionOnScreen++;
  } else {
    sectionOnScreen = direction;
  }
  swipeSection(sectionOnScreen); // trigger swipe
  animateCurrentText(sectionOnScreen); // trigger text animation
  closeMenu(); // hide menu if opened
};
