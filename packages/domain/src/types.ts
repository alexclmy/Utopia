export type DecisionLayer = "L0" | "Meta" | "L1" | "L2" | "L3" | "L4";

export type DecisionState = "proposal" | "discussion" | "vote_open" | "adopted" | "rejected" | "revision";

export type VoteValue = "yes" | "no" | "abstain";

export type UrbanDomain =
  | "Soft mobility"
  | "Public transit"
  | "Housing typology"
  | "Public spaces"
  | "Water systems"
  | "Energy systems"
  | "Waste & circular"
  | "Fauna & biodiversity"
  | "City governance"
  | "Time & rhythm"
  | "Safety & justice"
  | "Culture & arts"
  | "Retail & economy"
  | "Food systems"
  | "Digital infrastructure"
  | "Knowledge & learning";

export type Source = {
  title: string;
  url: string;
  type: "city" | "research" | "article" | "dataset" | "other";
};

export type Decision = {
  id: string;
  slug: string;
  title: string;
  layer: DecisionLayer;
  domain: UrbanDomain;
  state: DecisionState;
  sourceCity: string;
  sourceCountry: string;
  sourceNeighbourhood?: string;
  observation: string;
  argumentFor: string;
  argumentAgainst: string;
  tradeoffSummary: string;
  yesCount: number;
  noCount: number;
  abstainCount: number;
  commentsCount: number;
  daysLeft: number;
  cityEffectKey: string;
  sources: Source[];
};

export type LayerMetadata = {
  label: string;
  name: string;
  description: string;
  bg: string;
  color: string;
};

export const layerMetadata: Record<DecisionLayer, LayerMetadata> = {
  L0: {
    label: "L0 · Science",
    name: "Scientific foundations",
    description: "Non-negotiable health, climate and safety floors grounded in public research.",
    bg: "#e7eef9",
    color: "#3a5a9a"
  },
  Meta: {
    label: "Meta · City DNA",
    name: "City DNA",
    description: "Population, urban form, climate and structural constraints for everything below.",
    bg: "#f0ead9",
    color: "#8a6a2a"
  },
  L1: {
    label: "L1 · Principle",
    name: "Founding principles",
    description: "Big philosophical stances that unlock or constrain downstream decisions.",
    bg: "#e9f1ec",
    color: "#2f7a4f"
  },
  L2: {
    label: "L2 · System",
    name: "Urban systems",
    description: "City-wide domains such as mobility, food, governance, culture and water.",
    bg: "#e6f0f4",
    color: "#2a7088"
  },
  L3: {
    label: "L3 · Implementation",
    name: "Concrete implementations",
    description: "Measurable design choices that directly change city geometry and services.",
    bg: "#e6f0f4",
    color: "#2a7088"
  },
  L4: {
    label: "L4 · Cultural",
    name: "Cultural & sensory details",
    description: "Small human details from real places that make streets feel alive.",
    bg: "#efeaff",
    color: "#6b4ea8"
  }
};

export const urbanDomains: UrbanDomain[] = [
  "Soft mobility",
  "Public transit",
  "Housing typology",
  "Public spaces",
  "Water systems",
  "Energy systems",
  "Waste & circular",
  "Fauna & biodiversity",
  "City governance",
  "Time & rhythm",
  "Safety & justice",
  "Culture & arts",
  "Retail & economy",
  "Food systems",
  "Digital infrastructure",
  "Knowledge & learning"
];

export function approvalScore(decision: Pick<Decision, "yesCount" | "noCount">): number {
  const counted = decision.yesCount + decision.noCount;
  if (!counted) return 0;
  return Math.round((decision.yesCount / counted) * 100);
}

export function totalVotes(decision: Pick<Decision, "yesCount" | "noCount" | "abstainCount">): number {
  return decision.yesCount + decision.noCount + decision.abstainCount;
}
