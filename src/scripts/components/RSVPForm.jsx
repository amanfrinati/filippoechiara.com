import React, { Component } from "react";
import ReactDOM from "react-dom";

export class RSVPForm extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <form id="rsvpForm"
            method="post"
            data-controller="rsvp"
            data-target="rsvp.form"
            data-action="submit->rsvp#submit"
            noValidate>
        <div className="form-group">
          <input type="text"
                 required
                 name="fullName"
                 className="form-control"
                 placeholder="Come ti chiami?" />
            <div className="invalid-feedback">
              Per favore, dicci almeno come ti chiami 😅
            </div>
        </div>

        <div className="form-group">
          <div className="form-check">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="attendanceOptions" id="attendanceYes" value="1"
                     data-action="change->rsvp#attending" data-attending-value="1" required />
                <label className="form-check-label" htmlFor="attendanceYes">😊 Ci sarò!</label>
                <div className="invalid-feedback">
                  Per favore, dicci almeno come ti chiami 😅
                </div>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="attendanceOptions" id="attendanceNo" value="0"
                     data-action="change->rsvp#attending" data-attending-value="0" required />
                <label className="form-check-label" htmlFor="attendanceNo">😔 Purtroppo devo saltare il matrimonio
                  dell'anno..</label>
                <div className="invalid-feedback">
                  Per favore, dicci almeno come ti chiami 😅
                </div>
            </div>
          </div>
        </div>

        <div className="d-none" data-target="rsvp.guestOptions">
          <div className="form-group">

          </div>
        </div>


        <div className="d-none" data-target="rsvp.message">
          <div className="form-group">
            <textarea className="form-control" id="message" name="message"
                      placeholder="Vuoi lasciarci un messaggio?"/>
          </div>
        </div>


        <button className="btn btn-primary" type="submit">Conferma!</button>
      </form>
    )
  }
}




const wrapper = document.getElementById("rsvpFormContainer");
wrapper ? ReactDOM.render(<RSVPForm />, wrapper) : false;
