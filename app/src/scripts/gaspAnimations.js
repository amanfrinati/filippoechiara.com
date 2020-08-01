import $ from 'jquery'
import gasp from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger.min'

gasp.registerPlugin(ScrollTrigger)

const intro = gasp.timeline()
intro
  .to('.logo', {
    width: 0,
    duration: 1.5,
    delay: 1
    // ease: 'none'
  })
  .to('.logo-container', {
    opacity: 0,
    duration: 0.1
  })
  .to('.img-intro-container', {
    opacity: 1,
    duration: 0.1
  })
  .to('.intro-together', {
    css: {
      scaleX: 1,
      scaleY: 1
    },
    duration: 3
    // ease: 'none'
  })
// .to('.intro-together', {
//   rotateY: 90,
//   duration: 0.5
//   // ease: 'none'
// })
intro.pause()

$(document).ready(function () {
  intro.play()

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

  gasp.to('.video-bg', {
    opacity: 0.5,
    duration: 1,
    scrollTrigger: {
      trigger: '.video-text-container',
      start: 'top bottom',
      end: 'center center',
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
