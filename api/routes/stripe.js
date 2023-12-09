// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
// // const KEY = process.env.STRIPE_KEY
// // const stripe = require("stripe")(KEY);

// router.post("/payment", (req, res) => {
//   console.log("Received payment request:", req.body);
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "inr",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         console.error("Stripe error:", stripeErr);
//         res.status(500).json(stripeErr);
//       } else {
//         console.log("Stripe response:", stripeRes);
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });



// ////////////////
// // router.post("/payment",async(req,res)=>{
// //   const {products} = req.body;


// //   const lineItems = products?.map((product)=>({
// //       price_data:{
// //           currency:"inr",
// //           product_data:{
// //     title: product.title,
// //     desc:product.desc,
// //     img: product.img,
// //     categories: [product.categories],
// //     language: [product.language],
// //     typeOfBook: product.typeOfBook,
// //     price: product.price,
// //           },
// //           unit_amount:product.price * 100,
// //       },
// //       quantity:product.qnty
// //   }));

// //   const session = await stripe.checkout.sessions.create({
// //       payment_method_types:["card"],
// //       line_items:lineItems,
// //       mode:"payment",
// //       success_url:"http://localhost:3000/Success",
// //       cancel_url:"http://localhost:3000/cancel",
// //   });

// //   res.json({id:session.id})

// // })


// module.exports = router;
