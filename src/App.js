import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import s from "./App.module.css";
import Form from "./Components/Form/Form";
import ContactList from "./Components/Contacts/ContactList";
import Filter from "./Components/Filter/Filtet";
import WindowModal from "./Components/Modal/Modal";

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteName, setDeleteName] = useState("");

  useEffect(() => {
    const parseContacts = JSON.parse(localStorage.getItem("contacts"));
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    const stringContacts = JSON.stringify(contacts);
    localStorage.setItem("contacts", stringContacts);
  }, [contacts]);

  const dataSubmit = (name, number) => {
    const searchName = contacts
      .map((contactName) => contactName.name)
      .includes(name);
    if (searchName) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      setContacts((prevState) => [contact, ...prevState]);
    }
  };

  const onDelete = (contactDeleteDId) => {
    setContacts((prevState) =>
      prevState.filter(({ id }) => id !== contactDeleteDId)
    );
    setIsOpen(false);
  };

  const dontDelete = () => {
    setIsOpen(false);
    setDeleteName("");
  };

  const filterValue = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const removeContact = (contactId) => {
    setDeleteName(contactId);
    setIsOpen(true);
  };

  const filterName = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className={s.section}>
      <h1> Phonebook</h1>
      <Form dataSubmit={dataSubmit} />
      <h2>Contacts</h2>
      <p>Поиск контакта по имени</p>
      <Filter value={filter} onChange={filterValue} />
      <ContactList contacts={filterName} onRemoveContact={removeContact} />
      {isOpen ? (
        <WindowModal
          modalRemove={deleteName}
          dontDelete={dontDelete}
          onDelete={onDelete}
        />
      ) : (
        ""
      )}
    </section>
  );
}
export default App;
