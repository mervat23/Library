const {Author,Publisher,Book,Review,Borrowing}=require("../associations")
const bcrypt = require('bcrypt');
const {Op} =require("sequelize")


exports.isExist = async (filter) => {
  try{
  let publisher = await Publisher.findOne(filter);

  if (publisher) {
    return {
      code: 200,
      success: true,
      data: publisher,
    };

  } else {
    return {
      code: 404,
      success: false,
      error: "publisher is not found",
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
    const publishers = await Publisher.findAll({
      attributes: { exclude: ['password'] }

  });

    if (publishers.length>0) {
      return {
        code: 200,
        success: true,
        data: publishers,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "publishers not found",
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
      if (form.email) form.email = form.email.toLowerCase();
      const publisher = await this.isExist({ where: { email: form.email } });
  
      if (publisher.success) {
  
        return {
          code: 400,
          success: false,
          error: "publisher already exists",
        };
      }
        const newPublisher = await Publisher.create(form);
        
        return {
          code: 201,
          success: true,
          data: newPublisher,
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
  

exports.get = async (filter) => {
  try {
    if(!filter.id){  
      return {
          success: false,
          code: 400,
          error: "publisher ID required"
      }
    
    }

    const publisher = await Publisher.findOne({
      where: filter,
      attributes: { exclude: ['password'] }  
    });

    if (publisher) {
      return {
        code: 200,
        success: true,
        publisher,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Publisher not found",
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
};//   //getPublisherDetails,Access Publisher Information


exports.update = async (id, form) => {
  try {
    const publisher= await this.isExist({ where: { id} });
    let updatedPublisher
    if (publisher.success) {
    
      if (form.name && form.name!=publisher.name) 
        {
          const books = await Book.findAll({ where: {publisherId:id } });
    
          // Delete associated borrowings and reviews for each book
          for (const book of books) {
            await Borrowing.destroy({ where: { bookId: book.id } });
            await Review.destroy({ where: { bookId: book.id } });
          }
          await Book.destroy({ where: {publisherId: id } });

        }
    
        await Publisher.update(form,{ where: { id} });
        updatedPublisher= await this.isExist({ where: { id} }); 
       
      return {
        code: 201,
        success: true,
        data: updatedPublisher,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Publisher not found",
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


exports.remove = async (id) => {
  try {
    const publisher = await this.isExist({ where: { id} });

    if (publisher.success) {
      const books = await Book.findAll({ where: {publisherId:id } });
      for (const book of books) {
       await Borrowing.destroy({ where: { bookId: book.id } });
       await Review.destroy({ where: { bookId: book.id } });
      }
      const deletedBook =await Book.destroy({ where: {publisherId: id } });
      const deletedPublisher= await Publisher.destroy({ where: { id} });  
       

      return {
        success: true,
        code: 200,
        data:{
        deletedBook,
        deletedPublisher  
        }
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Publisher not found",
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


exports.compare= async (email, password) => {

    try {
      email = email.toLowerCase();
      const publisher = await this.isExist({ where: { email } });
  
      if (publisher.success) {
        const match = await bcrypt.compare(password, publisher.data.password);
  
        if (match) {
          return {
            code: 200,
            success: true,
            data: publisher
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
          error: "Publisher not found"
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
      const publisher = await this.isExist({ where: { email } });
  
      let saltrouds = 5;
      if (publisher.success) {
        const hashedPassword = await bcrypt.hash(newPassword, saltrouds);
        await Publisher.update({ password: hashedPassword },{where:{email}});
  
        return {
          code: 200,
          success: true,
          data: publisher
        };
      } else {
        return {
          code: 404,
          success: false,
          error: "Publisher not found"
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
  

exports.search= async (query) => {
  try {
    if (Object.keys(query).length === 0){
      return{
      success:false,
      code:400,
      message:'At least one search parameter is required'
      }  
  }
    const searchConditions = Object.keys(query).map(key => ({
      [key]: { [Op.like]: `%${query[key]}%` }
  }));

  const publishers = await Publisher.findAll({
      where: {
          [Op.and]: searchConditions
      },
      attributes: { exclude: ['password'] } 

  });
    if(publishers.length>0)
    return {
      code:200,
      success: true,
      publishers,
    };
    else{
    return {
      code:404,
      success: false,
      error:"publishers not found",
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


exports.getBooks = async (publisherId) => {
  try {
    
    const books = await Book.findAll({
      where: {publisherId },
      include: [
        {
          model: Author,
          attributes: ['id', 'name',]
        },
        {
          model: Publisher,
          attributes: ['id', 'name'],
        }
      ],
      attributes: ['id','isbn' ,'title', 'genre', 'publicationYear'],
      order: [['title', 'ASC']] 
    });

    if (books.length>0) {
      return {
        code: 200,
        success: true,
        books,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "books of publisher not found",
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


