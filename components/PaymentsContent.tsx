import {
  CreditCard,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Users,
  Phone,
  Mail,
} from "lucide-react"
import { useState } from "react"

interface Tenant {
  id: string
  name: string
  unit: string
  phone: string
  email: string
  rent: string
  status: "active" | "overdue" | "vacant"
  nextDue: string
  paymentHistory: {
    month: string
    amount: string
    status: "paid" | "overdue"
    date: string
  }[]
}

const PaymentsContent = () => {
  const [tenants] = useState<Tenant[]>([
    {
      id: "1",
      name: "Jean Baptiste Uwimana",
      unit: "Shop A-12",
      phone: "+250 788 123 456",
      email: "jean.baptiste@email.com",
      rent: "150,000 RWF",
      status: "active",
      nextDue: "Dec 1, 2024",
      paymentHistory: [
        { month: "Nov 2024", amount: "150,000 RWF", status: "paid", date: "Nov 1, 2024" },
        { month: "Oct 2024", amount: "150,000 RWF", status: "paid", date: "Oct 1, 2024" },
        { month: "Sep 2024", amount: "150,000 RWF", status: "paid", date: "Sep 1, 2024" },
      ],
    },
    {
      id: "2",
      name: "Marie Claire Mukamana",
      unit: "Office B-5",
      phone: "+250 788 234 567",
      email: "marie.claire@email.com",
      rent: "200,000 RWF",
      status: "active",
      nextDue: "Dec 1, 2024",
      paymentHistory: [
        { month: "Nov 2024", amount: "200,000 RWF", status: "paid", date: "Nov 1, 2024" },
        { month: "Oct 2024", amount: "200,000 RWF", status: "paid", date: "Oct 1, 2024" },
        { month: "Sep 2024", amount: "200,000 RWF", status: "paid", date: "Sep 1, 2024" },
      ],
    },
    {
      id: "3",
      name: "Patrick Nzeyimana",
      unit: "Kiosk C-3",
      phone: "+250 788 345 678",
      email: "patrick.n@email.com",
      rent: "80,000 RWF",
      status: "overdue",
      nextDue: "Nov 25, 2024",
      paymentHistory: [
        { month: "Nov 2024", amount: "80,000 RWF", status: "overdue", date: "Nov 1, 2024" },
        { month: "Oct 2024", amount: "80,000 RWF", status: "paid", date: "Oct 1, 2024" },
        { month: "Sep 2024", amount: "80,000 RWF", status: "paid", date: "Sep 1, 2024" },
      ],
    },
  ])

  const paymentTrackingData = tenants.map((tenant) => {
    const tenantInfo = tenants.find((t) => t.name === tenant.name)
    return {
      id: tenant.id,
      name: tenant.name,
      contact: tenant.phone,
      email: tenant.email,
      unit: tenant.unit,
      amountOwed: tenant.rent,
      status: tenant.status,
      dueDate: tenant.nextDue,
      lastPayment: tenant.paymentHistory[0]?.date || "No payment",
    }
  })

  const paidTenants = paymentTrackingData.filter((tenant) => tenant.status === "active")
  const unpaidTenants = paymentTrackingData.filter((tenant) => tenant.status === "overdue")

  const totalExpected = paymentTrackingData.reduce((sum, tenant) => {
    const amount = Number.parseInt(tenant.amountOwed.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const totalCollected = paidTenants.reduce((sum, tenant) => {
    const amount = Number.parseInt(tenant.amountOwed.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const totalOutstanding = unpaidTenants.reduce((sum, tenant) => {
    const amount = Number.parseInt(tenant.amountOwed.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Payment Tracking</h2>
          <p className="text-slate-600">Monitor tenant payments and outstanding amounts</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark as Paid
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl shadow-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">Total Expected</h3>
          <p className="text-2xl font-bold text-slate-800 mb-1">{totalExpected.toLocaleString()} RWF</p>
          <p className="text-xs text-slate-500">This month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-500 rounded-xl shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">Total Collected</h3>
          <p className="text-2xl font-bold text-green-600 mb-1">{totalCollected.toLocaleString()} RWF</p>
          <p className="text-xs text-green-600">{paidTenants.length} payments</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-400 to-red-500 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">Outstanding</h3>
          <p className="text-2xl font-bold text-red-600 mb-1">{totalOutstanding.toLocaleString()} RWF</p>
          <p className="text-xs text-red-600">{unpaidTenants.length} overdue</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">Collection Rate</h3>
          <p className="text-2xl font-bold text-orange-600 mb-1">
            {Math.round((totalCollected / totalExpected) * 100)}%
          </p>
          <p className="text-xs text-orange-600">Payment success</p>
        </div>
      </div>

      {/* Paid Tenants Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Paid Tenants ({paidTenants.length})</h3>
                <p className="text-sm text-green-600">All payments received on time</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-700">{totalCollected.toLocaleString()} RWF</p>
              <p className="text-sm text-green-600">Total collected</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit Occupied
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paidTenants.map((tenant, index) => (
                <tr key={tenant.id} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{tenant.name}</div>
                        <div className="text-sm text-slate-500">{tenant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Phone className="h-4 w-4" />
                      {tenant.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{tenant.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-green-600">{tenant.amountOwed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{tenant.lastPayment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                      PAID
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unpaid Tenants Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Unpaid Tenants ({unpaidTenants.length})</h3>
                <p className="text-sm text-red-600">Payments overdue - require immediate attention</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-700">{totalOutstanding.toLocaleString()} RWF</p>
              <p className="text-sm text-red-600">Total outstanding</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit Occupied
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount Owed
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {unpaidTenants.map((tenant, index) => (
                <tr key={tenant.id} className="hover:bg-red-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Users className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{tenant.name}</div>
                        <div className="text-sm text-slate-500">{tenant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Phone className="h-4 w-4" />
                      {tenant.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{tenant.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-red-600">{tenant.amountOwed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-red-600 font-medium">{tenant.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
                        title="Send Reminder"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Mark as Paid"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Call Tenant"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PaymentsContent