import  express  from "express";
import {auth} from '../middleware/auth.js';
import {addBook,deleteBook,updateBook,getAllBooks,getBook,borrowBook,returnBook} from '../controllers/bookController.js'

export const bookRoute = express.Router();

bookRoute.post('/',auth(['Employee']),addBook);
bookRoute.delete('/:id',auth(['Employee']),deleteBook);
bookRoute.put('/:id',auth(['Employee']),updateBook);
bookRoute.get('/',auth(['Employee','Bookworm']),getAllBooks);
bookRoute.get('/:id', auth(['Employee','Bookworm']),getBook);
bookRoute.post('/:id', auth(['Bookworm']),borrowBook);
bookRoute.delete('/:id/return', auth(['Bookworm']),returnBook);
