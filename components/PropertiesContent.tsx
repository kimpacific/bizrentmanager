"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Building2, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import AddPropertyModal from "./AddPropertyModal"
import EditPropertyModal from "./EditPropertyModal"
import UnitsModal from "./UnitsModal"


export default function PropertiesContent() {
    type PropertyData = {
    name: string
    location: string
    address: string
    description: string
    // Add other fields that can be edited if needed
  }
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [showUnitsModal, setShowUnitsModal] = useState<string | null>(null)
  const [showEditProperty, setShowEditProperty] = useState<string | null>(null)
  const [properties, setProperties] = useState([
    {
      id: "prop-1",
      name: "Kigali Business Center",
      location: "Kigali, Gasabo",
      units: 45,
      occupied: 42,
      revenue: "18.5M RWF",
      address: "KN 3 Ave, Kigali",
      description: "Modern business center with shops and offices",
    },
    {
      id: "prop-2",
      name: "Nyamirambo Commercial Plaza",
      location: "Kigali, Nyarugenge",
      units: 32,
      occupied: 28,
      revenue: "12.8M RWF",
      address: "Nyamirambo Street, Kigali",
      description: "Commercial plaza in busy Nyamirambo district",
    },
    {
      id: "prop-3",
      name: "Kimisagara Shopping Complex",
      location: "Kigali, Nyarugenge",
      units: 28,
      occupied: 26,
      revenue: "9.2M RWF",
      address: "Kimisagara Road, Kigali",
      description: "Shopping complex with retail spaces",
    },
  ])

  const handleAddProperty = (propertyData: PropertyData) => {
    const newProperty = {
      id: `prop-${Date.now()}`,
      ...propertyData,
      units: 0,
      occupied: 0,
      revenue: "0 RWF",
    }
    setProperties((prev) => [...prev, newProperty])
    setShowAddProperty(false)
    console.log("[v0] Added new property:", newProperty)
  }

  

  const handleEditProperty = (propertyId: string, propertyData: PropertyData) => {
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...propertyData } : p)))
    setShowEditProperty(null)
    console.log("[v0] Updated property:", propertyId, propertyData)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Properties</h2>
          <p className="text-muted-foreground">Manage your rental properties and units</p>
        </div>
        <Button onClick={() => setShowAddProperty(true)}>
          <Building2 className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-md transition-shadow ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {property.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {property.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="text-2xl font-bold">{property.units}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Occupied</p>
                  <p className="text-2xl font-bold text-secondary">{property.occupied}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-xl font-bold text-primary">{property.revenue}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowUnitsModal(property.id)}
                >
                  View Units
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowEditProperty(property.id)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddProperty && <AddPropertyModal onClose={() => setShowAddProperty(false)} onSave={handleAddProperty} />}

      {showUnitsModal && (
        <UnitsModal
          propertyId={showUnitsModal}
          propertyName={properties.find((p) => p.id === showUnitsModal)?.name || ""}
          onClose={() => setShowUnitsModal(null)}
        />
      )}

      {showEditProperty && (
        <EditPropertyModal
          property={properties.find((p) => p.id === showEditProperty)!}
          onClose={() => setShowEditProperty(null)}
          onSave={(data) => handleEditProperty(showEditProperty, data)}
        />
      )}
    </div>
  )
}