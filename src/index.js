import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");

import "bootstrap";
import "popper.js";
import Swiper from 'swiper';

// import "./scripts/skewed";
// import "./scripts/slider";
import "./scripts/countdown";
import "./scripts/gaspAnimations";
import "./scripts/imageComparison";
import "./scripts/videoBackground";

/**
 * Stimulus
 */
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start()
const context = require.context("./scripts/controllers", true, /\.js$/)
application.load(definitionsFromContext(context));

$(document).ready(function() {
  new Swiper('.swiper-container.swiper-container-descriptions', {
    initialSlide: 1,
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
});
