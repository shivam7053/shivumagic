// app/api/order/route.js

import connectDB from '../../../lib/db';
import Order from '../../../lib/orderModel';

export async function POST(request) {
  try {
    await connectDB();

    const text = await request.text();
    console.log("🔥 Raw Request Body:", text);

    if (!text) {
      return Response.json({ error: 'Empty request body' }, { status: 400 });
    }

    const body = JSON.parse(text);

    const { name, email, service, plan, description } = body;

    if (!name || !email || !service || !plan || !description) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newOrder = new Order({ name, email, service, plan, description });
    await newOrder.save();

    return Response.json({ message: 'Order saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
