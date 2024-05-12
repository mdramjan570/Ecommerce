import React from "react";
import { MdAddShoppingCart, MdFeaturedPlayList } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <MdAddShoppingCart size={30} />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <MdFeaturedPlayList size={30} />
          <p>Product list</p>
        </div>
      </Link>
    </div>
  );
};
export default Sidebar;
