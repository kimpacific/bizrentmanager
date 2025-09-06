"use client"
import { useState } from "react"
import { X, Shield, Lock, Save, Eye, EyeOff } from 'lucide-react'
import { Button } from "./ui/button"

interface SettingsModalProps {
  onClose: () => void
  userType: "tenant" | "landlord"
}

export default function SettingsModal({ onClose, userType }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState("privacy")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [settings, setSettings] = useState({
    privacy: {
      profileVisible: true,
      contactInfo: false,
      dataSharing: false,
      analyticsTracking: true,
    },
    passwords: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  //  Updated sections to only include privacy and password
  const sections = [
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "password", label: "Password", icon: Lock },
  ]

  const handleSettingChange = <T extends keyof typeof settings, K extends keyof (typeof settings)[T]>(
    section: T,
    key: K,
    value: (typeof settings)[T][K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-orange-50 to-orange-100/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Settings</h2>
              <p className="text-sm text-slate-600 capitalize">{userType} Account</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 hover:scale-105"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-5rem)]">
          {/* Sidebar */}
          <div className="w-64 bg-slate-50/50 border-r border-slate-200/60 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                      : "hover:bg-orange-50 text-slate-700 hover:text-orange-700"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === "privacy" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Privacy Settings</h3>
                    <p className="text-sm text-slate-600">Control your privacy and data sharing preferences</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/*  Enhanced privacy settings with better descriptions */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <div>
                      <h4 className="font-medium text-slate-800">Profile Visibility</h4>
                      <p className="text-sm text-slate-600">Allow other users to view your profile information</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange("privacy", "profileVisible", !settings.privacy.profileVisible)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        settings.privacy.profileVisible ? "bg-orange-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                          settings.privacy.profileVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <div>
                      <h4 className="font-medium text-slate-800">Contact Information</h4>
                      <p className="text-sm text-slate-600">Share your contact details with other users</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange("privacy", "contactInfo", !settings.privacy.contactInfo)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        settings.privacy.contactInfo ? "bg-orange-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                          settings.privacy.contactInfo ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <div>
                      <h4 className="font-medium text-slate-800">Data Sharing</h4>
                      <p className="text-sm text-slate-600">Allow sharing of anonymized data for service improvement</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange("privacy", "dataSharing", !settings.privacy.dataSharing)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        settings.privacy.dataSharing ? "bg-orange-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                          settings.privacy.dataSharing ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <div>
                      <h4 className="font-medium text-slate-800">Analytics Tracking</h4>
                      <p className="text-sm text-slate-600">Help us improve the app by sharing usage analytics</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange("privacy", "analyticsTracking", !settings.privacy.analyticsTracking)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        settings.privacy.analyticsTracking ? "bg-orange-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                          settings.privacy.analyticsTracking ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/*  Added password settings section */}
            {activeSection === "password" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Password Settings</h3>
                    <p className="text-sm text-slate-600">Update your account password for better security</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={settings.passwords.currentPassword}
                        onChange={(e) => handleSettingChange("passwords", "currentPassword", e.target.value)}
                        className="w-full p-3 pr-10 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={settings.passwords.newPassword}
                        onChange={(e) => handleSettingChange("passwords", "newPassword", e.target.value)}
                        className="w-full p-3 pr-10 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={settings.passwords.confirmPassword}
                        onChange={(e) => handleSettingChange("passwords", "confirmPassword", e.target.value)}
                        className="w-full p-3 pr-10 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {settings.passwords.newPassword && settings.passwords.confirmPassword && 
                     settings.passwords.newPassword !== settings.passwords.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Password Security Tips</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Use at least 8 characters</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Add numbers and special characters</li>
                      <li>• Avoid using personal information</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200/60 bg-slate-50/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-600 hover:bg-slate-100 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
