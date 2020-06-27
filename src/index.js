import "./styles/style.scss";

import $ from "jquery";
import "bootstrap";
import "popper.js";
// import "./scripts/skewed";
// import "./scripts/slider";

import Swiper from 'swiper';

$(document).ready(function() {
  new Swiper('.swiper-container-descriptions', {
    initialSlide: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });

  new Swiper('.swiper-scroll-container', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: true,
  })
});
