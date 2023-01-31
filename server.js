const express = require("express");
// import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 2020;
app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    name: "James",
    surname: "Brown",
    email: "jamesbrown@gmail.com",
    order: 2,
    date: 2022 / 03 / 05,
  },
  {
    name: "Michael",
    surname: "Jordan",
    email: "jordan@gmail.com",
    order: 3,
    date: 2022 / 03 / 06,
  },
  {
    name: "Michael",
    surname: "Brax",
    email: "mikebrax@gmail.com",
    order: 4,
    date: 2022 / 03 / 07,
  },
  {
    name: "Jason",
    surname: "Ron",
    email: "jasonr@gmail.com",
    order: 5,
    date: 2022 / 03 / 08,
  },
  {
    name: "Tom",
    surname: "Cruise",
    email: "tommy@gmail.com",
    order: 6,
    date: 2022 / 03 / 09,
  },
];

app.get("/products", (request, response) => {
  console.log("Data avah huselt orj irle ");
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const products = JSON.parse(data);
      response.status(200).send(products);
    }
  });
});

// app.get("/product/:id", (req, res) => {
//   const { id } = req.params;
//   let newProduct;
//   for (let product of products) {
//     if (product.id === Number(id)) {
//       newProduct = product;
//       break;
//     }
//   }

//   res.json(newProduct);
// });

// app.post("/products", (req, res) => {
//   console.log(req.body);
//   const newProduct = { id: products[products.length - 1].id + 1, ...req.body };
//   products.push(newProduct);
//   res.json(newProduct);
// });

app.post("/products", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      // console.log(JSON.parse(data));
      const products = JSON.parse(data);
      console.log("Products: ", products);
      console.log("Body: ", req.body);
      products.push(req.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log("req", req.body);
          res.status(200).send(req.body);
        }
      });
    }
  });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  console.log("DELETE huselt orj ilee id: ", id);
  products = products.filter((product) => product.id !== id);
  console.log("products: ", products);
});

app.get("/users", (request, response) => {
  console.log("Get products huselt orj irle 1");
  response.status(200).send(users);
});

app.listen(port, () => {
  // fs.readFile("./data/products.json", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("added ");
  //       }
  //     });
  //   }
  // });

  console.log(`server is running at ${port} port`);
});
