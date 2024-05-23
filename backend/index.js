const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());
// Database connection with MongoDB
mongoose.connect("mongodb+srv://2251120326:123@cluster0.ljkoqkz.mongodb.net/PTTKHT");
// API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})
// Image Storage Engine
const storage = multer.diskStorage(
    {
        destination : './upload/images',
        filename : (req,file,cb)=>{
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    }
)
const upload = multer({storage:storage})
// Creating Upload and Endpoint images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//Schema for Creating Product
const Product = mongoose.model("Product",{
    id : {
        type : Number,
        required : true,
    },
    name :{
        type : String,
        required : true,
    },
    image :{
        type : String,
        required : true,
    },
    category:{
        type : String,
        required : true,
    },
    new_price:{
        type : Number,
        required : true,
    },
    old_price:{
        type : Number,
        required : true,
    },
    date:{
        type : Date,
        default: Date.now,
    },
    avilable:{
        type : Boolean,
        default: true,
    },
    quantity:{
        type : Number,
        required : true,
    }
})
// Schema for User
const Users = mongoose.model('User',{
    name :{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type : Date,
        default: Date.now,
    },
    phone:{
        type : String,
        required : true,
    },
    address:{
        type : String,
        required : true,
    },

})
const PromoteCode = mongoose.model('PromoteCode', {
    code: {
        type: String,
        required: true, // added required for better data integrity
    },
    value: {
        type: Number,
        required: true, // added required for better data integrity
    },
});
const OrderDetail = mongoose.model('OrderDetail', {
    customerID: {
        type: String,
        required: true, // added required for better data integrity
    },
    value: {
        type: Number,
        required: true, // added required for better data integrity
    },
    date:{
        type : Date,
        default: Date.now,
    },
});
app.post('/addorderdetail',async (req,res)=>{
    const orderdetail = new OrderDetail({
        customerID : req.body.customerID,
        value : req.body.value,
        date : req.body.date,

    });
    console.log(orderdetail);
    await orderdetail.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
app.get('/allorderdetail',async (req,res)=>{
    let orderdetails = await OrderDetail.find({})
    console.log("All OrderDetail Fetched");
    res.send(orderdetails);
})
app.post('/addpromotecode',async (req,res)=>{
    const promotecode = new PromoteCode({
        code : req.body.code,
        value : req.body.value,

    });
    console.log(promotecode);
    await promotecode.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
app.get('/allpromotecode',async (req,res)=>{
    let promotecodes = await PromoteCode.find({})
    console.log("All Promotecode Fetched");
    res.send(promotecodes);
})
//Creating endpoint for registering for User

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name : req.body.name,
        image : req.body.image,
        category: req.body.category,
        new_price : req.body.new_price,
        old_price:req.body.old_price,
        quantity:req.body.quantity

    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for Deleting product
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success : true,
        name : req.body.name
    })
})
// Creating API for products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({})
    console.log("All Product Fetched");
    res.send(products);
})
app.post('/signup', async (req, res) => {
    try {
        // Check if a user with the same email already exists
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Existing user found with this email address" });
        }

        // Initialize cart data
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
            phone: req.body.phone,
            address: req.body.address
        });

        // Save the user to the database
        await user.save();

        // Prepare data for JWT
        const data = {
            user: {
                id: user.id
            }
        };

        // Sign the JWT
        const token = jwt.sign(data, 'secret_ecom');

        // Send response with token and user details
        res.json({
            success: true,
            token,
            user: {
                name: user.name,
                phone: user.phone,
                address: user.address,
                email : user.email
            }
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            // If passwords match, construct the response object
            const data = {
                user: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    email : user.email
                }
            };
            // Sign the token with user data
            const token = jwt.sign(data, 'secret_ecom');
            // Send the response with success status, token, and user information
            res.json({
                success: true,
                token,
                user: {
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    email : user.email
                }
            });
        } else {
            // Passwords don't match
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        // User not found
        res.json({ success: false, errors: "Wrong Email ID" });
    }
});

// creating endpoint for new collection data
app.get('/newcollection',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-4);
    console.log("New Collection Fetch");
    res.send(newcollection);
})
// creating endpoint for popular in women
app.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popularinwomen = products.slice(0,4);
    console.log("Popular in women Fetch");
    res.send(popularinwomen);
})
app.get('/popularinman',async (req,res)=>{
    let products = await Product.find({category:"men"});
    let popularinman = products.slice(0,4);
    console.log("Popular in man Fetch");
    res.send(popularinman);
})
app.get('/popularinkid',async (req,res)=>{
    let products = await Product.find({category:"kid"});
    let popularinkid = products.slice(0,4);
    console.log("Popular in kid Fetch");
    res.send(popularinkid);
})

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenciate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
      // Fetch user data
      let userData = await Users.findOne({ _id: req.user.id });
  
      // Initialize cartData if it doesn't exist
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
      // Increment the item quantity or initialize it if it doesn't exist
      if (!userData.cartData[req.body.itemId]) {
        userData.cartData[req.body.itemId] = 1;
      } else {
        userData.cartData[req.body.itemId] += 1;
      }
  
      // Update the user data in the database
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  
      res.send("Added");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while adding to cart");
    }
  });
  
  app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed")
    try {
      // Fetch user data
      let userData = await Users.findOne({ _id: req.user.id });
  
      // Initialize cartData if it doesn't exist
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
      // Increment the item quantity or initialize it if it doesn't exist
      if (userData.cartData[req.body.itemId]>0) {
        userData.cartData[req.body.itemId] -= 1;
      }
  
      // Update the user data in the database
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  
      res.send("Remove");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while adding to cart");
    }
  });
app.listen(port,(error)=>{
    if(!error){
        console.log("Sever Running on Port "+port)
 
    }
    else{
        console.log("Error : "+error)
    }
})
