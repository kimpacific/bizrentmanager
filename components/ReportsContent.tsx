"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  ResponsiveContainer,
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
    PieChart as RechartsPieChart,
    Line,
    Cell,
    Pie,
} from "recharts"
import { Alert, AlertDescription } from "./ui/alert"
import { AlertCircle, Building2, CreditCard, DollarSign, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

export default function ReportsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  const [isExporting, setIsExporting] = useState(false)

  const handleExportReport = async () => {
    setIsExporting(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create and download report
    const reportData = {
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      totalRevenue: "47.3M RWF",
      occupancyRate: "89%",
      totalUnits: 156,
      occupiedUnits: 139,
      properties: [
        { name: "Kigali Plaza", revenue: "15.2M RWF", occupancy: "92%", units: 45 },
        { name: "Nyarutarama Complex", revenue: "12.8M RWF", occupancy: "88%", units: 38 },
        { name: "Kimisagara Complex", revenue: "9.2M RWF", occupancy: "93%", units: 28 },
        { name: "Remera Mall", revenue: "6.8M RWF", occupancy: "85%", units: 20 },
      ],
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bizrent-report-${selectedPeriod}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    console.log("[v0] Report exported:", reportData)
    setIsExporting(false)
  }

  const [selectedReport, setSelectedReport] = useState("overview")

  // Sample data for charts
  const revenueData = [
    { month: "Jul", revenue: 42500000, target: 45000000 },
    { month: "Aug", revenue: 44200000, target: 45000000 },
    { month: "Sep", revenue: 43800000, target: 45000000 },
    { month: "Oct", revenue: 46100000, target: 45000000 },
    { month: "Nov", revenue: 45200000, target: 45000000 },
    { month: "Dec", revenue: 47300000, target: 45000000 },
  ]

  const occupancyData = [
    { month: "Jul", occupancy: 92, vacant: 8 },
    { month: "Aug", occupancy: 89, vacant: 11 },
    { month: "Sep", occupancy: 91, vacant: 9 },
    { month: "Oct", occupancy: 94, vacant: 6 },
    { month: "Nov", occupancy: 96, vacant: 4 },
    { month: "Dec", occupancy: 94, vacant: 6 },
  ]

  const paymentStatusData = [
    { name: "Paid on Time", value: 78, color: "#10B981" },
    { name: "Late Payment", value: 15, color: "#F59E0B" },
    { name: "Overdue", value: 7, color: "#EF4444" },
  ]

  const agingData = [
    { range: "0-30 days", amount: 2400000, count: 8 },
    { range: "31-60 days", amount: 1800000, count: 5 },
    { range: "61-90 days", amount: 950000, count: 3 },
    { range: "90+ days", amount: 420000, count: 2 },
  ]

  const propertyPerformance = [
    { property: "Kigali Business Center", revenue: 18500000, occupancy: 93, units: 45 },
    { property: "Nyamirambo Plaza", revenue: 12800000, occupancy: 88, units: 32 },
    { property: "Kimisagara Complex", revenue: 9200000, occupancy: 93, units: 28 },
    { property: "Remera Mall", revenue: 6800000, occupancy: 85, units: 20 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into your rental business performance</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <Button variant="outline" onClick={handleExportReport} disabled={isExporting}>
            <FileText className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-secondary">47.3M RWF</p>
                <p className="text-xs text-secondary">+5.2% from last month</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-xs text-primary">+2% from last month</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-secondary">92%</p>
                <p className="text-xs text-secondary">+1.5% from last month</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <CreditCard className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
                <p className="text-2xl font-bold text-accent">5.6M RWF</p>
                <p className="text-xs text-accent">-8% from last month</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
          <TabsTrigger value="aging">Aging Report</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy Report</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue vs target over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip
                      formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M RWF`, ""]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      name="Actual Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Status Distribution</CardTitle>
                <CardDescription>Current month payment status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Property Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>Revenue and occupancy by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyPerformance.map((property, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{property.property}</h3>
                        <p className="text-sm text-muted-foreground">{property.units} units</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium">{(property.revenue / 1000000).toFixed(1)}M RWF</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Occupancy</p>
                        <p className="font-medium text-secondary">{property.occupancy}%</p>
                      </div>
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full"
                          style={{ width: `${property.occupancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Analysis</CardTitle>
              <CardDescription>Detailed monthly performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M RWF`, ""]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    name="Monthly Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="font-medium">47.3M RWF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Collections</span>
                    <span className="font-medium">43.5M RWF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="font-medium text-accent">3.8M RWF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collection Rate</span>
                    <span className="font-medium text-secondary">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {propertyPerformance.slice(0, 3).map((property, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{property.property}</span>
                      <span className="font-medium">{(property.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aging Analysis</CardTitle>
              <CardDescription>Outstanding payments by age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={agingData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="range" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value:number) => [`${(value / 1000000).toFixed(1)}M RWF`, ""]}
                    labelFormatter={(label) => `Age: ${label}`}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--accent))" name="Outstanding Amount" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aging Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agingData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.range}</p>
                        <p className="text-sm text-muted-foreground">{item.count} invoices</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-accent">{(item.amount / 1000000).toFixed(1)}M RWF</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Priority:</strong> 2 invoices over 90 days (420K RWF)
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Medium Priority:</strong> 3 invoices 61-90 days (950K RWF)
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Follow Up:</strong> 5 invoices 31-60 days (1.8M RWF)
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trends</CardTitle>
              <CardDescription>Occupancy and vacancy rates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} labelFormatter={(label) => `Month: ${label}`} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stackId="1"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    name="Occupied"
                  />
                  <Area
                    type="monotone"
                    dataKey="vacant"
                    stackId="1"
                    stroke="hsl(var(--muted))"
                    fill="hsl(var(--muted))"
                    name="Vacant"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Occupancy Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Units</span>
                    <span className="font-medium">125</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Occupied Units</span>
                    <span className="font-medium text-secondary">117</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vacant Units</span>
                    <span className="font-medium text-muted-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Occupancy Rate</span>
                    <span className="font-medium text-secondary">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vacancy Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Vacancy Period</span>
                    <span className="font-medium">23 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Longest Vacant Unit</span>
                    <span className="font-medium">45 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Loss (Vacant)</span>
                    <span className="font-medium text-accent">1.2M RWF/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}