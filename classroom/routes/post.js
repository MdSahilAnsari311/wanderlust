const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("Get for posts");
});

// Show - users
router.get("/:id", (req, res) => {
    res.send("Get for post id");
});

// Post - users
router.post("/", (req, res) => {
    res.send("Post for posts");
});

// Delete - users
router.delete("/:id", (req, res) => {
    res.send("Delete for post id");
});

module.exports = router;