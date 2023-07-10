import React, { Component } from "react";
import css from "./addContact.module.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid'
import ContactForm from "../contactForm";
import ContactList from "../contactList";
import PropTypes from "prop-types";

class AddContact extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  addContact = (newContact) => {
    const existedContact = this.state.contacts.some(
      (contact) =>
        contact.name === newContact.name && contact.number === newContact.number
    );
    if (existedContact) {
      Notify.warning('This contact already exists');
      return;
    }
    newContact.id = nanoid();
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (index) => {
    this.setState((prevState) => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts.splice(index, 1);
      return { contacts: updatedContacts };
    });
  };

  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.phoneBook}>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
        </div>
        <ContactList
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

AddContact.propTypes = {
  contacts: PropTypes.array,
};

export default AddContact;
