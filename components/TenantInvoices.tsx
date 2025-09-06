"use client"
import { FileText, Download, Eye, Search, Calendar, DollarSign, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
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

interface Invoice {
  id: string
  invoiceNumber: string
  type: string
  amount: number
  dueDate: string
  issueDate: string
  status: "paid" | "pending" | "overdue"
  description: string
}

interface TenantInvoicesProps {
  userProfile: UserProfile
}

export default function TenantInvoices({ userProfile }: TenantInvoicesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      type: "Rent",
      amount: 1200,
      dueDate: "2024-01-01",
      issueDate: "2023-12-01",
      status: "paid",
      description: "Monthly rent for January 2024",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      type: "Utilities",
      amount: 150,
      dueDate: "2024-01-05",
      issueDate: "2023-12-28",
      status: "pending",
      description: "Electricity and water for December 2023",
    },
    {
      id: "3",
      invoiceNumber: "INV-2023-012",
      type: "Rent",
      amount: 1200,
      dueDate: "2023-12-01",
      issueDate: "2023-11-01",
      status: "paid",
      description: "Monthly rent for December 2023",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-003",
      type: "Maintenance",
      amount: 75,
      dueDate: "2024-01-10",
      issueDate: "2024-01-02",
      status: "overdue",
      description: "Kitchen faucet repair",
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesType = typeFilter === "all" || invoice.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = filteredInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = filteredInvoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueAmount = filteredInvoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            Invoices & Bills
          </h2>
          <p className="text-slate-600 mt-1">View and manage your rental invoices</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-slate-800">${totalAmount}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Paid</p>
                <p className="text-2xl font-bold text-green-600">${paidAmount}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <FileText className="h-5 w-5 text-white" />
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
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Overdue</p>
                <p className="text-2xl font-bold text-red-600">${overdueAmount}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40 border-slate-200 focus:border-orange-300 focus:ring-orange-200">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileText className="h-5 w-5 text-orange-500" />
            Invoice History
          </CardTitle>
          <CardDescription>All your rental invoices and bills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-slate-800">{invoice.invoiceNumber}</h4>
                    {getStatusBadge(invoice.status)}
                    <Badge variant="outline" className="border-slate-200 text-slate-600">
                      {invoice.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{invoice.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                    <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-800 mb-2">${invoice.amount}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No invoices found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
