import $ from "jquery"
import gasp from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger.min"

gasp.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(DrawSVGPlugin);

$(document).ready(function() {
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