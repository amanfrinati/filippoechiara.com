import $ from "jquery";
import Swiper from "swiper";
require("firebase/firestore");
import firebase from './firebase';

function toCamelCase(string) {
  string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
      return match.charAt(match.length-1).toUpperCase();
  });
  return string.charAt(0).toLowerCase() + string.substring(1);
}

function truncateText(text, maxWidth) {
   if (text.length > maxWidth) {
      return text.substring(0, maxWidth) + '...';
   }
   return text;
}

function drawWeddingListItem(item) {
  return `
    <div class="swiper-slide swiper-slide-item">
      <div class="card" onclick="$('#item-${toCamelCase(item.id)}').modal('show')">
        <div class="wedding-list-item-image">
          <img src="${item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'}" class="card-img-top swiper-lazy" alt="${item.name}">
        </div>
        <div class="card-body">
          <div class="wedding-list-item-title">
            <h6 class="text-center text-uppercase">${item.name}</h6>
          </div>
          <p class="wedding-list-item-description">${truncateText(item.description || '', 26)}</p>
          <div class="${ item.totalAmount - item.paid <= 0 ? 'd-none' : 'wedding-list-item-price' }">
            <p class="text-center"><strong>${item.paid}/${item.totalAmount} €</strong></p>
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

function modalContent(item) {
  if (item.category === 1) {
    return `
      <p>Se desideri regalarci questo articolo contatta o recati presso:</p>
      <p class="text-center my-3">
        "La Vetrinetta"<br>
        Via Vigonovese, 93, 35127 Padova PD<br>
        tel. +390498700975<br>
        e-mail<br>
        Lista nozze Bonaldo De Nes
      </p>`;
  } else if (item.category === 2) {
    return `
      <p>Se desideri regalarci questo articolo invia un bonifico a:</p>
      <p class="text-center my-3">
        Intestatario: Chiara Bonaldo<br>
        IBAN: IT09F0306962692100000007337<br>
        Causale: "${item.name} - Regalo di Nozze"
      </p>`;
  }
}

$(document).ready(function() {
  const db = firebase.firestore();
  db.collection("items").get().then(querySnapshot => {
    const swiperOptions = {
      slidesPerView: 1,
      loop: true,
      // autoHeight: true,
      freeMode: true,
      lazy: true,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // }
      centeredSlides: true,
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
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
      switch (item.type) {
        case 1: // Kitchen
          swiperWeddingListVetrinetta.appendSlide(drawWeddingListItem(item));
          break;

        case 2: // Domestic appliances
          swiperWeddingListDeNes.appendSlide(drawWeddingListItem(item));
          break;
      }

      $('body').append(`
        <div class="modal wedding-list-modal fade" id="item-${toCamelCase(item.id)}" tabindex="-1" role="dialog" aria-labelledby="modal-item-${toCamelCase(item.id)}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="item-name">${item.name}</div>
                <img src="${item.imageSrc || 'https://via.placeholder.com/300.png?text=Image'}" class="float-center mw-100" alt="${item.name}">
                <p><em>${item.description}</em></p>
                ${modalContent(item)}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
              </div>
            </div>
          </div>
        </div>`);
    })
  });
});
