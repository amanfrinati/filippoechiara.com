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

  /**
   * Draw the slider element for the wedding list item.
   * To open the modal item, I added `data-toggle="modal" data-target="#item-modal"` as specify in https://getbootstrap.com/docs/4.5/components/modal/#via-data-attributes
   * @param item
   * @returns {string}
   */
  drawWeddingListItem(item) {
    const paymentCompleted = item.totalAmount - item.paid <= 0;

    return `
      <div class="swiper-slide swiper-slide-item">
        <div class="card" data-item-id="${item.id}" ${paymentCompleted ? '' : 'data-action="click->wedding-list#showModal" data-toggle="modal" data-target="#item-modal"'}>
          <div class="wedding-list-item-image">
            <img src="${item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'}" class="card-img-top swiper-lazy" alt="${item.name}">
          </div>
          <div class="card-body">
            <div class="wedding-list-item-title">
              <h6 class="text-center text-uppercase">${item.name}</h6>
            </div>
            <p class="wedding-list-item-description">${truncateText(item.description || '', 26)}</p>
            <div class="${paymentCompleted ? 'd-none' : 'wedding-list-item-price' }">
              <p class="text-center"><strong>${item.paid}/${item.totalAmount} €</strong></p>
            </div>
            <div class="${paymentCompleted ? '' : 'd-none' }">
              <div class="wedding-list-item-title wedding-list-item-completed">
                <h6 class="text-center text-uppercase">REGALATO!</h6>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  drawModalContent(item) {
    let content = `
      <div class="item-name">${item.name}</div>
      <div class="item-img">
        <img src="${item.imageSrc || 'https://via.placeholder.com/300.png?text=Image'}" alt="${item.name}">
      </div>
      <p class="item-price text-center"><strong>${item.paid}/${item.totalAmount} €</strong></p>
      <p class="item-description"><em>${item.description}</em></p>
      <hr>
    `;

    // 1 == Vetrinetta
    if (item.category === 1) {
      content += `
      <p>Se desideri regalarci questo articolo contatta o recati presso:</p>
      <p class="text-center my-3">
        "La Vetrinetta"<br>
        Via Vigonovese, 93, 35127 Padova PD<br>
        tel. <a href="tel:+390498700975">+390498700975</a><br>
        e-mail <a href="mailto:lavetrinetta@foralberg.it">lavetrinetta@foralberg.it</a><br>
        Lista nozze Bonaldo De Nes
      </p>`;

    // 2 == De Nes List
    } else if (item.category === 2) {
      content += `
      <p>Se desideri regalarci questo articolo, puoi inviare un bonifico alle seguenti coordinate:</p>
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
    this.itemModalContentTarget.innerHTML = this.drawModalContent(
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
