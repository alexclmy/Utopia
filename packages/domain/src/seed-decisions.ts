import type { Decision } from "./types";

export const seedDecisions: Decision[] = [
  {
    id: "dec_cats_istanbul",
    slug: "free-roaming-street-cats",
    title: "Free-roaming street cats, cared for by the whole neighbourhood",
    layer: "L4",
    domain: "Fauna & biodiversity",
    state: "vote_open",
    sourceCity: "Istanbul",
    sourceCountry: "Turkey",
    sourceNeighbourhood: "Kadıköy",
    observation:
      "Istanbul has roughly 200,000 street cats, and nobody owns them because everyone does. Shopkeepers leave water bowls, vets treat them through neighbourhood funds, and on a cold night you find cats asleep on museum cushions. The city feeds a low-grade joy into ordinary streets.",
    argumentFor:
      "Documented stress reduction and social cohesion, informal pest control, and a shared object of care that softens public space and connects strangers.",
    argumentAgainst:
      "Public-health management of feeding stations and sterilisation has real ongoing cost. There is risk to small urban wildlife, and not everyone is comfortable around free-roaming animals.",
    tradeoffSummary:
      "A little daily warmth in exchange for a managed, funded animal-welfare programme.",
    yesCount: 1840,
    noCount: 520,
    abstainCount: 310,
    commentsCount: 47,
    daysLeft: 6,
    cityEffectKey: "street_cats",
    sources: [{ title: "Istanbul street animal care", url: "https://en.wikipedia.org/wiki/Street_animals_in_Istanbul", type: "article" }]
  },
  {
    id: "dec_superblocks_barcelona",
    slug: "barcelona-superblocks",
    title: "Superblocks: cars rerouted around 9-block cells, interiors for people",
    layer: "L3",
    domain: "Soft mobility",
    state: "vote_open",
    sourceCity: "Barcelona",
    sourceCountry: "Spain",
    sourceNeighbourhood: "Eixample",
    observation:
      "In Barcelona's superblocks, through-traffic is pushed to the perimeter and the inner streets become plazas. Kids play where cars used to idle. The change is mostly paint, planters and bollards, not demolition.",
    argumentFor:
      "Measured drops in NO2 and noise inside cells, reclaimed public space, and safer streets for children and older residents without large capital works.",
    argumentAgainst:
      "Traffic concentrates on perimeter roads. Deliveries and reduced-mobility access need careful exceptions, and early resistance from drivers and businesses is real.",
    tradeoffSummary:
      "Calmer interior streets in exchange for busier edges that must be actively managed.",
    yesCount: 2210,
    noCount: 880,
    abstainCount: 240,
    commentsCount: 63,
    daysLeft: 3,
    cityEffectKey: "superblock_cells",
    sources: [{ title: "Barcelona Superblocks", url: "https://ajuntament.barcelona.cat/superilles/en/", type: "city" }]
  },
  {
    id: "dec_arcades_bologna",
    slug: "covered-arcades-bologna",
    title: "Covered arcades along every main street",
    layer: "L4",
    domain: "Public spaces",
    state: "adopted",
    sourceCity: "Bologna",
    sourceCountry: "Italy",
    sourceNeighbourhood: "Old town",
    observation:
      "Bologna has nearly 40km of porticoes. It rained all afternoon and I never opened an umbrella. You cross the whole old town sheltered, shops stay busy, and the street stays alive in bad weather.",
    argumentFor:
      "Weather-proof walking and shade in heat, protected ground-floor retail, and a continuous, dignified public room along the street.",
    argumentAgainst:
      "Expensive to build and maintain. Arcades can darken ground-floor flats and need careful lighting to avoid unsafe dead space at night.",
    tradeoffSummary:
      "A street that works in any weather in exchange for higher build cost and careful lighting.",
    yesCount: 1520,
    noCount: 430,
    abstainCount: 190,
    commentsCount: 38,
    daysLeft: 0,
    cityEffectKey: "covered_arcades",
    sources: [{ title: "Porticoes of Bologna", url: "https://whc.unesco.org/en/list/1650/", type: "other" }]
  },
  {
    id: "dec_quiet_tokyo",
    slug: "quiet-neighbourhoods-tokyo",
    title: "Designated no-horn, quiet neighbourhoods",
    layer: "L4",
    domain: "Time & rhythm",
    state: "vote_open",
    sourceCity: "Tokyo",
    sourceCountry: "Japan",
    sourceNeighbourhood: "Yanaka",
    observation:
      "In Tokyo's older residential pockets the soundscape drops to almost nothing: no honking, no idling, just footsteps and wind chimes. The silence makes the city feel enormous and calm.",
    argumentFor:
      "Lower chronic noise improves sleep and cardiovascular health. Dense living becomes gentler when the city protects quiet as infrastructure.",
    argumentAgainst:
      "Enforcement is soft and cultural, hard to legislate. Emergency and delivery noise still needs exceptions, and overdoing it can feel sterile.",
    tradeoffSummary:
      "Restful streets in exchange for norms that take years to build and cannot be fully enforced.",
    yesCount: 1290,
    noCount: 610,
    abstainCount: 280,
    commentsCount: 29,
    daysLeft: 9,
    cityEffectKey: "quiet_zones",
    sources: [{ title: "WHO environmental noise guidelines", url: "https://www.who.int/europe/publications/i/item/9789289053563", type: "research" }]
  },
  {
    id: "dec_bikes_amsterdam",
    slug: "bike-priority-amsterdam",
    title: "Cyclists get priority over cars at every junction",
    layer: "L1",
    domain: "Soft mobility",
    state: "vote_open",
    sourceCity: "Amsterdam",
    sourceCountry: "Netherlands",
    sourceNeighbourhood: "Citywide",
    observation:
      "In Amsterdam the bike is the default and the car is the guest. Junctions, signal timing and road width all assume two wheels first, and the result is that everyone cycles, from toddlers to grandparents.",
    argumentFor:
      "Huge gains in health, air quality, space efficiency and equity. Cheap mobility independent of fuel and parking becomes normal.",
    argumentAgainst:
      "Requires sustained infrastructure investment and a cultural shift. Weather and topography vary, and safe storage must exist at scale.",
    tradeoffSummary:
      "A city that moves on muscle in exchange for decades of consistent infrastructure commitment.",
    yesCount: 2640,
    noCount: 540,
    abstainCount: 210,
    commentsCount: 71,
    daysLeft: 5,
    cityEffectKey: "bike_priority",
    sources: [{ title: "Cycling in Amsterdam", url: "https://www.amsterdam.nl/en/traffic-transport/cycling/", type: "city" }]
  },
  {
    id: "dec_transit_vienna",
    slug: "free-transit-under-18-vienna",
    title: "Free public transit for everyone under 18",
    layer: "L3",
    domain: "Public transit",
    state: "vote_open",
    sourceCity: "Vienna",
    sourceCountry: "Austria",
    sourceNeighbourhood: "Citywide",
    observation:
      "Vienna lets children ride free and sells an annual adult pass for 365 euros, a euro a day. Transit feels like a public good, not a toll.",
    argumentFor:
      "Independent, safe mobility for young people, lifelong transit habits, reduced family car dependence and less congestion.",
    argumentAgainst:
      "Foregone fare revenue must be funded elsewhere. Crowding can rise, and the benefit depends on already-good service.",
    tradeoffSummary: "A generation raised on transit in exchange for a clear public subsidy.",
    yesCount: 1980,
    noCount: 470,
    abstainCount: 300,
    commentsCount: 52,
    daysLeft: 11,
    cityEffectKey: "youth_transit",
    sources: [{ title: "Wiener Linien annual pass", url: "https://www.wienerlinien.at/", type: "city" }]
  },
  {
    id: "dec_roofs_stuttgart",
    slug: "green-roof-mandate-stuttgart",
    title: "Green-roof mandate on all new flat-roofed buildings",
    layer: "L3",
    domain: "Water systems",
    state: "discussion",
    sourceCity: "Stuttgart",
    sourceCountry: "Germany",
    sourceNeighbourhood: "Citywide",
    observation:
      "Stuttgart sits in a valley that traps heat, so the city has pushed green roofs for decades. They soak up stormwater, cool the air and turn dead rooftops into habitat.",
    argumentFor:
      "Stormwater retention, urban cooling, biodiversity and roof longevity. From above, the city visibly turns green.",
    argumentAgainst:
      "Higher upfront construction cost, structural requirements and maintenance. Not every climate or roof is suited to it.",
    tradeoffSummary:
      "A cooler, spongier city in exchange for higher build cost on new construction.",
    yesCount: 1410,
    noCount: 690,
    abstainCount: 230,
    commentsCount: 18,
    daysLeft: 14,
    cityEffectKey: "green_roofs",
    sources: [{ title: "Green roofs in Stuttgart", url: "https://climate-adapt.eea.europa.eu/", type: "research" }]
  },
  {
    id: "dec_green_rule",
    slug: "3-30-300-green-rule",
    title: "Every home within sight of 3 trees, on a street 30% shaded, 300m from a park",
    layer: "L0",
    domain: "Knowledge & learning",
    state: "adopted",
    sourceCity: "WHO 3-30-300 rule",
    sourceCountry: "Global",
    sourceNeighbourhood: "Foundation",
    observation:
      "The 3-30-300 rule is a research-backed green-space standard: see 3 trees from home, live on a street with 30% canopy, and be within 300m of a real green space. It is a Layer 0 scientific foundation.",
    argumentFor:
      "Strong evidence links green access to mental health, cooling and longevity. It creates an equitable, measurable floor for every neighbourhood.",
    argumentAgainst:
      "Hard to retrofit in dense historic cores. It requires protected land and long-term maintenance budgets.",
    tradeoffSummary:
      "A guaranteed green floor for everyone in exchange for protected land and upkeep.",
    yesCount: 3120,
    noCount: 120,
    abstainCount: 90,
    commentsCount: 24,
    daysLeft: 0,
    cityEffectKey: "green_floor",
    sources: [{ title: "3-30-300 rule", url: "https://doi.org/10.1007/s11676-022-01523-z", type: "research" }]
  }
];

export const launchSequence = [
  "Population target",
  "Urban form",
  "Climate archetype",
  "People before cars",
  "15-minute city",
  "Nature as infrastructure",
  "Functional mix",
  "Democratic governance",
  "Economic fairness"
];
