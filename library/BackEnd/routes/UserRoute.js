
const { readFile } = require("../models/BookModel")

const express = require("express");
const router = express.Router();

router.get("/Users", async (req, res) => {
    res.json(await readFile('data/Users.json'));
})


module.exports = router;

