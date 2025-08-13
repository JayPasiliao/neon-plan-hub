import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AdSlot } from "@/components/AdSlot";

const Tools = () => {
  // Lot to Sample Plan Calculator
  const [lotWidth, setLotWidth] = useState("");
  const [lotLength, setLotLength] = useState("");
  const [houseType, setHouseType] = useState("Bungalow");
  const [lotResult, setLotResult] = useState<any>(null);

  // Room Dimension Calculator  
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomResult, setRoomResult] = useState<any>(null);

  // Budget Estimator
  const [floorArea, setFloorArea] = useState("");
  const [finish, setFinish] = useState("Standard");
  const [budgetResult, setBudgetResult] = useState<any>(null);

  const calculateLotPlan = () => {
    const width = parseFloat(lotWidth);
    const length = parseFloat(lotLength);
    
    if (!width || !length) return;

    const totalArea = width * length;
    const usableArea = totalArea * 0.7; // 70% building coverage
    
    let layout = "";
    switch (houseType) {
      case "Bungalow":
        layout = "Single level with living, dining, kitchen, 2 bedrooms, 1 bathroom";
        break;
      case "Two-Storey":
        layout = "Ground: Living, dining, kitchen, 1 bedroom. Upper: 2 bedrooms, 1 bathroom";
        break;
      case "Townhouse":
        layout = "Vertical design with garage, living areas, and bedrooms distributed across levels";
        break;
    }

    setLotResult({
      totalArea: totalArea.toFixed(1),
      usableArea: usableArea.toFixed(1),
      layout,
      recommendations: [
        "Leave 30% for outdoor space and setbacks",
        "Consider future expansion possibilities",
        "Ensure proper ventilation and natural lighting"
      ]
    });
  };

  const calculateRoom = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    
    if (!length || !width) return;

    const sqm = length * width;
    let tips = [];
    
    if (sqm < 10) {
      tips = [
        "Perfect for a single bedroom",
        "Use wall-mounted furniture",
        "Light colors to make it feel larger"
      ];
    } else if (sqm < 20) {
      tips = [
        "Suitable for master bedroom or living room",
        "Can fit a queen bed + wardrobe",
        "Good for small dining area"
      ];
    } else {
      tips = [
        "Spacious room with multiple layout options",
        "Can serve multiple functions",
        "Consider room dividers for zones"
      ];
    }

    setRoomResult({
      sqm: sqm.toFixed(1),
      tips
    });
  };

  const calculateBudget = () => {
    const area = parseFloat(floorArea);
    if (!area) return;

    const rates = {
      Basic: 17000,
      Standard: 23000,
      Premium: 32000
    };

    const rate = rates[finish as keyof typeof rates];
    const totalPHP = area * rate;
    const totalUSD = totalPHP / 56; // Approximate conversion rate

    setBudgetResult({
      totalPHP: totalPHP.toLocaleString(),
      totalUSD: totalUSD.toLocaleString(),
      breakdown: {
        materials: (totalPHP * 0.6).toLocaleString(),
        labor: (totalPHP * 0.3).toLocaleString(),
        permits: (totalPHP * 0.1).toLocaleString()
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text mb-4">
              Design & Planning Tools
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Professional calculators and planning tools for your construction project
            </p>
          </div>

          <div className="space-y-12">
            {/* Tool 1: Lot to Sample Plan */}
            <Card>
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                🏗️ Lot to Sample Plan Calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Lot Width (meters)
                    </label>
                    <input
                      type="number"
                      value={lotWidth}
                      onChange={(e) => setLotWidth(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                      placeholder="e.g., 8"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Lot Length (meters)
                    </label>
                    <input
                      type="number"
                      value={lotLength}
                      onChange={(e) => setLotLength(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                      placeholder="e.g., 12"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      House Type
                    </label>
                    <select
                      value={houseType}
                      onChange={(e) => setHouseType(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                    >
                      <option value="Bungalow">Bungalow</option>
                      <option value="Two-Storey">Two-Storey</option>
                      <option value="Townhouse">Townhouse</option>
                    </select>
                  </div>
                  <Button variant="primary" onClick={calculateLotPlan} className="w-full">
                    Calculate Plan
                  </Button>
                </div>
                
                {lotResult && (
                  <div className="bg-surface p-6 rounded-lg">
                    <h3 className="font-heading font-semibold text-text mb-4">Results</h3>
                    <div className="space-y-3">
                      <p><span className="text-text-muted">Total Lot Area:</span> <strong className="text-accent">{lotResult.totalArea} sqm</strong></p>
                      <p><span className="text-text-muted">Usable Building Area:</span> <strong className="text-accent">{lotResult.usableArea} sqm</strong></p>
                      <p><span className="text-text-muted">Suggested Layout:</span> {lotResult.layout}</p>
                      <div>
                        <span className="text-text-muted">Recommendations:</span>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          {lotResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="text-text-muted">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Tool 2: Room Dimension Calculator */}
            <Card>
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                📐 Room Dimension Calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Room Length (meters)
                    </label>
                    <input
                      type="number"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                      placeholder="e.g., 4"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Room Width (meters)
                    </label>
                    <input
                      type="number"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                      placeholder="e.g., 3"
                    />
                  </div>
                  <Button variant="primary" onClick={calculateRoom} className="w-full">
                    Calculate Room
                  </Button>
                </div>
                
                {roomResult && (
                  <div className="bg-surface p-6 rounded-lg">
                    <h3 className="font-heading font-semibold text-text mb-4">Results</h3>
                    <div className="space-y-3">
                      <p><span className="text-text-muted">Room Area:</span> <strong className="text-accent">{roomResult.sqm} sqm</strong></p>
                      <div>
                        <span className="text-text-muted">Furniture Fit Tips:</span>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          {roomResult.tips.map((tip: string, idx: number) => (
                            <li key={idx} className="text-text-muted">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Ad Slot */}
            <AdSlot className="my-8" />

            {/* Tool 3: Construction Budget Estimator */}
            <Card>
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                💰 Construction Budget Estimator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Floor Area (sqm)
                    </label>
                    <input
                      type="number"
                      value={floorArea}
                      onChange={(e) => setFloorArea(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">
                      Finish Level
                    </label>
                    <select
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text focus:ring-2 focus:ring-accent"
                    >
                      <option value="Basic">Basic (₱17,000/sqm)</option>
                      <option value="Standard">Standard (₱23,000/sqm)</option>
                      <option value="Premium">Premium (₱32,000/sqm)</option>
                    </select>
                  </div>
                  <Button variant="primary" onClick={calculateBudget} className="w-full">
                    Calculate Budget
                  </Button>
                </div>
                
                {budgetResult && (
                  <div className="bg-surface p-6 rounded-lg">
                    <h3 className="font-heading font-semibold text-text mb-4">Budget Estimate</h3>
                    <div className="space-y-3">
                      <p><span className="text-text-muted">Total Cost (PHP):</span> <strong className="text-accent">₱{budgetResult.totalPHP}</strong></p>
                      <p><span className="text-text-muted">Total Cost (USD):</span> <strong className="text-accent">${budgetResult.totalUSD}</strong></p>
                      <div>
                        <span className="text-text-muted">Cost Breakdown:</span>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>Materials (60%):</span>
                            <span className="text-accent">₱{budgetResult.breakdown.materials}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Labor (30%):</span>
                            <span className="text-accent">₱{budgetResult.breakdown.labor}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Permits (10%):</span>
                            <span className="text-accent">₱{budgetResult.breakdown.permits}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Tools;