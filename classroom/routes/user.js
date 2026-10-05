const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("Get for users");
});

// Show - users
router.get("/:id", (req, res) => {
    res.send("Get for user id");
});

// Post - users
router.post("/", (req, res) => {
    res.send("Post for users");
});

// Delete - users
router.delete("/:id", (req, res) => {
    res.send("Delete for users id");
});

module.exports = router;