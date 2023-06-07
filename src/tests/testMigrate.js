const sequelize = require('../utils/connection');
const User = require("../models/User")
require("../models/Category")

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "testUser",
            lastName: "testUser",
            email: "testuser@gmail.com",
            password: "1234",
            phone:"+593985985985"
        })

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();