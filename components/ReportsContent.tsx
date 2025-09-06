import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Building,
  Users,
} from "lucide-react"

const ReportsContent = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Reports & Analytics</h2>
          <p className="text-slate-600">Financial insights and property performance metrics</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Monthly Revenue",
            value: "45.2M RWF",
            change: "+12% from last month",
            icon: DollarSign,
            color: "from-green-400 to-green-500",
          },
          {
            title: "Occupancy Rate",
            value: "94%",
            change: "+5% from last month",
            icon: Building,
            color: "from-blue-400 to-blue-500",
          },
          {
            title: "Active Tenants",
            value: "96",
            change: "+8 new tenants",
            icon: Users,
            color: "from-purple-400 to-purple-500",
          },
          {
            title: "Collection Rate",
            value: "87%",
            change: "+3% from last month",
            icon: TrendingUp,
            color: "from-orange-400 to-orange-500",
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

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
            <p className="text-sm text-slate-600">Monthly revenue over the last 12 months</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-slate-600 mb-2">Revenue Chart</h4>
            <p className="text-slate-500">Chart integration coming soon</p>
          </div>
        </div>
      </div>

      {/* Property Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performing Properties</h3>
          <div className="space-y-4">
            {[
              { name: "Kigali Business Center", revenue: "18.5M RWF", occupancy: "93%" },
              { name: "Nyamirambo Plaza", revenue: "12.8M RWF", occupancy: "88%" },
              { name: "Kimisagara Complex", revenue: "9.2M RWF", occupancy: "93%" },
            ].map((property, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{property.name}</p>
                  <p className="text-sm text-slate-600">Occupancy: {property.occupancy}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{property.revenue}</p>
                  <p className="text-xs text-slate-500">Monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Status Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Paid on Time</p>
                  <p className="text-sm text-green-600">87% of all payments</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-700">83 tenants</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Due Soon</p>
                  <p className="text-sm text-yellow-600">Next 7 days</p>
                </div>
              </div>
              <p className="text-lg font-bold text-yellow-700">5 tenants</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-red-800">Overdue</p>
                  <p className="text-sm text-red-600">Requires attention</p>
                </div>
              </div>
              <p className="text-lg font-bold text-red-700">8 tenants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsContent