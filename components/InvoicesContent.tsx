import {
  FileText,
  Plus,
  Download,
  Search,
  Mail,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

interface Invoice {
  id: string
  tenant: string
  unit: string
  amount: string
  dueDate: string
  status: "paid" | "due" | "overdue"
}

interface InvoicesContentProps {
  onSendInvoice?: (invoice: Invoice) => void
  onAddNew?: () => void
}

const InvoicesContent = ({ onSendInvoice, onAddNew }: InvoicesContentProps) => {
  const [sendingInvoice, setSendingInvoice] = useState<string | null>(null)

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      tenant: "Jean Baptiste Uwimana",
      unit: "Shop A-12",
      amount: "150,000 RWF",
      dueDate: "Dec 1, 2024",
      status: "paid",
    },
    {
      id: "INV-002",
      tenant: "Marie Claire Mukamana",
      unit: "Office B-5",
      amount: "200,000 RWF",
      dueDate: "Dec 1, 2024",
      status: "due",
    },
    {
      id: "INV-003",
      tenant: "Patrick Nzeyimana",
      unit: "Kiosk C-3",
      amount: "80,000 RWF",
      dueDate: "Nov 25, 2024",
      status: "overdue",
    },
  ])

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Invoices</h2>
          <p className="text-slate-600">Manage and send invoices to tenants</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onAddNew}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Invoice
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Invoices",
            value: invoices.length.toString(),
            change: "+3 this month",
            icon: FileText,
            color: "from-orange-400 to-orange-500",
          },
          {
            title: "Paid",
            value: invoices.filter((i) => i.status === "paid").length.toString(),
            change: "On time payments",
            icon: CheckCircle,
            color: "from-green-400 to-green-500",
          },
          {
            title: "Due",
            value: invoices.filter((i) => i.status === "due").length.toString(),
            change: "Pending payment",
            icon: AlertCircle,
            color: "from-yellow-400 to-yellow-500",
          },
          {
            title: "Overdue",
            value: invoices.filter((i) => i.status === "overdue").length.toString(),
            change: "Require attention",
            icon: AlertCircle,
            color: "from-red-400 to-red-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">All Invoices</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-800">{invoice.tenant}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{invoice.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{invoice.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{invoice.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "due"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSendInvoice?.(invoice)}
                        disabled={sendingInvoice === invoice.id}
                        className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="Send Invoice"
                      >
                        {sendingInvoice === invoice.id ? (
                          <div className="h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit Invoice"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Invoice"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default InvoicesContent