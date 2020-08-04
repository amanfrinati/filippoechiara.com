import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['itemModalContent']

  showModal(event) {
    event.preventDefault()
    this.itemModalContentTarget.innerHTML = this.drawModalContent(
      JSON.parse(event.currentTarget.dataset.itemData)
    )
  }

  closeItemModal() {
    this.itemModalContentTarget.innerHTML = ''
  }

  drawModalContent(item) {
    let content = `
      <div class="item-name">${item.name}</div>
      <div class="item-img">
        <img src="${
          item.imageSrc || 'https://via.placeholder.com/300.png?text=Image'
        }" alt="${item.name}">
      </div>
      <p class="item-price text-center"><strong>${item.paid}/${
      item.totalAmount
    } €</strong></p>
      <p class="item-description"><em>${item.description}</em></p>
      <hr>
    `

    // 1 == Vetrinetta
    if (item.category === 1) {
      content += `
      <p>Se desideri regalarci questo articolo contatta o recati presso:</p>
      <p class="contact-information">
        "La Vetrinetta"<br>
        Via Vigonovese, 93, 35127 Padova PD<br>
        tel. <a href="tel:+390498700975">+390498700975</a><br>
        e-mail <a href="mailto:lavetrinetta@foralberg.it">lavetrinetta@foralberg.it</a><br>
        Lista nozze Bonaldo De Nes
      </p>`

      // 2 == De Nes List
    } else if (item.category === 2) {
      content += `
      <p>Se desideri regalarci questo articolo, puoi contribuire attraverso bonifico seguendo queste coordinate:</p>
      <p class="contact-information">
        Intestatario: Chiara Bonaldo<br>
        IBAN: IT09F0306962692100000007337<br>
        Causale: "${item.name} - Regalo di Nozze"
      </p>`
    }

    return content
  }
}
