const {Book,Borrowing,Author,Publisher,Review}=require("../associations")
const {Op}=require('sequelize')


exports.isExist = async (filter) => {
  try{
  let book = await Book.findOne(filter);

  if (book) {
    return {
      code: 200,
      success: true,
      data: book,
    };

  } else {
    return {
      code: 404,
      success: false,
      error: "book is not found",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
};


exports.list = async () => {
  try {
    const books = await Book.findAll();

    if (books.length>0) {
      return {
        code: 200,
        success: true,
        data: books,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Books not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; 


exports.create = async (form) => {
  try {

    const book = await this.isExist({where:{isbn:form.isbn}});

    if (book.success) {
      return {
        code: 400,
        success: false,
        error: "Book already exists",
      };
    }

    const newBook = await Book.create(form);
    //
  //   const totalRating = form.averageRating.reduce((acc, rating) => acc + rating, 0);
  //   const averageRating = totalRating / averageRating.length;

  //   // Update the book's averageRating attribute
  //  let bookCreated= await newBook.update({ averageRating });
//


    return {
      code: 201,
      success: true,
      data: newBook,
    };
   
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }

}; 


exports.get = async (filter) => {  //getBookDetails
  try {

    if(!filter.id){  
      return {
          success: false,
          code: 400,
          error: "book ID required"
      }
    
    }

    const book = await Book.findOne(filter, {
      include: [
        {
          model: Author,
          attributes: ['name','email'], 
        },
        {
          model: Publisher,
          attributes: ['name','email'], 
        },
      ],
  });

    if (book) {
      return {
        code: 200,
        success: true,
        book,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Book not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; 



exports.update = async (id, form) => {
  try {
    const existingBook = await this.isExist({ where: { id} });
    
    if (existingBook.success) {
      await Book.update(form,{ where: { id} })
      await Borrowing.destroy({ where: {bookId:id} }); //
      await Review.destroy({ where: {bookId:id} }); //
  

      const updatedBook= await this.isExist({ where: { id} });

      return {
        code: 201,
        success: true,
        data: updatedBook,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Book not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; 


exports.remove = async (id) => {
  try {
    const book = await this.isExist({ where: { id} });

    if (book.success) {

      let deletedBorrowing=await Borrowing.destroy({ where: {bookId:id} });
      let deletedReview=await Review.destroy({ where: {bookId:id} });
      let deletedBook=await Book.destroy({ where: { id} });
  
      return {
        success: true,
        code: 200,
        data:{
        deletedBorrowing,
        deletedReview,
        deletedBook,
        }
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Book not found",
      };
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!"
    };
  }
};


exports.getBooks = async () => {
  try {
    // Retrieve all books with available copies
    const availableBooks = await Book.findAll({
      include: [{
        model: Borrowing,
        where: { returnedAt: null } // Check if the book is currently borrowed
      }],
      attributes: ['id', 'title', 'authorId', 'genre', 'publicationYear'], // Specify attributes to include in the response
      order: [['title', 'ASC']] // Order the books by title
    });

    // Return the list of available books
    if (availableBooks.length>0) {
      return {
        code: 200,
        success: true,
        data: availableBooks,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Books not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Failed to fetch available books",
    };
};

} 


exports.search = async (searchTerm) => {
  try {

    if (!searchTerm) {
      return{
      success:false,
      code:400,
      message:'Search term is required'
      }  
  }

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { authorId: { [Op.like]: `%${searchTerm}%` } },
        ]
      },
      attributes: ['id', 'title', 'authorId', 'genre', 'publicationYear'],
      order: [['title', 'ASC']]
    });
    if (books.length>0) {
      return {
        code: 200,
        success: true,
        data: books,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Books not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Failed to search books",
    };
};

}; 

exports.monitorBook=async(bookId)=> {
  try {
    
    const book = await this.isExist({where:{id:bookId}});

    if (book.success) {
    const status = book.data.status;
    return {
      code: 200,
      success: true,
      status,
    };
    }
    else {
      return {
        code: 404,
        success: false,
        error: "Book not found",
      };
    }
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
} 

