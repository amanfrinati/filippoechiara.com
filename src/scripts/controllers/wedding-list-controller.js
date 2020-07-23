import { Controller } from 'stimulus'
import firebase from '../firebase';
import Swiper from "swiper";
require("firebase/firestore");

export default class extends Controller {
  static targets = ['vetrinettaList', 'deNesList', 'itemModalContent'];

  swiperOptions = {
    // slidesPerView: 1,
    // loop: true,
    freeMode: true,
    // lazy: true,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  connect() {
    this.swiperWeddingListVetrinetta = new Swiper(this.vetrinettaListTarget, this.swiperOptions);
    this.swiperWeddingListDeNes = new Swiper(this.deNesListTarget, this.swiperOptions);

    this.db = firebase.firestore();
    this.db.collection("items")
      .get()
      .then(querySnapshot => {

      /**
       * Item model
       *
       * description
       * imageSrc
       * name
       * paid
       * totalAmount
       * category: 1 == Vetrinetta, 2 == De Nes List
       * type: 1 == Kitchen, 2 == Domestic appliances
       */
      this.weddingListItems = querySnapshot.docs.map(doc => ({ ...doc.data(), id: toCamelCase(doc.id) }));
      this.weddingListItems
        .sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        .forEach(item => {
          switch (item.type) {
            case 1: // Kitchen
              this.swiperWeddingListVetrinetta.appendSlide(this.drawWeddingListItem(item));
              break;

            case 2: // Domestic appliances
              this.swiperWeddingListDeNes.appendSlide(this.drawWeddingListItem(item));
              break;
          }
        })
    });
  }

  drawWeddingListItem(item) {
    return `
      <div class="swiper-slide swiper-slide-item">
        <div class="card" data-action="click->wedding-list#showModal" data-item-id="${item.id}" data-toggle="modal" data-target="#item-modal">
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

  modalContent(item) {
    let content = `
      <div class="item-name">${item.name}</div>
      <img src="${item.imageSrc || 'https://via.placeholder.com/300.png?text=Image'}" class="float-center mw-100" alt="${item.name}">
      <p><em>${item.description}</em></p>`;

    if (item.category === 1) {
      content += `
      <p>Se desideri regalarci questo articolo contatta o recati presso:</p>
      <p class="text-center my-3">
        "La Vetrinetta"<br>
        Via Vigonovese, 93, 35127 Padova PD<br>
        tel. +390498700975<br>
        e-mail<br>
        Lista nozze Bonaldo De Nes
      </p>`;
    } else if (item.category === 2) {
      content += `
      <p>Se desideri regalarci questo articolo invia un bonifico a:</p>
      <p class="text-center my-3">
        Intestatario: Chiara Bonaldo<br>
        IBAN: IT09F0306962692100000007337<br>
        Causale: "${item.name} - Regalo di Nozze"
      </p>`;
    }

    return content;
  }

  showModal(event) {
    event.preventDefault();
    this.itemModalContentTarget.innerHTML = this.modalContent(
      this.weddingListItems.find(item => item.id === event.currentTarget.dataset.itemId)
    )
  }

  closeItemModal() {
    this.itemModalContentTarget.innerHTML = '';
  }
}

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
