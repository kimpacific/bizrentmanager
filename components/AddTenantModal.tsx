"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type TenantFormData = {
  name: string;
  email: string;
  phone: string;
  unit: string;
  rent: string;
  leaseStart: string;
  leaseEnd: string;
};

export default function AddTenantModal({ onClose, onSave }: { onClose: () => void; onSave: (data: TenantFormData) => void }) {
  const [formData, setFormData] = useState<TenantFormData>({
    name: "",
    email: "",
    phone: "",
    unit: "",
    rent: "",
    leaseStart: "",
    leaseEnd: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.unit || !formData.rent) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Add New Tenant</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Jean Baptiste Uwimana"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="e.g., jean.baptiste@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g., +250 788 123 456"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                placeholder="e.g., Shop A-15, Kigali Business Center"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent (RWF) *</Label>
              <Input
                id="rent"
                value={formData.rent}
                onChange={(e) => setFormData((prev) => ({ ...prev, rent: e.target.value }))}
                placeholder="e.g., 150,000 RWF"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leaseStart">Lease Start</Label>
                <Input
                  id="leaseStart"
                  type="date"
                  value={formData.leaseStart}
                  onChange={(e) => setFormData((prev) => ({ ...prev, leaseStart: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseEnd">Lease End</Label>
                <Input
                  id="leaseEnd"
                  type="date"
                  value={formData.leaseEnd}
                  onChange={(e) => setFormData((prev) => ({ ...prev, leaseEnd: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Adding..." : "Add Tenant"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
