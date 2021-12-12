import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadUser, register } from "../../redux/actions/auth";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userInfo;
  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("All Field Required");
    }
    if (password !== confirmPassword) {
      toast.warning("Password not match");
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    dispatch(register(formData));
  };
  return (
    <>
      <div
        className="d-flex jusify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <h1 className="text-center">Register</h1>
          <form
            className="col-6 mx-auto  p-4 shadow-sm mt-4"
            onSubmit={onSubmit}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={name}
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Your password"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-success"
              disabled={loading ? true : false}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
