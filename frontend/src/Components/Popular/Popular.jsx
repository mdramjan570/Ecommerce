import React, { useEffect, useState } from "react";
import Item from "../Item/Item.jsx";
import Base_url from "../Base_url/Base_url";
import "./Popular.css";
const Popular = () => {
  const [popularwomen, setPopularwomen] = useState([]);
  useEffect(() => {
    fetch(`${Base_url}/popularwomen`)
      .then((resp) => resp.json())
      .then((data) => setPopularwomen(data));
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularwomen.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
