var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
function Landing() {
  return <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 border-b flex justify-between items-center bg-card">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-6 h-6" />
          <span className="font-display font-bold text-xl tracking-tight text-card-foreground">ByteShare</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-medium">Log In</Button>
          </Link>
          <Link href="/register">
            <Button className="font-medium">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
            Share knowledge. <br />
            <span className="text-primary">A Simple Study Resource Sharing </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            ByteShare is a focused academic community where students trade knowledge, earn credibility, and build their academic reputation through a gamified token economy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full group">
                Join
                <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-y">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access high-quality study materials, notes, assignments, and previous year papers uploaded by your peers.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <Coins className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Earn & Spend Tokens</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get rewarded with tokens for uploading quality resources. Spend them to unlock the materials you need.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Curated Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Classroom hosts review all submissions. Only the best resources make it to the community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center text-muted-foreground border-t bg-card mt-auto">
        <p className="text-sm font-medium">© {(/* @__PURE__ */ new Date()).getFullYear()} ByteShare. Built for students.</p>
      </footer>
    </div>;
}
__name(Landing, "Landing");
export {
  Landing as default
};
