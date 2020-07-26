import { Controller } from 'stimulus'
import firebase from '../firebase';

require("firebase/database");

// Adopt code from https://github.com/drukelly/RSVP-Form

export default class extends Controller {
  static targets = ['form',
    // 'templateRow',
    // 'guests',
    'guestOptions',
    'message'
  ];

  get templateRow() {
    return this.templateRowTarget.innerHTML;
  }

  get content() {
    return this.guestsTarget;
  }

  connect() {
    // rsvp collections
    this.rsvpRef = firebase.database().ref('rsvps');

    // this.add();
  }

  // -----------------------
  // start: helper functions

  removeLast() {
    const children = this.content.children || [],
      index = (children.length || 0) - 1;
    if (children.length > 0) {
      children[index].classList.remove('last');
    }
  }

  setLast() {
    const children = this.content.children || [];
    const index = (children.length || 0) - 1;

    if (children.length > 0) {
      children[index].classList.add('last');
      // traverse and select the target
      let target = children[index];
      const idSerialized = target.querySelectorAll('input[type="hidden"]');
      const nameSerialized = target.querySelectorAll('input[type="text"]');
      const attendanceSerialized = target.querySelector('.attendance').querySelectorAll('input');
      // const mealOptionSerialized = target.querySelector('.mealOptions').querySelectorAll('input');
      [...idSerialized].forEach(item => {
        item.setAttribute('name', `id${index + 1}`);
        item.setAttribute('value', Date.now());
      });
      [...nameSerialized].forEach(item => {
        item.setAttribute('name', `fullName${index + 1}`);
      });
      [...attendanceSerialized].forEach(item => {
        item.setAttribute('name', `attendance${index + 1}`);
      });
      // [...mealOptionSerialized].forEach(item => {
      //   item.setAttribute('name', `mealChoice${index + 1}`);
      // });
    }
  }

  // +
  add() {
    this.removeLast();
    const element = document.createElement('div');
    element.innerHTML = this.templateRow;
    // element.classList.add('inputRow');
    if (this.content.children.length === 0) {
      element.classList.add('first');
    }
    this.content.appendChild(element);
    this.setLast();
  }

  // -
  retract(element) {
    const parent = element.parentNode.parentNode.parentNode;
    this.content.removeChild(parent);
    this.setLast();
  }

  // +/- logic:
  // if guest is attending, avail the options to choose menu
  // only show +/- if guest is attending. if not, hide it
  attending(element, value) {
    if (element.value === '1') {
      this.guestOptionsTarget.classList.remove('d-none');
    } else {
      this.guestOptionsTarget.classList.add('d-none');
    }

    this.messageTarget.classList.remove('d-none');




    // const mealOptions = element.parentNode.parentNode.nextElementSibling;
    // if (value > 0) {
    //   mealOptions.style.display = 'block';
    // } else {
    //   mealOptions.style.display = 'none';
    //   // reset mealChoice or mealChoices to false
    //   const mealChoices = mealOptions.querySelectorAll('input[type="radio"]');
    //   mealChoices.forEach(mealChoice => {
    //     mealChoice.checked = false;
    //   });
    // }
  }

  // TODO: Improve this
  // checkValue(element) {
  //   if (element.value) {
  //     document
  //       .getElementById('rsvpForm')
  //       .querySelector('input[type="submit"]')
  //       .removeAttribute('disabled');
  //   }
  // }

  startOver() {
    // display success message
    document.querySelector('.message').innerHTML = 'Your RSVP has been submitted!';
    // reset form
    document.getElementById('rsvpForm').reset();
    // remove form elements
    document.getElementById('guests').innerHTML = '';
    // disable form submission
    document.querySelector('input[type="submit"').disabled = true;
    // reinitialize form from beginning state
    add();
    // remove success message
    setTimeout(function () {
      document.querySelector('.message').innerHTML = '';
    }, 3000);
  }

  formToJSON = elements => {
    [].reduce.call(elements, (data, element) => {
      if (isValidElement(element) && isValidValue(element)) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }

  // end: helper functions
  // ---------------------

  submit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.formTarget.checkValidity() === false) {
    }

    this.formTarget.classList.add('was-validated');


    // // capture fields
    // const guests = document.getElementById('guests');
    // const elements = guests.querySelectorAll('input');
    // const entries = [...elements];
    // // check for valid elements
    // const isValidElement = element => {
    //   return element.name && element.value;
    // };
    // const isValidValue = element => {
    //   return (!['radio'].includes(element.type) || element.checked);
    // };
    //
    // const singleJSONObj = this.formToJSON(entries);
    // let response = Object.entries(singleJSONObj).reduce((object, [key, value]) => {
    //   let [name, number] = key.match(/\D+|\d+$/g);
    //   object[number] = { ...(object[number] || {}), [name]: value }
    //   return object;
    // }, {});
    // const dataToSubmit = Object.values(response);
    // // firebase entry
    // const newRSVPRef = this.rsvpRef.push();
    // newRSVPRef.set(dataToSubmit);
    // // for testing!
    // // console.log(JSON.stringify(dataToSubmit));
    // // ---------------------
    //
    // this.startOver();
  }
}
