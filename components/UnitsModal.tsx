"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building, X } from "lucide-react";
import AddUnitModal from "./AddUnitModal";
type UnitsModalProps = {
  propertyId: string
  propertyName: string
  onClose: () => void
}
 export default function UnitsModal({
  propertyId,
  propertyName,
  onClose,
}: { propertyId: string; propertyName: string; onClose: () => void }) {
  const [showAddUnit, setShowAddUnit] = useState(false)
  const [units, setUnits] = useState([
    {
      id: "unit-1",
      number: "A-12",
      type: "Shop",
      size: "25 sqm",
      rent: "150,000 RWF",
      status: "Occupied",
      tenant: "Jean Baptiste Uwimana",
      tenantPhone: "+250 788 123 456",
      tenantEmail: "jean.baptiste@email.com",
      leaseStart: "Jan 2024",
      leaseEnd: "Dec 2025",
      lastPayment: "Nov 28, 2024",
      nextDue: "Dec 1, 2024",
    },
    {
      id: "unit-2",
      number: "B-5",
      type: "Office",
      size: "40 sqm",
      rent: "200,000 RWF",
      status: "Occupied",
      tenant: "Marie Claire Mukamana",
      tenantPhone: "+250 788 234 567",
      tenantEmail: "marie.claire@email.com",
      leaseStart: "Mar 2024",
      leaseEnd: "Mar 2026",
      lastPayment: "Nov 1, 2024",
      nextDue: "Dec 1, 2024",
    },
    {
      id: "unit-3",
      number: "C-8",
      type: "Shop",
      size: "20 sqm",
      rent: "120,000 RWF",
      status: "Vacant",
      tenant: null,
      tenantPhone: null,
      tenantEmail: null,
      leaseStart: null,
      leaseEnd: null,
      lastPayment: null,
      nextDue: null,
    },
  ])

  type NewUnitData = {
    number: string;
    type: string;
    size: string;
    rent: string;
  };

  const handleAddUnit = (unitData: NewUnitData) => {
    const newUnit = {
      id: `unit-${Date.now()}`,
      ...unitData,
      status: "Vacant",
      tenant: null,
      tenantPhone: null,
      tenantEmail: null,
      leaseStart: null,
      leaseEnd: null,
      lastPayment: null,
      nextDue: null,
    }
    setUnits((prev) => [...prev, newUnit])
    setShowAddUnit(false)
    console.log("[v0] Added new unit:", newUnit)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Units - {propertyName}</CardTitle>
              <p className="text-sm text-muted-foreground">Manage units and tenant information</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowAddUnit(true)}>
                <Building className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <div className="space-y-4">
            {units.map((unit) => (
              <Card key={unit.id} className="border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Unit {unit.number}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            unit.status === "Occupied"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {unit.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{unit.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Size</p>
                          <p className="font-medium">{unit.size}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Rent</p>
                          <p className="font-medium text-primary">{unit.rent}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium">{unit.status}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {unit.status === "Occupied" && unit.tenant ? (
                        <>
                          <h4 className="font-medium">Tenant Information</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Name</p>
                              <p className="font-medium">{unit.tenant}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-muted-foreground">Phone</p>
                                <p className="font-medium">{unit.tenantPhone}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Email</p>
                                <p className="font-medium text-xs">{unit.tenantEmail}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-muted-foreground">Lease Period</p>
                                <p className="font-medium">
                                  {unit.leaseStart} - {unit.leaseEnd}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Next Due</p>
                                <p className="font-medium">{unit.nextDue}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Payment</p>
                              <p className="font-medium text-secondary">{unit.lastPayment}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">Unit is vacant</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Add Tenant
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAddUnit && <AddUnitModal onClose={() => setShowAddUnit(false)} onSave={handleAddUnit} />}
    </div>
  )
}