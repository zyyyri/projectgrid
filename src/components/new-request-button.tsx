"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function NewRequestButton() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [details, setDetails] = useState("")

  const onSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setOpen(false)
    setTitle("")
    setType("")
    setDetails("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ New Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>New Request</DialogTitle>
          <DialogDescription>Fill in the request details and submit.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="req-title">Title</Label>
            <Input id="req-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., SF10 Certification" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="req-type">Type</Label>
            <Input id="req-type" value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g., Document, Service" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="req-details">Details</Label>
            <Textarea id="req-details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Provide additional information..." rows={4} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={submitting || !title.trim()}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


