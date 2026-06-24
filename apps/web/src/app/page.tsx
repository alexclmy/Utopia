"use client";

import { seedDecisions, approvalScore, layerMetadata, totalVotes, type Decision } from "@utopia/domain";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Bell, Github, Globe2, Layers3, Mail, MapPin, Sparkles, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { DecisionPanel } from "@/components/decision-panel";

const CityScene = dynamic(() => import("@/components/city-scene").then((module) => module.CityScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,#d6e8d8,#f4f1e8)]" />
});

type Screen = "visitor" | "signup" | "quiz" | "profile" | "onboarding" | "feed" | "vote" | "submit" | "submitted";

type QuizAnswer = {
  question: string;
  label: string;
};

const quiz = [
  {
    question: "When you arrive in a new city, what's the first thing you notice?",
    options: ["🚶 How walkable it feels", "🌳 How much green there is", "🏛️ The architecture & streets", "🎶 The energy and sounds"]
  },
  {
    question: "What matters more to you in a city?",
    options: ["⚡ Efficiency, it just works", "✨ Charm, it has soul", "🤝 Community, people connect", "🌱 Sustainability, it lasts"]
  },
  {
    question: "Cars in the city centre are…",
    options: ["🚫 Should be mostly banned", "🚲 Second to bikes & transit", "⚖️ A necessary balance", "🚗 Still essential"]
  },
  {
    question: "A great public space looks like…",
    options: ["🌳 A leafy, shaded park", "🏟️ A lively open plaza", "💧 A waterfront to linger on", "📚 A quiet, human-scaled corner"]
  }
];

const profileTags = ["🚲 Mobility-first", "🌳 Green advocate", "🤝 Community builder"];
const submitSteps = ["What did you see?", "Where exactly?", "Why is it good?", "What's the downside?", "Review & submit"];

function PrimaryButton({ children, onClick, subtle = false }: { children: React.ReactNode; onClick: () => void; subtle?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        subtle
          ? "rounded-2xl bg-white/70 px-5 py-3 font-display font-semibold text-[#1b5e43] shadow-soft transition hover:bg-white"
          : "rounded-2xl bg-[#1b5e43] px-5 py-3 font-display font-semibold text-white shadow-[0_12px_28px_rgba(27,94,67,.25)] transition hover:bg-[#16523a]"
      }
    >
      {children}
    </button>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-[#1b5e43] font-display text-xl font-semibold text-white shadow-[0_8px_20px_rgba(27,94,67,.28)]">
        U
      </div>
      <span className="font-display text-xl font-semibold text-ink">Utopia</span>
    </div>
  );
}

function TopNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return (
    <header className="pointer-events-auto absolute left-5 right-5 top-5 z-20 flex items-center justify-between gap-4">
      <Logo />
      <nav className="hidden items-center gap-2 rounded-2xl bg-[#fbf9f2]/80 p-2 shadow-soft backdrop-blur md:flex">
        <button className="rounded-xl px-4 py-2 text-sm font-bold text-[#5a6b5e] transition hover:bg-white" onClick={() => setScreen("visitor")}>Explore</button>
        <button className="rounded-xl px-4 py-2 text-sm font-bold text-[#5a6b5e] transition hover:bg-white" onClick={() => setScreen("feed")}>Feed</button>
        <button className="rounded-xl px-4 py-2 text-sm font-bold text-[#5a6b5e] transition hover:bg-white" onClick={() => setScreen("submit")}>Share observation</button>
      </nav>
      {screen === "visitor" ? <PrimaryButton onClick={() => setScreen("signup")}>Join</PrimaryButton> : null}
    </header>
  );
}

