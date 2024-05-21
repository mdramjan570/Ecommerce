const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

//Database Connection With MongoDB
mongoose.connect(
  "mongodb+srv://mdramjanali:Romen789@cluster0.d5to7ze.mongodb.net/e-commerce"
);
//API Connection
app.get("/", (req, res) => {
  res.send("Express App is Running");
});
//Images Storages enginies
const storage = multer.diskStorage({
  destination: "./upload/images/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
app.use("/images", express.static("upload/images"));
const upload = multer({ storage: storage });

//creating upload for endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://ecommerce-hazel-three.vercel.app/images/${req.file.filename}`,
  });
});

//Schema for creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  //mongoDB all product in products
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_in_Array = products.slice(-1);
    let last_product = last_product_in_Array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//Creating API for Deleting Product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//Creating API for Getting All Products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products are Fetched");
  res.send(products);
});
// Creating User Model
const User = mongoose.model("user", {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});
//API Register user
app.post("/signup", async (req, res) => {
  const check = await User.findOne({ email: req.body.email });
  if (check) {
    res.json({
      success: false,
      error: "Existing User found with the same Email",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
});
//Login Api
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const comparePassword = req.body.password === user.password;
    if (comparePassword) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email" });
  }
});
//middleware
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send({ error: "Pleaase Authenticate with valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.send({ error: "please authenticate with valid token" });
    }
  }
};
//addtocart api
app.post("/addtocart", fetchUser, async (req, res) => {
  //console.log(req.body, req.user);
  console.log("added", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
//removefrome cart api
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  console.log("remove", req.body.itemId);
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Remove");
  }
});

//store cart or get cart
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//Creating Endpoint for newcollections
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-8);
  console.log("newCollection are fethed");
  res.send(newcollections);
});

//Creating Endpoint for popular women
app.get("/popularwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularwomen = products.slice(0, 4);
  console.log("popularwomen are fethed");
  res.send(popularwomen);
});

//Server listen port
app.listen(port || 5000, (error) => {
  if (!error) {
    console.log(`The Server is running at port ${port}`);
  } else {
    console.log("Error:" + error);
  }
});
