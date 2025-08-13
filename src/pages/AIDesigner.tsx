import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlanView } from '@/components/PlanView';
import { Plan3D } from '@/components/Plan3D';
import { generateProgramWithAI } from '@/lib/aiProgram';
import { generateLocalProgram } from '@/lib/localProgram';
import { generateLayout } from '@/lib/layout';
import { ProgramSpec, LayoutPlan, HouseType } from '@/types/plan';
import { Loader2, Sparkles, Cpu } from 'lucide-react';

const AIDesigner = () => {
  const [prompt, setPrompt] = useState(
    "2-storey compact family home with 3 bedrooms, 2 baths, open living/dining/kitchen, service/laundry, optional 1-car garage if width allows."
  );
  const [lotWidth, setLotWidth] = useState(10);
  const [lotLength, setLotLength] = useState(15);
  const [storeys, setStoreys] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [program, setProgram] = useState<ProgramSpec | null>(null);
  const [layout, setLayout] = useState<LayoutPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedProgram = await generateProgramWithAI(prompt);
      setProgram(generatedProgram);
      const generatedLayout = generateLayout(generatedProgram);
      setLayout(generatedLayout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate program with AI');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateLocal = () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedProgram = generateLocalProgram(
        "Custom Home Design",
        lotWidth,
        lotLength,
        storeys
      );
      setProgram(generatedProgram);
      const generatedLayout = generateLayout(generatedProgram);
      setLayout(generatedLayout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate local program');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRelayout = () => {
    if (program) {
      const newLayout = generateLayout(program);
      setLayout(newLayout);
    }
  };

  const getTotalArea = () => {
    if (!program) return 0;
    return program.rooms.reduce((total, room) => total + room.targetArea, 0);
  };

  const getEfficiency = () => {
    if (!layout) return 0;
    const lotArea = layout.footprint.width * layout.footprint.length;
    const usableArea = layout.footprint.usable.width * layout.footprint.usable.length;
    return Math.round((usableArea / lotArea) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <Container className="pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold text-text mb-6">
            AI Floor Plan Designer
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Create custom floor plans for Philippine homes using AI or our local algorithm. 
            Generate 2D plans and 3D models for your construction projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">Project Brief</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Description</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your dream home..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lotWidth">Lot Width (m)</Label>
                    <Input
                      id="lotWidth"
                      type="number"
                      value={lotWidth}
                      onChange={(e) => setLotWidth(Number(e.target.value))}
                      min="5"
                      max="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lotLength">Lot Length (m)</Label>
                    <Input
                      id="lotLength"
                      type="number"
                      value={lotLength}
                      onChange={(e) => setLotLength(Number(e.target.value))}
                      min="5"
                      max="50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="storeys">Number of Storeys</Label>
                  <Select value={storeys.toString()} onValueChange={(value) => setStoreys(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Storey</SelectItem>
                      <SelectItem value="2">2 Storeys</SelectItem>
                      <SelectItem value="3">3 Storeys</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="w-full"
                    variant="primary"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Generate with AI
                  </Button>
                  
                  <Button
                    onClick={handleGenerateLocal}
                    disabled={isGenerating}
                    className="w-full"
                    variant="soft"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Cpu className="w-4 h-4 mr-2" />
                    )}
                    Generate Locally
                  </Button>
                </div>

                {!import.meta.env.VITE_OPENAI_API_KEY && (
                  <div className="text-sm text-text-muted bg-muted/20 p-3 rounded-lg">
                    <strong>Note:</strong> AI mode requires OPENAI_API_KEY environment variable.
                    Local generation is always available.
                  </div>
                )}
              </div>
            </Card>

            {error && (
              <Card className="p-4 border-red-500/20 bg-red-500/10">
                <p className="text-red-400 text-sm">{error}</p>
              </Card>
            )}

            {layout && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-text mb-4">Project Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted">Lot Area:</span>
                    <div className="font-semibold text-text">
                      {(layout.footprint.width * layout.footprint.length).toFixed(1)} sqm
                    </div>
                  </div>
                  <div>
                    <span className="text-text-muted">Total GFA:</span>
                    <div className="font-semibold text-text">
                      {getTotalArea().toFixed(1)} sqm
                    </div>
                  </div>
                  <div>
                    <span className="text-text-muted">Efficiency:</span>
                    <div className="font-semibold text-text">
                      {getEfficiency()}%
                    </div>
                  </div>
                  <div>
                    <span className="text-text-muted">Storeys:</span>
                    <div className="font-semibold text-text">
                      {layout.meta.storeys}
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleRelayout}
                  className="w-full mt-4"
                  variant="soft"
                >
                  Re-layout
                </Button>
              </Card>
            )}
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {layout ? (
              <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="plan">2D Plan</TabsTrigger>
                  <TabsTrigger value="3d">3D View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="plan" className="mt-6">
                  <PlanView layout={layout} />
                </TabsContent>
                
                <TabsContent value="3d" className="mt-6">
                  <Plan3D layout={layout} />
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Ready to Design?
                </h3>
                <p className="text-text-muted mb-6">
                  Enter your project details and generate a custom floor plan
                </p>
                <div className="text-sm text-text-muted space-y-1">
                  <p>• AI-powered design generation</p>
                  <p>• Local algorithm fallback</p>
                  <p>• 2D plans and 3D models</p>
                  <p>• Export to multiple formats</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
};

export default AIDesigner;
