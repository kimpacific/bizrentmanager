"use client"
import { CreditCard, Calendar, DollarSign, Plus, CheckCircle, Clock, AlertCircle, Repeat } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { useState } from "react"

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

interface Payment {
  id: string
  amount: number
  date: string
  type: string
  status: "completed" | "pending" | "failed"
  method: string
  reference: string
  description: string
}

interface PaymentMethod {
  id: string
  type: "card" | "bank"
  last4: string
  brand?: string
  isDefault: boolean
}

interface TenantPaymentsProps {
  userProfile: UserProfile
}

export default function TenantPayments({ userProfile }: TenantPaymentsProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  const [autoPayEnabled, setAutoPayEnabled] = useState(true)

  const payments: Payment[] = [
    {
      id: "1",
      amount: 1200,
      date: "2024-01-01",
      type: "Rent",
      status: "completed",
      method: "Credit Card ****4532",
      reference: "PAY-2024-001",
      description: "Monthly rent payment for January 2024",
    },
    {
      id: "2",
      amount: 150,
      date: "2024-01-05",
      type: "Utilities",
      status: "completed",
      method: "Bank Transfer",
      reference: "PAY-2024-002",
      description: "Utility bill payment",
    },
    {
      id: "3",
      amount: 1200,
      date: "2023-12-01",
      type: "Rent",
      status: "completed",
      method: "Credit Card ****4532",
      reference: "PAY-2023-012",
      description: "Monthly rent payment for December 2023",
    },
    {
      id: "4",
      amount: 75,
      date: "2024-01-10",
      type: "Maintenance",
      status: "pending",
      method: "Credit Card ****4532",
      reference: "PAY-2024-003",
      description: "Maintenance fee payment",
    },
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      last4: "4532",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "bank",
      last4: "8901",
      isDefault: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalPaid = payments.filter((p) => p.status === "completed").reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Payments & History
          </h2>
          <p className="text-slate-600 mt-1">Manage your payments and payment methods</p>
        </div>
        <Button
          onClick={() => setShowPaymentForm(!showPaymentForm)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-orange-600">${pendingAmount}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Next Payment</p>
                <p className="text-2xl font-bold text-slate-800">$1,200</p>
                <p className="text-xs text-slate-500">Due Feb 1</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <CreditCard className="h-5 w-5 text-orange-500" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/60"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {method.type === "card" ? method.brand : "Bank Account"} ****{method.last4}
                    </p>
                    {method.isDefault && (
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                >
                  Edit
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Auto-Pay Settings */}
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Repeat className="h-5 w-5 text-orange-500" />
              Auto-Pay Settings
            </CardTitle>
            <CardDescription>Automate your recurring payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg border border-orange-200/50">
              <div>
                <p className="font-medium text-slate-800">Enable Auto-Pay</p>
                <p className="text-sm text-slate-600">Automatically pay rent on due date</p>
              </div>
              <Switch checked={autoPayEnabled} onCheckedChange={setAutoPayEnabled} />
            </div>
            {autoPayEnabled && (
              <div className="space-y-3 pl-4 border-l-2 border-orange-200">
                <div>
                  <Label className="text-slate-700">Payment Method</Label>
                  <Select defaultValue="card-4532">
                    <SelectTrigger className="border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card-4532">Visa ****4532</SelectItem>
                      <SelectItem value="bank-8901">Bank ****8901</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-700">Payment Date</Label>
                  <Select defaultValue="due-date">
                    <SelectTrigger className="border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="due-date">On due date</SelectItem>
                      <SelectItem value="3-days-early">3 days early</SelectItem>
                      <SelectItem value="5-days-early">5 days early</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <DollarSign className="h-5 w-5 text-orange-500" />
                Payment History
              </CardTitle>
              <CardDescription>Your recent payment transactions</CardDescription>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-slate-800">{payment.reference}</h4>
                    {getStatusBadge(payment.status)}
                    <Badge variant="outline" className="border-slate-200 text-slate-600">
                      {payment.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{payment.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
                    <span>Method: {payment.method}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-800">${payment.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Payment Form */}
      {showPaymentForm && (
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <CreditCard className="h-5 w-5 text-orange-500" />
              Make a Payment
            </CardTitle>
            <CardDescription>Quick payment for your rental charges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-700">Payment Type</Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Monthly Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-700">Amount</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-700">Payment Method</Label>
              <Select>
                <SelectTrigger className="border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card-4532">Visa ****4532</SelectItem>
                  <SelectItem value="bank-8901">Bank ****8901</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPaymentForm(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
