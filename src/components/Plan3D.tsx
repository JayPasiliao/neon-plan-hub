import { useRef, useEffect, useState } from 'react';
import { LayoutPlan } from '@/types/plan';
import { Button } from './Button';
import { Download, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface Plan3DProps {
  layout: LayoutPlan;
  className?: string;
}

export const Plan3D: React.FC<Plan3DProps> = ({ layout, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showShadows, setShowShadows] = useState(true);

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

  const resetCamera = () => {
    // Placeholder for camera reset functionality
    console.log('Reset camera view');
  };

  const downloadGLTF = () => {
    // Placeholder for GLTF download functionality
    console.log('Download GLTF');
  };

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={resetCamera} variant="soft" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
        <Button 
          onClick={() => setShowShadows(!showShadows)} 
          variant="soft" 
          size="sm"
        >
          {showShadows ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showShadows ? 'Hide' : 'Show'} Shadows
        </Button>
        <Button onClick={downloadGLTF} variant="soft" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download glTF
        </Button>
      </div>

      <div 
        ref={containerRef} 
        className="border border-border rounded-lg overflow-hidden bg-background flex items-center justify-center"
        style={{ height: '600px' }}
      >
        <div className="text-center text-text-muted">
          <div className="text-4xl mb-4">🏗️</div>
          <p className="text-lg font-medium">3D View</p>
          <p className="text-sm">Three.js integration coming soon</p>
          <p className="text-xs mt-2">
            {layout.meta.title} - {layout.meta.storeys} storey{layout.meta.storeys > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
