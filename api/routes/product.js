const Product = require("../models/Product");
const {
  verifyToken,
//   verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//   const newProduct = new Product(req.body);

  router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////
// Endpoint to add a review
router.post('/:_id', async (req, res) => {
  const productId  = req.params;
  const { userId, rating, comment } = req.body;
// console.log("productId:", productId);
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = {
      user: userId,
      rating,
      comment,
    };

    product.reviews.push(review);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////////
// Endpoint to fetch reviews
router.get('/:_id', async (req, res) => {
  const  productId  = req.params;
  console.log("productId:", productId);
  try {
    const product = await Product.findById(productId).populate('reviews.user', 'name'); // Populate user details if necessary
    if (!product) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////

module.exports = router;
