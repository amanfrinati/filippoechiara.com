import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");

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

$(window).scroll(function(event) {
  if ($('.quotes p').visible(true)) {
    $('.quotes p').addClass("fade-in");
  }
});
