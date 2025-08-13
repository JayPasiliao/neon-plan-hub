import { ProgramSpec } from '@/types/plan';

export function generateLocalProgram(
  title: string,
  lotWidth: number,
  lotLength: number,
  storeys: number
): ProgramSpec {
  const lotArea = lotWidth * lotLength;
  const usableArea = lotArea * 0.85; // 85% of lot area is usable
  
  // Base room areas (in sqm)
  const baseRooms = {
    living: Math.max(18, Math.min(25, usableArea * 0.15)),
    dining: Math.max(10, Math.min(15, usableArea * 0.08)),
    kitchen: Math.max(8, Math.min(12, usableArea * 0.06)),
    bath: 4,
    service: 4,
    garage: lotWidth >= 8 ? 12 : 0,
  };

  const rooms: ProgramSpec['rooms'] = [
    // Ground floor
    {
      name: "Living Room",
      type: "living",
      targetArea: baseRooms.living,
      minWidth: 3.5,
      floor: 1,
      external: true,
      notes: "Main living area with natural light"
    },
    {
      name: "Dining Area",
      type: "dining",
      targetArea: baseRooms.dining,
      minWidth: 2.8,
      floor: 1,
      adjacency: ["Living Room", "Kitchen"],
      notes: "Connected to living and kitchen"
    },
    {
      name: "Kitchen",
      type: "kitchen",
      targetArea: baseRooms.kitchen,
      minWidth: 2.5,
      floor: 1,
      external: true,
      adjacency: ["Dining Area", "Service Area"],
      notes: "Functional kitchen with service access"
    },
    {
      name: "Service Area",
      type: "utility",
      targetArea: baseRooms.service,
      minWidth: 2.0,
      floor: 1,
      adjacency: ["Kitchen"],
      notes: "Laundry and utility space"
    },
    {
      name: "Bathroom",
      type: "bath",
      targetArea: baseRooms.bath,
      minWidth: 2.0,
      floor: 1,
      notes: "Ground floor bathroom"
    }
  ];

  // Add garage if lot width allows
  if (baseRooms.garage > 0) {
    rooms.push({
      name: "Garage",
      type: "garage",
      targetArea: baseRooms.garage,
      minWidth: 3.0,
      floor: 1,
      external: true,
      notes: "Single car garage"
    });
  }

  // Add upper floor rooms for multi-storey
  if (storeys > 1) {
    const upperFloorArea = usableArea * 0.4; // 40% of usable area for upper floors
    
    rooms.push(
      {
        name: "Master Bedroom",
        type: "bedroom",
        targetArea: Math.max(12, Math.min(18, upperFloorArea * 0.3)),
        minWidth: 3.0,
        floor: 2,
        external: true,
        notes: "Main bedroom with window"
      },
      {
        name: "Bedroom 2",
        type: "bedroom",
        targetArea: Math.max(10, Math.min(14, upperFloorArea * 0.25)),
        minWidth: 2.8,
        floor: 2,
        external: true,
        notes: "Secondary bedroom"
      },
      {
        name: "Bedroom 3",
        type: "bedroom",
        targetArea: Math.max(8, Math.min(12, upperFloorArea * 0.2)),
        minWidth: 2.5,
        floor: 2,
        external: true,
        notes: "Third bedroom or study"
      },
      {
        name: "Upper Bathroom",
        type: "bath",
        targetArea: 4,
        minWidth: 2.0,
        floor: 2,
        notes: "Upper floor bathroom"
      },
      {
        name: "Hallway",
        type: "circulation",
        targetArea: Math.max(6, upperFloorArea * 0.1),
        minWidth: 1.2,
        floor: 2,
        notes: "Upper floor circulation"
      }
    );
  }

  // Add stairs for multi-storey
  if (storeys > 1) {
    rooms.push({
      name: "Stairs",
      type: "circulation",
      targetArea: 6,
      minWidth: 1.0,
      floor: 1,
      notes: "Staircase to upper floor"
    });
  }

  return {
    meta: {
      title,
      storeys,
      lot: { width: lotWidth, length: lotLength }
    },
    rooms,
    constraints: {
      wallThickness: 0.2,
      setback: {
        front: Math.max(2, lotWidth * 0.1),
        rear: Math.max(2, lotLength * 0.1),
        left: Math.max(1.5, lotWidth * 0.05),
        right: Math.max(1.5, lotWidth * 0.05)
      },
      corridorMin: 1.0
    }
  };
}
