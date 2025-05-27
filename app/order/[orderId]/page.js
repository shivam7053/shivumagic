// app/order/[orderId]/page.jsx
import { Rocket, Hammer, FlaskConical, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import OrderProgress from '@/components/OrderProgress';
import OrderModel from '@/lib/orderModel';
import dbConnect from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function OrderPage({ params }) {
  await dbConnect();

  const { orderId } = params; // ✅ This is correct and synchronous

  let order;

  try {
    order = await OrderModel.findOne({ orderId }).lean();
  } catch (error) {
    console.error('Order fetch error:', error);
    return <ErrorDisplay type="load" />;
  }

  if (!order) return <ErrorDisplay type="notfound" orderId={orderId} />;


  const statusMap = {
    Initiate: { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: <Rocket className="w-4 h-4 mr-2" /> },
    Working: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: <Hammer className="w-4 h-4 mr-2" /> },
    Prototype: { color: 'bg-purple-100 text-purple-800 border-purple-300', icon: <FlaskConical className="w-4 h-4 mr-2" /> },
    Complete: { color: 'bg-green-100 text-green-800 border-green-300', icon: <CheckCircle className="w-4 h-4 mr-2" /> },
  };

  const status = order.status;
  const statusStyle = statusMap[status] || {
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: null,
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="bg-[url('/reqback.jpg')] bg-cover bg-center brightness-75 absolute inset-0 z-0" />

      {/* Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10 text-white">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">📦 Order Tracker</h1>
          <p className="text-lg mt-2 text-gray-200">Stay updated with your order's progress</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoCard label="Order ID" value={order.orderId} />
          <InfoCard label="Name" value={order.name} />
          <InfoCard label="Email" value={order.email} />
          <InfoCard label="Service" value={order.service} />
          <InfoCard label="Plan" value={order.plan} />
          <InfoCard label="Description" value={order.description} />
          <div className="sm:col-span-2">
            <p className="text-gray-100 font-semibold mb-1">Current Status</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${statusStyle.color}`}>
              {statusStyle.icon}
              {status}
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-16">
          <OrderProgress currentStatus={status} />
        </div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({ label, value }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-200">
      <p className="text-sm text-gray-500 font-semibold mb-1">{label}</p>
      <p className="text-lg font-medium text-gray-800">{value}</p>
    </div>
  );
}

// Error Display Component
function ErrorDisplay({ type, orderId }) {
  const icon = type === 'load' ? <XCircle className="text-red-500 w-12 h-12 mb-4" /> : <AlertTriangle className="text-yellow-500 w-12 h-12 mb-4" />;
  const title = type === 'load' ? 'Error Loading Order' : 'Order Not Found';
  const subtitle =
    type === 'load'
      ? 'Something went wrong. Please try again later.'
      : `No order with ID "${orderId}" was found. Please check and try again.`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-800 to-black text-white px-6">
      {icon}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-300">{subtitle}</p>
    </div>
  );
}
