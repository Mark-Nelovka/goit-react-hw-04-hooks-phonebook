import React, { Component } from "react";
import { nanoid } from "nanoid";
import s from "./App.module.css";
import Form from "./Components/Form/Form";
import ContactList from "./Components/Contacts/ContactList";
import Filter from "./Components/Filter/Filtet";
import WindowModal from "./Components/Modal/Modal";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    isOpen: false,
    deleteName: "",
  };

  componentDidMount() {
    const saveContacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(saveContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const lengthContacts = this.state.contacts;
    const stringContacts = JSON.stringify(this.state.contacts);
    if (lengthContacts !== prevState.contacts)
      localStorage.setItem("contacts", stringContacts);
  }

  dataSubmit = (data) => {
    const searchName = this.state.contacts
      .map((contactName) => contactName.name)
      .includes(data.name);
    if (searchName) {
      alert(`${data.name} is already in contacts`);
      return;
    } else {
      const contact = {
        ...data,
        id: nanoid(),
      };
      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  onDelete = (contactDeleteDId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          ({ id }) => id !== contactDeleteDId
        ),
        isOpen: false,
      };
    });
  };

  dontDelete = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
        deleteName: "",
      };
    });
  };

  filterValue = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        deleteName: contactId,
        isOpen: !prevState.isOpen,
      };
    });
  };

  render() {
    const { contacts, filter, isOpen, deleteName } = this.state;
    const filterName = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <section className={s.section}>
        <h1> Phonebook</h1>
        <Form dataSubmit={this.dataSubmit} />
        <h2>Contacts</h2>
        <p>Поиск контакта по имени</p>
        <Filter value={filter} onChange={this.filterValue} />
        <ContactList
          contacts={filterName}
          onRemoveContact={this.removeContact}
        />
        {isOpen ? (
          <WindowModal
            modalRemove={deleteName}
            dontDelete={this.dontDelete}
            onDelete={this.onDelete}
          />
        ) : (
          ""
        )}
      </section>
    );
  }
}
export default App;
