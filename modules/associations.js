const Author=require("./Author/author.model")
const Book=require("./Book/book.model")
const Borrowing=require("./Borrowing/borrowing.model")
const Publisher=require("./Publisher/publisher.model")
const Review=require("./Review/review.model")
const User=require("./User/user.model")

Author.hasMany(Book, { as: 'Books', foreignKey: 'authorId',onDelete: 'CASCADE' }); ; //{ foreignKey: 'authorId' });   // Each author can have many books


Book.belongsTo(Author,{ foreignKey: 'authorId' }); // Each book belongs to one author
Book.belongsTo(Publisher, { foreignKey: 'publisherId' }); // Each book belongs to one publisher
// // //
Book.hasMany(Borrowing, { foreignKey: 'bookId',onDelete: 'CASCADE' }); // Each book can have many borrowings
Book.hasMany(Review, { foreignKey: 'bookId',onDelete: 'CASCADE'  }); // Each book can have many reviews


Borrowing.belongsTo(User, { foreignKey: 'userId' }); // Each borrowing belongs to a user
Borrowing.belongsTo(Book, { foreignKey: 'bookId' }); 


Publisher.hasMany(Book,{as: 'Books',  foreignKey: 'publisherId' }); // Each publisher can have many books



Review.belongsTo(User, { foreignKey: 'userId' }); // Each review belongs to a user
Review.belongsTo(Book, { foreignKey: 'bookId' }); // Each


User.hasMany(Borrowing, {foreignKey: 'userId' });     // Each user can have many borrowings
User.hasMany(Review, {foreignKey: 'userId' }); 

module.exports={
  Author,
  Book,
  Borrowing,
  Publisher,
  Review,
  User  
}
