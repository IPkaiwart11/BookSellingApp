const Order = require("../models/Order");
const {
  // verifyToken,
  // verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//////////////
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json( {error: "Internal Server Error" });
  }
});
/////////////
//ORDER TRACKING
// router.post("/update-tracking/:orderid", verifyToken, async (req, res) => {
router.post("/update-tracking/:_id", async (req, res) => {
  const  orderId  = req.params;
  const { status, location } = req.body;

  try {
    const order = await Order.findById(orderId);
    if(!order){
      return res.status(404).json({message: 'Order not found'})
    }
    order.tracking.status = status;
    order.tracking.updates.push({location, status});
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//////////
//TRACKING
router.get('/tracking/:_id', async(req,res)=> {
  const orderId = req.params;
  try {
    const order = await Order.findById(orderId);
    if(!order){
      return res.status(404).json({message: 'Order not found'});
    }
    res.status(200).json(order.tracking);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

/////////////
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
