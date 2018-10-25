"use strict";

// variables
const menuButton = document.querySelector(".menu-button"),
  main = document.querySelector(".main"),
  mainMenu = document.querySelector(".main_menu"),
  html = document.querySelector("html"),
  body = document.querySelector("body"),
  buttonPrev = document.querySelector(".nav_prev"),
  buttonNext = document.querySelector(".nav_next"),
  galleryContainer = document.querySelector(".gallery_container"),
  galleryElements = document.querySelectorAll(".gallery_element"),
  worksGallery = document.querySelector(".works_gallery");

// start first animation, change style for horizontal view
window.addEventListener("DOMContentLoaded", () => {
  html.style.overflow = "hidden";
  menuButton.style.display = "inline-block";
});

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

const closeMenu = () => {
  if (mainMenu.dataset.status === "active") {
    changeBurger();
    mainMenu.classList.remove("main_menu-active");
    galleryContainer.classList.remove("main-active");
    menuButton.classList.remove("button-active");
    body.classList.remove("ovhide");
  }
};

const openMenu = () => {
  if (mainMenu.dataset.status === "closed") {
    changeBurger();
    mainMenu.classList.add("main_menu-active");
    galleryContainer.classList.add("main-active");
    menuButton.classList.add("button-active");
    body.classList.add("ovhide");
  }
};

const changeBurger = () => {
  const bars = `<i class="fas fa-bars"></i> Menu`;
  const cross = `<i class="fas fa-times"></i> Menu`;

  menuButton.innerHTML != bars
    ? (menuButton.innerHTML = bars)
    : (menuButton.innerHTML = cross);
};

buttonPrev.addEventListener("click", () => {
  swipe("left");
});
buttonNext.addEventListener("click", () => {
  swipe("right");
});

let actualPosition = 0;
const galleryItems = (galleryElements.length / 2 - 1) * -100;

const swipe = direction => {
  if (direction === "right" && actualPosition > galleryItems) {
    actualPosition -= 100;
  }
  if (direction === "left" && actualPosition < 0) {
    actualPosition += 100;
  }

  galleryContainer.style.left = `${actualPosition}%`;
};

// MODAL

[].forEach.call(galleryElements, item => {
  item.addEventListener("click", () => {
    let imageContainer = document.createElement("div");
    imageContainer = body.appendChild(imageContainer);
    imageContainer.classList.add("imageContainer");

    let image = document.createElement("img");
    image = imageContainer.appendChild(image);
    image.src = item.src;
    image.classList.add("animIMG");

    let closeBtn = document.createElement("button");
    closeBtn = imageContainer.appendChild(closeBtn);
    closeBtn.classList.add("closeBtn");
    closeBtn.innerHTML = `<i class="fas fa-times"></i>`;

    closeBtn.addEventListener("click", () => {
      body.removeChild(imageContainer);
    });
    imageContainer.addEventListener("click", e => {
      if (!image.contains(e.target)) {
        body.removeChild(imageContainer);
      }
    });
  });
});
