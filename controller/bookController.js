const {readJSON , writeJSON} = require('../utils/fileHandler')
const {v4:uuidv4} = require('uuid');

const File_Name = "book.json";

async function getAllBooks(req , res) {
    try{
        
        const books = await readJSON(File_Name);

        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found." });
          }
      
          return res.status(200).json({ books });

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error while searching books." });
    }
}

async function getBookById(req , res) {
    try{
    const bookId = req.params.id;

    const books = await readJSON(File_Name);
    const book = books.find(b => b.id === bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." }); 
    }

    return res.status(200).json({ book });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error while searching books." });
    }
}

async function addBook(req ,res) {
    try{
        const {title , author , genre , publishedYear} = req.body
        const {userId} = req.user;

        if (!title || !author || !genre || !publishedYear) {
            return res.status(400).json({ message: "All fields are required." });
          }

        const books = await readJSON(File_Name);

        const newBook = {
            id: uuidv4(),
            title,
            author,
            genre,
            publishedYear,
            userId
        }

        books.push(newBook);

        await writeJSON(File_Name , books);

        return res.status(201).json({ message: "Book added successfully", book: newBook });


    }catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error while searching books." });
    }
}

async function updateBookById(req , res) {
    try {
        const bookId = req.params.id;
        const {title , author , genre , publishedYear} = req.body;
        const {userId} = req.user;

       
    const books = await readJSON(File_Name);

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found." });
    }

    const book = books[bookIndex];

    if (book.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this book." });
    }

    
    const updatedBook = {
      ...book,
      title,
      author,
      genre,
      publishedYear
    };

    books[bookIndex] = updatedBook;

    await writeJSON(File_Name, books);

    return res.status(200).json({ message: "Book updated successfully", book: updatedBook });

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error while searching books." });
    }
}

async function deleteBookById(req , res) {
    try {
        const bookId = req.params.id;
        const {userId} = req.user;

        let books = await readJSON(File_Name);

        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found." });
          }
      
          const book = books[bookIndex];
      
          if (book.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this book." });
          }
      

        books.splice(bookIndex , 1);

        await writeJSON(File_Name , books);

        return res.status(200).json({ message: "Book deleted successfully." });

    }catch(err) {
        res.status(500).json({ message: "Server error while searching books." });
    }
}

async function filterBookByGenre(req , res) {
    try {
        const { genre } = req.query;

        if (!genre) {
          return res.status(400).json({ message: "Genre query parameter is required." });
        }
    
        const books = await readJSON(File_Name);
        const filteredBooks = books.filter(book =>
          book.genre.toLowerCase() === genre.toLowerCase()
        );
    
        res.json({ results: filteredBooks });
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while searching books." });
      }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById,
    filterBookByGenre
}