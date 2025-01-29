import { create } from "zustand";
import type {
	AttackProperty,
	ElementProperty,
	Rarity,
	Target,
} from "~/hooks/use-characters";

interface CharacterFilterState {
	attackProperty: AttackProperty | "all";
	element: ElementProperty | "all";
	rarity: Rarity | "all";
	target: Target | "all";

	// Actions
	setAttackProperty: (value: AttackProperty | "all") => void;
	setElement: (value: ElementProperty | "all") => void;
	setRarity: (value: Rarity | "all") => void;
	setTarget: (value: Target | "all") => void;
	resetFilters: () => void;
}

const initialState = {
	attackProperty: "all",
	element: "all",
	rarity: "all",
	target: "all",
} as const;

export const useCharacterFilterStore = create<CharacterFilterState>((set) => ({
	// Initial state
	...initialState,

	// Actions
	setAttackProperty: (value) => set({ attackProperty: value }),
	setElement: (value) => set({ element: value }),
	setRarity: (value) => set({ rarity: value }),
	setTarget: (value) => set({ target: value }),
	resetFilters: () => set(initialState),
}));
