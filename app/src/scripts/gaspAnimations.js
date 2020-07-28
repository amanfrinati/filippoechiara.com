import $ from 'jquery'
import gasp from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger.min'

gasp.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(DrawSVGPlugin);

$(document).ready(function () {
  // gasp.to('.swiper-container-descriptions .swiper-button', {
  //   color: 'white',
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: '.swiper-container-descriptions .h1',
  //     start: 'top center',
  //     end: '+=1px',
  //     scrub: true
  //   },
  // });

  gasp.to('.sticky-container .sticky-content .madonna-corona', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.sticky-container .section-content',
      start: 'bottom center',
      end: '+=100%',
      scrub: true
    }
  })

  gasp.to('.eremitani-img', {
    scale: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.hero-cerimonia',
      start: 'top bottom+=10%',
      end: 'bottom center',
      scrub: true
    }
  })

  gasp.to('.border-wrapper [class*="border-"]', {
    scaleX: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.hero-cerimonia',
      start: 'top bottom-=10%',
      end: 'bottom center',
      scrub: true
    }
  })

  gasp.to('.final-section-hero', {
    opacity: 0.5,
    duration: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.final-section',
      start: 'top+=10% center',
      end: 'top+=50% center',
      scrub: true
    }
  })

  gasp.to('.final-section .phrase', {
    opacity: 1,
    duration: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.final-section',
      start: 'top+=10% center',
      end: 'top+=50% center',
      scrub: true
    }
  })
})
