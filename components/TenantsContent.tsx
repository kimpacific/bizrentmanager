import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
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

interface TenantsContentProps {
  onAddNew?: () => void
}

const TenantsContent = ({ onAddNew }: TenantsContentProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  
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

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Tenants Database</h2>
          <p className="text-slate-600">Complete tenant information and records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <button
            onClick={onAddNew}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Tenant
          </button>
        </div>
      </div>

      {/* Simple Tenants Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">All Tenants ({filteredTenants.length})</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200">
                Active: {tenants.filter((t) => t.status === "active").length}
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200">
                Overdue: {tenants.filter((t) => t.status === "overdue").length}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit Occupied
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Monthly Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Next Due
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredTenants.map((tenant, index) => (
                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-800">{tenant.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Users className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="font-medium text-slate-800">{tenant.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-800 font-medium">{tenant.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-800 font-semibold">{tenant.rent}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{tenant.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{tenant.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        tenant.status === "active"
                          ? "bg-green-100 text-green-700"
                          : tenant.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tenant.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{tenant.nextDue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-600">{tenant.paymentHistory[0]?.date || "No payment"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="View Details"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
                        title="Send Message"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Call Tenant"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Remove Tenant"
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

        {filteredTenants.length === 0 && (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No tenants found</h3>
            <p className="text-slate-600">
              {searchQuery ? "Try adjusting your search terms" : "Add your first tenant to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenantsContent