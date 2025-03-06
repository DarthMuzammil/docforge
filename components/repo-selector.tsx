"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GitBranch, FolderGit, Search } from "lucide-react"

interface RepoSelectorProps {
  onSelect: (repo: string) => void
}

export default function RepoSelector({ onSelect }: RepoSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [repos, setRepos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching repositories
    const fetchRepos = async () => {
      setLoading(true)
      // In a real implementation, this would call an API to get Git repositories
      setTimeout(() => {
        setRepos([
          "user/project-alpha",
          "user/documentation-example",
          "user/api-service",
          "user/frontend-components",
          "user/utility-library",
        ])
        setLoading(false)
      }, 1000)
    }

    fetchRepos()
  }, [])

  const filteredRepos = repos.filter((repo) => repo.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search repositories..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading repositories...</div>
      ) : filteredRepos.length > 0 ? (
        <div className="grid gap-2">
          {filteredRepos.map((repo) => (
            <Card key={repo} className="p-3 cursor-pointer hover:bg-accent" onClick={() => onSelect(repo)}>
              <div className="flex items-center gap-3">
                <FolderGit className="h-5 w-5 text-muted-foreground" />
                <span>{repo}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">No repositories found.</div>
      )}

      <Button variant="outline" className="w-full">
        <GitBranch className="mr-2 h-4 w-4" />
        Add Repository
      </Button>
    </div>
  )
}

