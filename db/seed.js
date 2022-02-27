const memeModel = require('../models/memeModel')
const seedData = require("./seeds.json")

memeModel.deleteMany({})
  .then(() => {
    return memeModel.insertMany(seedData)
  })
  .then(() => {
    process.exit()
  })