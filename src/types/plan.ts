export type ProgramSpec = {
  meta: { 
    title: string; 
    storeys: number; 
    lot: { width: number; length: number } 
  };
  rooms: Array<{
    name: string;
    type: "living"|"kitchen"|"dining"|"bedroom"|"bath"|"circulation"|"utility"|"garage"|"other";
    targetArea: number;            // sqm
    minWidth?: number;             // m
    notes?: string;
    floor: number;                 // 1-based
    adjacency?: string[];          // preferred neighbors
    external?: boolean;            // wants window
  }>;
  constraints?: {
    wallThickness?: number;        // m (default 0.2)
    setback?: { front: number; rear: number; left: number; right: number };
    corridorMin?: number;          // m
  };
};

export type LayoutPlan = {
  meta: ProgramSpec["meta"] & { wallThickness: number; scale: number };
  footprint: { 
    width: number; 
    length: number; 
    usable: { x: number; y: number; width: number; length: number } 
  };
  floors: Array<{
    level: number;
    rooms: Array<{
      name: string;
      type: ProgramSpec["rooms"][number]["type"];
      floor: number;
      x: number; y: number; width: number; length: number;   // meters within usable area
      doorTo?: string[];
      window?: boolean;
    }>;
    stairs?: { x:number; y:number; width:number; length:number };
    corridors?: Array<{ x:number; y:number; width:number; length:number }>;
  }>;
};

export type HouseType = "Bungalow" | "Two-Storey" | "Townhouse";

export type FinishLevel = "Basic" | "Standard" | "Premium";
