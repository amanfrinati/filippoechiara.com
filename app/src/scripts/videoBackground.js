import $ from "jquery";

$(document).ready(function() {
  const promise = document.querySelector('.party video').play();

  if (promise !== undefined) {
    promise.catch(error => {
      // Auto-play was prevented
      // Show a UI element to let the user manually start playback
    }).then(() => {
      // Auto-play started
    });
  }

  // const vid = document.getElementById("video-villa-gritti");

  // const pauseButton = document.querySelector("#polina button");

  // if (window.matchMedia('(prefers-reduced-motion)').matches) {
  //   vid.removeAttribute("autoplay");
  //   vid.pause();
  //   pauseButton.innerHTML = "Paused";
  // }

  // function vidFade() {
  //   vid.classList.add("stopfade");
  // }

  // vid.addEventListener('ended', function() {
  //   // only functional if "loop" is removed
  //   vid.pause();
  //   // to capture IE10
  //   vidFade();
  // });

  // pauseButton.addEventListener("click", function() {
  //   vid.classList.toggle("stopfade");
  //   if (vid.paused) {
  //     vid.play();
  //     pauseButton.innerHTML = "Pause";
  //   } else {
  //     vid.pause();
  //     pauseButton.innerHTML = "Paused";
  //   }
  // })
});


