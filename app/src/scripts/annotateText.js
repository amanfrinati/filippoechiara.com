import { annotate } from 'rough-notation'
import $ from 'jquery'

const $blue = '#20244d'
let annotateSaturday10

$(document).ready(function () {
  annotateSaturday10 = annotate(document.getElementById('saturday-10'), {
    type: 'highlight',
    color: $blue,
    iterations: 1
  })
})

$(window).scroll(() => {
  if ($('.celebration').visible(true)) {
    annotateSaturday10.show()
  }
})
