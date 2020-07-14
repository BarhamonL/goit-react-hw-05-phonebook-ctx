import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import Layout from "../common/Layout";
import Section from "../common/Section";
import ContactEditor from "../ContactEditor";
import ContactList from "../ContactList";
import Filter from "../Filter";
import ThemeToggler from "../ThemeToggler";
import ThemeContext from "../../context/ThemeContext";

import { uuid } from "uuidv4";
import showToastError from "../../utils/showToastError";
import localStorage from "../../utils/localStorage";

import "react-toastify/dist/ReactToastify.css";

class ContactFormManager extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const persistedContakts = localStorage.get("contacts");
    if (persistedContakts) {
      this.setState({
        contacts: persistedContakts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.save("contacts", contacts);
    }
  }

  handleFilter = (filter) => {
    this.setState({ filter });
  };
  handleAddContact = (name, number) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };
    if (!name || !number) {
      showToastError(`all required fields are not filled`);
      return;
    }

    const alreadyRecordedContact = this.state.contacts.some(
      (contact) => contact.name === name
    );

    alreadyRecordedContact
      ? showToastError(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact],
        }));
  };
  handleDeleteContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };
  getVisibleContakt = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContakt = this.getVisibleContakt();
    return (
      <ThemeContext>
        <Layout>
          <ThemeToggler />
          <div className="Contact-FormManager">
            <Section title="Phonebook">
              <ContactEditor onAdd={this.handleAddContact} />
            </Section>

            {contacts.length > 0 && (
              <Section title="Contacts">
                {contacts.length > 1 && (
                  <Filter value={filter} onChangeFilter={this.handleFilter} />
                )}
                <ContactList
                  contacts={visibleContakt}
                  onClose={this.handleDeleteContact}
                />
              </Section>
            )}
          </div>
          <ToastContainer />
        </Layout>
      </ThemeContext>
    );
  }
}
export default ContactFormManager;
