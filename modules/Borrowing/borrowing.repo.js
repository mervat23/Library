const { where } = require("sequelize");
const {Borrowing,Review,Book,User}=require("../associations")


exports.isExist = async (filter) => {
  try{
  let borrowing = await Borrowing.findOne(filter);

  if (borrowing) {
    return {
      code: 200,
      success: true,
      data: borrowing,
    };

  } else {
    return {
      code: 404,
      success: false,
      error: "user borrowing is not found",
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
}; //

exports.list = async () => {
  try {
    const borrowings = await Borrowing.findAll({
      include: [
        {
           model: Book,
          attributes: ['isbn', 'title','description'],  
        },
        {
          model:User,
          attributes: ['name', 'email'],
        }
      
      
      ],
 
    });

    if (borrowings.length>0) {
      return {
        code: 200,
        success: true,
        data: borrowings,
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
}; //


exports.getUserBorrowing = async(id) => {
  try {
    if(!id){  
      return {
          success: false,
          code: 400,
          error: "user ID required"
      }
    
    }

    let user=await User.findOne({where:{id}})
    console.log(user.id)
    if(!user){  
      return {
          success: false,
          code: 400,
          error: "user not found"
      }
    
    }

    const borrowings = await Borrowing.findAll({
      where: { userId:id, returnedAt:null},
       include:[
        {
          model: Book,
         attributes: ['isbn', 'title','description'],  
       },

      ],
   });

    if (borrowings&&borrowings.length>0) {
      return {
        code: 200,
        success: true,
        data: borrowings,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "user borrowings not found",
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
};  //View Borrowed Books


exports.create = async (form) => {
  try {

    if (!form.userId || !form.bookId) {
            return{
              code: 400,
              success: false,
              error: "User ID and Book ID are required", 
            }
            }
      
            const result = await Book.findOne({ where: { id: form.bookId} });
            const user = await User.findOne({ where: { id: form.userId} });
            if (!result || !user ) {
                return{
                  code: 404,
                  success: false,
                  error: "Book not found or user not found",   
                }  
            }

    const borrowing = await this.isExist({where:{userId:form.userId,bookId:form.bookId}});

    if (borrowing.success) {
      return {
        code: 400,
        success: false,
        error: "user borrowing already exists",
      };
    }

    const book=await Book.findOne({where:{id:form.bookId}})
    if(book.status==='available'){
      const status=book.status='borrowed'
      await book.update({ Availability: "false" ,status});
    }

    else if (book.status!=='available'||book.status!=='borrowed'){
      return{
      code: 401,
      success: false,
      error: `can not borrowed this book because the book is ${book.status}`, 
    }
    
  }
  // else{
  //   return{
  //     code: 401,
  //     success: false,
  //     error: `can not borrowed this book because the book is already borrowed`, 
  //   }
     
  // }
    const newBorrowing= await Borrowing.create(form);
    
    return {
      code: 201,
      success: true,
      data: newBorrowing,
    };
   
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }

}; //

exports.update = async (id, form) => {
  try {
    const borrowing= await this.isExist({ where: { id} });

    if (borrowing.success) {
      await Borrowing.update(form,{ where: { id} });
      const bookId = borrowing.data.bookId;
      await Review.destroy({ where: {bookId: bookId } });
      const updatedBorrowing= await this.isExist({ where: { id} });

      return {
        code: 201,
        success: true,
        data: updatedBorrowing,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Borrowing not found",
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
}; //


exports.remove = async (borrowingId) => {
  try {
    const borrowing = await this.isExist({ where: { id: borrowingId} }) 
  
    if (borrowing.success) {
      const book=await Book.findOne({where:{id:borrowing.data.bookId}})

      const status=book.status='available'
      await book.update({ Availability: "true" ,status});
      const bookId = borrowing.data.bookId;
      const deletedReview= await Review.destroy({ where: {bookId: bookId } });
      const canceledBorrowing=await Borrowing.destroy({ where: { id: borrowingId} });

      return {
        code: 200,
        success: true,
        data:{
        deletedReview,
        canceledBorrowing  
        }
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "borrowing not found",
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
}; //cancel



exports.viewBorrowing= async (bookId) => {
  try {
   
    const book=await Book.findOne({where:{id:bookId}})

    if(book){

    const borrowing = await this.isExist({ where: { bookId } });

    if (!borrowing.success) {
      return{
        code:200,
        success:true,
        borrowed: false 
      } 
    
    } else {
      return{
        code:200,
        success:true,
        borrowed: true,
        returnedAt: borrowing.data.returnedAt
      }   
    }
  }
  else{
  return{
   code:404,
   success:false,
   message:'book not found'  
  }  
  }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}  //

//provideFeedback=create(review)





