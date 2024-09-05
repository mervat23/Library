const {create,update,reset,compare}=require("../../modules/Author/author.repo")
let{sendMail}=require("../../utils/email.util")
const utils=require("../../utils/token.util")


let register = async(req, res) => {
    try{
    const result=await create(req.body)    
    if (result.success) {
    payload = {
        id: result.data.id, name: result.data.name, email: result.data.email}
    const token = utils.generateToken(payload);
    const activationLink=`Hi! There, You have recently visited 
    our website and entered your email. 
    Please follow the given link to verify your email 
    http://localhost:3000/api/v1/author/verify/${token} 
    Thanks` 
    await sendMail(
      result.data.email,
      "wibad83092@togito.com",
      'Email Verification',
      activationLink,
    )
   
     res.status(result.code).json({token,result,activationLink})
    }
    else {
      res.status(result.code).json(result);
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
}


const updateAuthor= async (req, res) => {
    try {
      const targetAuthorId = req.params.id;
      const updatedFields = req.body;
  
      const result = await update(targetAuthorId,updatedFields);
  
      if (result) {
        res.status(result.code).json(result);
      } else {
        res.status(result.code).json({ error: result.error });
      }
    } catch (err) {
      res.status(500).json({ error: "Unexpected error!" });
    }
};
  

  let login = async (req, res) => {
    try {
      const {email, password } = req.body;
      const result = await compare(email, password);
      if (result.success) {
         payload = {
          id: result.data.id,name: result.data.name, email: result.data.email,
        }
        const token = utils.generateToken(payload);
        res.status(result.code).json({token,result:result.data})
      }
      else {
        res.status(result.code).json({result})
      }
    } catch (err) {
      res.status(500).json({err: "unexpected error!"})  
  
    }
  }


let resetPassword = async (req, res) => {
    try {
        const result = await reset(req.body.email, req.body.newPassword);
        if(result.success){
        res.status(result.code).json({result:result.data});
        }
        else{
          res.status(result.code).json(result); 
        }
    } catch (err) {
      res.status(500).json({err: "unexpected error!"})  
    }
}

exports.generateRecoveryCode = async (req, res) => {
  let randomCode = Math.random() * 1000000;
  req.session.randomCode = randomCode
  await req.session.save();

  let receiver = req.body.email;
  let subject = "Reset Your Password";
  let text = "You have forgotten your password, here is your recovery code";
  let html = `<h1>${randomCode}</h1>`
  await sendMail(receiver, subject, text, html)
  res.status(201).json({ massage: "Success!" })
}

exports.checkRecoveryCode = async (req, res) => {
  recoveryCode = req.params.code
  if (recoveryCode == req.session.randomCode) res.status(200).json({ massage: "Success!" })
  else return res.status(400).json({ massage: "Incorrect Code" })
}

// let verifyToken=async(req,res)=>{
// //   try{
// //   let token=await utils.verify()
// //   console.log(token)
// //   if (token) {
// //     res.status(token.code).json(token);
// //   } else {
// //     res.status(token.code).json(token);
// //   } 
// // }catch (err) {
// //   res.status(500).json({ error: "Unexpected error!" });
// // }


// try {
//   let token = req.params.token; // Adjust this based on how you receive the token
//   let decodedToken =  utils.verify(token, process.env.TOKEN_SECRET);
//   console.log(decodedToken)
//   if (decodedToken) {
//       res.status(200).json({ message: "Token verified successfully", token: decodedToken });
//   } else {
//       res.status(403).json({ message: "Invalid Token" });
//   }
// } catch (err) {
//   res.status(500).json({ error: "Unexpected error!" });
// }

// }

module.exports={
 register,
 updateAuthor,
 login,
 resetPassword,
//  verifyToken
}