const exp = require("express");
const User = require("../models/DbModel");
const router = exp.Router()

router.route("/loginUser").get(async (req, res)=>{
    const showProduct = await User.find();

    if(res){
     
     res.json({
         success: true,
         showProduct
     });
    }

})
router.route("/loginUser/:id").get(async (req, res) => {
    // Extract ID from request parameters
    const id = req.params.id;
  
    try {
      // Asynchronously find the user by ID
      const showProduct = await User.findById(id);
  
      // Send a successful response if user found
      if (showProduct) {
        res.json({ success: true, showProduct });
      } else {
        // Handle case where user is not found
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  

module.exports= router