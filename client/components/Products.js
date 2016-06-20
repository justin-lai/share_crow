import React, { PropTypes, Component } from 'react';

const Products = (props) => (
  <div className="product">
    <img src="http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg" width="300px"/>
    <p>Product name</p>
    <p>Price</p>
    <p>User</p>
  </div>
);

export default Products;