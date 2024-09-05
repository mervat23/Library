let joi=require("joi");

module.exports={

createReviewValidation:{
    body:joi.object().required().keys({

        reviewText:joi.string().empty().required().messages({
        "string.base":"please enter a valid reviewText ",
        "string.empty":"reviewText cannot be empty",
        "any.required":"reviewText must be entered",
      }),

      rating: joi.number().required().min(1).max(5).messages({
        "number.base": "please enter a valid rating",
        "number.min": "rating must be between 1 and 5",
        "number.max": "rating must be between 1 and 5",
        "any.required":"rating must be entered",

    }),

      date:joi.date().required().messages({
        "date.base":"please enter a valid date",
        "any.required":"date must be entered",
      }),

      isFlagged:joi.string().empty().optional().messages({
        "string.base":"please enter a valid isFlagged ",
        "string.empty":"isFlagged cannot be empty",
      }),

      response:joi.string().empty().required().messages({
        "string.base":"please enter a valid response ",
        "string.empty":"response cannot be empty",
        "any.required":"response must be entered",
      }),

      bookId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid bookId",
        "number.integer":"bookId must be integer",
      }),
  
      userId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid userId",
        "number.integer":"userId must be integer",
      }),

  })
},

updateReviewValidation:{
    body:joi.object().required().keys({

        reviewText:joi.string().empty().optional().messages({
        "string.base":"please enter a valid reviewText ",
        "string.empty":"reviewText cannot be empty",
      }),

      rating: joi.number().optional().min(1).max(5).messages({
        "number.base": "please enter a valid rating",
        "number.min": "rating must be between 1 and 5",
        "number.max": "rating must be between 1 and 5",
    }),

      date:joi.date().optional().messages({
        "date.base":"please enter a valid date",
      }),

      isFlagged:joi.string().empty().optional().messages({
        "string.base":"please enter a valid isFlagged ",
        "string.empty":"isFlagged cannot be empty",
      }),

      response:joi.string().empty().optional().messages({
        "string.base":"please enter a valid response ",
        "string.empty":"response cannot be empty",
      }),

      bookId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid bookId",
        "number.integer":"bookId must be integer",
      }),
  
      userId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid userId",
        "number.integer":"userId must be integer",
      }),

  })
},

}