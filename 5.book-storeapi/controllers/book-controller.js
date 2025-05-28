const Book = require('../models/book') 

const getAllBooks = async(req,res)=> {
    try{
        const allBooks = await Book.find({});
        if (allBooks.length>0){
            res.status(200).json({
                success : true,
                message : "List of Books fetched successfully",
                data : allBooks
            })
        }else {
            res.status(404).json({
                success : false,
                message : 'no books found in collection'
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went wrong pls try again'
        })
    }
}
const getSingleBookById = async(req,res)=> {
   try {
    const getCurrentBookID = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookID);

    if (!bookDetailsById){
        return res.status(404).json({
            success : false,
            message : 'Book with the current id is not found! pls try with diff id'
        })
    }
    res.status(200).json({
        success: true,
        data : bookDetailsById
    })
   } catch (e) {
    console.log(e);
         res.status(500).json({
            success: false,
            message: 'Something went wrong pls try again'
        })
   }
}

const addNewBook = async(req,res)=> {
    try {
       const newBookFormData = req.body; 
       const newlyCreatedBook = await Book.create(newBookFormData)
       if ( newlyCreatedBook) {
        res.status(201).json({
            success : true,
            message : "book added successfully",
            data : newlyCreatedBook,
        })
       }
    } catch (e) {
        console.log(e);
         res.status(500).json({
            success: false,
            message: 'Something went wrong pls try again'
        })
    }
}

const updateBook = async(req,res)=> {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookID = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(getCurrentBookID,updatedBookFormData,{
            new : true,
        });

        if (!updatedBook){
            res.status(404).json({
                success : false,
                message : "book is not found with this ID"
            })
        }
        res.status(200).json({
            success : true,
            message : 'Book updated successfully',
            data : updatedBook
        })

    } catch (e) {
        console.log(e);
         res.status(500).json({
            success: false,
            message: 'Something went wrong pls try again'
        })
    }
}

const deleteBook = async(req,res)=> {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);

        if (!deleteBook){
            res.status(404).json({
                success : false,
                message : "book is not found with this ID"
            })
        }

        res.status(200).json({
            success : true,
            data : deletedBook
        })
            
        
    } catch (e) {
        console.log(e);
         res.status(500).json({
            success: false,
            message: 'Something went wrong pls try again'
        })
    }
}

module.exports = {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook}
