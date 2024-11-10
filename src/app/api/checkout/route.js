import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
import { MenuItem } from "../../models/MenuItem";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const stripe = require("stripe")(process.env.STRIPE_SK);
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  // List out ordered items in strip checkout
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if (cartProduct.count) {
      const count = productInfo.counts.find(
        (count) => count._id.toString() === cartProduct.count._id.toString()
      );
      productPrice += count.price;
    }
    if (cartProduct.flavours?.length > 0) {
      for (const cartProductFlavour of cartProduct.flavours) {
        const productFlavours = productInfo.flavours;
        const flavourInfo = productFlavours.find(
          (flavour) =>
            flavour._id.toString() === cartProductFlavour._id.toString()
        );
        productPrice += flavourInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1, //Need to change quantity(url: stripe checkout session)
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        // unit_amount: productPrice * 100,
        unit_amount: productPrice,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: "fixed_amount",
          // Need to change the currency
          fixed_amount: { amount: 200, currency: "USD" },
        },
      },
    ],
  });
  return Response.json(stripeSession.url);
}
