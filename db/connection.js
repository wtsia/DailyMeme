const mongoose = require('mongoose')

mongoose.Promise = Promise

// mongodb+srv://dbUser:<password>@cluster0.dgycw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

let mongoURI = "";
if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.DB_URL;
} else {
  mongoURI = "mongodb://localhost/Memes";
}

// connect to the database, with the imported mongoose instance
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(instance =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch(error => console.log("Connection failed!", error));

module.exports = mongoose