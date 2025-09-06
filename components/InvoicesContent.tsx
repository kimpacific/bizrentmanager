"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import GenerateInvoiceModal from "./GenerateInvoiceModal"

export default function InvoicesContent() {
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false)
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      tenant: "Jean Baptiste Uwimana",
      unit: "Shop A-12",
      amount: "150,000 RWF",
      dueDate: "Dec 1, 2024",
      status: "Paid",
      paidDate: "Nov 28, 2024",
    },
    {
      id: "INV-002",
      tenant: "Marie Claire Mukamana",
      unit: "Office B-5",
      amount: "200,000 RWF",
      dueDate: "Dec 1, 2024",
      status: "Due",
      paidDate: null,
    },
    {
      id: "INV-003",
      tenant: "Patrick Nzeyimana",
      unit: "Kiosk C-3",
      amount: "80,000 RWF",
      dueDate: "Nov 25, 2024",
      status: "Overdue",
      paidDate: null,
    },
  ])

  const handleGenerateInvoice = (invoiceData:any) => {
    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      ...invoiceData,
      status: "Due",
      paidDate: null,
    }
    setInvoices((prev) => [...prev, newInvoice])
    setShowGenerateInvoice(false)
    console.log("[v0] Generated new invoice:", newInvoice)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Invoices</h2>
          <p className="text-muted-foreground">Track and manage rental invoices</p>
        </div>
        <Button onClick={() => setShowGenerateInvoice(true)}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="due">Due</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {invoices.map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{invoice.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {invoice.tenant} • {invoice.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          invoice.status === "Paid"
                            ? "bg-secondary/10 text-secondary"
                            : invoice.status === "Due"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showGenerateInvoice && (
        <GenerateInvoiceModal onClose={() => setShowGenerateInvoice(false)} onSave={handleGenerateInvoice} />
      )}
    </div>
  )
}