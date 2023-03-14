import  express  from "express";
import {auth} from '../middleware/auth.js';
import {renewBook,addBook,deleteBook,updateBook,getAllBooks,getBook,borrowBook,returnBook,commentBook,replyComment,removeCommentBook,editCommentBook, removeReplyComment, editReplyComment} from '../controllers/bookController.js'
import { bookLimitCheck, bookDuesCheck ,checkAccess} from "../middleware/borrow.js";
export const bookRoute = express.Router();

bookRoute.post('/',auth(['Employee']),addBook);
bookRoute.delete('/:id',auth(['Employee']),deleteBook);
bookRoute.put('/:id',auth(['Employee']),updateBook);
bookRoute.get('/',auth(['Employee','Bookworm']),getAllBooks);
bookRoute.get('/:id', auth(['Employee','Bookworm']),getBook);
bookRoute.post('/:id', [auth(['Bookworm']),checkAccess, bookLimitCheck, bookDuesCheck],borrowBook);
bookRoute.put('/:id/return', auth(['Bookworm']),returnBook);
bookRoute.put('/:id/renew', auth(['Bookworm']),renewBook);

//comment section and reply

bookRoute.post('/:id/comments', auth(['Bookworm']), commentBook);
bookRoute.delete('/:id/comments', auth(['Bookworm']), removeCommentBook);
bookRoute.put('/:id/comments', auth(['Bookworm']), editCommentBook);


bookRoute.post('/comments/:id', auth(['Bookworm']), replyComment);
bookRoute.delete('/comments/:id', auth(['Bookworm']), removeReplyComment);
bookRoute.put('/comments/:id', auth(['Bookworm']), editReplyComment);