function VisitorHero({ decisions, onJoin, onWalk }: { decisions: Decision[]; onJoin: () => void; onWalk: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center p-5 pb-8 md:items-center md:justify-start md:p-12">
      <section className="pointer-events-auto mb-20 max-w-2xl md:mb-0">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#d6e8d8]/80 px-4 py-2 text-sm font-extrabold text-[#1b5e43] backdrop-blur">
          <Globe2 size={16} /> Open-source · built by everyone
        </div>
        <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-7xl">
          The world&apos;s best city, built by everyone.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#3a443c]">
          Every great city invented something brilliant. Utopia collects those ideas, votes on them, and builds the result in 3D.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton onClick={onJoin}>Add yours <ArrowRight className="ml-2 inline" size={17} /></PrimaryButton>
          <PrimaryButton subtle onClick={onWalk}>Walk the city</PrimaryButton>
        </div>
      </section>

      <div className="glass-panel pointer-events-auto absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-4 rounded-3xl px-5 py-4 md:flex">
        <span className="text-sm font-semibold text-[#28392f]">
          This city was shaped by <b className="text-[#1b5e43]">{decisions.length} decisions</b> from <b className="text-[#1b5e43]">12,480 people</b>.
        </span>
        <button className="rounded-2xl bg-[#1b5e43] px-4 py-2 font-display font-semibold text-white" onClick={onJoin}>Add yours</button>
      </div>
    </div>
  );
}

