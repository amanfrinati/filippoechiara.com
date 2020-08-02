import $ from 'jquery'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger.min'
import ExpoScaleEase from 'gsap/EasePack'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ExpoScaleEase)

const introAnimation = gsap.timeline()
introAnimation
  // .to('.swiper-container.swiper-container-descriptions', {
  //   opacity: 1,
  //   duration: 0.5
  // })
  .to('.img-intro-container', {
    opacity: 1,
    duration: 0.2
  })
  .fromTo(
    '.intro-together',
    { scale: 50 },
    { scale: 1, duration: 6, ease: 'expoScale(50, 1)' }
  )
  .to('.img-intro-container', {
    rotateY: 90,
    duration: 1.5,
    delay: 0.5
  })
  .to('.description-img.description-together', {
    opacity: 1,
    rotateY: 0,
    duration: 1.5
  })
  .to('.swiper-container-descriptions .swiper-button, .swiper-pagination', {
    opacity: 1,
    duration: 0.4
  })
introAnimation.pause()

$(window).scroll(() => {
  if ($('.swiper-container.swiper-container-descriptions').visible(true)) {
    introAnimation.play()
  }
})

gsap.to('.logo-stick-content', {
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.logo-landing .logo-stick-container',
    start: 'top top',
    end: 'bottom center',
    scrub: true
  }
})

gsap.to('.sticky-container .sticky-content .madonna-corona', {
  opacity: 1,
  duration: 1,
  scrollTrigger: {
    trigger: '.sticky-container .section-content',
    start: 'bottom center',
    end: '+=100%',
    scrub: true
  }
})

gsap.to('.eremitani-img', {
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

gsap.to('.border-wrapper [class*="border-"]', {
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

gsap.to('.video-bg', {
  opacity: 0.5,
  duration: 1,
  scrollTrigger: {
    trigger: '.video-text-container',
    start: 'top bottom',
    end: 'center center',
    scrub: true
  }
})

gsap.to('.final-section-hero', {
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

gsap.to('.final-section .phrase', {
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
