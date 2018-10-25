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

let current = 0; // current section

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
  html.style.overflow = "hidden";
  menuButton.style.display = "inline-block";
  console.log("Button");
  [].forEach.call(content, section => {
    section.style.position = "absolute";
  });
});

// animate current section's title and side text links
const animateCurrentText = current => {
  [].forEach.call(mainText, text => {
    text.classList.remove("main-title-animation");
  });
  [].forEach.call(sideTitleLeft, text => {
    text.classList.remove("left-title-animation");
  });
  [].forEach.call(sideTitleRight, text => {
    text.classList.remove("right-title-animation");
  });
  mainText[current].classList.add("main-title-animation");
  sideTitleLeft[current].classList.add("left-title-animation");
  sideTitleRight[current].classList.add("right-title-animation");
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
    body.classList.remove("ovhide");
  }
};

// show menu
const openMenu = () => {
  if (mainMenu.dataset.status === "closed") {
    changeBurger();
    mainMenu.classList.add("main_menu-active");
    main.classList.add("main-active");
    menuButton.classList.add("button-active");
    body.classList.add("ovhide");
  }
};

// change menu icon
const changeBurger = () => {
  const bars = `<i class="fas fa-bars"></i> Menu`;
  const cross = `<i class="fas fa-times"></i> Menu`;

  menuButton.innerHTML != bars
    ? (menuButton.innerHTML = bars)
    : (menuButton.innerHTML = cross);
};

// place sections next to each other in row
if (html.clientWidth > 620) {
  [].forEach.call(content, (el, i) => {
    el.style.left = i * 100 + "%";
  });
}

// display selected section
const swipeSection = current => {
  if (html.clientWidth > 620) {
    [].forEach.call(content, el => {
      el.style.marginLeft = -current * 100 + "%";
    });
  }
  // if (html.clientWidth < 620) {
  //   [].forEach.call(content, el => {
  //     el.style.marginTop = -current * 100 + "%";
  //   });
  // }
};

// side menu links
[].forEach.call(mainLinks, (link, current) => {
  link.addEventListener("click", e => {
    if (html.clientWidth > 620) {
      e.preventDefault();
    }
    swipe(current);
    menuTrigger();
    changeBurger();
  });
});

const swipe = direction => {
  if (direction === "left") {
    current <= 0 ? 0 : current--; // swipe left
  } else if (direction === "right") {
    current >= sections.length - 1 ? sections.length - 1 : current++;
  } else {
    current = direction;
  }
  swipeSection(current); // trigger swipe
  animateCurrentText(current); // trigger text animation
  closeMenu(); // hide menu if opened
};