function Signup({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center overflow-y-auto bg-[#143c2c]/92 p-5">
      <div className="w-full max-w-md rounded-[32px] bg-[#fbf9f2] p-6 shadow-panel md:p-7">
        <button className="mb-5 flex items-center gap-2 text-sm font-bold text-[#5a6b5e]" onClick={onBack}><ArrowLeft size={16} /> Back to the city</button>
        <Logo />
        <h1 className="mt-5 font-display text-4xl font-semibold text-ink">Become a citizen</h1>
        <p className="mt-2 text-[#5a6b5e]">Just an email and a username. No address, no demographics.</p>
        <div className="mt-5 grid gap-3">
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-[#e3dfce] bg-white px-4 py-4 font-display font-semibold"><Mail size={18} /> Continue with Google</button>
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-[#e3dfce] bg-white px-4 py-4 font-display font-semibold"><Github size={18} /> Continue with GitHub</button>
          <div className="py-2 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[#9a9683]">or</div>
          <input className="rounded-2xl border-2 border-[#e6e1d2] bg-white px-5 py-4 outline-none focus:border-[#1b5e43]" defaultValue="cityhopper" aria-label="Username" />
          <input className="rounded-2xl border-2 border-[#e6e1d2] bg-white px-5 py-4 outline-none focus:border-[#1b5e43]" defaultValue="you@email.com" aria-label="Email" />
          <PrimaryButton onClick={onContinue}>Create account <ArrowRight className="ml-2 inline" size={17} /></PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Quiz({ onComplete }: { onComplete: (answers: QuizAnswer[]) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const current = quiz[step];

  function answer(label: string) {
    const next = [...answers, { question: current.question, label }];
    if (step === quiz.length - 1) onComplete(next);
    else {
      setAnswers(next);
      setStep(step + 1);
    }
  }

  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#1f6b4c,#143c2c_72%)] p-5 text-white">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-5 text-sm font-extrabold uppercase tracking-[0.18em] text-[#9fdcb8]">City Quiz · {step + 1}/{quiz.length}</div>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">{current.question}</h1>
        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {current.options.map((option) => (
            <button key={option} onClick={() => answer(option)} className="rounded-3xl border border-white/15 bg-white/12 p-5 text-left font-display text-xl font-semibold text-white backdrop-blur transition hover:bg-white/20">
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileReveal({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#1f6b4c,#143c2c_72%)] p-5 text-white">
      <div className="max-w-xl text-center">
        <Sparkles className="mx-auto mb-5 text-[#9fdcb8]" size={42} />
        <h1 className="font-display text-5xl font-semibold">Your city profile</h1>
        <p className="mt-4 text-lg leading-8 text-[#cfe7d8]">Here&apos;s the kind of city-thinker you are. We found 5 decisions that match your values.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {profileTags.map((tag) => <span key={tag} className="rounded-full bg-white/14 px-4 py-2 font-display font-semibold">{tag}</span>)}
        </div>
        <button onClick={onContinue} className="mt-9 rounded-2xl bg-white px-7 py-4 font-display font-semibold text-[#143c2c] shadow-[0_16px_40px_rgba(0,0,0,.22)]">Show me my 5 decisions <ArrowRight className="ml-2 inline" size={18} /></button>
      </div>
    </div>
  );
}

function OnboardingVotes({ decisions, onOpenVote, onDone }: { decisions: Decision[]; onOpenVote: (d: Decision) => void; onDone: () => void }) {
  const [voted, setVoted] = useState<string[]>([]);
  const cards = decisions.slice(0, 5);
  const current = cards.find((d) => !voted.includes(d.id)) ?? cards[0];
  const progress = voted.length;

  function castVote() {
    const next = [...voted, current.id];
    setVoted(next);
    if (next.length >= cards.length) onDone();
  }

  return (
    <div className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[min(720px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[#fbf9f2]/94 p-7 shadow-panel backdrop-blur">
      <div className="mb-4 flex items-center justify-between text-sm font-extrabold uppercase tracking-[0.14em] text-[#7a7766]">
        <span>Vote {Math.min(progress + 1, 5)} of 5</span>
        <span>{progress}/5 complete</span>
      </div>
      <h2 className="font-display text-3xl font-semibold text-ink">{current.title}</h2>
      <p className="mt-3 text-sm font-bold text-[#5a6b5e]"><MapPin className="mr-1 inline" size={15} /> {current.sourceCity}, {current.sourceCountry}</p>
      <p className="mt-5 text-[15px] leading-7 text-[#34403a]">{current.observation}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {(["Yes", "No", "Abstain"] as const).map((label) => (
          <button key={label} onClick={castVote} className="rounded-2xl bg-[#1b5e43] px-5 py-4 font-display font-semibold text-white transition hover:bg-[#16523a]">{label}</button>
        ))}
      </div>
      <button className="mt-4 text-sm font-bold text-[#1b5e43]" onClick={() => onOpenVote(current)}>Read full decision first</button>
    </div>
  );
}

function Feed({ decisions, onOpenVote, onSubmit }: { decisions: Decision[]; onOpenVote: (d: Decision) => void; onSubmit: () => void }) {
  const urgent = decisions.filter((decision) => decision.state === "vote_open").sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 3);
  const adopted = decisions.find((decision) => decision.state === "adopted");

  return (
    <main className="pointer-events-auto absolute bottom-0 left-0 top-20 z-20 w-full overflow-y-auto p-5 md:w-[560px] md:p-8">
      <div className="dark-glass-panel rounded-[30px] p-6 text-white">
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#a8e0bf]">The city changed while you were away</div>
        <h1 className="mt-2 font-display text-3xl font-semibold">3 decisions were adopted, including {adopted?.title.toLowerCase()}.</h1>
        <button onClick={() => adopted && onOpenVote(adopted)} className="mt-5 rounded-2xl bg-white/14 px-5 py-3 font-display font-semibold text-white">See it in 3D</button>
      </div>

      <section className="mt-5 rounded-[30px] bg-[#fbf9f2]/92 p-6 shadow-panel backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Votes ending soon</h2>
          <button onClick={onSubmit} className="rounded-2xl bg-[#1b5e43] px-4 py-2 font-display text-sm font-semibold text-white">+ Share</button>
        </div>
        <div className="grid gap-3">
          {urgent.map((decision) => (
            <button key={decision.id} onClick={() => onOpenVote(decision)} className="rounded-3xl border border-[#e3dfce] bg-white/78 p-4 text-left shadow-[0_8px_22px_rgba(40,55,45,.06)] transition hover:border-[#bcd3c2]">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: layerMetadata[decision.layer].bg, color: layerMetadata[decision.layer].color }}>{layerMetadata[decision.layer].label}</span>
                <span className="text-xs font-bold text-[#9a4a2e]">{decision.daysLeft}d left</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{decision.title}</h3>
              <p className="mt-2 text-sm font-bold text-[#5a6b5e]">{decision.sourceCity}, {decision.sourceCountry} · {approvalScore(decision)}% approval</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function VoteDetail({ decision, onBack }: { decision: Decision; onBack: () => void }) {
  const [vote, setVote] = useState<string | null>(null);
  const score = approvalScore(decision);

  return (
    <main className="absolute inset-x-4 bottom-4 top-20 z-30 overflow-y-auto rounded-[34px] bg-[#fbf9f2]/95 p-6 shadow-panel backdrop-blur md:inset-x-10 md:p-9">
      <button className="mb-6 flex items-center gap-2 text-sm font-bold text-[#5a6b5e]" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_.8fr]">
        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: layerMetadata[decision.layer].bg, color: layerMetadata[decision.layer].color }}>{layerMetadata[decision.layer].label}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5a6b5e]">{decision.sourceCity}, {decision.sourceCountry}</span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">{decision.title}</h1>
          <div className="mt-8 grid gap-4">
            <ContentBlock title="The observation" body={decision.observation} />
            <ContentBlock title="Why it's good for people" body={decision.argumentFor} positive />
            <ContentBlock title="The honest downside" body={decision.argumentAgainst} negative />
            <blockquote className="rounded-3xl bg-[#f3f0e6] p-6 font-display text-2xl leading-9 text-[#39463c]">“{decision.tradeoffSummary}”</blockquote>
          </div>
        </section>
        <aside className="h-fit rounded-[30px] border border-[#e3dfce] bg-white/70 p-6 shadow-soft">
          <div className="font-display text-5xl font-semibold text-[#1b5e43]">{score}%</div>
          <p className="text-sm font-bold text-[#5a6b5e]">approval · needs 65%</p>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-[#e3dfce]"><div className="h-full rounded-full bg-[#1b5e43]" style={{ width: `${score}%` }} /></div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm font-bold text-[#5a6b5e]">
            <span>{decision.yesCount} yes</span><span>{decision.noCount} no</span><span>{decision.abstainCount} abstain</span>
          </div>
          <div className="mt-6 grid gap-3">
            {(["Yes", "No", "Abstain"] as const).map((label) => <button key={label} onClick={() => setVote(label)} className="rounded-2xl bg-[#1b5e43] px-5 py-4 font-display font-semibold text-white">{label}</button>)}
          </div>
          {vote ? <p className="mt-4 rounded-2xl bg-[#eef6ee] p-4 text-sm font-bold text-[#1b5e43]">Thanks, your {vote.toLowerCase()} vote is counted.</p> : null}
          <div className="mt-6 rounded-3xl bg-[linear-gradient(135deg,#dfe7cf,#cfe7e4)] p-5">
            <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#2f7a4f]">3D preview</div>
            <div className="grid h-32 place-items-center rounded-2xl bg-white/45 font-display text-xl font-semibold text-[#1b5e43]">Before / After</div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ContentBlock({ title, body, positive, negative }: { title: string; body: string; positive?: boolean; negative?: boolean }) {
  return <div className={`rounded-3xl p-5 ${positive ? "bg-[#eef6ee]" : negative ? "bg-[#f8efe9]" : "bg-white/70"}`}><div className="mb-2 text-xs font-extrabold uppercase tracking-[0.13em] text-[#5a6b5e]">{title}</div><p className="text-[15px] leading-7 text-[#34403a]">{body}</p></div>;
}

function SubmissionWizard({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === submitSteps.length - 1;

  return (
    <main className="absolute inset-x-4 bottom-4 top-20 z-30 grid place-items-center overflow-y-auto rounded-[34px] bg-[#fbf9f2]/95 p-5 shadow-panel backdrop-blur md:inset-x-10">
      <div className="w-full max-w-3xl">
        <button className="mb-6 flex items-center gap-2 text-sm font-bold text-[#5a6b5e]" onClick={onBack}><ArrowLeft size={16} /> Save draft & exit</button>
        <div className="mb-5 flex gap-2">{submitSteps.map((label, index) => <div key={label} className={`h-2 flex-1 rounded-full ${index <= step ? "bg-[#1b5e43]" : "bg-[#e3dfce]"}`} />)}</div>
        <div className="rounded-[32px] bg-white/80 p-7 shadow-soft">
          <div className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#7a7766]">Step {step + 1} of {submitSteps.length}</div>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">{submitSteps[step]}</h1>
          {step < 4 ? <textarea className="mt-7 min-h-56 w-full resize-none rounded-3xl border-2 border-[#e6e1d2] bg-[#fcfbf6] p-5 text-lg outline-none focus:border-[#1b5e43]" defaultValue={step === 0 ? "In Bologna it rained all afternoon and I never opened my umbrella. The porticoes made the whole old town feel like one continuous public room." : ""} /> : <ReviewCard />}
          <button onClick={() => isLast ? onDone() : setStep(step + 1)} className="mt-6 rounded-2xl bg-[#1b5e43] px-6 py-4 font-display font-semibold text-white">{isLast ? "Submit observation" : "Continue"} <ArrowRight className="ml-2 inline" size={17} /></button>
        </div>
      </div>
    </main>
  );
}

function ReviewCard() {
  return (
    <div className="mt-7 rounded-3xl border border-[#e3dfce] bg-[#fbf9f2] p-5">
      <div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-[#efeaff] px-3 py-1 text-xs font-extrabold text-[#6b4ea8]">L4 · Cultural</span><span className="text-sm font-bold text-[#5a6b5e]">🇮🇹 Bologna, Italy</span></div>
      <h2 className="font-display text-2xl font-semibold">Covered arcades along every main street</h2>
      <p className="mt-3 text-sm leading-6 text-[#3a443c]">Weather-proof walking, year-round street life and accessible shade. Honest downside: high construction cost and darker ground-floor flats.</p>
      <div className="mt-4 rounded-2xl border border-dashed border-[#e0d6bb] bg-[#fbf7ee] p-4 text-sm font-bold text-[#7a6a3e]">🤖 No duplicates found. No contradictions with adopted decisions. 2 external sources attached.</div>
    </div>
  );
}

export default function Home() {
  const decisions = seedDecisions;
  const [screen, setScreen] = useState<Screen>("visitor");
  const [panelDecision, setPanelDecision] = useState<Decision | null>(decisions[2]);
  const [voteDecision, setVoteDecision] = useState<Decision>(decisions[0]);
  const [, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const stats = useMemo(() => ({ votes: decisions.reduce((sum, decision) => sum + totalVotes(decision), 0) }), [decisions]);

  function openVote(decision: Decision) {
    setVoteDecision(decision);
    setScreen("vote");
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <CityScene decisions={decisions} activeDecisionId={panelDecision?.id} onSelectDecision={(decision) => setPanelDecision(decision)} />
      <TopNav screen={screen} setScreen={setScreen} />
      <div className="pointer-events-none absolute right-5 top-24 z-10 hidden rounded-2xl bg-[#fbf9f2]/80 px-4 py-3 text-sm font-bold text-[#5a6b5e] shadow-soft backdrop-blur md:block">
        <Bell className="mr-2 inline" size={16} /> {stats.votes.toLocaleString("en-US")} community votes
      </div>

      {screen === "visitor" ? <VisitorHero decisions={decisions} onJoin={() => setScreen("signup")} onWalk={() => setPanelDecision(decisions[1])} /> : null}
      {screen === "feed" ? <Feed decisions={decisions} onOpenVote={openVote} onSubmit={() => setScreen("submit")} /> : null}
      {screen === "signup" ? <Signup onBack={() => setScreen("visitor")} onContinue={() => setScreen("quiz")} /> : null}
      {screen === "quiz" ? <Quiz onComplete={(answers) => { setQuizAnswers(answers); setScreen("profile"); }} /> : null}
      {screen === "profile" ? <ProfileReveal onContinue={() => setScreen("onboarding")} /> : null}
      {screen === "onboarding" ? <OnboardingVotes decisions={decisions} onOpenVote={openVote} onDone={() => setScreen("feed")} /> : null}
      {screen === "vote" ? <VoteDetail decision={voteDecision} onBack={() => setScreen("feed")} /> : null}
      {screen === "submit" ? <SubmissionWizard onBack={() => setScreen("feed")} onDone={() => setScreen("submitted")} /> : null}
      {screen === "submitted" ? <div className="absolute inset-0 z-30 grid place-items-center bg-[#143c2c]/92 p-5 text-white"><div className="max-w-lg text-center"><UserRoundCheck className="mx-auto mb-5 text-[#9fdcb8]" size={48} /><h1 className="font-display text-5xl font-semibold">Your observation is in discussion</h1><p className="mt-4 text-lg text-[#cfe7d8]">The community has 14 days to add sources and challenge it.</p><button className="mt-8 rounded-2xl bg-white px-6 py-4 font-display font-semibold text-[#143c2c]" onClick={() => setScreen("feed")}>Back to my feed</button></div></div> : null}

      {screen === "visitor" || screen === "feed" ? <DecisionPanel decision={panelDecision} onClose={() => setPanelDecision(null)} onOpenVote={openVote} /> : null}
      <div className="pointer-events-none absolute bottom-5 right-5 z-10 hidden items-center gap-2 rounded-full bg-[#fbf9f2]/80 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#5a6b5e] shadow-soft backdrop-blur md:flex">
        <Layers3 size={15} /> Drag to orbit · click a glow
      </div>
    </div>
  );
}
