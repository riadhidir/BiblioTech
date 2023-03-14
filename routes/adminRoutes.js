import  express  from "express";
import {auth} from '../middleware/auth.js';
import {getStats} from '../controllers/bookController.js'
import {register} from '../controllers/employeeController.js'

export const adminRoute = express.Router();

adminRoute.get('/stats', auth(["Employee"]), getStats);
adminRoute.post('/register',register);
