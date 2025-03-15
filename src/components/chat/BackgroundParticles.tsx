
import { SparklesCore } from "@/components/ui/sparkles";

export function BackgroundParticles() {
  return (
    <>
      {/* Enhanced colorful background particles */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesblue"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#0EA5E9" // Blue
          speed={0.5}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesgreen"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#10B981" // Green
          speed={0.3}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesyellow"
          background="transparent"
          minSize={0.5}
          maxSize={1.3}
          particleDensity={25}
          className="w-full h-full"
          particleColor="#F59E0B" // Yellow
          speed={0.4}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesred"
          background="transparent"
          minSize={0.3}
          maxSize={1.1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#EF4444" // Red
          speed={0.6}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesviolet"
          background="transparent"
          minSize={0.2}
          maxSize={1.0}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#8B5CF6" // Violet
          speed={0.7}
        />
      </div>
      
      {/* Added more colorful stars */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesorange"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#F97316" // Orange
          speed={0.45}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesteal"
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={18}
          className="w-full h-full"
          particleColor="#14B8A6" // Teal
          speed={0.55}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticleslime"
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={22}
          className="w-full h-full"
          particleColor="#84CC16" // Lime
          speed={0.5}
        />
      </div>
      
      <div className="fixed inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlespink"
          background="transparent"
          minSize={0.3}
          maxSize={1.0}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#EC4899" // Pink
          speed={0.35}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90 -z-10"></div>
    </>
  );
}
