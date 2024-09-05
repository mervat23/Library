const roles=require("../roles")
const adminPolicy=require("./admin.policy")
const librarian=require("./librarian.policy")
const member=require("./member.policy")

const opts={
    [roles.ADMIN]:{can:adminPolicy},
    [roles.LIBRARIAN]:{can:librarian},
    [roles.MEMBER]:{can:member},
}

module.exports=opts