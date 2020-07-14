import $ from "jquery";
// import Vue from "vue";
import Swiper from "swiper";

const firebase = require("firebase/app");
require("firebase/firestore");

$(document).ready(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyBPD4PuXZGxSOe2KrRdc7iQ45yQ1ni96WM",
    authDomain: "wedding-list-e14d1.firebaseapp.com",
    databaseURL: "https://wedding-list-e14d1.firebaseio.com",
    projectId: "wedding-list-e14d1",
    storageBucket: "wedding-list-e14d1.appspot.com",
    messagingSenderId: "51632127564",
    appId: "1:51632127564:web:c5dc8a54e077d99a7bfee9"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.collection("items").get().then(querySnapshot => {
    const swiperWeddingList = new Swiper('.swiper-container.wedding-list', {
      slidesPerView: 1,
      loop: true,
      utoHeight: true,
      freeMode: true,
      lazy: true,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // }
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });

    /**
     * Item model
     *
     * description
     * imageSrc
     * name
     * paid
     * totalAmount
     */
    querySnapshot.forEach(doc => {
      const item = doc.data();
      swiperWeddingList.appendSlide(`
        <div class="swiper-slide swiper-slide-item">
          <div class="card">
            <div class="d-flex justify-content-center my-3">
              <img src="${item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'}" class="card-img-top swiper-lazy" alt="placeholder">
            </div>
            <div class="card-body">
              <div class="wedding-list-item-title">
                <h6 class="text-center text-uppercase">${item.name}</h6>
              </div>
              <div class="${ item.totalAmount - item.paid <= 0 ? 'd-none' : '' }">
                <p class="text-center"><strong>${item.paid}/${item.totalAmount} €</strong>
                  <button type="button" class="btn btn-link" data-toggle="modal" data-target="#item-${doc.id}">
                    Regala!
                  </button>
                </p>
              </div>
              <div class="${ item.totalAmount - item.paid <= 0 ? '' : 'd-none' }">
                <div class="wedding-list-item-title wedding-list-item-completed">
                  <h6 class="text-center text-uppercase">REGALATO!</h6>
                </div>
              </div>
            </div>
          </div>
        </div>`);

      $('body').append(`
        <div class="modal fade" id="item-${doc.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img src="${item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'}" class="rounded float-center mw-100" alt="${item.name}">
                <p>${item.description}</p>
              </div>
            </div>
          </div>
        </div>`);
    })
  });

  ;

  // const vueApp = new Vue({
  //   el: '#weddingList',
  //   data () {
  //     return {
  //       items: null
  //     }
  //   },
  //   mounted () {
  //     Promise.all([
  //       this,
  //       db.collection("items").get()
  //     ]).then(([_this, querySnapshot]) => {
  //       _this.items = querySnapshot.docs.map(doc => doc.data());
  //     })
  //   }
  // })
});

