const express = require("express");
const router = express.Router();

const Resto = require("../models/resto");

//all http method routes are declared here with tasks

router.get("/", async (req, res) => {
  try {
    const resto = await Resto.find({ active: true });
    res.json(resto);
  } catch (err) {
    res.send("Error while getting the Restaurants.." + err);
  }
});

router.get("/allResto", async (req, res) => {
  try {
    const resto = await Resto.find();
    res.json(resto);
  } catch (err) {
    res.send("Error while getting the Restaurants.." + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resto = await Resto.findById(req.params.id);
    res.json(resto);
  } catch (err) {
    res.send("Error while getting the Restaurant" + err);
  }
});

router.post("/", async (req, res) => {
  const resto = new Resto({
    name: req.body.name,
    address: req.body.address,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    active: req.body.active,
  });

  try {
    const rs = await resto.save();
    res.json("Data Added Sucessfully..");
  } catch (err) {
    res.send("Error while adding the Restaurant." + err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const resto = await Resto.findById(req.params.id);
    resto.name = req.body.name;
    resto.address = req.body.address;
    resto.openTime = req.body.openTime;
    resto.closeTime = req.body.closeTime;
    resto.phone = req.body.phone;
    resto.imageUrl = req.body.imageUrl;
    resto.active = req.body.active;
    const rs = await resto.save();
    res.json("Data updated Sucessfully..");
  } catch (err) {
    res.send("Error while updating the Restaurant" + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resto = await Resto.findById(req.params.id);
    const rs = await resto.remove();
    res.json("Data deleted Sucessfully.");
  } catch (err) {
    res.send("Error while deleting the Restaurant." + err);
  }
});

module.exports = router;
