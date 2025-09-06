"use client"
import { useState } from "react"
import PaymentReminderSystem from "./PaymentReminderSystem"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle, Clock, DollarSign, Eye, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import Image from "next/image"

export default function PaymentsContent() {
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: "PAY-001",
      tenant: "Emmanuel Uwimana",
      unit: "Shop D-8",
      amount: "120,000 RWF",
      transactionId: "MTN-789456123",
      paymentMethod: "MTN MoMo",
      submittedAt: "2024-12-01 14:30",
      proofImage: "/mtn-momo-payment-screenshot.jpg",
      status: "pending",
    },
    {
      id: "PAY-002",
      tenant: "Grace Mukamana",
      unit: "Office A-15",
      amount: "180,000 RWF",
      transactionId: "AIRTEL-456789012",
      paymentMethod: "Airtel Money",
      submittedAt: "2024-12-01 16:45",
      proofImage: "/airtel-money-payment-screenshot.jpg",
      status: "pending",
    },
    {
      id: "PAY-003",
      tenant: "Samuel Habimana",
      unit: "Shop B-22",
      amount: "95,000 RWF",
      transactionId: "MTN-321654987",
      paymentMethod: "MTN MoMo",
      submittedAt: "2024-12-01 09:15",
      proofImage: "/mtn-momo-payment-screenshot.jpg",
      status: "pending",
    },
  ])

  const [approvedPayments, setApprovedPayments] = useState([
    {
      id: "PAY-004",
      tenant: "Jean Baptiste",
      unit: "Shop A-12",
      amount: "150,000 RWF",
      transactionId: "MTN-987654321",
      paymentMethod: "MTN MoMo",
      submittedAt: "2024-11-30 10:20",
      approvedAt: "2024-11-30 11:45",
      status: "approved",
    },
  ])

  type Payment = {
    id: string;
    tenant: string;
    unit: string;
    amount: string;
    transactionId: string;
    paymentMethod: string;
    submittedAt: string;
    proofImage?: string;
    status: string;
    approvedAt?: string;
  };

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showProofModal, setShowProofModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApprovePayment = async (paymentId: string) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const payment = pendingPayments.find((p) => p.id === paymentId)
    if (payment) {
      const approvedPayment = {
        ...payment,
        status: "approved",
        approvedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      }

      setPendingPayments((prev) => prev.filter((p) => p.id !== paymentId))
      setApprovedPayments((prev) => [...prev, approvedPayment])

      console.log("[v0] Payment approved:", approvedPayment)
    }

    setIsProcessing(false)
    setSelectedPayment(null)
    setShowProofModal(false)
  }

  const handleRejectPayment = async (paymentId: string) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPendingPayments((prev) => prev.filter((p) => p.id !== paymentId))
    console.log("[v0] Payment rejected:", paymentId)

    setIsProcessing(false)
    setSelectedPayment(null)
    setShowProofModal(false)
  }

  const viewProof = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowProofModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Payment Management</h2>
        <p className="text-muted-foreground">Review and approve tenant payment submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{pendingPayments.length}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{approvedPayments.length}</p>
                <p className="text-sm text-muted-foreground">Approved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">545,000</p>
                <p className="text-sm text-muted-foreground">RWF Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals ({pendingPayments.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved Payments</TabsTrigger>
          <TabsTrigger value="all">All Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payment Approvals</CardTitle>
              <CardDescription>Review payment proofs and approve or reject submissions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {pendingPayments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending payments to review</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {pendingPayments.map((payment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                          <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{payment.tenant}</h3>
                          <p className="text-sm text-muted-foreground">
                            {payment.unit} • {payment.paymentMethod}
                          </p>
                          <p className="text-xs text-muted-foreground">Transaction ID: {payment.transactionId}</p>
                          <p className="text-xs text-muted-foreground">Submitted: {payment.submittedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium text-lg">{payment.amount}</p>
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                            Pending Review
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => viewProof(payment)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Proof
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprovePayment(payment.id)}
                            disabled={isProcessing}
                            className="bg-secondary hover:bg-secondary/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectPayment(payment.id)}
                            disabled={isProcessing}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Payments</CardTitle>
              <CardDescription>Recently approved payment submissions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {approvedPayments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No approved payments yet</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {approvedPayments.map((payment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{payment.tenant}</h3>
                          <p className="text-sm text-muted-foreground">
                            {payment.unit} • {payment.paymentMethod}
                          </p>
                          <p className="text-xs text-muted-foreground">Transaction ID: {payment.transactionId}</p>
                          <p className="text-xs text-muted-foreground">Approved: {payment.approvedAt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">{payment.amount}</p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                          Approved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Payment Submissions</CardTitle>
              <CardDescription>Complete payment history and status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {[...pendingPayments, ...approvedPayments].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          payment.status === "approved" ? "bg-secondary/10" : "bg-amber-100 dark:bg-amber-900/20"
                        }`}
                      >
                        {payment.status === "approved" ? (
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{payment.tenant}</h3>
                        <p className="text-sm text-muted-foreground">
                          {payment.unit} • {payment.paymentMethod}
                        </p>
                        <p className="text-xs text-muted-foreground">Transaction ID: {payment.transactionId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          payment.status === "approved"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {payment.status === "approved" ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Proof Modal */}
      {showProofModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Payment Proof Review</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowProofModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tenant</label>
                    <p className="font-medium">{selectedPayment.tenant}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Unit</label>
                    <p className="font-medium">{selectedPayment.unit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <p className="font-medium text-lg text-primary">{selectedPayment.amount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                    <p className="font-medium">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                    <p className="font-mono text-sm">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Submitted At</label>
                    <p className="text-sm">{selectedPayment.submittedAt}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Payment Screenshot</label>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <Image
                      src={selectedPayment.proofImage || "/placeholder.svg"}
                      alt="Payment proof"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleApprovePayment(selectedPayment.id)}
                    disabled={isProcessing}
                    className="flex-1 bg-secondary hover:bg-secondary/90"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Payment
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRejectPayment(selectedPayment.id)}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PaymentReminderSystem />
    </div>
  )
}