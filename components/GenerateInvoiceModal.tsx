"use client"
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

type InvoiceFormData = {
  tenant: string;
  unit: string;
  amount: string;
  dueDate: string;
  description: string;
};

export default function GenerateInvoiceModal({ onClose, onSave }: { onClose: () => void; onSave: (data: InvoiceFormData) => void }) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    tenant: "",
    unit: "",
    amount: "",
    dueDate: "",
    description: "Monthly Rent",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.tenant || !formData.unit || !formData.amount || !formData.dueDate) {
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
            <CardTitle>Generate Invoice</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenant">Tenant Name *</Label>
              <Input
                id="tenant"
                value={formData.tenant}
                onChange={(e) => setFormData((prev) => ({ ...prev, tenant: e.target.value }))}
                placeholder="e.g., Jean Baptiste Uwimana"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                placeholder="e.g., Shop A-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (RWF) *</Label>
              <Input
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="e.g., 150,000 RWF"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., Monthly Rent, Utilities"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Generating..." : "Generate Invoice"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}