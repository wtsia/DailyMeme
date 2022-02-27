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
    console.log(`showing topics`);
    memeModel.find({ _topic: req.params.topic })
        .then(myInstances => 
            res.render("topic", { myInstances })
            );
});

//Get memes by topic
router.get("/topics/:topic", function(req, res) {
    console.log(`finding meme by topic`);
    let query = {};
    if (req.params.topic) {
        query.topic = req.params.topic;
    }
    memeModel.find(query)
        .then(myInstances => res.render("searchTopic", { myInstances }));
});

//page to edit a meme
router.get('/edit/:id', (req, res) => {
    console.log(`showing edit by id page`);
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
router.get('/postmeme', (req, res) => {
    console.log(`show post meme page`);
    res.render('postmeme');
});

//post a new meme
router.post('/', (req, res) => {
    console.log(`posting meme`);
    memeModel.create(req.body)
        .then(myNewItem => {
        res.redirect('/')
    });
});

//update contents of a meme
router.put('/:id', (req, res) => {
    console.log(`updating a meme`);
    console.log(req.params.id);
    memeModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(() => {
        res.status(201).json({
            message: `meme has updated successfully`,
        });
        res.redirect('/');
    });
});

//delete a meme
router.delete('/:id', (req, res) => {
    console.log(`deleting a meme`);u
    memeModel.findByIdAndDelete({ _id: req.params.id })
        .then(() => {
        res.status(301).json({
            message: `meme has deleted successfully`,
        });
        res.redirect('/')
    });
});

module.exports = router