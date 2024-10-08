let joi=require("joi");

module.exports={
    
createUserValidation:{
    body:joi.object().required().keys({
      email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().required().messages({
          "string.email":"please enter a valid email ",
          "any.required":"email must be entered",
          "string.empty":"email cannot be empty"
      }),

      password:joi.string().empty().required()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
          "string.base":"please enter a valid password",
          "any.required":"password must be entered",
          "string.empty":"password cannot be empty",
          "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
      }),

      name:joi.string().empty().required().pattern(new RegExp(/^[a-z ]+$/i)).messages({
        "string.base":"please enter a valid name ",
        "string.empty":"name cannot be empty",
        "any.required":"name must be entered",
        "string.pattern.base":"please enter a valid pattern"
      }),

      address:joi.string().empty().required().min(1).max(10).messages({
        "string.base":"please enter a valid address ",
        "string.empty":"address cannot be empty",
        "any.required":"address must be entered",
        "string.min":"no of characters must be between 1 and 10",
        "string.max":"no of characters must be between 1 and 10",
      }),

      phone:joi.string().empty().min(1).max(11).required().messages({
        "string.base":"please enter a valid phone",
        "string.empty": "phone cannot be empty",
        "string.min":"phone must be between 1 and 11",
        "string.max":"phone must be between 1 and 11",
        "any.required":"phone must be entered",
      }),

      role:joi.string().min(1).max(10).required().messages({
        "string.base":"please enter a valid role ",
        "string.min":"role must be between 1 and 10",
        "string.max":"role must be between 1 and 10",
        "any.required":"role must be entered",
      }),
     
  })
},

loginValidation:{
  body:joi.object().required().keys({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().required().messages({
        "string.email":"please enter a valid email ",
        "any.required":"email must be entered",
        "string.empty":"email cannot be empty"
    }),

    password:joi.string().empty().required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
        "string.base":"please enter a valid password ",
        "any.required":"password must be entered",
        "string.empty":"password cannot be empty",
        "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
    })
})
},

resetPasswordValidation:{
  body:joi.object().required().keys({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().required().messages({
        "string.email":"please enter a valid email ",
        "any.required":"email must be entered",
        "string.empty":"email cannot be empty"
    }),

    newPassword:joi.string().empty().required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
        "string.base":"please enter a valid password ",
        "any.required":"password must be entered",
        "string.empty":"password cannot be empty",
        "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
    })
})
},

updateUserValidation:{
    body:joi.object().required().keys({
      email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().optional().messages({
          "string.email":"please enter a valid email ",
          "string.empty":"email cannot be empty"
      }),

      password:joi.string().empty().optional()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
          "string.base":"please enter a valid password ",
          "string.empty":"password cannot be empty",
          "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
      }),

      name:joi.string().empty().optional().pattern(new RegExp(/^[a-z ]+$/i)).messages({
        "string.base":"please enter a valid name ",
        "string.empty":"name cannot be empty",
        "string.pattern.base":"please enter a valid name pattern"
      }),

      address:joi.string().empty().optional().min(1).max(10).messages({
        "string.base":"please enter a valid address ",
        "string.empty":"address cannot be empty",
        "string.min":"no of characters must be between 1 and 10",
        "string.max":"no of characters must be between 1 and 10",
      }),

      phone:joi.string().empty().min(1).max(11).optional().messages({
        "string.base":"please enter a valid phone ",
        "string.empty": "phone cannot be empty",
        "string.min":"phone must be between 1 and 11",
        "string.max":"phone must be between 1 and 11",
      }),

      role:joi.string().min(1).max(10).optional().messages({
        "string.base":"please enter a valid role ",
        "string.min":"role must be between 1 and 10",
        "string.max":"role must be between 1 and 10",
      }),
     
  })
},

}