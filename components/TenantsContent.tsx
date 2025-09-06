"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Mail, Phone, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import AddTenantModal from "./AddTenantModal"

export default function TenantsContent() {
  const [showAddTenant, setShowAddTenant] = useState(false)
  const [tenants, setTenants] = useState([
    {
      id: "tenant-1",
      name: "Jean Baptiste Uwimana",
      unit: "Shop A-12, Kigali Business Center",
      phone: "+250 788 123 456",
      email: "jean.baptiste@email.com",
      status: "Active",
      rent: "150,000 RWF",
      nextDue: "Dec 1, 2024",
    },
    {
      id: "tenant-2",
      name: "Marie Claire Mukamana",
      unit: "Office B-5, Kigali Business Center",
      phone: "+250 788 234 567",
      email: "marie.claire@email.com",
      status: "Active",
      rent: "200,000 RWF",
      nextDue: "Dec 1, 2024",
    },
    {
      id: "tenant-3",
      name: "Patrick Nzeyimana",
      unit: "Kiosk C-3, Nyamirambo Plaza",
      phone: "+250 788 345 678",
      email: "patrick.n@email.com",
      status: "Overdue",
      rent: "80,000 RWF",
      nextDue: "Nov 25, 2024",
    },
  ])

  type TenantData = {
    name: string
    unit: string
    phone: string
    email: string
    rent: string
  }

  const handleAddTenant = (tenantData: TenantData) => {
    const newTenant = {
      id: `tenant-${Date.now()}`,
      ...tenantData,
      status: "Active",
      nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }
    setTenants((prev) => [...prev, newTenant])
    setShowAddTenant(false)
    console.log("[v0] Added new tenant:", newTenant)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Tenants</h2>
          <p className="text-muted-foreground">Manage tenant information and lease agreements</p>
        </div>
        <Button onClick={() => setShowAddTenant(true)}>
          <Users className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">{tenant.unit}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {tenant.phone}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {tenant.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        tenant.status === "Active" ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </div>
                  <p className="font-medium">{tenant.rent}</p>
                  <p className="text-xs text-muted-foreground">Due: {tenant.nextDue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAddTenant && <AddTenantModal onClose={() => setShowAddTenant(false)} onSave={handleAddTenant} />}
    </div>
  )
}