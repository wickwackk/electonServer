const express = require("express");
// import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 2020;
app.use(cors());
app.use(bodyParser.json());

app.get("/products", (request, response) => {
  console.log("Product data avah huselt orj irle ");
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
  fs.readFile("./data/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    console.log("read success");
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const id = req.params.id;
      const filtered = savedData.filter((product) => product.id !== id);
      console.log("filter success");
      fs.writeFile("./data/products.json", JSON.stringify(filtered), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res
            .status(200)
            .send({ message: "Data successfully deleted", data: filtered });
        }
      });
    }
  });
});

app.patch("/products/:id", (req, res) => {
  console.log("Patch - products huselt orj irlee");
  fs.readFile("./data/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const { id } = req.params;
      const edited = savedData.map((product) => {
        if (product.id === id) return { id, ...req.body };
        return product;
      });

      // const edited = savedData.filter((product) => product.id !== id);
      // edited.unshift(req.body);
      fs.writeFile("./data/products.json", JSON.stringify(edited), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "Data successfully edited" });
        }
      });
    }
  });
});

// app.get("/users", (request, response) => {
//   console.log("Get products huselt orj irle 1");
//   response.status(200).send(users);
// });

app.get("/users", (request, response) => {
  console.log("Users data avah huselt orj irle ");
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      console.log(err);
      console.error(err);
    } else {
      const users = JSON.parse(data);
      response.status(200).send(users);
    }
  });
});

app.get("/orders", (request, response) => {
  console.log("Orders data avah huselt orj irle ");
  fs.readFile("./data/orders.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const orders = JSON.parse(data);
      response.status(200).send(orders);
    }
  });
});

app.post("/orders", (req, res) => {
  fs.readFile("./data/orders.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      // console.log(JSON.parse(data));
      const orders = JSON.parse(data);
      console.log("orders: ", orders);
      console.log("Body: ", req.body);
      const newOrder = {
        orderNum: orders[orders.length - 1].orderNum + 1,
        ...req.body,
      };
      orders.push(newOrder);
      fs.writeFile("./data/orders.json", JSON.stringify(orders), (err) => {
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

app.listen(port, () => {
  // fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("added ");
  //   }
  // });

  console.log(`server is running at ${port} port`);
});
