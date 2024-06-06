const exp = require("express")
const User = require("../models/DbModel")
const router = exp.Router()

router.route("/login").post(async (req, res)=>{
   
    const {name, email, password} = (req.body)
    const user = await User.findOne({email});

    if(!user){

        const newUser = new User({name, email, password})
        console.log(newUser)
        await newUser.save();

        return res.status(201).json({message:"success Created"})
    }
 res.status(404).json({
    message:"User Already Exist"
 })
    
})

module.exports = router;
