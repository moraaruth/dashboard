import { useState, useEffect } from 'react'
import { FiMapPin, FiCheckCircle, FiLogOut, FiDollarSign } from 'react-icons/fi'

const API_URL = 'http://localhost:5000/api'

function AgentApp() {
  const [agentId, setAgentId] = useState('AG001')
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [location, setLocation] = useState(null)
  const [transactionForm, setTransactionForm] = useState({
    transactionType: 'M-PESA Deposit',
    customerPhone: '',
    amount: ''
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => console.error('Location error:', error)
      )
    }
  }, [])

  const handleCheckIn = async () => {
    try {
      const response = await fetch(`${API_URL}/agents/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, ...location })
      })
      const data = await response.json()
      if (data.success) {
        setIsCheckedIn(true)
        alert('Checked in successfully!')
      }
    } catch (error) {
      console.error('Check-in error:', error)
    }
  }

  const handleCheckOut = async () => {
    try {
      const response = await fetch(`${API_URL}/agents/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId })
      })
      const data = await response.json()
      if (data.success) {
        setIsCheckedIn(false)
        alert('Checked out successfully!')
      }
    } catch (error) {
      console.error('Check-out error:', error)
    }
  }

  const handleTransaction = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          ...transactionForm,
          amount: parseFloat(transactionForm.amount) || 0,
          status: 'Success',
          location
        })
      })
      const data = await response.json()
      if (data.success) {
        alert('Transaction recorded!')
        setTransactionForm({ transactionType: 'M-PESA Deposit', customerPhone: '', amount: '' })
      }
    } catch (error) {
      console.error('Transaction error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-safaricom-green text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">Safaricom Agent App</h1>
          <p className="text-sm opacity-90">Agent ID: {agentId}</p>
        </div>

        <div className="bg-white p-6 shadow-lg">
          {/* Location Status */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
            <FiMapPin className="text-2xl text-blue-600" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm text-gray-600">
                {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Getting location...'}
              </p>
            </div>
          </div>

          {/* Check In/Out */}
          <div className="mb-6">
            {!isCheckedIn ? (
              <button
                onClick={handleCheckIn}
                disabled={!location}
                className="w-full bg-safaricom-green text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                <FiCheckCircle /> Check In to Shop
              </button>
            ) : (
              <button
                onClick={handleCheckOut}
                className="w-full bg-safaricom-red text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90"
              >
                <FiLogOut /> Check Out
              </button>
            )}
          </div>

          {/* Transaction Form */}
          {isCheckedIn && (
            <form onSubmit={handleTransaction} className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiDollarSign /> Record Transaction
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1">Transaction Type</label>
                <select
                  value={transactionForm.transactionType}
                  onChange={(e) => setTransactionForm({ ...transactionForm, transactionType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-safaricom-green"
                >
                  <option>M-PESA Deposit</option>
                  <option>M-PESA Withdrawal</option>
                  <option>Airtime Purchase</option>
                  <option>SIM Registration</option>
                  <option>Bill Payment</option>
                  <option>SIM Swap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Customer Phone</label>
                <input
                  type="tel"
                  value={transactionForm.customerPhone}
                  onChange={(e) => setTransactionForm({ ...transactionForm, customerPhone: e.target.value })}
                  placeholder="0722XXXXXX"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-safaricom-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Amount (KSh)</label>
                <input
                  type="number"
                  value={transactionForm.amount}
                  onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-safaricom-green"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-safaricom-green text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Submit Transaction
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentApp
