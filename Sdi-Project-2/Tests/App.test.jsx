import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

// ─── Mock fetch helpers ──────────────────────────────────────────────────────

const mockCreature = {
  key: "aboleth",
  name: "Aboleth",
  challenge_rating: "10",
  hit_points: 135,
  armor_class: 17,
  darkvision_range: 120,
  speed: { walk: 10, swim: 40, unit: "ft" },
  ability_scores: { str: 21, dex: 9, con: 15, int: 18, wis: 15, cha: 18 },
  modifiers: { str: 5, dex: -1, con: 2, int: 4, wis: 2, cha: 4 },
  actions: [
    {
      name: "Tentacle",
      action_type: "ACTION",
      desc: "Melee weapon attack.",
      usage_limits: null,
      attacks: [{ to_hit_mod: 9, reach: 10, damage_die_count: 2, damage_die_type: "D6", damage_bonus: 5 }],
    },
  ],
};

const mockItem = {
  key: "longsword",
  name: "Longsword",
  rarity: { name: "Common" },
  requires_attunement: false,
  weight: 3,
  weight_unit: "lb",
  cost: "15",
  armor: null,
  desc: "A standard longsword.",
};

const mockGolem = {
  key: "stone-golem",
  name: "Stone Golem",
  challenge_rating: "10",
};

function makeFetchMock(responseMap) {
  return vi.fn((url) => {
    for (const [pattern, data] of Object.entries(responseMap)) {
      if (url.includes(pattern)) {
        return Promise.resolve({ json: () => Promise.resolve(data) });
      }
    }
    return Promise.resolve({ json: () => Promise.resolve({ results: [], count: 0 }) });
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("HomePage", () => {
  it("renders the hero title and subtitle", () => {
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    expect(screen.getAllByText("DnD Builder").length).toBeGreaterThan(0);
    expect(screen.getByText(/toolkit for Dungeon Masters/i)).toBeInTheDocument();
  });

  it("renders both feature cards with buttons", () => {
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    expect(screen.getAllByText("Encounter Builder").length).toBeGreaterThan(0);
    expect(screen.getByText("Loot Generator")).toBeInTheDocument();
    expect(screen.getByText("Build an Encounter")).toBeInTheDocument();
    expect(screen.getByText("Generate Loot")).toBeInTheDocument();
  });
});

describe("NavBar", () => {
  it("renders all nav links", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getAllByText("DnD Builder").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Encounter Builder").length).toBeGreaterThan(0);
    expect(screen.getByText("Equipment Finder")).toBeInTheDocument();
  });
});

describe("EncounterPage", () => {
  it("renders the shop name and description", () => {
    render(<MemoryRouter initialEntries={["/EncounterSearch"]}><App /></MemoryRouter>);
    expect(screen.getByText("Gorans Golem's")).toBeInTheDocument();
    expect(screen.getByText(/weary traveler/i)).toBeInTheDocument();
  });

  it("renders dropdowns and submit button", () => {
    render(<MemoryRouter initialEntries={["/EncounterSearch"]}><App /></MemoryRouter>);
    expect(screen.getByText(/Golem Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Golem CR/i)).toBeInTheDocument();
    expect(screen.getByText("Browse Golems")).toBeInTheDocument();
  });
});

describe("EncounterResult", () => {
  beforeEach(() => {
    global.fetch = makeFetchMock({
      "limit=100": {
        results: [mockGolem, { ...mockGolem, key: "stone-golem-2", name: "Stone Golem 2" }],
      },
      "limit=1": { count: 200, results: [] },
    });
  });

  it("fetches and renders golem cards", async () => {
    render(<MemoryRouter initialEntries={["/EncounterResult/1/2"]}><App /></MemoryRouter>);
    const images = await screen.findAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders CR info on golem cards", async () => {
    render(<MemoryRouter initialEntries={["/EncounterResult/1/2"]}><App /></MemoryRouter>);
    const crLabels = await screen.findAllByText(/^CR:/);
    expect(crLabels.length).toBeGreaterThan(0);
  });
});

describe("SelectedEncounter", () => {
  beforeEach(() => {
    global.fetch = makeFetchMock({
      "creatures/?key=aboleth": { results: [mockCreature] },
    });
  });

  it("fetches and renders a creature's challenge rating", async () => {
    render(<MemoryRouter initialEntries={["/SelectedEncounter/aboleth"]}><App /></MemoryRouter>);
    expect(await screen.findByText(/^CR:/)).toBeInTheDocument();
  });

  it("renders HP, AC, and Actions section", async () => {
    render(<MemoryRouter initialEntries={["/SelectedEncounter/aboleth"]}><App /></MemoryRouter>);
    expect(await screen.findByText(/^HP:/)).toBeInTheDocument();
    expect(await screen.findByText(/^AC:/)).toBeInTheDocument();
    expect(await screen.findByText(/^Actions$/i)).toBeInTheDocument();
  });
});

describe("ItemPage", () => {
  it("renders the item search page with a submit button", () => {
    render(<MemoryRouter initialEntries={["/ItemSearch"]}><App /></MemoryRouter>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("ItemResult", () => {
  beforeEach(() => {
    global.fetch = makeFetchMock({
      "limit=100": {
        results: [mockItem, { ...mockItem, key: "dagger", name: "Dagger" }],
      },
      "limit=1": { count: 200 },
    });
  });

  it("fetches and renders item card images", async () => {
    render(<MemoryRouter initialEntries={["/ItemResult/weapon/2"]}><App /></MemoryRouter>);
    const images = await screen.findAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders item names on cards", async () => {
    render(<MemoryRouter initialEntries={["/ItemResult/weapon/2"]}><App /></MemoryRouter>);
    const names = await screen.findAllByText(/.+/, { selector: ".ItemName" });
    expect(names.length).toBeGreaterThan(0);
  });
});

describe("SelectedItem", () => {
  beforeEach(() => {
    global.fetch = makeFetchMock({
      "weapons/longsword": mockItem,
    });
  });

  it("fetches and renders item description heading", async () => {
    render(<MemoryRouter initialEntries={["/SelectedItem/longsword/weapon"]}><App /></MemoryRouter>);
    expect(await screen.findByText(/Description:/i)).toBeInTheDocument();
  });

  it("renders attunement tag", async () => {
    render(<MemoryRouter initialEntries={["/SelectedItem/longsword/weapon"]}><App /></MemoryRouter>);
    expect(
      await screen.findByText(/Requires Attunement|No Attunement/i)
    ).toBeInTheDocument();
  });
});


describe("ErrorPage", () => {
  it("renders the error heading on an unknown route", () => {
    render(<MemoryRouter initialEntries={["/does-not-exist"]}><App /></MemoryRouter>);
    expect(screen.getByText("An Error Has Occured")).toBeInTheDocument();
  });
});