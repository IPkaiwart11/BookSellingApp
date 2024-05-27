// import Razorpay from 'razorpay';

// function Demo() {
//   const handlePayment = () => {
//     const options = {
//       key: 'your-key-id',
//       amount: '50000', // 500.00 INR in paisa
//       currency: 'INR',
//       name: 'Your App Name',
//       description: 'Test Transaction',
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//       },
//       prefill: {
//         name: 'Your Name',
//         email: 'your-email@example.com',
//         contact: '9999999999'
//       },
//       notes: {
//         address: 'Your Address'
//       },
//       theme: {
//         color: '#F37254'
//       }
//     };

//     const rzp = new Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Pay with Razorpay</button>
//     </div>
//   );
// }

// export default Demo;
