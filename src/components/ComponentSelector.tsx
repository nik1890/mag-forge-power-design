import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Battery, GitMerge, ArrowRight } from "lucide-react";

interface ComponentSelectorProps {
  selectedComponent: string;
  onComponentSelect: (component: string) => void;
  mode: 'ai' | 'conventional' | 'compare';
}

export const ComponentSelector = ({ selectedComponent, onComponentSelect, mode }: ComponentSelectorProps) => {
  const components = [
    {
      id: 'inductor',
      name: 'Inductor',
      icon: Battery,
      description: 'Single winding magnetic component for energy storage and filtering',
      applications: ['Buck/Boost Converters', 'PFC Circuits', 'Output Filters'],
      complexity: 'Simple',
      aiAdvantage: 'Core material optimization, thermal modeling'
    },
    {
      id: 'transformer',
      name: 'Transformer',
      icon: Zap,
      description: 'Multi-winding component for galvanic isolation and voltage conversion',
      applications: ['Flyback/Forward Converters', 'Isolated Supplies', 'Gate Drivers'],
      complexity: 'Moderate',
      aiAdvantage: 'Inter-winding coupling optimization, leakage minimization'
    },
    {
      id: 'coupled-inductor',
      name: 'Coupled Inductor',
      icon: GitMerge,
      description: 'Multi-phase coupled magnetic component for current ripple reduction',
      applications: ['Multi-phase Converters', 'Interleaved Topologies', 'Current Balancing'],
      complexity: 'Complex',
      aiAdvantage: 'Coupling coefficient optimization, flux balancing'
    }
  ];

  const getComponentIcon = (IconComponent: any, isSelected: boolean) => {
    const baseClasses = "h-12 w-12 mb-4";
    const colorClasses = isSelected 
      ? (mode === 'ai' ? 'text-ai' : mode === 'conventional' ? 'text-conventional' : 'text-primary')
      : 'text-muted-foreground';
    
    return <IconComponent className={`${baseClasses} ${colorClasses}`} />;
  };

  const getVariant = () => {
    switch (mode) {
      case 'ai':
        return 'ai';
      case 'conventional':
        return 'conventional';
      default:
        return 'technical';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Select Magnetic Component Type</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the type of magnetic component you want to design. Each type has different 
          design considerations and optimization opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {components.map((component) => {
          const isSelected = selectedComponent === component.id;
          
          return (
            <Card 
              key={component.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? 'border-primary shadow-technical bg-gradient-card' 
                  : 'border-border/40 hover:border-primary/50 shadow-card'
              }`}
              onClick={() => onComponentSelect(component.id)}
            >
              <CardHeader className="text-center">
                {getComponentIcon(component.icon, isSelected)}
                <CardTitle className="text-xl">{component.name}</CardTitle>
                <div className="flex justify-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {component.complexity}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  {component.description}
                </CardDescription>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Common Applications:</h4>
                  <div className="space-y-1">
                    {component.applications.map((app, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
                
                {mode === 'ai' && (
                  <div className="p-3 bg-ai/10 rounded-lg border border-ai/20">
                    <h4 className="text-sm font-semibold text-ai mb-1">AI Advantages:</h4>
                    <p className="text-xs text-ai-muted">{component.aiAdvantage}</p>
                  </div>
                )}
                
                {isSelected && (
                  <Button 
                    variant={getVariant()} 
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      onComponentSelect(component.id);
                    }}
                  >
                    Continue with {component.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedComponent && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="text-primary font-medium">
              {components.find(c => c.id === selectedComponent)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};