export type User = {
  uid: string;
  email: string;
  Name?: string;
  photoURL?: string;
};

export type Beer = {
  id: string;
  userId: string;
  name: string;
  types: BeerTypes;
  country: string;
  alcoholContent: string;
  description: string;
  imageUrl: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type BeerList = {
  id: string;
  userId: string;
  name: string;
  beers?: Beer[];
};

export const beerTypes = [
  "Lager",
  "Special Lager",
  "Doppelbock",
  "Pilsner",
  "Helles",
  "Bock",
  "Ale",
  "Pale Ale",
  "Amber Ale",
  "Blonde Ale",
  "Brown Ale",
  "Belgian Ale",
  "Dubbel",
  "Tripel",
  "Quadrupel",
  "Scotch Ale",
  "IPA",
  "Session IPA",
  "NEIPA",
  "Wheat",
  "Stout",
  "Porter",
  "Sour",
  "Gose",
  "Rauchbier",
  "Barleywine",
  "Kölsch",
] as const;

export type BeerTypes = typeof beerTypes[number];
// export type BeerCollection = {
//     beers: Beer[];
//     searchQuery: string;
//     setSearchQuery: (query: string) => void;
//     fetchBeers: () => Promise<void>;
//     addBeer: (beer: Beer) => Promise<void>;
//     updateBeer: (beerId: string, updatedBeer: Partial<Beer>) => Promise<void>;
//     deleteBeer: (beerId: string) => Promise<void>;
//     toggleFavorite: (beerId: string) => Promise<void>;
//     getBeersBySearchQuery: (query: string) => Promise<Beer[]>;
// };