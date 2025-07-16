import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Brain, Calculator, ChartBar } from "lucide-react";

interface NavigationHeaderProps {
  onBack?: () => void;
  currentMode?: 'ai' | 'conventional' | 'compare';
}

export const NavigationHeader = ({ onBack, currentMode }: NavigationHeaderProps) => {
  const getModeIcon = () => {
    switch (currentMode) {
      case 'ai':
        return <Brain className="h-4 w-4" />;
      case 'conventional':
        return <Calculator className="h-4 w-4" />;
      case 'compare':
        return <ChartBar className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getModeColor = () => {
    switch (currentMode) {
      case 'ai':
        return 'bg-ai text-ai-foreground';
      case 'conventional':
        return 'bg-conventional text-conventional-foreground';
      case 'compare':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              MagForge
            </div>
            {currentMode && (
              <Badge className={getModeColor()}>
                {getModeIcon()}
                <span className="ml-1 capitalize">{currentMode}</span>
              </Badge>
            )}
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            Documentation
          </Button>
          <Button variant="ghost" size="sm">
            Examples
          </Button>
          <Button variant="outline" size="sm">
            Export Project
          </Button>
        </nav>
      </div>
    </header>
  );
};