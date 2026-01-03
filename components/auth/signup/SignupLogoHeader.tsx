export default function SignupLogoHeader() {
  return (
    <div className="flex flex-col items-center mb-2 mt-0">
      <div className="w-12 h-12 border-2 border-muted rounded-lg flex items-center justify-center mb-4 text-muted-foreground">
        <span className="text-2xl">+</span>
      </div>
      <div className="w-16 h-2 bg-primary rounded mb-6" />
      <h1 className="text-2xl font-light tracking-widest text-foreground mb-1">
        INTEGRITY
      </h1>
      <h1 className="text-2xl font-light tracking-widest text-foreground mb-2">
        TISSUE
      </h1>
      <p className="text-muted-foreground text-xs tracking-widest mb-4">
        — SOLUTIONS —
      </p>
      <h2 className="text-xl font-bold text-foreground mb-2">Account Signup</h2>
    </div>
  );
}
