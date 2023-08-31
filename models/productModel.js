const mongoose = require('mongoose');

/*const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)*/


const productSchema = mongoose.Schema(
    {
        question:{
            type: String,
            required: [true, "Please enter a product name"]
        },
        choice1:{
            type: String,
            required: false,
        },
        choice2:{
            type: String,
            required: false,
        },
        choice3: {
            type: String,
            required: false,
        },
        answer: {
            type: Number,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)



const Product = mongoose.model('Product', productSchema);


module.exports = Product;