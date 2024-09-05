let app=require("express").Router()

let adminRoutes=require("./Admin/index.routes")
let memberRoutes=require("./Member/index.routes")
let librarianRoutes=require("./Librarian/index.routes")
let authorAuthRoutes=require("./Auth/author.auth.routes")
let publisherAuthRoutes=require("./Auth/publisher.auth.routes")
let userAuthRoutes=require("./Auth/user.auth.routes")


app.use("/api/v1/admin",adminRoutes)
app.use("/api/v1/member",memberRoutes)
app.use("/api/v1/librarian",librarianRoutes)

app.use("/api/v1/author",authorAuthRoutes)
app.use("/api/v1/publisher",publisherAuthRoutes)
app.use("/api/v1/user",userAuthRoutes)


module.exports=app