import "./styles/style.scss";

import $ from "jquery";
import "bootstrap";
import "popper.js";
// import "./scripts/skewed";
// import "./scripts/slider";

import Swiper from 'swiper';

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
  })
});
