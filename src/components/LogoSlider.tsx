
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function LogoSlider() {
  return (
    <div className="py-8 w-full overflow-hidden bg-transparent">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Partners & Trusted By</h2>
      <InfiniteSlider gap={48} reverse className="w-full h-full bg-transparent">
        {/* Partner logos */}
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-40 h-20">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113 30" width="113" height="30" fill="currentColor" className="text-green-500">
              <path d="M35.04 15h5.46v10.96h-3.86L35.04 15zm0-10h5.46v5.48h-5.46V5zm8.75 0h5.71v15.93h10.02v5.03H43.79V5zm17.75 0h15.53v5.03h-9.82v3.04h9.1v4.76h-9.1v3.13h10.02v5.03H61.54V5zm37.45 15.92L107.1 5h5.88v20.96h-5.46V9.95L99.41 25.96h-5.85V5h5.43v15.92z"/>
              <path d="M0 29.38h28.97V.42H0v28.96zm17.91-18.16c0-1.6 1.3-2.91 2.92-2.91a2.92 2.92 0 0 1 2.91 2.91c0 1.61-1.3 2.92-2.91 2.92a2.92 2.92 0 0 1-2.92-2.92zm-4.95 14.1a8.62 8.62 0 0 1-3.48-3.5 9.3 9.3 0 0 1-1.23-4.66c0-1.65.4-3.19 1.23-4.64a8.6 8.6 0 0 1 3.48-3.5c1.45-.85 3-1.25 4.66-1.25 1.78 0 3.38.45 4.8 1.36 1.4.91 2.45 2.11 3.12 3.6l-3.54 2.05a5.35 5.35 0 0 0-4.44-2.4c-1.06 0-2.03.27-2.9.8a5.64 5.64 0 0 0-2.08 2.18c-.5.91-.75 1.9-.75 2.97 0 1.06.25 2.05.75 2.97a5.58 5.58 0 0 0 2.08 2.18c.87.53 1.84.8 2.9.8a5.34 5.34 0 0 0 4.44-2.42l3.54 2.05c-.67 1.5-1.72 2.7-3.14 3.59-1.42.9-3.02 1.35-4.8 1.35a9.36 9.36 0 0 1-4.64-1.23z" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center justify-center glass-morphism p-6 rounded-xl min-w-48 h-20">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor" className="text-blue-500 mr-2">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
            </svg>
            <span className="text-lg font-semibold text-white">Microsoft Founders Hub</span>
          </div>
        </div>
        
        {/* Original trusted by logos */}
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
