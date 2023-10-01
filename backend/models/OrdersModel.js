import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
  product_id: {
    type: Types.ObjectId,
    ref: "Product",
  },
  user_id: {
    type: Types.ObjectId,
    ref: "User",
  },
  discount_rs: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  cgst: {
    type: Number,
  },
  sgst: {
    type: Number,
  },
  igst: {
    type: Number,
  },
  payble_amt: {
    type: Number,
  },
  order_status: {
    type: String,
    enum: [
      "payment_pending",
      "payment_success",
      "accepted",
      "rejected",
      "preparing",
      "on_the_way",
      "deliverd",
      "refunded",
      "payment_failed",
    ],
  },
});
const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
// Manage orders
// product_id
// user_id
// discount_RS
// QTY
// cgst
// sgst
// igst
// payble amount
// order_status["payment_pending",
// 			"payment_success",
// 			"accepted",
// 			"rejected",
// 			"preparing",
// 			"on_the_way",
// 			"deliverd",
// 			"refunded",
// 			"payment_failed",
// ]
// delivery_person:{

// person_name:String
// person_contact_no : String
// }
