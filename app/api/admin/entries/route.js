import connectDB from '@/lib/db';
import Contact from '@/lib/contactModel';
import Order from '@/lib/orderModel';
import NextCors from 'nextjs-cors';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'supersecret';

// export async function GET(request) {
//   console.log('--- [GET] /api/admin/entries called ---');

//   try {
//     console.log('Connecting to DB...');
//     await connectDB();
//     console.log('Connected to DB');

//     const url = new URL(request.url);
//     const headerPassword = request.headers.get('x-admin-password');
//     const queryPassword = url.searchParams.get('password');
//     const password = headerPassword || queryPassword;

//     console.log('Received Password (Header):', headerPassword);
//     console.log('Received Password (Query):', queryPassword);

//     if (password !== ADMIN_PASSWORD) {
//       console.warn('Unauthorized access attempt');
//       return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     console.log('Fetching contacts...');
//     const contacts = await Contact.find().lean();
//     console.log(`Fetched ${contacts.length} contacts`);

//     console.log('Fetching orders...');
//     const orders = await Order.find().lean();
//     console.log(`Fetched ${orders.length} orders`);

//     return new Response(JSON.stringify({ contacts, orders }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('[GET] Admin API error:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
//   }
// }


// export async function PATCH(request) {
//   console.log('--- [PATCH] /api/admin/entries called ---');

//   try {
//     console.log('Connecting to DB...');
//     await connectDB();
//     console.log('Connected to DB');

//     const password = request.headers.get('x-admin-password');
//     console.log('Received Password (Header):', password);

//     if (password !== ADMIN_PASSWORD) {
//       console.warn('Unauthorized PATCH attempt');
//       return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//     }

//     console.log('Parsing request body...');
//     const body = await request.json();
//     console.log('Request Body:', body);

//     const { id, status, adminNote } = body;

//     if (!id || !status) {
//       console.warn('Missing required fields:', { id, status });
//       return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
//     }

//     console.log(`Finding order with ID: ${id}`);
//     const order = await Order.findById(id);

//     if (!order) {
//       console.warn('Order not found for ID:', id);
//       return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
//     }

//     console.log('Updating order...');
//     order.status = status;
//     order.adminNote = adminNote || '';
//     await order.save();
//     console.log('Order updated and saved successfully');

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('[PATCH] Admin API error:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
//   }
// }



export async function GET(request) {
  console.log('--- [GET] /api/admin/entries called ---');

  try {
    // CORS Headers
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
      'Content-Type': 'application/json',
    });

    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected to DB');

    const url = new URL(request.url);
    const headerPassword = request.headers.get('x-admin-password');
    const queryPassword = url.searchParams.get('password');
    const password = headerPassword || queryPassword;

    console.log('Received Password (Header):', headerPassword);
    console.log('Received Password (Query):', queryPassword);

    if (password !== ADMIN_PASSWORD) {
      console.warn('Unauthorized access attempt');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }

    console.log('Fetching contacts...');
    const contacts = await Contact.find().lean();
    console.log(`Fetched ${contacts.length} contacts`);

    console.log('Fetching orders...');
    const orders = await Order.find().lean();
    console.log(`Fetched ${orders.length} orders`);

    return new Response(JSON.stringify({ contacts, orders }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[GET] Admin API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  console.log('--- [PATCH] /api/admin/entries called ---');

  try {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
      'Content-Type': 'application/json',
    });

    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected to DB');

    const password = request.headers.get('x-admin-password');
    console.log('Received Password (Header):', password);

    if (password !== ADMIN_PASSWORD) {
      console.warn('Unauthorized PATCH attempt');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }

    console.log('Parsing request body...');
    const body = await request.json();
    console.log('Request Body:', body);

    const { id, status, adminNote } = body;

    if (!id || !status) {
      console.warn('Missing required fields:', { id, status });
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers });
    }

    console.log(`Finding order with ID: ${id}`);
    const order = await Order.findById(id);

    if (!order) {
      console.warn('Order not found for ID:', id);
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404, headers });
    }

    console.log('Updating order...');
    order.status = status;
    order.adminNote = adminNote || '';
    await order.save();
    console.log('Order updated and saved successfully');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[PATCH] Admin API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}










