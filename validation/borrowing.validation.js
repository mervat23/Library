let joi=require("joi");

module.exports={

createBorrowingValidation:{
    body:joi.object().required().keys({

        borrowed:joi.string().empty().required().messages({
        "string.base":"please enter a valid borrowed",
        "string.empty":"borrowed cannot be empty",
        "any.required":"borrowed must be entered",
      }),

      borrowedAt:joi.date().empty().optional().messages({
        "date.base":"please enter a valid borrowedAt ",
        "date.empty":" borrowedAt cannot be empty",       
      }),

      returnedAt:joi.date().empty().optional().messages({
        "date.base":"please enter a valid  returnedAt ",
        "date.empty":" returnedAt cannot be empty",       
      }),

      status:joi.string().empty().optional().messages({
        "string.base":"please enter a valid status",
        "string.empty":" status cannot be empty",       
      }),

      bookId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid bookId ",
        "number.integer":"bookId must be integer",
      }),
   
      userId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid userId ",
        "number.integer":"userId must be integer",
      }),
  
  })
},

updateBorrowingValidation:{
    body:joi.object().required().keys({

        borrowed:joi.string().empty().optional().messages({
        "string.base":"please enter a valid borrowed",
        "string.empty":"borrowed cannot be empty",
      }),

      borrowedAt:joi.date().empty().optional().messages({
        "date.base":"please enter a valid borrowedAt ",
        "date.empty":" borrowedAt cannot be empty",       
      }),

      returnedAt:joi.date().empty().optional().messages({
        "date.base":"please enter a valid  returnedAt ",
        "date.empty":" returnedAt cannot be empty",       
      }),

      status:joi.string().empty().optional().messages({
        "string.base":"please enter a valid status",
        "string.empty":" status cannot be empty",       
      }),

      bookId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid bookId ",
        "number.integer":"bookId must be integer",
      }),
   
      userId:joi.number().integer().optional().messages({
        "number.base":"please enter a valid userId ",
        "number.integer":"userId must be integer",
      }),

  })
},

}



