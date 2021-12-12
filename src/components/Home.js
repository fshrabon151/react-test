import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";
import { getProducts } from "../redux/actions/products";
import SingleProduct from "./layouts/SingleProduct";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between bg-dark text-white align-items-center p-3">
        <h5>{user && user.name}</h5>
        <button className="btn btn-primary" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="container">
            <div className="row g-4 justify-content-center my-5">
              {products.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
