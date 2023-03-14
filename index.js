import  express   from 'express';
import mongoose from 'mongoose';
// import {register} from './controllers/bookwormContoller.js'
import {Login} from './controllers/userController.js'
import {register} from './controllers/bookwormContoller.js'
import { categoryRoute } from './routes/categoryRoutes.js';
import { bookRoute } from './routes/bookRoutes.js';
import { adminRoute } from './routes/adminRoutes.js';
import {bookwormRoute} from './routes/bookwormRoutes.js'
import cookieParser from 'cookie-parser' ;
mongoose.set('strictQuery', false);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://riadhidir5:bIKlHStd0ezgzaFQ@cluster0.aha4g2i.mongodb.net/Cluster0?retryWrites=true&w=majority").then(()=>{
app.listen(3000, ()=>{console.log('http://localhost:3000')});
});

app.use('/admin', adminRoute);
app.use('/profile', bookwormRoute);
app.use('/categories',categoryRoute);
app.use('/books',bookRoute);

app.post('/register',register);

app.post('/login',Login);