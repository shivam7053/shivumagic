// // app/api/contact/route.js
// import connectDB from '@/lib/db';
// import Contact from '@/lib/contactModel';

// export async function POST(request) {
//   try {
//     await connectDB();

//     const text = await request.text();
//     console.log("🔥 Raw Request Body:", text);

//     if (!text) {
//       return Response.json({ error: 'Empty request body' }, { status: 400 });
//     }

//     const body = JSON.parse(text);
//     const { name, email, message } = body;

//     if (!name || !email || !message) {
//       return Response.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     return Response.json({ message: 'Contact form submitted successfully' }, { status: 201 });

//   } catch (error) {
//     console.error('API Error:', error);
//     return Response.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }



import connectDB from '@/lib/db';
import Contact from '@/lib/contactModel';

export async function POST(request) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  });

  try {
    await connectDB();

    const text = await request.text();
    console.log("🔥 Raw Request Body:", text);

    if (!text) {
      return new Response(JSON.stringify({ error: 'Empty request body' }), {
        status: 400,
        headers,
      });
    }

    const body = JSON.parse(text);
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers,
      });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
      status: 201,
      headers,
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers,
    });
  }
}
