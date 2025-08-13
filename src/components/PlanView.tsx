import { useRef, useEffect } from 'react';
import { LayoutPlan } from '@/types/plan';
import { Button } from './Button';
import { Download, FileImage, FileText } from 'lucide-react';

interface PlanViewProps {
  layout: LayoutPlan;
  className?: string;
}

export const PlanView: React.FC<PlanViewProps> = ({ layout, className }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const toSVGString = (): string => {
    if (!svgRef.current) return '';
    
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  };

  const downloadSVG = () => {
    const svgString = toSVGString();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${layout.meta.title.replace(/\s+/g, '-')}-plan.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const svgString = toSVGString();
    const img = new Image();
    
    img.onload = () => {
      canvas.width = svg.clientWidth * 2;
      canvas.height = svg.clientHeight * 2;
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${layout.meta.title.replace(/\s+/g, '-')}-plan.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  const getRoomColor = (type: string): string => {
    const colors: Record<string, string> = {
      living: '#3B82F6',
      kitchen: '#10B981',
      dining: '#8B5CF6',
      bedroom: '#F59E0B',
      bath: '#06B6D4',
      utility: '#6B7280',
      garage: '#EF4444',
      circulation: '#9CA3AF',
      other: '#8B5CF6'
    };
    return colors[type] || colors.other;
  };

  const getRoomLabel = (room: LayoutPlan['floors'][0]['rooms'][0]): string => {
    const area = (room.width * room.length).toFixed(1);
    return `${room.name}\n${area} sqm`;
  };

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={downloadSVG} variant="soft" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
        <Button onClick={downloadPNG} variant="soft" size="sm">
          <FileImage className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <svg
          ref={svgRef}
          width="100%"
          height="600"
          viewBox={`0 0 ${layout.footprint.width * layout.meta.scale} ${layout.footprint.length * layout.meta.scale}`}
          className="w-full h-auto"
        >
          {/* Lot boundary */}
          <rect
            x="0"
            y="0"
            width={layout.footprint.width * layout.meta.scale}
            height={layout.footprint.length * layout.meta.scale}
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Setback boundary */}
          <rect
            x={layout.footprint.usable.x * layout.meta.scale}
            y={layout.footprint.usable.y * layout.meta.scale}
            width={layout.footprint.usable.width * layout.meta.scale}
            height={layout.footprint.usable.length * layout.meta.scale}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {/* Render each floor */}
          {layout.floors.map((floor) => (
            <g key={floor.level}>
              {/* Rooms */}
              {floor.rooms.map((room, index) => (
                <g key={`${floor.level}-${index}`}>
                  <rect
                    x={room.x * layout.meta.scale}
                    y={room.y * layout.meta.scale}
                    width={room.width * layout.meta.scale}
                    height={room.length * layout.meta.scale}
                    fill={getRoomColor(room.type)}
                    fillOpacity="0.8"
                    stroke="#1F2937"
                    strokeWidth="2"
                    rx="4"
                  />
                  
                  {/* Room label */}
                  <text
                    x={(room.x + room.width / 2) * layout.meta.scale}
                    y={(room.y + room.length / 2) * layout.meta.scale}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1F2937"
                    fontSize="12"
                    fontWeight="600"
                    className="font-mono"
                  >
                    {getRoomLabel(room).split('\n').map((line, i) => (
                      <tspan key={i} x={(room.x + room.width / 2) * layout.meta.scale} dy={i === 0 ? "-0.5em" : "1em"}>
                        {line}
                      </tspan>
                    ))}
                  </text>

                  {/* Windows */}
                  {room.window && (
                    <rect
                      x={room.x * layout.meta.scale}
                      y={room.y * layout.meta.scale}
                      width={room.width * layout.meta.scale}
                      height="3"
                      fill="#FCD34D"
                      stroke="#F59E0B"
                      strokeWidth="1"
                    />
                  )}
                </g>
              ))}

              {/* Corridors */}
              {floor.corridors?.map((corridor, index) => (
                <rect
                  key={`corridor-${floor.level}-${index}`}
                  x={corridor.x * layout.meta.scale}
                  y={corridor.y * layout.meta.scale}
                  width={corridor.width * layout.meta.scale}
                  height={corridor.length * layout.meta.scale}
                  fill="#9CA3AF"
                  fillOpacity="0.3"
                  stroke="#6B7280"
                  strokeWidth="1"
                />
              ))}

              {/* Stairs */}
              {floor.stairs && (
                <g>
                  <rect
                    x={floor.stairs.x * layout.meta.scale}
                    y={floor.stairs.y * layout.meta.scale}
                    width={floor.stairs.width * layout.meta.scale}
                    height={floor.stairs.length * layout.meta.scale}
                    fill="#8B5CF6"
                    fillOpacity="0.8"
                    stroke="#6D28D9"
                    strokeWidth="2"
                    rx="2"
                  />
                  <text
                    x={(floor.stairs.x + floor.stairs.width / 2) * layout.meta.scale}
                    y={(floor.stairs.y + floor.stairs.length / 2) * layout.meta.scale}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                  >
                    STAIRS
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* North arrow */}
          <g transform={`translate(20, 20)`}>
            <path
              d="M10 0 L20 20 L10 15 L0 20 Z"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="1"
            />
            <text
              x="10"
              y="35"
              textAnchor="middle"
              fill="#EF4444"
              fontSize="12"
              fontWeight="600"
            >
              N
            </text>
          </g>

          {/* Scale bar */}
          <g transform={`translate(20, ${layout.footprint.length * layout.meta.scale - 40})`}>
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="#6B7280"
              strokeWidth="2"
            />
            <text
              x="50"
              y="15"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="10"
            >
              1m
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {Object.entries({
          living: '#3B82F6',
          kitchen: '#10B981',
          dining: '#8B5CF6',
          bedroom: '#F59E0B',
          bath: '#06B6D4',
          utility: '#6B7280',
          garage: '#EF4444',
          circulation: '#9CA3AF'
        }).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: color }}
            />
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
