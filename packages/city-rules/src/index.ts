import type { Decision } from "@utopia/domain";

export type CityEffectRule = {
  key: string;
  label: string;
  appliesTo: string[];
  parameters: Record<string, string | number | boolean>;
  visualCue: {
    color: string;
    material: "greenery" | "water" | "mobility" | "culture" | "science" | "governance";
    icon: string;
  };
};

export const cityEffectRules: CityEffectRule[] = [
  {
    key: "street_cats",
    label: "Neighbourhood animal care",
    appliesTo: ["park", "market", "residential"],
    parameters: {
      feedingStationsPerBlock: 1,
      vetFundRequired: true,
      wildlifeRiskReview: true
    },
    visualCue: { color: "#b07a3a", material: "culture", icon: "🐈" }
  },
  {
    key: "superblock_cells",
    label: "Superblock interiors",
    appliesTo: ["street", "intersection"],
    parameters: {
      throughTraffic: false,
      maxInteriorSpeedKmh: 10,
      bollards: true,
      planterDensity: "high"
    },
    visualCue: { color: "#2f7a4f", material: "mobility", icon: "▦" }
  },
  {
    key: "covered_arcades",
    label: "Weather-proof arcades",
    appliesTo: ["retail_street", "old_town"],
    parameters: {
      minCoveredWalkwayWidthM: 3,
      continuousFrontage: true,
      nightLightingRequired: true
    },
    visualCue: { color: "#8a6a2a", material: "culture", icon: "☂" }
  },
  {
    key: "quiet_zones",
    label: "Quiet neighbourhood norm",
    appliesTo: ["residential", "school", "park"],
    parameters: {
      hornRestriction: true,
      nightNoiseLimitDb: 45,
      deliveryWindows: "daytime_only"
    },
    visualCue: { color: "#6b4ea8", material: "culture", icon: "◌" }
  },
  {
    key: "bike_priority",
    label: "Bike-first junctions",
    appliesTo: ["intersection", "arterial"],
    parameters: {
      protectedBikeLane: true,
      bikeSignalPriority: true,
      carLaneWidthMaxM: 3.2
    },
    visualCue: { color: "#1b5e43", material: "mobility", icon: "🚲" }
  },
  {
    key: "youth_transit",
    label: "Youth transit pass",
    appliesTo: ["transit_stop", "school", "district"],
    parameters: {
      under18Fare: 0,
      schoolCoverage: "citywide",
      subsidyModelRequired: true
    },
    visualCue: { color: "#2a7088", material: "governance", icon: "🚊" }
  },
  {
    key: "green_roofs",
    label: "Green roof mandate",
    appliesTo: ["building", "flat_roof"],
    parameters: {
      greenRoofRequired: true,
      stormwaterRetentionPct: 60,
      nativeSpecies: true
    },
    visualCue: { color: "#7fa86a", material: "greenery", icon: "▰" }
  },
  {
    key: "green_floor",
    label: "3-30-300 green floor",
    appliesTo: ["neighbourhood", "street", "park"],
    parameters: {
      treesVisibleFromHome: 3,
      canopyCoveragePct: 30,
      parkDistanceM: 300
    },
    visualCue: { color: "#3a5a9a", material: "science", icon: "🌳" }
  }
];

export function ruleForDecision(decision: Pick<Decision, "cityEffectKey">): CityEffectRule | undefined {
  return cityEffectRules.find((rule) => rule.key === decision.cityEffectKey);
}
