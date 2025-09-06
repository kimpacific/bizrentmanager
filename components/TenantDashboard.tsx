"use client"
import { Calendar, CreditCard, Home, AlertCircle, Clock, CheckCircle, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface UserProfile {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  role?: string
  tenantId?: string
}

interface TenantDashboardProps {
  userProfile: UserProfile
}

export default function TenantDashboard({ userProfile }: TenantDashboardProps) {
  const upcomingPayments = [
    { id: 1, type: "Rent", amount: 1200, dueDate: "2024-01-01", status: "upcoming" },
    { id: 2, type: "Utilities", amount: 150, dueDate: "2024-01-05", status: "upcoming" },
  ]

  const maintenanceRequests = [
    { id: 1, title: "Kitchen Faucet Leak", status: "in-progress", priority: "medium", date: "2023-12-28" },
    { id: 2, title: "Heating System Check", status: "completed", priority: "high", date: "2023-12-25" },
  ]

  const quickStats = [
    { label: "Monthly Rent", value: "$1,200", icon: DollarSign, color: "from-green-500 to-green-600" },
    { label: "Next Payment", value: "5 days", icon: Clock, color: "from-orange-500 to-orange-600" },
    { label: "Lease Expires", value: "8 months", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Maintenance", value: "1 Active", icon: AlertCircle, color: "from-red-500 to-red-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-slate-600 mt-1">Welcome back, {userProfile?.name || "Tenant"}!</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Rent Current
          </Badge>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className="border-slate-200/60 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <CreditCard className="h-5 w-5 text-orange-500" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Your scheduled payments this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg border border-orange-200/50"
              >
                <div>
                  <p className="font-medium text-slate-800">{payment.type}</p>
                  <p className="text-sm text-slate-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">${payment.amount}</p>
                  <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Make Payment
            </Button>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Home className="h-5 w-5 text-orange-500" />
              Maintenance Requests
            </CardTitle>
            <CardDescription>Track your property maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenanceRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <div>
                  <p className="font-medium text-slate-800">{request.title}</p>
                  <p className="text-sm text-slate-600">Submitted: {new Date(request.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={`${
                      request.status === "completed"
                        ? "border-green-200 text-green-700 bg-green-50"
                        : "border-blue-200 text-blue-700 bg-blue-50"
                    }`}
                  >
                    {request.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{request.priority} priority</p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
            >
              New Request
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Property Information */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Home className="h-5 w-5 text-orange-500" />
            Property Information
          </CardTitle>
          <CardDescription>Your current rental property details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <p className="text-sm text-slate-600 mb-1">Property Address</p>
              <p className="font-medium text-slate-800">{userProfile?.address || "123 Main St, City, State"}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <p className="text-sm text-slate-600 mb-1">Lease Start</p>
              <p className="font-medium text-slate-800">January 1, 2023</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/50">
              <p className="text-sm text-slate-600 mb-1">Lease End</p>
              <p className="font-medium text-slate-800">December 31, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
