let app=require("express").Router()

let bookRoutes=require("./book.route")
let authorRoutes=require("./author.route")
let borrowingRoutes=require("./borrowing.route")
let publisherRoutes=require("./publisher.route")
let reviewRoutes=require("./review.route")
let userRoutes=require("./user.route")

app.use(bookRoutes)
app.use(authorRoutes)
app.use(borrowingRoutes)
app.use(publisherRoutes)
app.use(reviewRoutes)
app.use(userRoutes)

module.exports=app