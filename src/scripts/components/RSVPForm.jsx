import React, { Component } from "react";
import ReactDOM from "react-dom";
import MessageArea from "./MessageArea.jsx";
import firebase from '../firebase';
import RandomString from "./RandomString";
require("firebase/firestore");

export class RSVPForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

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

    this.db.collection('rsvps').doc(RandomString()).set({
      ...this.state
    })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  render() {
    return (
      <form className="rsvp"
            method="post"
            noValidate
            onSubmit={this.handleSubmit}
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
                Per favore, dicci almeno come ti chiami 😅
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
                Per favore, dicci almeno come ti chiami 😅
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
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>

          <div className="form-group"
               onChange={this.handleInputChange}
          >
            <select className="form-control"
                    name="numberOfChildren"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
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
    )
  }
}

ReactDOM.render(
  <RSVPForm />,
  document.getElementById("rsvpFormContainer")
);
