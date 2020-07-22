import "./styles/style.scss";

window.jQuery = require('jquery');
window.$ = window.jQuery;
require("jquery-visible");

import "bootstrap";
import "popper.js";
import "video.js/dist/video.min";
import Swiper from 'swiper';
import Typewriter from 'typewriter-effect/dist/core';

// import "./scripts/skewed";
// import "./scripts/slider";
import "./scripts/countdown";
import "./scripts/gaspAnimations";
import "./scripts/imageComparison";
import "./scripts/videoBackground";
import "./scripts/weddingList";

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

// $(window).scroll(function(event) {
//   if ($('.quotes p').visible(true)) {
//     $('.quotes p').addClass("fade-in");
//   }
// });

let saveTheDateTyped = false;
$(window).scroll(function(event) {
  if ($('#save-the-date').visible(true) && !saveTheDateTyped) {
    saveTheDateTyped = true;

    const typewriter = new Typewriter(document.getElementById('save-the-date'), {
      loop: false,
      delay: 60
    });

    typewriter
      .typeString('Annunciano con gioia il loro matrimonio')
      // .pauseFor(400)
      // .typeString('Sabato <strong>10</strong><br>')
      // .pauseFor(400)
      // .typeString('Ottobre <strong>2020</strong><br>')
      // .pauseFor(300)
      // .typeString('ore <strong>11.00</strong><br>')
      // .pauseFor(400)
      // .typeString('Chiesa dei Santi Filippo e Giacomo<br>')
      // .pauseFor(200)
      // .typeString('piazza Eremitani 9, Padova')
      .start();
  }
});
