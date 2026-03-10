import { useState } from 'react'
import { FiUsers, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const transactionData = [
  { time: '8AM', mpesa: 45, airtime: 30, registration: 12, bills: 8 },
  { time: '10AM', mpesa: 78, airtime: 45, registration: 18, bills: 15 },
  { time: '12PM', mpesa: 95, airtime: 60, registration: 25, bills: 22 },
  { time: '2PM', mpesa: 120, airtime: 75, registration: 30, bills: 28 },
  { time: '4PM', mpesa: 88, airtime: 52, registration: 20, bills: 18 },
  { time: '6PM', mpesa: 65, airtime: 38, registration: 15, bills: 12 },
]

const serviceData = [
  { name: 'M-PESA', value: 491, color: '#00A651' },
  { name: 'Airtime', value: 300, color: '#E30613' },
  { name: 'SIM Registration', value: 120, color: '#FFB800' },
  { name: 'Bill Payments', value: 103, color: '#0066CC' },
  { name: 'Others', value: 45, color: '#666666' },
]

const recentTransactions = [
  { time: '14:32', service: 'M-PESA Deposit', customer: '0722XXX456', amount: 'KSh 5,000', status: 'Success', agent: 'John Kamau' },
  { time: '14:28', service: 'Airtime Purchase', customer: '0733XXX789', amount: 'KSh 200', status: 'Success', agent: 'John Kamau' },
  { time: '14:25', service: 'SIM Registration', customer: '0711XXX234', amount: '-', status: 'Success', agent: 'John Kamau' },
  { time: '14:20', service: 'M-PESA Withdrawal', customer: '0745XXX567', amount: 'KSh 3,500', status: 'Success', agent: 'John Kamau' },
  { time: '14:15', service: 'Bill Payment - KPLC', customer: '0720XXX890', amount: 'KSh 1,200', status: 'Success', agent: 'John Kamau' },
  { time: '14:10', service: 'M-PESA Send Money', customer: '0712XXX345', amount: 'KSh 2,500', status: 'Success', agent: 'John Kamau' },
  { time: '14:05', service: 'Airtime Purchase', customer: '0734XXX678', amount: 'KSh 500', status: 'Success', agent: 'John Kamau' },
  { time: '14:00', service: 'M-PESA Deposit', customer: '0723XXX901', amount: 'KSh 10,000', status: 'Success', agent: 'John Kamau' },
  { time: '13:55', service: 'Bill Payment - DSTV', customer: '0746XXX234', amount: 'KSh 3,500', status: 'Failed', agent: 'John Kamau' },
  { time: '13:50', service: 'SIM Swap', customer: '0721XXX567', amount: '-', status: 'Success', agent: 'John Kamau' },
]

const agentPerformance = [
  { id: 'AG001', name: 'John Kamau', location: 'Nairobi CBD', transactions: 486, customers: 234, revenue: 1245000, rating: 4.8, status: 'Active' },
  { id: 'AG002', name: 'Mary Wanjiku', location: 'Westlands', transactions: 523, customers: 267, revenue: 1456000, rating: 4.9, status: 'Active' },
  { id: 'AG003', name: 'Peter Omondi', location: 'Kisumu', transactions: 412, customers: 198, revenue: 987000, rating: 4.6, status: 'Active' },
  { id: 'AG004', name: 'Grace Akinyi', location: 'Mombasa', transactions: 398, customers: 189, revenue: 923000, rating: 4.7, status: 'Active' },
  { id: 'AG005', name: 'David Kipchoge', location: 'Eldoret', transactions: 367, customers: 176, revenue: 845000, rating: 4.5, status: 'Inactive' },
]

function App() {
  const [selectedAgent, setSelectedAgent] = useState('AG001')
  const [timeRange, setTimeRange] = useState('today')

  const currentAgent = agentPerformance.find(a => a.id === selectedAgent)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-safaricom-green">Safaricom Agent Dashboard</h1>
              <p className="text-sm text-gray-600">Frontline Agent Activity Monitor</p>
            </div>
            <div className="flex gap-4">
              <select 
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
              >
                {agentPerformance.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.location}
                  </option>
                ))}
              </select>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900">{currentAgent?.transactions}</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% from yesterday</p>
              </div>
              <FiActivity className="text-4xl text-safaricom-green" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customers Served</p>
                <p className="text-3xl font-bold text-gray-900">{currentAgent?.customers}</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% from yesterday</p>
              </div>
              <FiUsers className="text-4xl text-safaricom-green" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue Generated</p>
                <p className="text-3xl font-bold text-gray-900">KSh {(currentAgent?.revenue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600 mt-1">↑ 15% from yesterday</p>
              </div>
              <FiDollarSign className="text-4xl text-safaricom-green" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customer Rating</p>
                <p className="text-3xl font-bold text-gray-900">{currentAgent?.rating}/5</p>
                <p className="text-sm text-green-600 mt-1">↑ 0.2 from last week</p>
              </div>
              <FiTrendingUp className="text-4xl text-safaricom-green" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Transaction Trends */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Transaction Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mpesa" stroke="#00A651" strokeWidth={2} name="M-PESA" />
                <Line type="monotone" dataKey="airtime" stroke="#E30613" strokeWidth={2} name="Airtime" />
                <Line type="monotone" dataKey="registration" stroke="#FFB800" strokeWidth={2} name="Registration" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Service Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Service Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Service Volume by Hour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mpesa" fill="#00A651" name="M-PESA" />
              <Bar dataKey="airtime" fill="#E30613" name="Airtime" />
              <Bar dataKey="registration" fill="#FFB800" name="Registration" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((txn, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        txn.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
