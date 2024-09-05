const {Review,Book,User}=require("../associations")
const Sequelize = require('sequelize');

exports.isExist = async (filter) => {
  try{
  let review = await Review.findOne(filter);

  if (review) {
    return {
      code: 200,
      success: true,
      data: review,
    };

  } else {
    return {
      code: 404,
      success: false,
      error: "review is not found",
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
    const reviews = await Review.findAll({
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
        error: "Reviews not found",
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


exports.create = async (form) => {
  try {

    const review = await this.isExist({where:{bookId:form.bookId,userId:form.userId}});
    
    if (review.success) {
      return {
        code: 400,
        success: false,
        error: "Review already exists",
      };
    }

    const book=await Book.findOne({where:{id:form.bookId}})

    if(!book){
      return {
        code: 404,
        success: false,
        error: "can not create review because Book not found",
      };
    }

    const user=await User.findOne({where:{id:form.userId}})

    if (!user) {
      return {
        code: 404,
        success: false,
        error: "can not create review because User not found",
      };
    }

  const newReview = await Review.create(form);

  const reviews = await Review.findAll({ where: {bookId:form.bookId } });
  const totalRating = reviews.reduce((sum, newReview) => sum + newReview.rating, 0);
  const newAverageRating = totalRating / reviews.length;

  // Update the book's average rating
  await book.update({ averageRating: newAverageRating });

    return {
      code: 201,
      success: true,
      data: newReview,
    };
   
    
  } catch (error) {
    console.error("error", error.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected error",
    };
  }

}; //  //provideBookReview


exports.get = async (id) => {
  if(!id){  
    return {
        success: false,
        code: 400,
        error: "review ID required"
    }
  
  }
  try {
    const review = await Review.findOne({where: {id},
      
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

    if (review) {
      return {
        code: 200,
        success: true,
        review,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Review not found",
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


exports.update = async (id, form) => {
  try {
    const review= await this.isExist({ where: { id} });
    
    if (review.success) {
      await Review.update(form,{ where: { id} });
      const updatedReview= await this.isExist({ where: { id} });

      return {
        code: 201,
        success: true,
        data: updatedReview,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Review not found",
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


exports.remove = async (reviewId) => {
  try {
    const review = await this.isExist({ where: { id: reviewId}});

    if (review.success) {
      const book = await Book.findOne({ where: { id: review.data.bookId}});

      const remainingReviews = await Review.findAll({
        where: {
          bookId: book.id,
          id: { [Sequelize.Op.ne]: reviewId } // Exclude the review being deleted
        }
      });
  
      // Calculate the new average rating
      let totalRating = 0;
      for (const review of remainingReviews) {
        totalRating += review.rating;
      }
      const newAverageRating = totalRating / remainingReviews.length;
  
      await book.update({ averageRating: newAverageRating });

    let result=await Review.destroy({ where: { id: reviewId} });

      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Review not found",
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
}; //


exports.getReviews = async (bookId) => { 
    try {
       
        const book=await Book.findOne({where:{id:bookId}})
        console.log(book)
        if(!book){
          return {
            code: 404,
            success: false,
            error: "Book not found ",
          };
        }
        const reviews = await Review.findAll({
            where: { bookId },
            attributes:['reviewText','rating','isFlagged'],
            include: [{ model: Book, attributes: ['title'] },
            { model: User, attributes: ['name', 'email'] }
          ] 
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
        error: "this book does not have Reviews",
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


exports.flagReview=async(reviewId)=> {

  try {

    const review = await this.isExist({where:{id:reviewId}});

    if(review.success){
    review.data.isFlagged = true;
    await review.data.save();

    return {
      code: 201,
      success: true,
      data: review,
    };

  } else {
    return {
      code: 400,
      success: false,
      error: "Review not found",
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
   
} //


exports.getStatistics=async()=> {
  try {
   
      const statistics = await Book.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: Review,
          attributes: ['rating'],
        }
      ],
    });

     const formattedStatistics = statistics.map(book => {
      const totalReviews = book.Reviews.length; 
      const averageRating = totalReviews > 0 ?
        book.Reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews :
        0;

      return {
        bookId: book.id,
        bookTitle: book.title,
        totalReviews,
        averageRating,
      };
    });

    return {
      code: 200,
      success: true,
      data: formattedStatistics,
    };


  
  } catch (error) {
    console.error('Error fetching review statistics:', error);
    throw new Error('Failed to fetch review statistics');
  }
} //


