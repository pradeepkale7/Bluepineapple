
const { readFile } = require("../models/FileModel")

const express = require("express");
const router = express.Router();


/**
 * GET /Users
 * get data of user.
 * @route GET /Users
 * @returns {Object} List of all users 
 */

router.get("/Users", async (req, res) => {
    res.json(await readFile('data/Users.json'));
})


module.exports = router;

