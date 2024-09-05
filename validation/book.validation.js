let joi=require("joi");

module.exports={

createBookValidation:{
    body:joi.object().required().keys({
        
      isbn:joi.string().empty().required().messages({
        "string.base":"please enter a valid isbn ",
        "string.empty":"isbn cannot be empty",
        "any.required":"isbn must be entered",
      }),

      title:joi.string().empty().required().messages({
        "string.base":"please enter a valid title ",
        "string.empty":"title cannot be empty",
        "any.required":"title must be entered",
      }),

      description:joi.string().empty().required().messages({
        "string.base":"please enter a valid description ",
        "string.empty":"description cannot be empty",
        "any.required":"description must be entered",
      }),


      Availability:joi.string().empty().required().messages({
        "string.base":"please enter a valid Availability ",
        "string.empty":"Availability cannot be empty",
        "any.required":"Availability must be entered",
      }),

      genre:joi.string().empty().required().messages({
        "string.base":"please enter a valid genre",
        "string.empty":"genre cannot be empty",
        "any.required":"genre must be entered",
      }),

      publicationYear:joi.number().integer().required().messages({
        "number.base": "please enter a valid publicationYear",
        "number.integer":"publicationYear must be integer",
        "any.required": "publicationYear must be entered"
    }),

    status:joi.string().empty().required().messages({
        "string.base":"please enter a valid status",
        "string.empty":"status cannot be empty",
        "any.required":"status must be entered",
      }),

      averageRating:joi.number().required().messages({
        "number.base": "please enter a valid averageRating",
        "any.required": "averageRating must be entered"
    }),

    authorId:joi.number().integer().required().messages({
      "number.base":"please enter a valid authorId ",
      "number.integer":"authorId must be integer",
      "any.required":"authorId must be entered",
    }),

    publisherId:joi.number().integer().required().messages({
      "number.base":"please enter a valid publisherId ",
      "number.integer":"publisherId must be integer",
      "any.required":"publisherId must be entered",
    }),
  })
},

updateBookValidation:{
    body:joi.object().required().keys({
        
      isbn:joi.string().empty().optional().messages({
        "string.base":"please enter a valid isbn ",
        "string.empty":"isbn cannot be empty",
      }),

      title:joi.string().empty().optional().messages({
        "string.base":"please enter a valid title ",
        "string.empty":"title cannot be empty",
      }),

      description:joi.string().empty().optional().messages({
        "string.base":"please enter a valid description ",
        "string.empty":"description cannot be empty",
      }),


      Availability:joi.string().empty().optional().messages({
        "string.base":"please enter a valid Availability",
        "string.empty":"Availability cannot be empty",
      }),

      genre:joi.string().empty().optional().messages({
         "string.base":"please enter a valid genre",
        "string.empty":"genre cannot be empty",
      }),

      publicationYear:joi.number().integer().optional().messages({
        "number.base": "please enter a valid publicationYear",
        "number.integer":"publicationYear must be integer",
    }),

    status:joi.string().empty().optional().messages({
        "string.base":"please enter a valid status",
        "string.empty":"status cannot be empty",
      }),

      averageRating:joi.number().optional().messages({
        "number.base": "please enter a valid averageRating",
    }),

    authorId:joi.number().integer().optional().messages({
      "number.base":"please enter a valid authorId ",
      "number.integer":"authorId must be integer",
    }),

    publisherId:joi.number().integer().optional().messages({
      "number.base":"please enter a valid publisherId ",
      "number.integer":"publisherId must be integer",
    }),
  })
},

}