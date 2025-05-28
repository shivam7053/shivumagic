import connectDB from '../../../lib/db';
import Order from '../../../lib/orderModel';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { orderId } = params;
    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Missing orderId parameter' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Find by your custom orderId field
    const order = await Order.findOne({ orderId });

    if (!order) {
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
