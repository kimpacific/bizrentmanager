"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type UnitFormData = {
  number: string;
  type: string;
  size: string;
  rent: string;
};

export default function AddUnitModal({ onClose, onSave }: { onClose: () => void; onSave: (data: UnitFormData) => void }) {
  const [formData, setFormData] = useState<UnitFormData>({
    number: "",
    type: "Shop",
    size: "",
    rent: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.number || !formData.size || !formData.rent) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Add New Unit</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">Unit Number *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
                placeholder="e.g., A-15, B-22"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Unit Type *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="Shop">Shop</option>
                <option value="Office">Office</option>
                <option value="Kiosk">Kiosk</option>
                <option value="Warehouse">Warehouse</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size *</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                placeholder="e.g., 25 sqm, 40 sqm"
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
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Adding..." : "Add Unit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
