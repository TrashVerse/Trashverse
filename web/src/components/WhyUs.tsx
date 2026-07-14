import { CheckCircle2 } from "lucide-react";

export default function WhyUs() {
  return (
    <section className="container-x w-full h-full bg-linear-to-br from-[#0b1220] to-[#0f1a2d] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full h-65 md:h-90 lg:h-105 rounded-2xl overflow-hidden shadow-xl border border-white/10">
          <video
            src="/video/recycle.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-10">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-green-400 italic">
            "The greatest threat to our <br /> planet is the belief that <br />
            someone else will save it."
          </h1>

          <div className="pt-4">
            <div className="pt-6 mt-[10%] mb-[6%]">
              <h3 className="text-lg font-bold">Why Trashverse?</h3>
            </div>
            <ul>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} />
                <span className="text-gray-300">
                  Local expertise in Nigerian waste ecosystems.
                </span>
              </li>

              <li className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} />
                <span className="text-gray-300">
                  Seamless integration with mobile payment platforms.
                </span>
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} />
                <span className="text-gray-300">Real-time community impact tracking.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
