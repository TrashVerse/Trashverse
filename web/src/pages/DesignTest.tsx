import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function DesignTest() {
  const [measurements, setMeasurements] = useState({
    navbarHeight: 0,
    logoSize: 0,
    buttonWidth: 0,
    buttonHeight: 0,
    menuGap: 0,
  });

  useEffect(() => {
    // Measure navbar
    const navbar = document.querySelector('nav') as HTMLElement | null;
    const logo = document.querySelector('nav img') as HTMLElement | null;
    const button = document.querySelector('nav a[href="/login"]') as HTMLElement | null;
    const menu = document.querySelector('nav ul') as HTMLElement | null;

    if (navbar && logo && button && menu) {
      setMeasurements({
        navbarHeight: navbar.offsetHeight,
        logoSize: logo.offsetWidth,
        buttonWidth: button.offsetWidth,
        buttonHeight: button.offsetHeight,
        menuGap: parseInt(window.getComputedStyle(menu).gap || '0'),
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-32 min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Design Measurements Test</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="font-bold text-lg mb-2">Navbar Measurements:</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Navbar Height:</span> {measurements.navbarHeight}px
                  <span className="text-sm text-gray-600 ml-2">
                    (Should be ~80-88px, was ~64px)
                  </span>
                </li>
                <li>
                  <span className="font-medium">Logo Size:</span> {measurements.logoSize}px
                  <span className="text-sm text-gray-600 ml-2">
                    (Should be 48-56px, was 40px)
                  </span>
                </li>
                <li>
                  <span className="font-medium">Button Width:</span> {measurements.buttonWidth}px
                  <span className="text-sm text-gray-600 ml-2">
                    (Should be larger with px-8 py-3)
                  </span>
                </li>
                <li>
                  <span className="font-medium">Button Height:</span> {measurements.buttonHeight}px
                  <span className="text-sm text-gray-600 ml-2">
                    (Should be ~48px with py-3)
                  </span>
                </li>
                <li>
                  <span className="font-medium">Menu Gap:</span> {measurements.menuGap}px
                  <span className="text-sm text-gray-600 ml-2">
                    (Should be 40px with gap-10)
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="font-bold text-lg mb-2">Visual Indicators:</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Navbar has green border at bottom</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Logo is larger (48-56px)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>Button has more padding (px-8 py-3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Menu items have more spacing (gap-10)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h2 className="font-bold text-lg mb-2">CSS Classes Applied:</h2>
              <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
{`<nav className="... py-5 md:py-6 border-b-2 border-green-100">
  <img className="w-12 h-12 md:w-14 md:h-14" />
  <ul className="gap-10">
  <Link className="px-8 py-3">`}
              </pre>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h2 className="font-bold text-lg mb-2">If measurements show old values:</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
                <li>Clear browser cache completely</li>
                <li>Try incognito/private mode</li>
                <li>Check if Vite dev server restarted</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
