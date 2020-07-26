import $ from "jquery";
import 'slick-carousel/slick/slick';
import {TweenMax, Sine, Quad} from "gsap";

$(document).ready(function() {

  const $slider = $(".slider");

  const $slickTrack = $(".slick-track");
  const $slickCurrent = $(".slick-current");
  const $slickActive = $(".slick-active");

  const slideDuration = 900;

  //RESET ANIMATIONS
  // On init slide change
  $slider.on("init", function (slick) {
    TweenMax.to($slickTrack, 0.9, {
      marginLeft: 0,
    });
    TweenMax.to($slickActive, 0.9, {
      x: 0,
      zIndex: 2,
    });
  });
  // On before slide change
  $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    TweenMax.to($slickTrack, 0.9, {
      marginLeft: 0,
    });
    TweenMax.to($slickActive, 0.9, {
      x: 0,
    });
  });

  // On after slide change
  $slider.on("afterChange", function (event, slick, currentSlide) {
    TweenMax.to($slickTrack, 0.9, {
      marginLeft: 0,
    });
    $(".slick-slide").css("z-index", "1");
    TweenMax.to($slickActive, 0.9, {
      x: 0,
      zIndex: 2,
    });
  });

  //SLICK INIT
  $slider.slick({
    initialSlide: 1,
    speed: slideDuration,
    dots: true,
    waitForAnimate: true,
    useTransform: true,
    cssEase: "cubic-bezier(0.455, 0.030, 0.130, 1.000)",
    infinite: false
  });

  //PREV
  $(".slick-prev").on("mouseenter", function () {
    TweenMax.to($slickTrack, 0.6, {
      marginLeft: "180px",
      ease: Quad.easeOut,
    });
    TweenMax.to($slickCurrent, 0.6, {
      x: -100,
      ease: Quad.easeOut,
    });
  });

  $(".slick-prev").on("mouseleave", function () {
    TweenMax.to($slickTrack, 0.4, {
      marginLeft: 0,
      ease: Sine.easeInOut,
    });
    TweenMax.to($slickCurrent, 0.4, {
      x: 0,
      ease: Sine.easeInOut,
    });
  });

  //NEXT
  $(".slick-next").on("mouseenter", function () {
    TweenMax.to($slickTrack, 0.6, {
      marginLeft: "-180px",
      ease: Quad.easeOut,
    });
    TweenMax.to($slickCurrent, 0.6, {
      x: 100,
      ease: Quad.easeOut,
    });
  });

  $(".slick-next").on("mouseleave", function () {
    TweenMax.to($slickTrack, 0.4, {
      marginLeft: 0,
      ease: Quad.easeInOut,
    });
    TweenMax.to($slickCurrent, 0.4, {
      x: 0,
      ease: Quad.easeInOut,
    });
  });
});
