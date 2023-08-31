const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const Product = require('./models/productModel')
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/public/js',express.static(__dirname+'/public/js'));
app.use(cookieParser());
app.use(methodOverride('_method'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'vocabolarioDB';
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log(`Vocabolario API app is running on port 3000`);
    })
}).catch(()=>{
    console.log(error);
});

// routes



app.get('/produkt', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/products', async(req,res)=>{
  try {
      //const product = await Product.find({});
      const products = await Product.find({});
      res.render('index', {products});
      //res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message:error.message})
  }
})


app.get('/products/:id', async(req,res)=>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message:error.message})
  }
})

app.post('/words', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const category = req.body.category;
    res.redirect(`/words?category=${encodeURIComponent(category)}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// update a product
app.put('/products/:id', async(req,res)=>{
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      // we cannot find any product in database
      if(!product){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      const updateProduct = await Product.findById(id);
      res.status(200).json(updateProduct);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// delete a product

app.delete('/words/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Product.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: `Cannot find any question with ID ${id}` });
    }

    const category = req.query.category || '';
    res.redirect(`/main`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
//app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/main', requireAuth, async (req, res) => {
  try {
    const products = await Product.find({});
    const categories = [...new Set(products.map((product) => product.category))];

    // Oblicz liczbę pytań w poszczególnych kategoriach
    const questionCounts = {};
    products.forEach((product) => {
      const category = product.category;
      if (questionCounts[category]) {
        questionCounts[category]++;
      } else {
        questionCounts[category] = 1;
      }
    });

    res.render('main', { categories, questionCounts, products }); // Dodajemy przekazanie wartości products
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







app.get('/words', requireAuth, async (req, res) => {
  try {
    const category = req.query.category;
    const questions = await Product.find({ category });
    res.render('words', { questions, category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/miniGame1',(req,res)=>{res.render('miniGame1');})
app.get('/highScores', function(req,res){res.render('highScores');})
app.get('/end', function(req,res){res.render('end');})
app.get('/miniGame2', (req,res)=>{res.render('miniGame2');})
app.get('/miniGame3', (req,res)=>{res.render('miniGame3');})







app.use(authRoutes);
