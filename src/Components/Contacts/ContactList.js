import React from "react";
import PropTypes from "prop-types";
import s from "./ContList.module.css";

export default function ContactList({ contacts, onRemoveContact }) {
  return (
    <ol className={s.ul}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={s.li} key={id}>
            {name}: {number}
            <button
              className={s.btn}
              name="delete"
              onClick={() => onRemoveContact({ id, name })}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ol>
  );
}

ContactList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  number: PropTypes.number,
  onRemoveContact: PropTypes.func,
};
