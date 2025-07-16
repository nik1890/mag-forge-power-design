import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Brain, Calculator, ChartBar, Download, Cpu } from "lucide-react";
import heroImage from "@/assets/hero-magnetic-design.jpg";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ComponentSelector } from "@/components/ComponentSelector";
import { TopologySelector } from "@/components/TopologySelector";
import { ParameterForm } from "@/components/ParameterForm";

type DesignMode = 'overview' | 'ai' | 'conventional' | 'compare';
type DesignStep = 'component' | 'topology' | 'parameters' | 'results';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<DesignMode>('overview');
  const [currentStep, setCurrentStep] = useState<DesignStep>('component');
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [selectedTopology, setSelectedTopology] = useState<string>('');

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Optimization",
      description: "Advanced neural networks and machine learning algorithms optimize designs based on extensive datasets",
      badge: "AI Enhanced"
    },
    {
      icon: Calculator,
      title: "Conventional Design Methods", 
      description: "Time-tested analytical approaches and engineering rules for reliable component design",
      badge: "Proven Methods"
    },
    {
      icon: ChartBar,
      title: "Performance Analysis",
      description: "Comprehensive efficiency analysis, loss calculations, and thermal profiling",
      badge: "Analytics"
    },
    {
      icon: Download,
      title: "Export Capabilities",
      description: "Generate design reports, winding specifications, 3D models, and manufacturing files",
      badge: "Production Ready"
    }
  ];

  if (currentMode === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <NavigationHeader />
        
        <section className="relative py-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative max-w-7xl mx-auto text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-6 text-primary border-primary/30">
              Powered by MagNet AI & Advanced Analytics
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-ai to-primary-glow bg-clip-text text-transparent">
              MagForge
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
              Advanced Magnetic Component Design for Power Electronics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="ai" 
                size="lg" 
                onClick={() => setCurrentMode('ai')}
                className="text-lg px-8 py-4"
              >
                <Brain className="mr-2 h-5 w-5" />
                Start with AI Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="conventional" 
                size="lg" 
                onClick={() => setCurrentMode('conventional')}
                className="text-lg px-8 py-4"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Conventional Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional-Grade Design Tools
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gradient-card border-border/40 shadow-card hover:shadow-technical transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader onBack={() => setCurrentMode('overview')} currentMode={currentMode} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {currentMode === 'ai' && 'AI-Powered Design'}
            {currentMode === 'conventional' && 'Conventional Design'}
            {currentMode === 'compare' && 'Design Comparison'}
          </h1>
        </div>

        {currentStep === 'component' && (
          <ComponentSelector 
            selectedComponent={selectedComponent}
            onComponentSelect={(component) => {
              setSelectedComponent(component);
              setCurrentStep('topology');
            }}
            mode={currentMode}
          />
        )}
        
        {currentStep === 'topology' && (
          <TopologySelector
            selectedTopology={selectedTopology}
            onTopologySelect={(topology) => {
              setSelectedTopology(topology);
              setCurrentStep('parameters');
            }}
            onBack={() => setCurrentStep('component')}
            component={selectedComponent}
          />
        )}
        
        {currentStep === 'parameters' && (
          <ParameterForm
            component={selectedComponent}
            topology={selectedTopology}
            mode={currentMode}
            onBack={() => setCurrentStep('topology')}
            onSubmit={() => setCurrentStep('results')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
