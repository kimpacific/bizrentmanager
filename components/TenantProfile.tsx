"use client"
import { User, Mail, Phone, MapPin, Shield, Camera, Save, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Badge } from "./ui/badge"

interface UserProfile {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  role?: string
  tenantId?: string
}

interface TenantProfileProps {
  userProfile: UserProfile
}

export default function TenantProfile({ userProfile }: TenantProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-slate-600 mt-1">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={`${
            isEditing
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Status */}
        <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <User className="h-5 w-5 text-orange-500" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <Camera className="h-4 w-4 text-slate-600" />
                </button>
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{userProfile?.name || "Tenant Name"}</p>
              <p className="text-sm text-slate-600">Tenant ID: {userProfile?.tenantId || userProfile?.id}</p>
            </div>
            <div className="flex justify-center">
              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                <Shield className="h-3 w-3 mr-1" />
                Verified Tenant
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2 border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <User className="h-5 w-5 text-orange-500" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic contact and personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-700">
                  Current Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Shield className="h-5 w-5 text-orange-500" />
            Emergency Contact
          </CardTitle>
          <CardDescription>Contact information for emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-slate-700">
                Emergency Contact Name
              </Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                disabled={!isEditing}
                className="border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                placeholder="Enter emergency contact name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-slate-700">
                Emergency Contact Phone
              </Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                disabled={!isEditing}
                className="border-slate-200 focus:border-orange-300 focus:ring-orange-200"
                placeholder="Enter emergency contact phone"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card className="border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Edit className="h-5 w-5 text-orange-500" />
            Additional Notes
          </CardTitle>
          <CardDescription>Any additional information or special requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            disabled={!isEditing}
            className="border-slate-200 focus:border-orange-300 focus:ring-orange-200 min-h-[100px]"
            placeholder="Enter any additional notes or special requests..."
          />
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
