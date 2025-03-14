
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function LogoSlider() {
  return (
    <div className="py-8 w-full overflow-hidden bg-transparent">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Trusted by Legal Professionals</h2>
      <InfiniteSlider gap={48} reverse className="w-full h-full bg-transparent">
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">LawFirm A</span>
        </div>
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">Legal Co.</span>
        </div>
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">Justice LLC</span>
        </div>
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">Advocate Inc</span>
        </div>
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">Law Masters</span>
        </div>
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40">
          <span className="text-xl font-bold text-white">Legal Eagles</span>
        </div>
      </InfiniteSlider>
    </div>
  );
}
