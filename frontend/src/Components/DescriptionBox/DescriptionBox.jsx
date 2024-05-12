import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(189)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet in ea
          ipsa explicabo officia corporis omnis possimus eligendi cumque
          tempore? Assumenda soluta quas, deserunt reiciendis voluptate esse
          illo laudantium quis.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
