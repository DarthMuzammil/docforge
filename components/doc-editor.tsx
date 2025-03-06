"use client"

import type React from "react"
import { Textarea } from "@/components/ui/textarea"

interface DocEditorProps {
  content: string | null
  onChange: (content: string) => void
}

export default function DocEditor({ content, onChange }: DocEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Textarea
      value={content || ""}
      onChange={handleChange}
      placeholder="Enter documentation here..."
      className="min-h-[150px] w-full resize-none"
    />
  )
}

