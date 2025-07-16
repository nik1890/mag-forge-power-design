import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Zap, Battery, RotateCcw, Settings } from "lucide-react";

interface TopologySelectorProps {
  selectedTopology: string;
  onTopologySelect: (topology: string) => void;
  onBack: () => void;
  component: string;
}

export const TopologySelector = ({ selectedTopology, onTopologySelect, onBack, component }: TopologySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("dc-dc");

  const topologyCategories = {
    "dc-dc": {
      name: "DC-DC Converters",
      icon: Battery,
      topologies: [
        {
          id: 'buck',
          name: 'Buck Converter',
          description: 'Step-down converter for voltage reduction',
          voltage: 'Vin > Vout',
          isolation: 'Non-isolated',
          complexity: 'Simple',
          applications: ['Point-of-load regulation', 'Battery chargers', 'LED drivers']
        },
        {
          id: 'boost',
          name: 'Boost Converter',
          description: 'Step-up converter for voltage elevation',
          voltage: 'Vout > Vin',
          isolation: 'Non-isolated',
          complexity: 'Simple',
          applications: ['Battery backup', 'LED backlighting', 'Solar MPPT']
        },
        {
          id: 'flyback',
          name: 'Flyback Converter',
          description: 'Isolated converter with energy storage in transformer',
          voltage: 'Variable',
          isolation: 'Isolated',
          complexity: 'Moderate',
          applications: ['Adapter supplies', 'Auxiliary supplies', 'Low power isolated']
        },
        {
          id: 'forward',
          name: 'Forward Converter',
          description: 'Isolated converter with continuous energy transfer',
          voltage: 'Variable',
          isolation: 'Isolated',
          complexity: 'Moderate',
          applications: ['Medium power supplies', 'Telecom equipment', 'Industrial supplies']
        }
      ]
    },
    "ac-dc": {
      name: "AC-DC Converters",
      icon: Zap,
      topologies: [
        {
          id: 'pfc-boost',
          name: 'PFC Boost',
          description: 'Power factor correction using boost topology',
          voltage: 'AC to High DC',
          isolation: 'Non-isolated',
          complexity: 'Moderate',
          applications: ['Switch-mode supplies', 'Motor drives', 'LED lighting']
        },
        {
          id: 'pfc-flyback',
          name: 'PFC Flyback',
          description: 'Combined PFC and isolation in single stage',
          voltage: 'AC to DC',
          isolation: 'Isolated',
          complexity: 'Complex',
          applications: ['Compact supplies', 'Appliance power', 'Low-medium power']
        }
      ]
    },
    "dc-ac": {
      name: "DC-AC Inverters",
      icon: RotateCcw,
      topologies: [
        {
          id: 'single-phase',
          name: 'Single-Phase Inverter',
          description: 'DC to single-phase AC conversion',
          voltage: 'DC to AC',
          isolation: 'Optional',
          complexity: 'Moderate',
          applications: ['Solar inverters', 'UPS systems', 'Motor drives']
        },
        {
          id: 'three-phase',
          name: 'Three-Phase Inverter',
          description: 'DC to three-phase AC conversion',
          voltage: 'DC to 3-phase AC',
          isolation: 'Optional',
          complexity: 'Complex',
          applications: ['Industrial drives', 'Grid-tie inverters', 'Motor control']
        }
      ]
    },
    "custom": {
      name: "Custom Topologies",
      icon: Settings,
      topologies: [
        {
          id: 'custom',
          name: 'Custom Topology',
          description: 'User-defined converter topology',
          voltage: 'User defined',
          isolation: 'User defined',
          complexity: 'Variable',
          applications: ['Research projects', 'Specialized applications', 'Novel topologies']
        }
      ]
    }
  };

  const getComponentSuitability = (topologyId: string) => {
    const suitability = {
      inductor: {
        buck: 'Excellent',
        boost: 'Excellent',
        flyback: 'Not applicable',
        forward: 'Good',
        'pfc-boost': 'Excellent',
        'pfc-flyback': 'Not applicable',
        'single-phase': 'Good',
        'three-phase': 'Good',
        custom: 'Variable'
      },
      transformer: {
        buck: 'Not applicable',
        boost: 'Not applicable',
        flyback: 'Excellent',
        forward: 'Excellent',
        'pfc-boost': 'Not applicable',
        'pfc-flyback': 'Excellent',
        'single-phase': 'Good',
        'three-phase': 'Good',
        custom: 'Variable'
      },
      'coupled-inductor': {
        buck: 'Good',
        boost: 'Good',
        flyback: 'Limited',
        forward: 'Good',
        'pfc-boost': 'Good',
        'pfc-flyback': 'Limited',
        'single-phase': 'Excellent',
        'three-phase': 'Excellent',
        custom: 'Variable'
      }
    };

    return suitability[component as keyof typeof suitability]?.[topologyId] || 'Unknown';
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'Excellent':
        return 'bg-success/20 text-success border-success/30';
      case 'Good':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Limited':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Not applicable':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Select Power Electronics Topology</h2>
          <p className="text-muted-foreground">
            Choose the converter topology for your {component.replace('-', ' ')} design
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Component
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(topologyCategories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(topologyCategories).map(([categoryKey, category]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.topologies.map((topology) => {
                const isSelected = selectedTopology === topology.id;
                const suitability = getComponentSuitability(topology.id);
                const isApplicable = suitability !== 'Not applicable';
                
                return (
                  <Card 
                    key={topology.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      !isApplicable 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isSelected 
                          ? 'border-primary shadow-technical bg-gradient-card hover:scale-105' 
                          : 'border-border/40 hover:border-primary/50 shadow-card hover:scale-105'
                    }`}
                    onClick={() => isApplicable && onTopologySelect(topology.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{topology.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={getSuitabilityColor(suitability)}
                        >
                          {suitability}
                        </Badge>
                      </div>
                      <CardDescription>{topology.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Voltage:</span>
                          <div className="font-medium">{topology.voltage}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Isolation:</span>
                          <div className="font-medium">{topology.isolation}</div>
                        </div>
                      </div>
                      
                      <div>
                        <Badge variant="secondary" className="text-xs">
                          {topology.complexity} Complexity
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Applications:</h4>
                        <div className="space-y-1">
                          {topology.applications.slice(0, 2).map((app, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-center">
                              <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {app}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {isSelected && isApplicable && (
                        <Button 
                          variant="technical" 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTopologySelect(topology.id);
                          }}
                        >
                          Continue with {topology.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedTopology && (
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Selected topology: <span className="text-primary font-medium">
              {Object.values(topologyCategories)
                .flatMap(cat => cat.topologies)
                .find(t => t.id === selectedTopology)?.name}
            </span> for {component.replace('-', ' ')} design
          </p>
        </div>
      )}
    </div>
  );
};