const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash')
require('dotenv').config();

// Middlewares
const upload = require('./middlewares/upload');

// Models
const Product = require('./models/products');

// Controllers
const productController = require('./controllers/productController');
const insertController = require('./controllers/insertController');
const singlepageController = require('./controllers/singlepageController');

mongoose.connect('mongodb+srv://admin:123@cluster0.c1unsli.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


app.get('/', productController);
app.post('/insert', upload.single('image'), insertController);
app.get('/detail/:code', singlepageController);

const PORT = 5000

app.listen(PORT, () => console.log(`API Listening on PORT ${PORT}`));
