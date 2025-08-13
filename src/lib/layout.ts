import { ProgramSpec, LayoutPlan } from '@/types/plan';

export function generateLayout(program: ProgramSpec): LayoutPlan {
  const { meta, rooms, constraints } = program;
  const wallThickness = constraints?.wallThickness || 0.2;
  const setback = constraints?.setback || { front: 2, rear: 2, left: 1.5, right: 1.5 };
  const corridorMin = constraints?.corridorMin || 1.0;

  // Calculate usable area after setbacks
  const usableWidth = meta.lot.width - setback.left - setback.right;
  const usableLength = meta.lot.length - setback.front - setback.rear;
  const usableArea = usableWidth * usableLength;

  // Group rooms by floor
  const floors = new Map<number, typeof rooms>();
  rooms.forEach(room => {
    if (!floors.has(room.floor)) {
      floors.set(room.floor, []);
    }
    floors.get(room.floor)!.push(room);
  });

  const layoutFloors: LayoutPlan['floors'] = [];

  // Process each floor
  for (const [floorLevel, floorRooms] of floors) {
    // Sort rooms by area (descending) for better packing
    const sortedRooms = [...floorRooms].sort((a, b) => b.targetArea - a.targetArea);
    
    const layoutRooms: LayoutPlan['floors'][0]['rooms'] = [];
    let currentX = 0;
    let currentY = 0;
    let rowHeight = 0;
    let maxRowWidth = 0;

    // Simple shelf/bin packing algorithm
    for (const room of sortedRooms) {
      const roomWidth = Math.sqrt(room.targetArea * (room.minWidth || 1));
      const roomLength = room.targetArea / roomWidth;

      // Check if room fits in current row
      if (currentX + roomWidth <= usableWidth) {
        // Add to current row
        layoutRooms.push({
          name: room.name,
          type: room.type,
          floor: room.floor,
          x: currentX,
          y: currentY,
          width: roomWidth,
          length: roomLength,
          window: room.external,
          doorTo: room.adjacency || []
        });
        
        currentX += roomWidth;
        rowHeight = Math.max(rowHeight, roomLength);
      } else {
        // Start new row
        currentX = 0;
        currentY += rowHeight;
        rowHeight = roomLength;
        
        layoutRooms.push({
          name: room.name,
          type: room.type,
          floor: room.floor,
          x: currentX,
          y: currentY,
          width: roomWidth,
          length: roomLength,
          window: room.external,
          doorTo: room.adjacency || []
        });
        
        currentX = roomWidth;
      }
      
      maxRowWidth = Math.max(maxRowWidth, currentX);
    }

    // Add corridors if gaps are too large
    const corridors: LayoutPlan['floors'][0]['corridors'] = [];
    if (rowHeight > corridorMin) {
      corridors.push({
        x: 0,
        y: 0,
        width: usableWidth,
        length: corridorMin
      });
    }

    // Add stairs for multi-storey
    let stairs: LayoutPlan['floors'][0]['stairs'] | undefined;
    if (floorLevel > 1) {
      stairs = {
        x: usableWidth - 1.5,
        y: 0,
        width: 1.0,
        length: 2.5
      };
    }

    layoutFloors.push({
      level: floorLevel,
      rooms: layoutRooms,
      stairs,
      corridors
    });
  }

  return {
    meta: {
      ...meta,
      wallThickness,
      scale: 100 // 1m = 100px for display
    },
    footprint: {
      width: meta.lot.width,
      length: meta.lot.length,
      usable: {
        x: setback.left,
        y: setback.front,
        width: usableWidth,
        length: usableLength
      }
    },
    floors: layoutFloors
  };
}
