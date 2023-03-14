import Book from "../models/Book.js";
import Borow_detail from "../models/Borrow_detail.js";
import User from "../models/User.js";

export const checkAccess = async (req, res, next) => {
  await User.findById(res.locals.user_id)
    .then((result) => {
      if (result) {
        if (result.access <= new Date().getTime()) next();
        else res.json("still Suspended! _ "+result.access);
      } else {
        res.json("user not found!");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
export const bookLimitCheck = async (req, res, next) => {
  await Borow_detail.find({ bookworm: res.locals.user_id, stat: "Reading" })
    .then((results) => {
      console.log(results.length);
      if (results.length >= 5) {
        res.json({ message: "cant borrow more than 5 books total" });
      } else {
        res.locals.books = results;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const bookDuesCheck = async (req, res, next) => {
  let found  = false;

  for (let index = 0; index <  res.locals.books.length; index++) {
      if( new Date().getTime() > res.locals.books[index].dueDate.getTime()){

          let ban = new Date().getTime() + 864000000; //10 days
          await User.findById(res.locals.user_id).then(async (user)=>{
              user.access = ban;
              await user.save();

          }).catch((err)=>{
              res.status(500).json({"error":err});
              return;
          });
          found = true;
          break;

      }

  }
  if(found){
      res.json({"message":"10 day suspension gg"});
  }else{
      next();
  }

  
};
