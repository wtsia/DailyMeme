const express = require("express")
const router = express.Router()
const memeModel = require('../models/memeModel')

//Home page
router.get("/", (req, res) => {
    memeModel.find({})
        .then(myInstances => res.render("index", { myInstances }));
});

//Topics list
router.get("/topics", (req, res) => {
    memeModel.find({ _topic: req.params.topic })
        .then(myInstances => 
            res.render("topic", { myInstances })
            );
});

//Get memes by topic
router.get("/topics/:topic", function(req, res) {
    let query = {};
    if (req.params.topic) {
        query.topic = req.params.topic;
    }
    memeModel.find(query)
        .then(myInstances => res.render("searchTopic", { myInstances }));
});

//page to edit a meme
router.get("/edit/:id", (req, res) => {
    memeModel.findOne({_id: req.params.id})
        .then(myInstances => {
        res.render("edit", { myInstances })
    });
});

//about us page
router.get("/instructions", (req, res) => {
    res.render("instructions");
});

//shows postmeme page
router.get("/postmeme", (req, res) => {
    res.render('postmeme');
});

//post a new meme
router.post("/", (req, res) => {
    memeModel.create(req.body)
        .then(myNewItem => {
        res.redirect('/')
    });
});

//update contents of a meme
router.put('/:id', (req, res) => {
    memeModel.findOneAndReplace({ _id: req.params.id }, req.body, { new: true })
        .then(() => {
        res.redirect('/');
    });
});

//delete a meme
router.delete('/:id', (req, res) => {
    memeModel.findOneAndRemove({ _id: req.params.id })
        .then(() => {
        res.redirect('/')
    });
});

module.exports = router