'use client';

export default function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-28 pb-20">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center mx-auto mb-4">
            <span className="w-3 h-3 bg-white rounded-md" />
          </div>
          <h1 className="text-3xl font-black text-hv-foreground tracking-tight mb-2">Welcome Back</h1>
          <p className="text-hv-muted text-sm">Sign in to manage your rentals and favorites.</p>
        </div>

        <div className="bg-white rounded-2xl border border-hv-border/60 shadow-card p-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-hv-foreground mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-hv-foreground mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40"
            />
          </div>
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-hv-sky to-hv-indigo shadow-soft hover:shadow-elevated hover:brightness-105 transition-all">
            Sign In
          </button>
          <p className="text-xs text-hv-muted text-center">
            Don&apos;t have an account?{' '}
            <a href="/pricing" className="text-hv-sky hover:underline font-medium">Create one</a>
          </p>
        </div>
      </div>
    </section>
  );
}
