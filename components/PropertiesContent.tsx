import {
  Building2,
  Plus,
  Edit,
  Trash2,
  MapPin,
} from "lucide-react"
import { useState } from "react"

interface Property {
  id: string
  name: string
  location: string
  units: number
  occupied: number
  revenue: string
}

interface PropertiesContentProps {
  onSelectProperty?: (property: Property) => void
  onAddNew?: () => void
}

const PropertiesContent = ({ onSelectProperty, onAddNew }: PropertiesContentProps) => {
  const [properties] = useState<Property[]>([
    {
      id: "1",
      name: "Kigali Business Center",
      location: "Gasabo, Kigali",
      units: 45,
      occupied: 42,
      revenue: "18.5M RWF",
    },
    {
      id: "2",
      name: "Nyamirambo Plaza",
      location: "Nyarugenge, Kigali",
      units: 32,
      occupied: 28,
      revenue: "12.8M RWF",
    },
    {
      id: "3",
      name: "Kimisagara Complex",
      location: "Nyarugenge, Kigali",
      units: 28,
      occupied: 26,
      revenue: "9.2M RWF",
    },
  ])

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Properties</h2>
          <p className="text-slate-600">Manage your rental properties and units</p>
        </div>
        <button
          onClick={onAddNew}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{property.name}</h3>
            <p className="text-slate-600 flex items-center gap-1 mb-4">
              <MapPin className="h-4 w-4" />
              {property.location}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-600">Total Units</p>
                <p className="text-xl font-bold text-slate-800">{property.units}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Occupied</p>
                <p className="text-xl font-bold text-green-600">{property.occupied}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-slate-600">Monthly Revenue</p>
              <p className="text-lg font-bold text-orange-600">{property.revenue}</p>
            </div>
            
            <button
              onClick={() => onSelectProperty?.(property)}
              className="w-full py-2 border border-orange-200 text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              View Units
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertiesContent