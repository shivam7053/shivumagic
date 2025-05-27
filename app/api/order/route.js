// // app/api/order/route.js

// import connectDB from '../../../lib/db';
// import Order from '../../../lib/orderModel';

// export async function POST(request) {
//   try {
//     await connectDB();

//     const text = await request.text();
//     console.log("🔥 Raw Request Body:", text);

//     if (!text) {
//       return Response.json({ error: 'Empty request body' }, { status: 400 });
//     }

//     const body = JSON.parse(text);

//     const { name, email, service, plan, description } = body;

//     if (!name || !email || !service || !plan || !description) {
//       return Response.json({ error: 'Missing fields' }, { status: 400 });
//     }

//     const newOrder = new Order({ name, email, service, plan, description });
//     await newOrder.save();

//     return Response.json({ message: 'Order saved successfully' }, { status: 201 });
//   } catch (error) {
//     console.error('API Error:', error);
//     return Response.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import connectDB from '../../../lib/db';
import Order from '../../../lib/orderModel';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const text = await request.text();
    console.log("🔥 Raw Request Body:", text);

    if (!text) {
      return new Response(JSON.stringify({ error: 'Empty request body' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const body = JSON.parse(text);
    const { name, email, service, plan, description } = body;

    if (!name || !email || !service || !plan || !description) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const newOrder = new Order({ name, email, service, plan, description });
    await newOrder.save();

    return new Response(JSON.stringify({ message: 'Order saved successfully' }), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
