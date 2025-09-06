"use client"
import TenantPortal from "./(Tenant)/tenant/page"
import LandlordPortal from "./(Landlord)/landlord/page"
import AuthPage from "./auth/page"
import { useState, useEffect } from "react"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"tenant" | "landlord">("tenant")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check for existing session on page load
    const savedSession = localStorage.getItem("userSession")
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setUserRole(session.role)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Failed to restore session:", error)
        localStorage.removeItem("userSession")
      }
    }
  }, [])

  // Mock user profile data for tenant
  const mockTenantProfile = {
    id: "tenant-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    role: "tenant",
    tenantId: "TNT-001",
  }

  const mockLandlordProfile = {
    id: "landlord-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+250 788 123 456",
    organization: "Johnson Properties Ltd",
    role: "landlord",
  }

  const handleLogout = () => {
    setIsLoading(true)
    localStorage.removeItem("userSession")
    setTimeout(() => {
      setIsLoggedIn(false)
      setIsLoading(false)
      console.log("User logged out")
    }, 500) // Small delay for smooth transition
  }

  const handleLogin = (role: "tenant" | "landlord") => {
    setIsLoading(true)
    setUserRole(role)
    localStorage.setItem("userSession", JSON.stringify({ role, timestamp: Date.now() }))
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
      console.log(`User logged in as ${role}`)
    }, 500) // Small delay for smooth transition
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <AuthPage />
  }

  if (userRole === "landlord") {
    return <LandlordPortal onLogout={handleLogout} userProfile={mockLandlordProfile} />
  }

  return <TenantPortal onLogout={handleLogout} userProfile={mockTenantProfile} />
}
