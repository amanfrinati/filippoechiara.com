import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");

import "bootstrap";
import "popper.js";
// import "./scripts/skewed";
// import "./scripts/slider";
import "./scripts/countdown";
import "./scripts/gaspAnimations";
import "./scripts/weddingList";
import Swiper from 'swiper';
import Rellax from "rellax";
import Typewriter from 'typewriter-effect/dist/core';

$(document).ready(function() {
  new Swiper('.swiper-container.swiper-container-descriptions', {
    initialSlide: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination'
    },
  });

  new Swiper('.swiper-scroll', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: true,
  });

  new Swiper('.swiper-container.party', {
    slidesPerView: 1,
    loop: true,
    dynamicBullets: true,
    autoHeight: true,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-container.party .swiper-pagination',
      clickable: true,
    },
  });

  // new Rellax(".rellax", {
  //   center: true
  // });
});

$(window).scroll(function(event) {
  if ($('.quotes p').visible(true)) {
    $('.quotes p').addClass("fade-in");
  }
});

let saveTheDateTyped = false;
$(window).scroll(function(event) {
  if ($('#save-the-date').visible(true) && !saveTheDateTyped) {
    saveTheDateTyped = true;

    const typewriter = new Typewriter(document.getElementById('save-the-date'), {
      loop: false,
      delay: 60
    });

    typewriter
      .typeString('Sabato <strong>10</strong><br>')
      .pauseFor(400)
      .typeString('Ottobre <strong>2020</strong><br>')
      .pauseFor(400)
      .typeString('ore <strong>11.00</strong>')
      .start();
  }
});
