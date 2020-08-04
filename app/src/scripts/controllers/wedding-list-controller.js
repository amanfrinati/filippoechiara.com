import { Controller } from 'stimulus'
import firebase from '../../../firebase'
import Swiper from 'swiper'
require('firebase/firestore')

export default class extends Controller {
  static targets = ['swiperContainer', 'itemModalContent', 'loading']

  swiperOptions = {
    // loop: true,
    freeMode: true,
    // lazy: true,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true
    },
    breakpoints: {
      // 640: {
      //   slidesPerView: 2,
      //   spaceBetween: 5,
      // },
      // 768: {
      //   slidesPerView: 4,
      //   spaceBetween: 40,
      // },
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
        freeMode: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }

  connect() {
    this.itemType = +this.data.get('itemType')

    this.swiperWeddingList = new Swiper(
      this.swiperContainerTarget,
      this.swiperOptions
    )

    this.swiperContainerTarget.firstElementChild.classList.add('d-none')

    this.db = firebase.firestore()
    Promise.all([
      [this.swiperContainerTarget.firstElementChild, this.loadingTarget],
      this.db.collection('items').get()
    ]).then((data) => {
      const [listTargets, querySnapshot] = data

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
      this.weddingListItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: toCamelCase(doc.id)
      }))
      this.weddingListItems
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((item) => item.type === this.itemType)
        .forEach((item) =>
          this.swiperWeddingList.appendSlide(this.drawWeddingListItem(item))
        )

      listTargets.forEach((el) => el.classList.toggle('d-none'))
    })
  }

  /**
   * Draw the slider element for the wedding list item.
   * To open the modal item, I added `data-toggle="modal" data-target="#item-modal"` as specify in https://getbootstrap.com/docs/4.5/components/modal/#via-data-attributes
   * @param item
   * @returns {string}
   */
  drawWeddingListItem(item) {
    const paymentCompleted = item.totalAmount - item.paid <= 0

    return `
      <div class="swiper-slide swiper-slide-item">
        <div class="card" data-item-id="${
          item.id
        }" data-item-data='${JSON.stringify(item)}' ${
      paymentCompleted
        ? ''
        : 'data-action="click->wedding-list-item-modal#showModal" data-toggle="modal" data-target="#item-modal"'
    }>
          <div class="wedding-list-item-image">
            <img src="${
              item.imageSrc || 'https://via.placeholder.com/400.png?text=Image'
            }" class="card-img-top swiper-lazy" alt="${item.name}">
          </div>
          <div class="card-body">
            <div class="wedding-list-item-title">
              <h6 class="text-center text-uppercase">${item.name}</h6>
            </div>
            <p class="wedding-list-item-description">${truncateText(
              item.description || '',
              26
            )}</p>
            <div class="${
              paymentCompleted ? 'd-none' : 'wedding-list-item-price'
            }">
              <p class="text-center"><strong>${item.paid}/${
      item.totalAmount
    } €</strong></p>
            </div>
            <div class="${paymentCompleted ? '' : 'd-none'}">
              <div class="wedding-list-item-title wedding-list-item-completed">
                <h6 class="text-center text-uppercase">REGALATO!</h6>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
}

function toCamelCase(string) {
  string = string
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, function (match) {
      return match.charAt(match.length - 1).toUpperCase()
    })
  return string.charAt(0).toLowerCase() + string.substring(1)
}

function truncateText(text, maxWidth) {
  if (text.length > maxWidth) {
    return text.substring(0, maxWidth) + '...'
  }
  return text
}
