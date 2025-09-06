"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function PaymentReminderSystem() {
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [reminderFrequency, setReminderFrequency] = useState("weekly")

  const handleToggleReminders = (enabled: boolean) => {
    setRemindersEnabled(enabled)
    console.log(`[v0] Payment reminders ${enabled ? "enabled" : "disabled"}`)
  }

  const handleChangeFrequency = (frequency: string) => {
    setReminderFrequency(frequency)
    console.log(`[v0] Payment reminder frequency changed to ${frequency}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Reminders</CardTitle>
        <CardDescription>Automated reminders to tenants for upcoming payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enable-reminders">Enable Reminders</Label>
            <p className="text-sm text-muted-foreground">Send automated reminders to tenants</p>
          </div>
          <Switch id="enable-reminders" checked={remindersEnabled} onCheckedChange={handleToggleReminders} />
        </div>

        {remindersEnabled && (
          <div className="space-y-2">
            <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
            <Select value={reminderFrequency} onValueChange={handleChangeFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
