const {Author,Book,Borrowing,Review}=require("../associations")
let bcrypt = require('bcrypt');
const {Op}=require('sequelize')


exports.isExist = async (filter) => {
  try {
    const author = await Author.findOne(filter);

    if (author) {
      return {
        code: 200,
        success: true,
        data: author
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "author is not found",
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
    const authors = await Author.findAll({
      attributes: { exclude: ['password'] }
    });

    if (authors.length>0) {
      return {
        code: 200,
        success: true,
        data: authors,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "authors not found",
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



exports.getBooks = async (authorId) => {
  try {
    const author =await this.isExist({where:{id:authorId},
      attributes: ['name', 'email','Nationality','biography'],  
      include: {
          model: Book,
          as: 'Books',  
          attributes: ['isbn', 'title','description'],  
      }
  });  
    if (author) {
      return {
        code: 200,
        success: true,
        data:author,
        };
        
      } else {
        return {
          code: 404,
          success: false,
          error: "authors not found",
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
    const author = await this.isExist({ where: { email: form.email } });

    if (author.success) {

      return {
        code: 400,
        success: false,
        error: "author already exists",
      };
    }
      const newAuthor = await Author.create(form);
      
      return {
        code: 201,
        success: true,
        data: newAuthor,
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
    const author = await this.isExist({ where: {id} });

    let updatedAuthor;
    if (author.success) {
      if (form.name && form.name!=author.name) 
    {
      const books = await Book.findAll({ where: {authorId:id } });

      // Delete associated borrowings and reviews for each book
      for (const book of books) {
        await Borrowing.destroy({ where: { bookId: book.id } });
        await Review.destroy({ where: { bookId: book.id } });
      }
      await Book.destroy({ where: {authorId: id } });

    }

    await Author.update(form,{ where: { id} });
    updatedAuthor= await this.isExist({ where: { id} }); 
   
      return {
        code: 201,
        success: true,
        data: updatedAuthor,
      };
    
    } else {
      return {
        code: 404,
        success: false,
        error: "Author not found",
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
}; 



exports.get = async (filter) => {

  try {
    if(!filter.id){  
      return {
          success: false,
          code: 400,
          error: "author ID required"
      }
    
    }
    const author = await Author.findOne({
      where: filter,
      attributes: { exclude: ['password'] }
    });

    if (author) {
      return {
        code: 200,
        success: true,
        author,
      };

    } else {
      return {
        code: 404,
        success: false,
        error: "Author not found",
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
    const author =  await this.isExist({ where: {id} });

    if (author.success) {
      const books = await Book.findAll({ where: {authorId:id } });
      for (const book of books) {
        await Borrowing.destroy({ where: { bookId: book.id } });
        await Review.destroy({ where: { bookId: book.id } });
        
      }
      await Book.destroy({ where: {authorId: id } });
      const deletedAuthor= await Author.destroy({ where: { id} });  
       
      return {
        success: true,
        code: 200,
        data:{
        deletedAuthor
        }

      };

    } else {
      return {
        code: 404,
        success: false,
        error: "Author not found",
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
}; 



exports.compare = async (email, password) => {

  try {
    email = email.toLowerCase();
    const author = await this.isExist({ where: { email } });

    if (author.success) {
      const match = await bcrypt.compare(password, author.data.password);

      if (match) {
        return {
          code: 200,
          success: true,
          data:author
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
        error: "Author not found"
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
    const author = await this.isExist({ where: { email } });

    let saltrouds = 5;
    if (author.success) {
      const hashedPassword = await bcrypt.hash(newPassword, saltrouds);
      await Author.update({ password: hashedPassword },{where:{email}});

      return {
        code: 200,
        success: true,
        data: author
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Author not found"
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


exports.search = async (query) => {
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

  const authors = await Author.findAll({
      where: {
          [Op.and]: searchConditions
      },
      attributes: { exclude: ['password'] } 

  });
    if(authors.length>0)
    return {
      code:200,
      success: true,
      authors,
    };
    else{
    return {
      code:404,
      success: false,
      error:"authors not found",
    };
  }
  } catch (error) {
    console.error('Error:', error.message);
    return {
      success: false,
      error: 'Unexpected error',
    };
  }
}; //




