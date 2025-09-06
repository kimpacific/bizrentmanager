"use client"
import {
  Bell,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  UserIcon,
  LogOut,
  TrendingUp,
  Home,
  Users,
  BarChart3,
} from "lucide-react"
import SettingsModal from "../../../../components/SettingsModal"
import { Button } from "../../../../components/ui/button"
import { ThemeToggle } from "../../../../components/ui/theme-toggle"
import { useState } from "react"
import DashboardContent from "../../../../components/DashboardContent"
import PropertiesContent from "../../../../components/PropertiesContent"
import TenantsContent from "../../../../components/TenantsContent"
import InvoicesContent from "../../../../components/InvoicesContent"
import PaymentsContent from "../../../../components/PaymentsContent"
import ReportsContent from "../../../../components/ReportsContent"

interface UserProfile {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  role?: string
}

export default function LandlordPortal({ onLogout, userProfile }: { onLogout: () => void; userProfile: UserProfile }) {
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Overview & analytics" },
    { id: "properties", label: "Properties", icon: Home, description: "Manage your properties" },
    { id: "tenants", label: "Tenants", icon: Users, description: "Tenant management" },
    { id: "invoices", label: "Invoices", icon: FileText, description: "Create & manage invoices" },
    { id: "payments", label: "Payments", icon: CreditCard, description: "Track payment history" },
    { id: "reports", label: "Reports", icon: BarChart3, description: "Financial insights" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-700 ease-in-out ">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              BizRent Manager
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:scale-105"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:scale-105"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-72 bg-white/60 backdrop-blur-sm border-r border-slate-200/60 shadow-lg overflow-y-scroll ">
          <div className="p-6">
            <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Welcome back!</h3>
                  <p className="text-sm text-slate-600">{userProfile?.name || "Landlord"}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2 ">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Navigation</h4>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    activeTab === item.id
                      ? "bg-orange-600 shadow-lg shadow-orange-500/25"
                      : "hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 text-slate-700 hover:text-orange-700 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        activeTab === item.id ? "bg-orange-700" : "bg-slate-100 group-hover:bg-orange-200/50"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${activeTab === item.id ? "text-white" : ""}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${activeTab === item.id ? "text-white" : ""}`}>{item.label}</div>
                      <div
                        className={`text-xs transition-all duration-300 ${
                          activeTab === item.id ? "text-orange-100" : "text-slate-500 group-hover:text-orange-600"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {activeTab === item.id && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                Quick Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">This Month</span>
                  <span className="font-medium text-slate-800">$12,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-medium text-orange-600">$2,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Properties</span>
                  <span className="font-medium text-slate-800">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tenants</span>
                  <span className="font-medium text-slate-800">24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 min-h-[calc(100vh-8rem)]">
              <div className="p-6">
                {activeTab === "dashboard" && <DashboardContent userProfile={userProfile} />}
                {activeTab === "properties" && <PropertiesContent />}
                {activeTab === "tenants" && <TenantsContent />}
                {activeTab === "invoices" && <InvoicesContent />}
                {activeTab === "payments" && <PaymentsContent />}
                {activeTab === "reports" && <ReportsContent />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} userType="landlord" />}
    </div>
  )
}