"use client"
import { useState } from "react"
import {
  ArrowLeft,
  Building2,
  Search,
  Edit,
  AlertCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Home,
  User,
  Filter,
} from "lucide-react"

interface Unit {
  id: string
  number: string
  type: "shop" | "office" | "kiosk" | "apartment"
  size: string
  rent: string
  status: "occupied" | "vacant" | "maintenance"
  tenant?: {
    id: string
    name: string
    phone: string
    email: string
    leaseStart: string
    leaseEnd: string
    paymentStatus: "current" | "overdue" | "pending"
  }
  lastMaintenance: string
  amenities: string[]
}

interface Property {
  id: string
  name: string
  location: string
  totalUnits: number
}

interface UnitsManagementProps {
  property: Property
  onBack: () => void
}

export default function UnitsManagement({ property, onBack }: UnitsManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "occupied" | "vacant" | "maintenance">("all")
  const [showAddTenant, setShowAddTenant] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Sample units data
  const [units] = useState<Unit[]>([
    {
      id: "1",
      number: "A-12",
      type: "shop",
      size: "45 sqm",
      rent: "150,000 RWF",
      status: "occupied",
      tenant: {
        id: "t1",
        name: "Jean Baptiste Uwimana",
        phone: "+250 788 123 456",
        email: "jean.baptiste@email.com",
        leaseStart: "Jan 1, 2024",
        leaseEnd: "Dec 31, 2024",
        paymentStatus: "current",
      },
      lastMaintenance: "Oct 15, 2024",
      amenities: ["AC", "WiFi", "Parking"],
    },
    {
      id: "2",
      number: "B-5",
      type: "office",
      size: "32 sqm",
      rent: "200,000 RWF",
      status: "occupied",
      tenant: {
        id: "t2",
        name: "Marie Claire Mukamana",
        phone: "+250 788 234 567",
        email: "marie.claire@email.com",
        leaseStart: "Mar 1, 2024",
        leaseEnd: "Feb 28, 2025",
        paymentStatus: "overdue",
      },
      lastMaintenance: "Sep 20, 2024",
      amenities: ["AC", "WiFi", "Conference Room"],
    },
    {
      id: "3",
      number: "C-3",
      type: "kiosk",
      size: "12 sqm",
      rent: "80,000 RWF",
      status: "vacant",
      lastMaintenance: "Nov 1, 2024",
      amenities: ["Electricity", "Water"],
    },
    {
      id: "4",
      number: "A-8",
      type: "shop",
      size: "38 sqm",
      rent: "130,000 RWF",
      status: "maintenance",
      lastMaintenance: "Nov 25, 2024",
      amenities: ["AC", "WiFi", "Storage"],
    },
  ])

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.tenant?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || unit.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-green-100 text-green-700"
      case "vacant":
        return "bg-yellow-100 text-yellow-700"
      case "maintenance":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-700"
      case "overdue":
        return "bg-red-100 text-red-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getUnitTypeIcon = (type: string) => {
    switch (type) {
      case "shop":
        return Building2
      case "office":
        return Home
      case "kiosk":
        return Building2
      case "apartment":
        return Home
      default:
        return Building2
    }
  }

  const AddTenantModal = ({ unitId, onClose }: { unitId: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in-0 duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-orange-100/50 animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Add New Tenant</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter tenant name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="+250 788 123 456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="tenant@email.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lease Start</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lease End</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 hover:scale-105 font-medium shadow-lg"
          >
            Add Tenant
          </button>
        </div>
      </div>
    </div>
  )

  const DeleteConfirmModal = ({
    unitId,
    tenantName,
    onClose,
  }: { unitId: string; tenantName: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in-0 duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-red-100/50 animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Remove Tenant</h3>
        </div>
        <p className="text-slate-600 mb-6">
          Are you sure you want to remove <strong>{tenantName}</strong> from this unit? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 hover:scale-105 font-medium shadow-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200 hover:scale-110"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{property.name} - Units</h2>
          <p className="text-slate-600 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.location} • {property.totalUnits} Total Units
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search units or tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              <option value="all">All Units</option>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600">Occupied</p>
            <p className="text-lg font-bold text-green-600">{units.filter((u) => u.status === "occupied").length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Vacant</p>
            <p className="text-lg font-bold text-yellow-600">{units.filter((u) => u.status === "vacant").length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Maintenance</p>
            <p className="text-lg font-bold text-red-600">{units.filter((u) => u.status === "maintenance").length}</p>
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUnits.map((unit, index) => {
          const UnitIcon = getUnitTypeIcon(unit.type)
          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-slate-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <UnitIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Unit {unit.number}</h3>
                    <p className="text-sm text-slate-600 capitalize">
                      {unit.type} • {unit.size}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(unit.status)}`}>
                  {unit.status.toUpperCase()}
                </span>
              </div>

              {/* Unit Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Monthly Rent</span>
                  <span className="font-semibold text-slate-800">{unit.rent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Maintenance</span>
                  <span className="text-sm text-slate-600">{unit.lastMaintenance}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Amenities: </span>
                  <span className="text-sm text-slate-800">{unit.amenities.join(", ")}</span>
                </div>
              </div>

              {/* Tenant Information */}
              {unit.tenant ? (
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-800">Current Tenant</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(unit.tenant.paymentStatus)}`}
                    >
                      {unit.tenant.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800">{unit.tenant.name}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {unit.tenant.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {unit.tenant.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {unit.tenant.leaseStart} - {unit.tenant.leaseEnd}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-xl p-4 mb-4 text-center">
                  <XCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-yellow-700 font-medium">Unit Available</p>
                  <p className="text-xs text-yellow-600">Ready for new tenant</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {unit.tenant ? (
                  <button
                    onClick={() => setShowDeleteConfirm(unit.id)}
                    className="flex-1 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md text-sm font-medium"
                  >
                    Remove Tenant
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddTenant(unit.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium shadow-lg"
                  >
                    Add Tenant
                  </button>
                )}
                <button className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200 hover:shadow-md">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modals */}
      {showAddTenant && <AddTenantModal unitId={showAddTenant} onClose={() => setShowAddTenant(null)} />}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          unitId={showDeleteConfirm}
          tenantName={units.find((u) => u.id === showDeleteConfirm)?.tenant?.name || ""}
          onClose={() => setShowDeleteConfirm(null)}
        />
      )}
    </div>
  )
}
