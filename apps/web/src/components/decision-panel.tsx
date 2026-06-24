import type { Decision } from "@utopia/domain";
import { approvalScore, layerMetadata, totalVotes } from "@utopia/domain";
import { ArrowRight, Check, MessageCircle, Minus, X } from "lucide-react";

type DecisionPanelProps = {
  decision: Decision | null;
  onClose: () => void;
  onOpenVote: (decision: Decision) => void;
};

const stateCopy: Record<Decision["state"], string> = {
  proposal: "Proposal",
  discussion: "In discussion",
  vote_open: "Vote open",
  adopted: "Adopted",
  rejected: "Rejected",
  revision: "Revision"
};

export function DecisionPanel({ decision, onClose, onOpenVote }: DecisionPanelProps) {
  if (!decision) return null;

  const layer = layerMetadata[decision.layer];
  const score = approvalScore(decision);

  return (
    <aside className="glass-panel absolute right-5 top-5 z-30 flex max-h-[calc(100vh-40px)] w-[min(430px,calc(100vw-40px))] flex-col overflow-hidden rounded-[28px]">
      <div className="flex items-start justify-between gap-4 border-b border-[#e3dfce] p-6">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: layer.bg, color: layer.color }}>
              {layer.label}
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[#5a6b5e]">
              {decision.domain}
            </span>
            <span className="rounded-full bg-[#e9f1ec] px-3 py-1 text-xs font-bold text-[#1b5e43]">
              {stateCopy[decision.state]}
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink">{decision.title}</h2>
          <p className="mt-3 text-sm font-bold text-[#5a6b5e]">
            {decision.sourceCity}, {decision.sourceCountry}
            {decision.sourceNeighbourhood ? ` · ${decision.sourceNeighbourhood}` : ""}
          </p>
        </div>
        <button
          aria-label="Close decision panel"
          className="rounded-full bg-[#efece1] p-2 text-[#39463c] transition hover:bg-[#e3dfd0]"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <div className="no-scrollbar overflow-y-auto p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a7766]">The observation</p>
        <p className="mt-2 text-[15px] leading-7 text-[#34403a]">{decision.observation}</p>

        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-[#d6e8d8] bg-[#eef6ee] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#2f7a4f]">
              <Check size={15} /> For people
            </div>
            <p className="text-sm leading-6 text-[#2c4634]">{decision.argumentFor}</p>
          </div>
          <div className="rounded-2xl border border-[#ecd9cc] bg-[#f8efe9] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#9a4a2e]">
              <Minus size={15} /> The honest downside
            </div>
            <p className="text-sm leading-6 text-[#5a3f31]">{decision.argumentAgainst}</p>
          </div>
        </div>

        <blockquote className="mt-5 rounded-2xl bg-[#f3f0e6] p-4 font-display text-lg leading-7 text-[#39463c]">
          “{decision.tradeoffSummary}”
        </blockquote>

        <div className="mt-6 rounded-2xl border border-[#e3dfce] bg-white/55 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-display text-4xl font-semibold text-[#1b5e43]">{score}%</div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#7a7766]">approval</div>
            </div>
            <div className="text-right text-sm font-bold text-[#5a6b5e]">
              {totalVotes(decision).toLocaleString("en-US")} votes
              <div className="mt-1 flex items-center justify-end gap-1 text-xs font-semibold">
                <MessageCircle size={14} /> {decision.commentsCount} comments
              </div>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e3dfce]">
            <div className="h-full rounded-full bg-[#1b5e43]" style={{ width: `${score}%` }} />
          </div>
        </div>

        <button
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1b5e43] px-5 py-4 font-display text-base font-semibold text-white shadow-[0_12px_28px_rgba(27,94,67,.25)] transition hover:bg-[#16523a]"
          onClick={() => onOpenVote(decision)}
        >
          See full decision & vote <ArrowRight size={18} />
        </button>
      </div>
    </aside>
  );
}
