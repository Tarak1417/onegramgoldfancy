import { useAdmin } from "../../context/AdminContext";

const Orders = () => {
  const { orders } = useAdmin();

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border-b py-2">
          <p>
            <strong>{order.customer}</strong> – ₹{order.total}
          </p>
          <span className="text-sm text-gray-500">
            Status: {order.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Orders;
