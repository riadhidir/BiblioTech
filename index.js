import  express   from 'express';
import mongoose from 'mongoose';
// import {register} from './controllers/bookwormContoller.js'
import {Login} from './controllers/userController.js'
import {register} from './controllers/employeeController.js'
import { categoryRoute } from './routes/categoryRoutes.js';
import { bookRoute } from './routes/bookRoutes.js';

mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://riadhidir5:bIKlHStd0ezgzaFQ@cluster0.aha4g2i.mongodb.net/Cluster0?retryWrites=true&w=majority").then(()=>{
app.listen(3000, ()=>{console.log('http://localhost:3000')});
});


app.use('/categories',categoryRoute);
app.use('/books',bookRoute)
app.post('/register',register);
app.post('/login',Login);