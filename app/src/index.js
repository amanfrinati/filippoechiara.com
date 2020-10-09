import './styles/style.scss'

window.jQuery = require('jquery')
window.$ = window.jQuery
require('jquery-visible')

import 'bootstrap'
import 'popper.js'
import Swiper from 'swiper'

// import './scripts/annotateText'
import './scripts/countdown'
import './scripts/gaspAnimations'
import './scripts/imageComparison'
import RSVPForm from './scripts/components/RSVPForm.jsx'
import './scripts/videoBackground'

/**
 * Stimulus
 */
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

const application = Application.start()
const context = require.context('./scripts/controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

$(document).ready(function () {
  new Swiper('.swiper-container.swiper-container-descriptions', {
    initialSlide: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    }
  })
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
