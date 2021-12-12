import React from "react";

const SingleProduct = ({ product: { title, image, price } }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 ">
      <div className="p-4  d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center">
          <img
            src={image}
            alt={title}
            className="img-fluid "
            style={{ maxHeight: "350px" }}
          />
        </div>
        <hr />
        <div className="card-body">
          <h4>{title}</h4>
          <h6>{price}</h6>
          <button className="btn-primary btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
