import Book from "../models/Book.js";
import Bookworm from "../models/Bookworm.js";
import { getUserId } from "../utilities/userUtilities.js";
import Borow_detail from "../models/Borrow_detail.js";
import Category from "../models/Category.js";
import { Promise } from "mongoose";

export const addBook = async (req, res) => {
  const { title, author, copies_number, categories } = req.body;

  const _categories = await Category.getCategoryByTitle(categories);

  if (!(await Book.findOne({ title }).exec())) {
    await Book.create({
      title,
      author,
      copies_number,
      categories: _categories,
    })
      .then(() => {
        res.status(200).json("Book added Successfully");
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(200).json({ error: "Book exists already" });
  }
};

export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "book doesnt exist" });
      } else res.status(200).json("book removed Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateBook = async (req, res) => {
  const { title, copies_number, author } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, copies_number, author })
    .exec()
    .then((result) => {
      if (!result) res.status(404).json({ error: "book doesnt exist" });
      else res.status(200).json("book updated Successfully");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const getAllBooks = async (req, res) => {
  const title = req.query.title || ".*";

  let categories = req.query.categories || ".*";
  const author = req.query.author || ".*";
  const _results = [];
  await Book.find(
    {
      available_copies: { $gt: 0 },
      title: { $regex: new RegExp(title, "i") },
      author: { $regex: new RegExp(author, "i") },
    },
    "author title rating categories"
  )
    .populate("categories", "title")
    .then((results) => {
      // console.log(typeof(results)+"\n"+ results)
      // console.log(results);
      if (results.length > 0) {
        if (!Array.isArray(categories)) {
          categories = [categories];
        }

        if (categories.length >= 0) {
          results.forEach((row) => {
            for (let index = 0; index < row.categories.length; index++) {
              if (categories.includes(row.categories[index].title)) {
                _results.push(row);
                break;
              }
            }
          });
          if (_results.length == 0) {
            res.status(200).json({ message: "book not found" });
          } else {
            res.status(200).json(_results);
          }
        } else {
          res.status(200).json(results);
        }
      } else {
        res.status(400).json({ message: "Book not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const getBook = async (req, res) => {
  await Book.findById(req.params.id, "author title rating available_copies")
    .exec()
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(400).json("Book doesnt exist");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  await Borow_detail.find({ book: book._id, bookworm: getUserId(req) })
    .exec()
    .then(async (result) => {

      if (result.length <= 0) {
        await Borow_detail.find({ bookworm: getUserId(req) })
          .exec()
          .then(async (results) => {
            const log = [];
            const month = 30 * 24 * 60 * 60 * 1000;
            results.forEach((row) => {
              if (new Date() - new Date(row.createdAt) <= month) {
                log.push(row);
              }
            });
            if (log.length >= 3) {
              return res.json("max borrows for this month");
            } else {
              if (book.available_copies > 0) {
                await Borow_detail.create({
                  bookworm: getUserId(req),
                  book: book._id,
                })
                  .then(() => {
                    book.available_copies--;
                    book.borrowing_number++;
                    book.save();
                    res.status(200).json("book borrowed successfully");
                  })
                  .catch((err) => {
                    res.status(500).json({ error: err });
                  });
              } else {
                res
                  .status(400)
                  .json({ error: "book not available at the moment" });
              }
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(400).json({ message: "book already taken" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const returnBook = async (req, res) => {
  await Borow_detail.findByIdAndDelete(req.params.id)
    .exec()
    .then(async (result) => {
      if (result) {
        await Book.findById(result.book)
          .exec()
          .then((book) => {
            book.available_copies++;
            book.save();
            res.status(200).json("book returned successfully");
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(400).json("book already returned!");
      }
    });
};
