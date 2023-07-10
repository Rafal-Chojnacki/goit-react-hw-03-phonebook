import React, { Component } from "react";
import css from "./contactForm.module.css";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <div>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <div className={css.formInput}>
            <label htmlFor="Name" className={css.inputLabel}>
              Name
              <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob    Mercer,  Charles de Batz de Castelmore d'Artagnan"
                required
                placeholder="Name"
                value={this.state.name}
                className={css.formInput}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className={css.formInput}>
            <label htmlFor="Phone number" className={css.inputLabel}>
              Phone
              <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                placeholder="Phone number"
                value={this.state.number}
                className={css.formInput}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className={css.contactFormBtn}>
            <button type="submit" className={css.addContactBtn}>Add contact</button>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
  };

export default ContactForm