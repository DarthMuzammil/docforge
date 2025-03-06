"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import RepoSelector from "@/components/repo-selector"
import DocEditor from "@/components/doc-editor"
import { generateDocumentation, lintDocumentation } from "@/lib/actions"

export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLinting, setIsLinting] = useState(false)
  const [documentation, setDocumentation] = useState<string | null>(null)
  const [lintResults, setLintResults] = useState<any[] | null>(null)

  const handleRepoSelect = (repo: string) => {
    setSelectedRepo(repo)
    setDocumentation(null)
    setLintResults(null)
  }

  const handleGenerateDoc = async () => {
    if (!selectedRepo) return

    setIsGenerating(true)
    try {
      const result = await generateDocumentation(selectedRepo)
      setDocumentation(result)
    } catch (error) {
      console.error("Failed to generate documentation:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLintDoc = async () => {
    if (!documentation) return

    setIsLinting(true)
    try {
      const results = await lintDocumentation(documentation)
      setLintResults(results)
    } catch (error) {
      console.error("Failed to lint documentation:", error)
    } finally {
      setIsLinting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
            <CheckCircle2 className="h-3 w-3" />
            Ollama Connected
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Docs</TabsTrigger>
          <TabsTrigger value="lint">Lint & Improve</TabsTrigger>
          <TabsTrigger value="history">Version History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Repository Selection</CardTitle>
              <CardDescription>Select a repository to generate documentation for.</CardDescription>
            </CardHeader>
            <CardContent>
              <RepoSelector onSelect={handleRepoSelect} />
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateDoc} disabled={!selectedRepo || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Documentation"
                )}
              </Button>
            </CardFooter>
          </Card>

          {documentation && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Documentation</CardTitle>
                <CardDescription>AI-generated documentation based on your codebase.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocEditor content={documentation} onChange={setDocumentation} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Template</Button>
                <Button onClick={handleLintDoc} disabled={isLinting}>
                  {isLinting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Linting...
                    </>
                  ) : (
                    "Lint Documentation"
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="lint" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation Linting</CardTitle>
              <CardDescription>Analyze your documentation for style, accuracy, and consistency.</CardDescription>
            </CardHeader>
            <CardContent>
              {lintResults ? (
                <div className="space-y-4">
                  {lintResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-md flex items-start gap-3">
                      {result.severity === "error" ? (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">{result.message}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{result.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Generate documentation first, then lint it for improvements.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Track changes to your documentation over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Documentation version history will appear here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

