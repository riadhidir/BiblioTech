import  express  from "express";
import {auth} from '../middleware/auth.js';
import {addCategory,deleteCategory,updateCategory} from '../controllers/categoryController.js'
export const categoryRoute = express.Router();

categoryRoute.post('/',auth(['Employee']),addCategory);
categoryRoute.delete('/:id',auth(['Employee']),deleteCategory);
categoryRoute.put('/:id',auth(['Employee']),updateCategory);
