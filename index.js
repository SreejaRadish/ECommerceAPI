const { response } = require('express');
const express=require('express');
const app=express();
const pool = require('./ECommerceAPI/db');

app.use(express.json());

//routes

//add a user
app.post('/users',async(req,res) => {
    try {
        const {name,email} = req.body;
       
const newUser =await pool.query("insert into users(user_name,user_email) values($1,$2) returning *",[name,email]);
res.json(newUser.rows[0]);
    } 
    catch (err) {
        console.error(err.message);
    }
});
//get all users
app.get('/users', async(req,res) => {
try {
    const allUsers = await pool.query("select * from users");
    res.json(allUsers.rows);
}
catch (err) {
    console.error(err.message);
}
});
// add a product
app.post('/products',async(req,res) => {
    try {
        const {productName,description,price} = req.body;
       
const newProduct =await pool.query("insert into products(product_name,description,price) values($1,$2,$3) returning *",[productName,description,price]);
res.json(newProduct.rows[0]);
    } 
    catch (err) {
        console.error(err.message);
    }
});
//get all products
app.get('/products', async(req,res) => {
    try {
        const allProducts = await pool.query("select * from products");
        res.json(allProducts.rows);
    }
    catch (err) {
        console.error(err.message);
    }
    });
//update Products
app.put('/products/:id',async(req,res) => {
    try {
        const {id}= req.params;
        const {name,description,price} = req.body;
    const updatedProduct = await pool.query("update products set product_name=$1, description=$2,  price=$3 where id=$4",[name,description,price,id]);
    res.json(updatedProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
  
});
//Delete a Product
app.delete('/products/:id' ,async(req,res) => {
try {
    const {id} = req.params;
    const deleteProduct =  await pool.query("delete from products where id=$1" ,[id]);
    console.log("Product deleted");
} catch (err) {
    console.error(err.message);
}
});
//add orders
app.post('/orders' ,async(req,res) => {
try {
    const {userid,productid,qty,total} =req.body;
    const addOrder = await pool.query("insert into orders(user_id,product_id,qty,total) values($1,$2,$3,$4)",[userid,productid,qty,total]);
    res.json(addOrder[0]);
} catch (err) {
    console.error(err.message);
}
});
app.listen(3000,()=> {
    console.log('Server is listening to 3000');
});