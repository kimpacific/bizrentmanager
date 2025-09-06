"use client"
import { BarChart3, Bell, Building2, CreditCard, FileText, Home, Settings, Users } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import DashboardContent from "../../../../components/DashboardContent"

import { useState, useEffect } from "react"
import SettingsModal from "../../../../components/SettingsModal"
import PropertiesContent from "../../../../components/PropertiesContent"
import TenantsContent from "../../../../components/TenantsContent"
import InvoicesContent from "../../../../components/InvoicesContent"
import PaymentsContent from "../../../../components/PaymentsContent"
import ReportsContent from "../../../../components/ReportsContent"

interface UserProfile {
  id: string
  name: string
  email: string
  // Add other relevant fields as needed
}

interface OnboardingData {
  building?: {
    buildingName: string
    address: string
    city: string
    district: string
    totalUnits: string
    buildingType: string
    description: string
    amenities: string[]
  }
  tenants?: Array<{
    id: string
    fullName: string
    email: string
    phone: string
    unitNumber: string
    rentAmount: string
    rentDueDate: string
    depositAmount: string
    leaseStartDate: string
    leaseEndDate: string
    emergencyContact: string
    emergencyPhone: string
  }>
}

export default function LandlordDashboard({
  onLogout,
  userProfile,
}: { onLogout: () => void; userProfile: UserProfile }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showSettings, setShowSettings] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem("onboardingData")
    const isFirstLogin = localStorage.getItem("isFirstLogin")

    if (storedData) {
      setOnboardingData(JSON.parse(storedData))
    }

    if (isFirstLogin === "true") {
      setIsNewUser(true)
      localStorage.removeItem("isFirstLogin") // Clear the flag after first load
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("onboardingData")
    localStorage.removeItem("isFirstLogin")
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary">BizRent Manager</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            {/* <ThemeToggle /> */}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home },
              { id: "properties", label: "Properties", icon: Building2 },
              { id: "tenants", label: "Tenants", icon: Users },
              { id: "invoices", label: "Invoices", icon: FileText },
              { id: "payments", label: "Payments", icon: CreditCard },
              { id: "reports", label: "Reports", icon: BarChart3 },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <DashboardContent onboardingData={onboardingData} isNewUser={isNewUser} />}
          {activeTab === "properties" && <PropertiesContent onboardingData={onboardingData} />}
          {activeTab === "tenants" && <TenantsContent onboardingData={onboardingData} />}
          {activeTab === "invoices" && <InvoicesContent />}
          {activeTab === "payments" && <PaymentsContent />}
          {activeTab === "reports" && <ReportsContent />}
        </main>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} userType="landlord" />}
    </div>
  )
}
