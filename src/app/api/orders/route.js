import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "../../models/Order";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  // Return all the orders for admin.
  if (admin) {
    return Response.json(await Order.find());
  }

  // Return all the orders that the user made.
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
