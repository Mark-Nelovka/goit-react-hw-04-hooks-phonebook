import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

export default class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleInputCgange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  btnFormSubmit = (e) => {
    e.preventDefault();

    this.props.dataSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form className={s.form} onSubmit={this.btnFormSubmit}>
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputCgange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            onChange={this.handleInputCgange}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.btn} type="submit">
          Добавить контакт
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
