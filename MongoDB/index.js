const express = require('express');
const mongoose = require('mongoose');
 const port = 2932
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/libaryDB', )
    .then(() => {
        console.log("Connected to db");
    }).catch((err) => {
        console.log("An error Occured", err);
    }
    );
const bookSchema = new mongoose.Schema({
    title: String,
    yearPublished: Number,
    author: String,
    category: String,
});

const bookModel = mongoose.model('book', bookSchema);

app.get("/", async (req, res) => {
    //   const getBooks = bookModel
    //     .find()
    //     .then((data) => {
    //       res.status(200).json({ message: "all books", books: data });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  
    try {
      const getBooks = await bookModel.find();
      res.status(200).json({ message: "all books", books: getBooks });
    } catch (error) {
      res.status(500).json({ message: "an error occured", err });
    }
  });
  

app.post("/", async (req, res) => {
    try{
        const {title, yearPublished, author, category} = req.body;
        const postBook = await bookModel.create({
            title,
            yearPublished,
            author,
            category
        });
        res.status(200).json({message: "Book Posted", book: postBook});
    }catch(err){
        res.status(500).json({message: "An error occured", err})
    }
});

app.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const getOneBook = await bookModel.findById(id);

        if(!getOneBook) { 
            res.status(404).json({message: "This book does not exist"})
        }
        res.status(200).json({message: "Book Gotten", book: getOneBook})
    }catch(err){
        res.status(500).json({message: "An error occured", err})
    }

}); 

app.patch("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {title, yearPublished, author, category} = req.body;
        const updateBook = await bookModel.findByIdAndUpdate(id, {title, yearPublished, author, category}, {new: true});

        if(!updateBook){
            res.status(404).json({message: "This book does not exist"})
        }
        res.status(200).json({message: "Book Updated", book: updateBook})
    }catch(err){
        res.status(500).json({message: "An error occured", err})
    }
});

app.delete("/deleteById/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteBook = await bookModel.findByIdAndDelete(id);
        if(!deleteBook){
            res.status(404).json({message: "This book does not exist"})
        }
        res.status(200).json({message: "Book Deleted"})
    }catch(err){
        res.status(500).json({message: "An error occured", err})
    }
});

const date = new Date();

app.listen(port, () => {
    console.log(date.toDateString(), port);
});