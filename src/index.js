import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");

import gasp from "gsap"; // Also works with TweenLite and TimelineLite
import ScrollTrigger from "gsap/dist/ScrollTrigger.min"
import "bootstrap";
import "popper.js";
// import "./scripts/skewed";
// import "./scripts/slider";
import "./scripts/countdown";
import Swiper from 'swiper';
import Rellax from "rellax";

$(document).ready(function() {
  new Swiper('.swiper-container-descriptions', {
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

  // new Rellax(".rellax", {
  //   center: true
  // });

  gasp.registerPlugin(ScrollTrigger);
  gasp.to('.eremitani-img',
  {
    scale: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.hero-cerimonia',
      start: 'top center',
      end: "bottom center",
      scrub: true
    },
  });

  gasp.to('.border-wrapper [class*="border-"]',
  {
    scaleX: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.hero-cerimonia',
      start: 'top center',
      end: "bottom center",
      scrub: true
    },
  });

  gasp.to('.final-section .bg',
  {
    opacity: 0.5,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: '.final-section',
      start: 'top+=20% center',
      end: "center center",
      scrub: true
    },
  });

  gasp.to('.final-section .phrase',
  {
    opacity: 1,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: '.final-section',
      start: 'top+=20% center',
      end: "center center",
      scrub: true
    },
  });
});

$(window).scroll(function(event) {
  if ($('.quotes p').visible(true)) {
    $('.quotes p').addClass("fade-in");
  }
});
