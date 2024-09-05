let joi=require("joi");

module.exports={

createAuthorValidation:{
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
          "string.base":"please enter a valid name",
          "string.empty":"name cannot be empty",
          "any.required":"name must be entered",
          "string.pattern.base":"please enter a valid name pattern"
        }),
    
        Nationality:joi.string().empty().required().messages({
        "string.base":"please enter a valid Nationality",
        "string.empty":"Nationality cannot be empty",
        "any.required":"Nationality must be entered",
      }),

      biography:joi.string().empty().optional().messages({
        "string.base":"please enter a valid biography ",
        "string.empty":"biography cannot be empty",
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

updateAuthorValidation:{
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
    
        Nationality:joi.string().empty().optional().messages({
        "string.base":"please enter a valid Nationality",
        "string.empty":"Nationality cannot be empty",
      }),

      biography:joi.string().empty().optional().messages({
        "string.base":"please enter a valid biography",
        "string.empty":"biography cannot be empty",
      }),

  })
},

}

