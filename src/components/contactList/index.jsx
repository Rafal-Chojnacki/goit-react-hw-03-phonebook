import React, { Component } from 'react';
import css from './contactList.module.css';

class ContactList extends Component {
  state = {
    filter: '',
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  getContacts = () => {
    const filter = this.state.filter;
    const contacts = this.props.contacts;
    if (filter.length === 0) {
      return contacts;
    }
    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };

  clearFindInput = () => {
    this.setState({ filter: '' });
  };

  render() {
    return (
      <div>
        <div>
          <h2>Contacts</h2>
          <form className={css.form}>
            <div className={css.formInput}>
              <label htmlFor="Find contacts by name" className={css.inputLabel}>
                Find contacts by name
                <input
                  type="text"
                  name="filter"
                  placeholder="finding name"
                  value={this.state.filter}
                  onChange={this.handleChange}
                  className={css.formInput}
                ></input>
              </label>
            </div>
          </form>
        </div>
        <div>
          <button className={css.clearBtn} onClick={this.clearFindInput}>
            &#10005;
          </button>
        </div>
        <ul>
          {this.getContacts().map(({ name, number, id }) => (
            <li key={id} className={css.contact}>
              {name} --- {number}
              <div>
                <button
                  className={css.deleteBtn}
                  onClick={() => this.props.deleteContact(id)}
                >
                  Delete contact
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactList;
