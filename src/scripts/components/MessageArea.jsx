import React, { Component } from "react";

export default class MessageArea extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    return (
      <div className="form-group">
        <textarea className="form-control"
                  id="message"
                  name="message"
                  placeholder="Vuoi lasciarci un messaggio?"
                  onChange={this.handleChange}
        />
      </div>
    );
  }
}
