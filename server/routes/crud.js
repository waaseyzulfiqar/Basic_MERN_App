const express = require("express");
const router = express.Router();
const crudModel = require("../model/form");

/**
 * Create new data
 */
router.post("/", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).send({ message: "Name and age are required" });
    }
    const data = await crudModel.create({ name, age });
    res.send({ message: "Data created successfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating data" });
  }
});

/**
 * Read all data
 */
router.get('/read', async (req, res) => {
  try {
    const data = await crudModel.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching data" });
  }
});

/**
 * Delete data by ID
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "ID is required" });
    }
    await crudModel.findOneAndDelete({_id: id});
    res.send({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting data" });
  }
});

module.exports = router;