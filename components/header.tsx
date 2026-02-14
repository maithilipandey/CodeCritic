export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🎓</div>
          <h1 className="text-4xl font-bold text-foreground">CodeCritic</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Get instant, intelligent feedback on your code. Our AI evaluates correctness, efficiency, readability, and best practices—then shows you exactly how to improve.
        </p>
      </div>
    </header>
  )
}
