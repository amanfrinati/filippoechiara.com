import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");
require("jquery.countdown");

import "bootstrap";
import "popper.js";
// import "./scripts/skewed";
// import "./scripts/slider";
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

  new Rellax(".rellax");

  $('#countdown').countDown('2020/10/10', function(event) {
    $(this).html(event.strftime(''
      + '<span>%w</span> weeks '
      + '<span>%d</span> days '
      + '<span>%H</span> hr '
      + '<span>%M</span> min '
      + '<span>%S</span> sec'));
  });
});

$(window).scroll(function(event) {
  if ($('.quotes p').visible(true)) {
    $('.quotes p').addClass("fade-in");
  }
});
