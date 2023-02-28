import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
  const { title } = req.body;
  if (!(await Category.findOne({ title }).exec())) {
    await Category.create({ title })
      .then(() => {
        res.status(200).json("category added Successfully");
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "category already exists" });
  }
};

export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "category doesnt exist" });
      } else res.status(200).json("category removed Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCategory = async (req, res) => {
  const { title } = req.body;
  await Category.findByIdAndUpdate(req.params.id, { title })
    .exec()
    .then((result) => {
      if (!result) res.status(404).json({ error: "category doesnt exist" });
      else res.status(200).json("category updated Successfully");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
