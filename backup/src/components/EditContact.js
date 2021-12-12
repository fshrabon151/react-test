import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
  useEffect(() => {
    setContact(currentContact);
  }, [currentContact]);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { name, email, phone } = contact;
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const editContact = (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );

    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
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
      id: currentContact.id,
      name,
      email,
      phone,
    };
    editContact(data);

    toast.success("Contact updated successfully");
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

export default EditContact;
