import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableItem from "./TableItem";

const Home = () => {
  const contacts = useSelector((state) => state);

  return (
    <>
      <div className="container">
        <Link to="/add" className="btn btn-dark float-end">
          Add Contact
        </Link>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <TableItem contacts={contacts} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
