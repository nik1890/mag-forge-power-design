import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Brain, Calculator, Zap, Thermometer, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ParameterFormProps {
  component: string;
  topology: string;
  mode: 'ai' | 'conventional' | 'compare';
  onBack: () => void;
  onSubmit: () => void;
}

export const ParameterForm = ({ component, topology, mode, onBack, onSubmit }: ParameterFormProps) => {
  const [activeTab, setActiveTab] = useState("electrical");
  const [parameters, setParameters] = useState({
    // Electrical Parameters
    powerLevel: 100,
    inputVoltage: 12,
    outputVoltage: 5,
    outputCurrent: 20,
    switchingFrequency: 100,
    dutyCycle: 0.42,
    rippleCurrent: 0.3,
    rippleVoltage: 0.1,
    
    // Material Parameters
    coreType: '',
    coreShape: '',
    coreMaterial: '',
    windingMaterial: 'copper',
    
    // Thermal Parameters
    ambientTemp: 25,
    maxTemp: 85,
    thermalResistance: 0.5,
    
    // Design Constraints
    maxSize: '',
    maxHeight: 10,
    maxWeight: 50,
    efficiency: 95,
  });

  const handleParameterChange = (key: string, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const coreTypes = [
    { value: 'ferrite', label: 'Ferrite' },
    { value: 'iron-powder', label: 'Iron Powder' },
    { value: 'sendust', label: 'Sendust' },
    { value: 'mpp', label: 'MPP (Molypermalloy)' },
    { value: 'high-flux', label: 'High Flux' },
    { value: 'kool-mu', label: 'Kool Mμ' }
  ];

  const coreShapes = [
    { value: 'toroidal', label: 'Toroidal (T)' },
    { value: 'etd', label: 'ETD' },
    { value: 'ee', label: 'EE' },
    { value: 'pot', label: 'Pot Core' },
    { value: 'planar', label: 'Planar' },
    { value: 'custom', label: 'Custom Shape' }
  ];

  const coreMaterials = {
    ferrite: ['3C90', '3C94', '3F3', 'N27', 'N87', 'N97'],
    'iron-powder': ['Iron-2', 'Iron-8', 'Iron-18', 'Iron-26', 'Iron-52'],
    sendust: ['Sendust-60', 'Sendust-75', 'Sendust-90', 'Sendust-125'],
    mpp: ['MPP-60', 'MPP-125', 'MPP-147', 'MPP-173', 'MPP-200'],
    'high-flux': ['HF-60', 'HF-125', 'HF-147', 'HF-160'],
    'kool-mu': ['KoolMu-60', 'KoolMu-75', 'KoolMu-90', 'KoolMu-125']
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'ai': return <Brain className="h-4 w-4" />;
      case 'conventional': return <Calculator className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getModeVariant = () => {
    switch (mode) {
      case 'ai': return 'ai';
      case 'conventional': return 'conventional';
      default: return 'technical';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Design Parameters</h2>
          <p className="text-muted-foreground">
            Configure parameters for your {component.replace('-', ' ')} in {topology.replace('-', ' ')} topology
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topology
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            {getModeIcon()}
            {mode.toUpperCase()} Mode
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Parameter Input Section */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="electrical">
                <Zap className="h-4 w-4 mr-2" />
                Electrical
              </TabsTrigger>
              <TabsTrigger value="material">
                <Settings className="h-4 w-4 mr-2" />
                Material
              </TabsTrigger>
              <TabsTrigger value="thermal">
                <Thermometer className="h-4 w-4 mr-2" />
                Thermal
              </TabsTrigger>
              <TabsTrigger value="constraints">
                <Calculator className="h-4 w-4 mr-2" />
                Constraints
              </TabsTrigger>
            </TabsList>

            <TabsContent value="electrical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Power & Voltage Specifications</CardTitle>
                  <CardDescription>Define the electrical operating conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="powerLevel">Power Level (W)</Label>
                      <Input 
                        id="powerLevel"
                        type="number" 
                        value={parameters.powerLevel}
                        onChange={(e) => handleParameterChange('powerLevel', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inputVoltage">Input Voltage (V)</Label>
                      <Input 
                        id="inputVoltage"
                        type="number" 
                        value={parameters.inputVoltage}
                        onChange={(e) => handleParameterChange('inputVoltage', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outputVoltage">Output Voltage (V)</Label>
                      <Input 
                        id="outputVoltage"
                        type="number" 
                        value={parameters.outputVoltage}
                        onChange={(e) => handleParameterChange('outputVoltage', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outputCurrent">Output Current (A)</Label>
                      <Input 
                        id="outputCurrent"
                        type="number" 
                        value={parameters.outputCurrent}
                        onChange={(e) => handleParameterChange('outputCurrent', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Switching & Ripple Parameters</CardTitle>
                  <CardDescription>Control timing and ripple characteristics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Switching Frequency: {parameters.switchingFrequency} kHz</Label>
                    </div>
                    <Slider
                      value={[parameters.switchingFrequency]}
                      onValueChange={(value) => handleParameterChange('switchingFrequency', value[0])}
                      max={500}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Duty Cycle: {(parameters.dutyCycle * 100).toFixed(1)}%</Label>
                      </div>
                      <Slider
                        value={[parameters.dutyCycle]}
                        onValueChange={(value) => handleParameterChange('dutyCycle', value[0])}
                        max={0.9}
                        min={0.1}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Current Ripple: {(parameters.rippleCurrent * 100).toFixed(1)}%</Label>
                      </div>
                      <Slider
                        value={[parameters.rippleCurrent]}
                        onValueChange={(value) => handleParameterChange('rippleCurrent', value[0])}
                        max={0.5}
                        min={0.1}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="material" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Core Selection</CardTitle>
                  <CardDescription>Choose magnetic core specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Core Type</Label>
                      <Select value={parameters.coreType} onValueChange={(value) => handleParameterChange('coreType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select core type" />
                        </SelectTrigger>
                        <SelectContent>
                          {coreTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Core Shape</Label>
                      <Select value={parameters.coreShape} onValueChange={(value) => handleParameterChange('coreShape', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select core shape" />
                        </SelectTrigger>
                        <SelectContent>
                          {coreShapes.map((shape) => (
                            <SelectItem key={shape.value} value={shape.value}>
                              {shape.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {parameters.coreType && (
                    <div className="space-y-2">
                      <Label>Core Material</Label>
                      <Select value={parameters.coreMaterial} onValueChange={(value) => handleParameterChange('coreMaterial', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select core material" />
                        </SelectTrigger>
                        <SelectContent>
                          {coreMaterials[parameters.coreType as keyof typeof coreMaterials]?.map((material) => (
                            <SelectItem key={material} value={material}>
                              {material}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Winding Material</Label>
                    <Select value={parameters.windingMaterial} onValueChange={(value) => handleParameterChange('windingMaterial', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="copper">Copper Wire</SelectItem>
                        <SelectItem value="aluminum">Aluminum Wire</SelectItem>
                        <SelectItem value="litz">Litz Wire</SelectItem>
                        <SelectItem value="foil">Copper Foil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="thermal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thermal Management</CardTitle>
                  <CardDescription>Define thermal operating conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ambientTemp">Ambient Temperature (°C)</Label>
                      <Input 
                        id="ambientTemp"
                        type="number" 
                        value={parameters.ambientTemp}
                        onChange={(e) => handleParameterChange('ambientTemp', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTemp">Maximum Temperature (°C)</Label>
                      <Input 
                        id="maxTemp"
                        type="number" 
                        value={parameters.maxTemp}
                        onChange={(e) => handleParameterChange('maxTemp', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="constraints" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Constraints</CardTitle>
                  <CardDescription>Set physical and performance limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxHeight">Maximum Height (mm)</Label>
                      <Input 
                        id="maxHeight"
                        type="number" 
                        value={parameters.maxHeight}
                        onChange={(e) => handleParameterChange('maxHeight', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxWeight">Maximum Weight (g)</Label>
                      <Input 
                        id="maxWeight"
                        type="number" 
                        value={parameters.maxWeight}
                        onChange={(e) => handleParameterChange('maxWeight', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Target Efficiency: {parameters.efficiency}%</Label>
                    </div>
                    <Slider
                      value={[parameters.efficiency]}
                      onValueChange={(value) => handleParameterChange('efficiency', value[0])}
                      max={99}
                      min={80}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview & Action Section */}
        <div className="space-y-6">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                {getModeIcon()}
                <span className="ml-2">Design Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Component:</span>
                  <span className="font-medium capitalize">{component.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Topology:</span>
                  <span className="font-medium capitalize">{topology.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power:</span>
                  <span className="font-medium">{parameters.powerLevel}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="font-medium">{parameters.switchingFrequency}kHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency:</span>
                  <span className="font-medium">{parameters.efficiency}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {mode === 'ai' && (
            <Card className="border-ai/30 bg-ai/5">
              <CardHeader>
                <CardTitle className="text-ai flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ai-muted space-y-2">
                <p>• Core material optimization available</p>
                <p>• Thermal modeling will be enhanced</p>
                <p>• Multi-objective optimization enabled</p>
              </CardContent>
            </Card>
          )}

          <Button 
            variant={getModeVariant()}
            size="lg" 
            className="w-full"
            onClick={onSubmit}
          >
            {mode === 'ai' ? 'Run AI Design' : 'Calculate Design'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};