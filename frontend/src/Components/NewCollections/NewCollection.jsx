import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";
const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    fetch("https://ecommerce-2x8d.onrender.com/newcollections")
      .then((resp) => resp.json())
      .then((data) => setNew_collection(data));
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
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

export default NewCollection;
