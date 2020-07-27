import React, { Component } from "react";
import ReactDOM from "react-dom";
import MessageArea from "./MessageArea.jsx";
import firebase from '../../../firebase';
import RandomString from "./RandomString";
require("firebase/firestore");
import Alert from 'react-bootstrap/Alert';

export class RSVPForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpResult: {
        show: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.db = firebase.firestore();
  }

  attendanceOptionChanged(e) {
    this.setState({
      attendanceOption: e.target.value === '1'
    })
  }

  handleInputChange(event) {
    const target = event.target;
    // const value = target.name === 'isGoing' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.form.classList.add('was-validated');

    if (this.validateForm(this.form)) {
      try {
        this.db
          .collection('rsvps')
          .doc(RandomString())
          .set({
            allergies: this.state.allergies || '',
            attendanceOption: this.state.attendanceOption,
            email: this.state.email,
            fullName: this.state.fullName,
            message: this.state.message || '',
            numberOfAdults: this.state.numberOfAdults || 0,
            numberOfChildren: this.state.numberOfChildren || 0,
            createdAt: new Date()
          })
          .then(() => {
            this.showAlert(true, 'Grazie di aver confermato! Ti aspettiamo 🥂', true);
            this.resetForm();
          })
          .catch((error) => {
            this.showAlert(true, `Oh no! Il messaggio non è stato inviato a causa di un errore 😱 ${error.toString()}`, false);
          });
      } catch (e) {
        this.showAlert(true, `Oh no! Il messaggio non è stato inviato a causa di un errore 😱 ${e.toString()}`, false);
      }
    }
  }

  validateForm(form) {
    if (this.state.attendanceOption) {
      return form.checkValidity() &&
        this.state.numberOfAdults &&
        this.state.numberOfChildren;
    } else {
      return form.checkValidity();
    }
  }

  resetForm() {
    this.setState({
      allergies: undefined,
      attendanceOption: undefined,
      email: undefined,
      fullName: undefined,
      message: undefined,
      numberOfAdults: undefined,
      numberOfChildren: undefined,
    })
    this.form.classList.remove('was-validated');
    this.form.reset();
  }

  showAlert(show, message, result) {
    this.setState({
      rsvpResult: {
        show,
        message,
        variant: result ? 'success' : 'warning'
      }
    })
  }

  render() {
    return (
      <div>
        <form className="rsvp"
              method="post"
              noValidate
              onSubmit={this.handleSubmit}
              ref={(el) => this.form = el}
        >
          <div className="form-group">
            <input type="text"
                   required
                   name="fullName"
                   className="form-control"
                   placeholder="Come ti chiami?"
                   onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              Per favore, dicci almeno come ti chiami 😅
            </div>
          </div>

          <div className="form-group">
            <input type="email"
                   required
                   name="email"
                   className="form-control"
                   placeholder="Qual è la tua email?"
                   onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              Lasciaci una mail, così ti mandiamo il messaggio di riepilogo della conferma! Promettiamo di non salvarlo e di non mandare SPAM 😉
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <div className="form-check">
                <input className="form-check-input"
                       type="radio"
                       name="attendanceOptions"
                       id="attendanceYes"
                       value="1"
                       onChange={(e) => this.attendanceOptionChanged(e)}
                       required
                />
                <label className="form-check-label" htmlFor="attendanceYes">😊 Ci sarò!</label>
                <div className="invalid-feedback">
                  Per favore, scegli una delle due opzioni 😬
                </div>
              </div>
              <div className="form-check">
                <input className="form-check-input"
                       type="radio"
                       name="attendanceOptions"
                       id="attendanceNo"
                       value="0"
                       onChange={(e) => this.attendanceOptionChanged(e)}
                       required
                />
                <label className="form-check-label" htmlFor="attendanceNo">😔 Purtroppo devo saltare il matrimonio
                  dell'anno..</label>
                <div className="invalid-feedback">
                  Per favore, scegli una delle due opzioni 😬
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.attendanceOption ? 'd-block' : 'd-none'}>
            <div className="form-group"
                 onChange={this.handleInputChange}
            >
              <select className="form-control"
                      name="numberOfAdults"
                      defaultValue=""
                      required
              >
                <option disabled value="">Quanti adulti ci sono?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <div className="invalid-feedback">
                Per favore, scegli il numero di adulti 😬
              </div>
            </div>

            <div className="form-group"
                 onChange={this.handleInputChange}
            >
              <select className="form-control"
                      name="numberOfChildren"
                      defaultValue=""
                      required
              >
                <option disabled value="">Quanti bambini ci sono?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              <div className="invalid-feedback">
                Per favore, scegli il numero di bambini 😬
              </div>
            </div>

            <div className="form-group"
                 onChange={this.handleInputChange}
            >
              <textarea name="allergies"
                        className="form-control"
                        placeholder="Hai intolleranze o allergie da segnalarci?"
                        onChange={this.handleInputChange}
              />
            </div>
          </div>

          <MessageArea
            hide={this.state.attendanceOption === undefined}
            handleChange={this.handleInputChange}/>

          <button className="btn btn-primary" type="submit">Conferma!</button>
        </form>

        <div className="my-5">
          <Alert show={this.state.rsvpResult.show}
                 variant={this.state.rsvpResult.variant}
                 dismissible
                 onClose={() => this.showAlert(false, '', true)}
          >
            {this.state.rsvpResult.message}
          </Alert>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <RSVPForm />,
  document.getElementById("rsvpForm")
);
