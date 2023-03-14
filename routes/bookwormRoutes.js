import  express  from "express";
import {auth} from '../middleware/auth.js';
import {getBookWormHistory} from '../controllers/bookController.js'

export const bookwormRoute = express.Router();

bookwormRoute.get('/stats', auth(["Bookworm"]), getBookWormHistory);

