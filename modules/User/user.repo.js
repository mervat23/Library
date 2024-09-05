const {User,Review,Borrowing,Book}=require("../associations")
// const { Op, where } = require('sequelize');
let bcrypt = require('bcrypt');


exports.isExist = async (filter) => {
  try {
    const user = await User.findOne(filter);

    if (user) {
      return {
        code: 200,
        data: user,
        success: true,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "User is not found",
      };
    }

  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; //


exports.list = async () => {

  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    if (users.length>0) {
      return {
        code: 200,
        success: true,
        data: users,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "Users not found",
      };
    }

  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; //



exports.create = async (form) => {

  try {
    if (form.email) form.email = form.email.toLowerCase();
    const user = await this.isExist({ where: { email: form.email } });

    if (user.success) {

      return {
        code: 400,
        success: false,
        error: "User already exists",
      };
    }
      const newUser = await User.create(form);
      
      return {
        code: 201,
        success: true,
        data: newUser,
      };
    }

  catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; //


exports.update = async (id, form) => {

  try {
    const user = await this.isExist({ where: {id} });
    if (user.success) {

      const borrowedBook = await Borrowing.findOne({ where:{userId:id } });
      const book=await Book.findOne({where:{id:borrowedBook.bookId}})
      await book.update({status:'available', Availability:"true"})
      
      await User.update(form,{ where: { id} });
      await Borrowing.destroy({ where: {userId: id} });
      await Review.destroy({ where: { userId:id} }); //
      const updatedUser= await this.isExist({ where: { id} });

      return {
        code: 201,
        success: true,
        data: updatedUser,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "User not found",
      };
    }

  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; //


exports.get = async (filter) => {

  try {
    if(!filter.id){  
      return {
          success: false,
          code: 400,
          error: "user ID required"
      }
    
    }

    const user = await User.findOne({
      where: filter,
      attributes: { exclude: ['password'] }
    });

    if (user) {
      return {
        code: 200,
        success: true,
        user,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "User not found",
      };
    }

  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
}; //


exports.remove = async (id) => {

  try {
    const user =  await this.isExist({ where: {id} });

    if (user.success) {

      const borrowedBook = await Borrowing.findOne({ where:{userId:id } });
      const book=await Book.findOne({where:{id:borrowedBook.bookId}})
      await book.update({status:'available', Availability:"true"})
      
      const deletedBorrowing= await Borrowing.destroy({ where: {userId:id} }); 
      const deletedReview= await Review.destroy({ where: {userId:id} }); 
      const deletedUser= await User.destroy({ where: { id} });
     

      return {
        success: true,
        code: 200,
        data:{
          deletedBorrowing,
          deletedReview,
          deletedUser
        }

      };

    } else {
      return {
        success: false,
        error: "User not found",
        code: 404
      };
    }

  } catch (error) {
    console.error("Error:", error.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!"
    };
  }
}; //


exports.compare= async (email, password) => {

  try {
    email = email.toLowerCase();
    const user = await this.isExist({ where: { email } });

    if (user.success) {
      const match = await bcrypt.compare(password, user.data.password);

      if (match) {
        return {
          code: 200,
          success: true,
          data: user
        };
      } else {
        return {
          code: 401,
          success: false,
          error: "Incorrect password"
        };
      }
    } else {
      return {
        code: 404,
        success: false,
        error: "User not found"
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error"
    };
  }
}; //


exports.reset= async (email, newPassword) => {

  try {
    email = email.toLowerCase();
    const user = await this.isExist({ where: { email } });

    let saltrouds = 5;
    if (user.success) {
      const hashedPassword = await bcrypt.hash(newPassword, saltrouds);
      await User.update({ password: hashedPassword },{where:{email}});

      return {
        code: 200,
        success: true,
        data: user
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "User not found"
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error"
    };
  }
}; //



exports.viewReviews = async (userId) => {
    try {
        // Query to retrieve reviews written by the specified user
        let user=await this.isExist({where:{id:userId}})
        if(user.success){
        const reviews = await Review.findAll({
            where: {userId }
        });

        if (reviews.length>0) {
          return {
            code: 200,
            success: true,
            data: reviews,
          };
    
        } else {
          return {
            code: 404,
            success: false,
            error: "Reviews not found you have not create review",
          };
        }
      }
      else{
        return {
          code: 404,
          success: false,
          error: "user not found",
        };
      } 
      }
    
       catch (error) {
        console.error("Error:", error.message);
        return {
          code: 500,
          success: false,
          error: "Unexpected error",
        };
      }
};  //


exports.respondToReview=async(reviewId, response)=>{
  try {

    const review = await Review.findOne({where:{id:reviewId}}, {
      include: {
        model: User,
        attributes: ['id'],
      },
    });

    if(!review){
      return {
        code: 404,
        success: false,
        error: "Review not found",
      }; 
    }

    review.response = response;
    await review.save();
    
    return {
      code: 201,
      success: true,
      data: {
        reviewId: review.id,
        reviewer: {
        userId: review.userId,
        },
        response,
      },
    
    };


} catch (error) {
  console.error("Error:", error.message);
  return {
    code: 500,
    success: false,
    error: "Unexpected error",
  };
   }
} //

exports.viewBooks = async () => {
  try {
    
    const availableBooks = await Book.findAll({ where: { status: 'available' } });
     
    if(availableBooks.length>0){
      return {
        code: 201,
        success: true,
        data: availableBooks,
      };

    }

      else{
        return {
          code: 404,
          success: false,
          error: "there are no books available",
        };
      }
     
    } catch (error) {
    console.error("Error:", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }
} //










