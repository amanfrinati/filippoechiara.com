import $ from "jquery";
// import Vue from "vue";
import Swiper from "swiper";

const firebase = require("firebase/app");
require("firebase/firestore");

function toCamelCase(string) {
  string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
      return match.charAt(match.length-1).toUpperCase();
  });
  return string.charAt(0).toLowerCase() + string.substring(1);
}

function drawWeddingListItem(item) {
  return `
    <div class="swiper-slide swiper-slide-item">
      <div class="card">
        <div class="wedding-list-item-image">
          <img src="${item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'}" class="card-img-top swiper-lazy" alt="placeholder">
        </div>
        <div class="card-body">
          <div class="wedding-list-item-title">
            <h6 class="text-center text-uppercase">${item.name}</h6>
          </div>
          <div class="${ item.totalAmount - item.paid <= 0 ? 'd-none' : 'wedding-list-item-price' }">
            <p class="text-center"><strong>${item.paid}/${item.totalAmount} €</strong></p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#item-${toCamelCase(item.id)}">
              Regala!
            </button>
          </div>
          <div class="${ item.totalAmount - item.paid <= 0 ? '' : 'd-none' }">
            <div class="wedding-list-item-title wedding-list-item-completed">
              <h6 class="text-center text-uppercase">REGALATO!</h6>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

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
    const swiperOptions = {
      slidesPerView: 1,
      // loop: true,
      // autoHeight: true,
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
    };

    const swiperWeddingListVetrinetta = new Swiper('#weddingListVetrinetta', swiperOptions);
    const swiperWeddingListDeNes = new Swiper('#weddingListDeNes', swiperOptions);

    /**
     * Item model
     *
     * description
     * imageSrc
     * name
     * paid
     * totalAmount
     * category
     */
    querySnapshot.forEach(doc => {
      const item = { ...doc.data(), id: doc.id };
      switch (item.category) {
        case 1:
          swiperWeddingListVetrinetta.appendSlide(drawWeddingListItem(item));
          break;

        case 2:
          swiperWeddingListDeNes.appendSlide(drawWeddingListItem(item));
          break;
      }

      $('body').append(`
        <div class="modal wedding-list-modal fade" id="item-${toCamelCase(item.id)}" tabindex="-1" role="dialog" aria-labelledby="modal-item-${toCamelCase(item.id)}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-item-${toCamelCase(item.id)}"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img src="${item.imageSrc || 'https://via.placeholder.com/300.png?text=Image'}" class="float-center mw-100" alt="${item.name}">
                <div class="item-name">${item.name}</div>
                <p>${item.description}</p>
                <p>Puoi inviare una quota libera tramite bonifico a:</p>
                <p>IT</p>
                <p>intestato a "Filippo De Nes"</p>
                <p>causale "Contributo per ${item.name}"</p>
              </div>
            </div>
          </div>
        </div>`);
    })
  });

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
