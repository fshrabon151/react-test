import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/actions/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("All Field Required");
    }
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    dispatch(login(formData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div
        className="d-flex jusify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <h1 className="text-center">Login</h1>
          <form
            className="col-6 mx-auto  p-4 shadow-sm mt-4"
            onSubmit={onSubmit}
          >
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

export default Login;
