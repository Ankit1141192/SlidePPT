import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import trainingSessionImg from '@/assets/training-session.jpg';
import preparationImg from '@/assets/preparation.jpg';
import setupImg from '@/assets/setup.jpg';
import communicationImg from '@/assets/communication.jpg';
import demonstrationImg from '@/assets/demonstration.jpg';
import safetyImg from '@/assets/safety.jpg';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
  tip: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Facilitate Learning through On-the-Job Training",
    subtitle: "Key Performance Criteria for Effective Training",
    content: [
      "Structured preparation and resource planning",
      "Clear delivery plan and performance expectations",
      "Hands-on practice, feedback and safety",
      "Performance criteria PC1–PC13 comprehensive coverage"
    ],
    image: trainingSessionImg,
    tip: "Use real workplace environments to enhance learning authenticity and engagement."
  },
  {
    id: 2,
    title: "Preparation is Key (PC1–PC4)",
    content: [
      "Collect details: batch size, schedule, approved documents and materials (PC1)",
      "Understand learners' background to tailor demonstrations (PC2)",
      "Identify equipment and resources needed for demo/practice (PC3)",
      "Arrange tools & materials so everything is ready to use (PC4)"
    ],
    image: preparationImg,
    tip: "Checklist: Confirm equipment, print handouts, verify access to systems and safety gear."
  },
  {
    id: 3,
    title: "Setting Up for Success (PC5)",
    content: [
      "Prepare equipment in advance and arrange logically",
      "Ensure safety and ease of access for learners", 
      "Create a learner-friendly environment that reduces anxiety",
      "Test all technology and backup systems before sessions"
    ],
    image: setupImg,
    tip: "Arrange demonstration stations, label materials, and test audio/visuals before the session."
  },
  {
    id: 4,
    title: "Communicating with Learners (PC6)",
    content: [
      "Share program details: objectives, schedule, methods and resources",
      "Set clear timelines and explain how progress will be measured",
      "Provide pre-reading or pre-work if necessary",
      "Establish open communication channels for questions"
    ],
    image: communicationImg,
    tip: "Share a short agenda and expected outcomes ahead of time to improve engagement."
  },
  {
    id: 5,
    title: "Setting Expectations (PC7)",
    content: [
      "Explain required knowledge and performance standards",
      "Show examples of competent vs non-competent performance",
      "Confirm understanding with quick checks",
      "Provide clear success criteria and assessment methods"
    ],
    image: demonstrationImg,
    tip: "Use rubrics or simple checklists learners can reference during practice."
  },
  {
    id: 6,
    title: "Safety First (PC12)",
    content: [
      "Inform learners of safety measures and warnings before starting",
      "Provide and enforce use of PPE where required",
      "Run a safety demo and emergency checks",
      "Document hazards and safety steps in every lesson plan"
    ],
    image: safetyImg,
    tip: "Document hazards and safety steps in every lesson plan for consistent safety standards."
  }
];

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  animationDelay: number;
}

const Slide: React.FC<SlideProps> = ({ slide, isActive, animationDelay }) => {
  return (
    <div 
      className={`absolute inset-0 p-4 sm:p-6 md:p-12 overflow-y-auto transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-full items-start">
        
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 text-learning-primary">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <h2 className="text-base sm:text-lg md:text-xl mb-4 text-learning-secondary">
              {slide.subtitle}
            </h2>
          )}
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            This section covers essential training facilitation principles for effective workplace learning.
          </p>
          <ul className="space-y-2 sm:space-y-3">
            {slide.content.map((item, index) => (
              <li 
                key={index}
                className={`flex items-start gap-2 sm:gap-3 transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ 
                  transitionDelay: isActive ? `${animationDelay + index * 80}ms` : '0ms' 
                }}
              >
                <div className="w-2 h-2 rounded-full bg-learning-primary mt-2 flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image + Tip */}
        <div className="flex-1 glass-effect rounded-2xl p-4 sm:p-6 learning-glow">
          <img 
            src={slide.image}
            alt={slide.title}
            className="w-full h-40 sm:h-56 md:h-64 object-cover rounded-xl border border-border mb-3 sm:mb-4"
          />
          <p className="text-xs sm:text-sm text-muted-foreground italic">
            💡 {slide.tip}
          </p>
        </div>
      </div>
    </div>
  );
};

const LearningPresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, toggleAutoplay]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay, nextSlide]);

  const progress = ((currentSlide + 1) / slidesData.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className="text-learning-primary font-semibold text-sm sm:text-base">
          Learning Facilitation Platform
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoplay}
            className="glass-effect"
          >
            {isAutoplay ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isAutoplay ? 'Pause' : 'Autoplay'}
          </Button>
          <Button variant="outline" size="sm" className="glass-effect">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Stage */}
      <Card className="relative overflow-hidden bg-slide-bg border-border learning-glow min-h-[500px] sm:min-h-[600px]">
        <div className="relative h-full">
          {slidesData.map((slide, index) => (
            <Slide
              key={slide.id}
              slide={slide}
              isActive={index === currentSlide}
              animationDelay={100}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 right-4">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="glass-effect"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            
            <div className="flex-1">
              <Progress value={progress} className="h-1 sm:h-2" />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="glass-effect"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slidesData.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`min-w-[100px] sm:min-w-[130px] p-2 sm:p-3 rounded-lg transition-all duration-200 glass-effect ${
                  index === currentSlide
                    ? 'ring-2 ring-learning-primary scale-105'
                    : 'hover:scale-102'
                }`}
              >
                <h4 className="text-[10px] sm:text-xs font-medium mb-1">Slide {slide.id}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                  {slide.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground gap-1 sm:gap-0">
        <div>Made with ❤️ by Anuska Shukla</div>
        <div>Use ← → arrow keys or thumbnails to navigate</div>
      </div>
    </div>
  );
};

export default LearningPresentation;
