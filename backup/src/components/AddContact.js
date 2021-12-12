import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const addContact = (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  };
  const { name, email, phone } = contact;
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );

    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email is already exists!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone is already exists!");
    }

    if (!name || !email || !phone) {
      return toast.warning("Please fill all fields");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name,
      email,
      phone,
    };
    addContact(data);
    toast.success("Contact added successfully");
    navigate("/");
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            placeholder="Phone"
            className="form-control"
            name="phone"
            id="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add contact
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
