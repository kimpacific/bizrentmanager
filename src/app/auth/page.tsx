"use client"
import { useState } from "react"
import type React from "react"
import { Building2, User, Building, CreditCard, BarChart3, Bell, Eye, EyeOff } from "lucide-react"

interface FormData {
  name: string
  phone: string
  organization: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  [key: string]: string
}

export default function RedesignedAuthPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [activeRole, setActiveRole] = useState<"landlord" | "tenant">("landlord")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (isSignUp) {
      if (!formData.name.trim()) newErrors.name = "Full name is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (activeRole === "landlord" && !formData.organization.trim()) {
        newErrors.organization = "Organization name is required"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Handle successful submission here
      console.log("Form submitted successfully")
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = (): void => {
    setIsSignUp(!isSignUp)
    setFormData({
      name: "",
      phone: "",
      organization: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setErrors({})
  }

  const inputClassName = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
  const labelClassName = "text-sm font-medium text-slate-700"
  const errorClassName = "text-sm text-red-500 animate-in slide-in-from-top-2"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-700 ease-in-out" 
         style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',backgroundImage: 'url("@")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          
          {/* Hero Section with Enhanced Animations */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1 transform transition-all duration-1000 ease-out animate-in slide-in-from-left-10">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  BizRent Manager
                </h1>
              </div>
              
              <div className="transform transition-all duration-1000 delay-200 ease-out">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  Simplify Your <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">Rental Business</span> in Rwanda
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 text-pretty max-w-2xl mx-auto lg:mx-0 mt-4 leading-relaxed">
                  The trusted platform for landlords and tenants to manage rent payments, track invoices, and streamline
                  property management with mobile money integration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: CreditCard, title: "Mobile Money", desc: "MTN & Airtel integration", color: "from-orange-400 to-orange-500", delay: "0ms" },
                { icon: BarChart3, title: "Analytics", desc: "Track payments & trends", color: "from-orange-500 to-orange-600", delay: "150ms" },
                { icon: Bell, title: "Reminders", desc: "SMS & WhatsApp alerts", color: "from-orange-600 to-orange-700", delay: "300ms" },
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-3 group transform transition-all duration-500 hover:scale-105 opacity-0 animate-in fade-in-50 slide-in-from-bottom-5" 
                     style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}>
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-xl mx-auto w-fit shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:rotate-3`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Auth Forms */}
          <div className="w-full max-w-md mx-auto order-1 lg:order-2 transform transition-all duration-1000 ease-out animate-in slide-in-from-right-10">
            <div className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <div className="text-center space-y-4 p-8 pb-6 bg-gradient-to-b from-white to-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 transition-all duration-300">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-base text-slate-600 transition-all duration-300">
                  {isSignUp
                    ? "Join thousands of users managing rentals in Rwanda"
                    : "Sign in to your BizRent Manager account"}
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Role Selection with Enhanced Styling */}
                <div className="w-full">
                  <div className="grid w-full grid-cols-2 h-12 p-1 bg-slate-100 rounded-xl relative overflow-hidden">
                    <div 
                      className={`absolute top-1 bottom-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                        activeRole === 'landlord' ? 'left-1 right-1/2 mr-0.5' : 'right-1 left-1/2 ml-0.5'
                      }`}
                    />
                    {[
                      { value: "landlord" as const, icon: Building, label: "Landlord" },
                      { value: "tenant" as const, icon: User, label: "Tenant" }
                    ].map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setActiveRole(role.value)}
                        className={`text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                          activeRole === role.value
                            ? "text-white transform scale-105"
                            : "text-slate-600 hover:text-slate-800"
                        }`}
                      >
                        <role.icon className="h-4 w-4" />
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="py-4 border-b border-slate-200">
                  <p className="font-medium text-slate-800">Role</p>
                  <p className="text-sm text-slate-600 capitalize">{activeRole}</p>
                </div>

                {/* Enhanced Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Sign Up Fields with Smooth Transitions */}
                  <div className={`space-y-4 transition-all duration-500 ease-in-out ${
                    isSignUp 
                      ? 'opacity-100 max-h-96 transform translate-y-0' 
                      : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
                  }`}>
                    <div className="space-y-2">
                      <label className={labelClassName}>Full Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.name && <p className={errorClassName}>{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className={labelClassName}>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+250 XXX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
                    </div>

                    <div className={`space-y-2 transition-all duration-300 ${
                      activeRole === "landlord" 
                        ? 'opacity-100 max-h-20 transform translate-y-0' 
                        : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
                    }`}>
                      <label className={labelClassName}>Organization Name *</label>
                      <input
                        type="text"
                        placeholder="Your company or organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        className={inputClassName}
                      />
                      {errors.organization && <p className={errorClassName}>{errors.organization}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className={labelClassName}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={inputClassName}
                    />
                    {errors.email && <p className={errorClassName}>{errors.email}</p>}
                  </div>

                  {/* Password with Show/Hide */}
                  <div className="space-y-2">
                    <label className={labelClassName}>Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-full p-3 pr-12 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className={errorClassName}>{errors.password}</p>}
                  </div>

                  {/* Confirm Password for Sign Up */}
                  <div className={`space-y-2 transition-all duration-500 ease-in-out ${
                    isSignUp 
                      ? 'opacity-100 max-h-24 transform translate-y-0' 
                      : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
                  }`}>
                    <label className={labelClassName}>Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="w-full p-3 pr-12 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className={errorClassName}>{errors.confirmPassword}</p>}
                  </div>

                  {/* Enhanced Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Please wait...
                      </>
                    ) : (
                      isSignUp ? "Create account" : "Sign in"
                    )}
                  </button>

                  {/* Role Description */}
                  <p className="text-sm text-center text-slate-600 px-4 transition-all duration-300">
                    {activeRole === "landlord"
                      ? "Manage properties, tenants, and collect rent payments"
                      : "View invoices, pay rent, and communicate with landlords"}
                  </p>
                </form>

                <div className="border-t border-slate-200"></div>

                {/* Toggle Sign In/Sign Up */}
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="font-medium text-orange-600 hover:text-orange-700 transition-all duration-200 hover:underline transform hover:scale-105 inline-block"
                    >
                      {isSignUp ? "Sign in here" : "Create account"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}