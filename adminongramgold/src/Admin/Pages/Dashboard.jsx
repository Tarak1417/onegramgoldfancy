import { useAdmin } from "../../context/AdminContext";

const Dashboard = () => {
  const { products, orders, customers } = useAdmin();

  // Count orders by status
  const newOrders = orders.filter((o) => o.status === "New").length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const ongoingOrders = orders.filter((o) => o.status === "Ongoing").length;

  // Recent 5 orders
  const recentOrders = [...orders].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Products" value={products.length} />
        <Card title="New Orders" value={newOrders} color="blue" />
        <Card title="Completed Orders" value={completedOrders} color="green" />
        <Card title="Customers" value={customers.length} color="purple" />
      </div>

      {/* Orders Progress */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Orders Progress</h2>
        <ProgressBar label="Ongoing Orders" value={ongoingOrders} max={orders.length} color="yellow" />
        <ProgressBar label="Completed Orders" value={completedOrders} max={orders.length} color="green" />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">₹{order.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "New"
                          ? "bg-blue-500"
                          : order.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Stat Card
const Card = ({ title, value, color = "gray" }) => (
  <div className={`bg-white p-6 rounded shadow border-l-4 border-${color}-500`}>
    <p className="text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

// Progress Bar
const ProgressBar = ({ label, value, max, color = "blue" }) => {
  const percentage = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{value} / {max}</span>
      </div>
      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className={`h-4 rounded bg-${color}-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
