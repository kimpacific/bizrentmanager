import {
  Building2,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react"

interface UserProfile {
  id: string
  name?: string
  email?: string
}

interface Payment {
  id: string
  tenant: string
  amount: string
  method: string
  status: "pending" | "approved" | "rejected"
  date: string
}

interface Invoice {
  id: string
  tenant: string
  unit: string
  amount: string
  dueDate: string
  status: "paid" | "due" | "overdue"
}

interface DashboardContentProps {
  userProfile: UserProfile
}

const DashboardContent = ({ userProfile }: DashboardContentProps) => {
  const payments: Payment[] = [
    {
      id: "PAY-001",
      tenant: "Emmanuel Uwimana",
      amount: "120,000 RWF",
      method: "MTN MoMo",
      status: "pending",
      date: "Dec 1, 2024",
    },
    {
      id: "PAY-002",
      tenant: "Grace Mukamana",
      amount: "180,000 RWF",
      method: "Airtel Money",
      status: "approved",
      date: "Nov 30, 2024",
    },
  ]

  const invoices: Invoice[] = [
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
  ]

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, {userProfile?.name || "User"}</h2>
          <p className="text-slate-600">Here&apos;s what&apos;s happening with your properties today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Units",
            value: "124",
            change: "+2 from last month",
            icon: Building2,
            color: "from-orange-400 to-orange-500",
          },
          {
            title: "Occupancy Rate",
            value: "94%",
            change: "+5% from last month",
            icon: Users,
            color: "from-orange-500 to-orange-600",
          },
          {
            title: "Monthly Revenue",
            value: "45.2M RWF",
            change: "+12% from last month",
            icon: TrendingUp,
            color: "from-orange-600 to-orange-700",
          },
          {
            title: "Overdue",
            value: "8",
            change: "-3 from last week",
            icon: AlertCircle,
            color: "from-red-400 to-red-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Recent Payments
          </h3>
          <div className="space-y-3">
            {payments
              .filter((p) => p.status === "approved")
              .map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-slate-800">{payment.tenant}</p>
                    <p className="text-sm text-slate-600">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{payment.amount}</p>
                    <p className="text-xs text-slate-500">{payment.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Overdue Invoices
          </h3>
          <div className="space-y-3">
            {invoices
              .filter((i) => i.status === "overdue")
              .map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-slate-800">{invoice.tenant}</p>
                    <p className="text-sm text-slate-600">{invoice.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{invoice.amount}</p>
                    <p className="text-xs text-red-500">Due: {invoice.dueDate}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent