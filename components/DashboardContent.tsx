"use client"
import { Building2, Calendar, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Welcome back, Axel</h2>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your properties today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">94%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">45.2M RWF</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">8</div>
            <p className="text-xs text-muted-foreground">-3 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  tenant: "Jean Baptiste",
                  unit: "Shop A-12",
                  amount: "150,000 RWF",
                  time: "2 hours ago",
                  status: "paid",
                },
                {
                  tenant: "Marie Claire",
                  unit: "Office B-5",
                  amount: "200,000 RWF",
                  time: "4 hours ago",
                  status: "paid",
                },
                {
                  tenant: "Patrick Nzeyimana",
                  unit: "Kiosk C-3",
                  amount: "80,000 RWF",
                  time: "1 day ago",
                  status: "paid",
                },
              ].map((payment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{payment.tenant}</p>
                    <p className="text-sm text-muted-foreground">{payment.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary">{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tenant: "Emmanuel Uwimana", unit: "Shop D-8", amount: "120,000 RWF", days: "5 days late" },
                { tenant: "Grace Mukamana", unit: "Office A-15", amount: "180,000 RWF", days: "12 days late" },
                { tenant: "Samuel Habimana", unit: "Shop B-22", amount: "95,000 RWF", days: "3 days late" },
              ].map((overdue, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                  <div>
                    <p className="font-medium">{overdue.tenant}</p>
                    <p className="text-sm text-muted-foreground">{overdue.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-accent">{overdue.amount}</p>
                    <p className="text-xs text-accent">{overdue.days}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}