import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TableItem = ({ contacts }) => {
  const dispatch = useDispatch();
  return (
    <>
      {contacts.map((contact, index) => (
        <tr key={contact.id}>
          <th scope="row">{index + 1}</th>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td>
            <Link to={`/edit/${contact.id}`} className="btn-primary btn">
              Edit
            </Link>
            <button
              className="btn-danger btn ms-3"
              onClick={() =>
                dispatch({ type: "DELETE_CONTACT", payload: contact.id })
              }
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableItem;
