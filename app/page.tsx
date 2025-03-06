"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, GitBranch, Code, Settings, MessageSquare, History } from "lucide-react"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = () => {
    setIsLoading(true)
    // Simulate connection to local Ollama instance
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">DocForge</h1>
            <Badge variant="outline" className="ml-2">
              Alpha
            </Badge>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="ghost" size="sm">
              Docs
            </Button>
            <Button variant="ghost" size="sm">
              GitHub
            </Button>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </nav>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 px-4 py-6">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="grid items-start gap-2 text-sm font-medium">
            <Button variant="ghost" className="justify-start gap-2">
              <GitBranch className="h-4 w-4" />
              Repositories
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              Documentation
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Code className="h-4 w-4" />
              Templates
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <History className="h-4 w-4" />
              Version History
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        <div className="flex flex-col gap-6">
          {!isConnected ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Welcome to DocForge</CardTitle>
                <CardDescription>
                  Connect to your local Ollama instance to get started with AI-powered documentation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Ollama Host
                      </label>
                      <Input defaultValue="http://localhost:11434" className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Model
                      </label>
                      <Input defaultValue="llama2" className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleConnect} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect to Ollama"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
    </main>
  )
}

