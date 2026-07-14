import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-green-50 pt-24">
      <div className="container-x py-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
              Turning Today's <span className="text-green-600">Waste</span> into{" "}
              <span className="hidden lg:inline">
                <br />
              </span>
              Tomorrow's Wealth.
            </h1>

            <p className="mt-6 text-gray-700 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg">
              Trashverse is revolutionizing recycling through smart technology. We bridge the gap
              between waste management and financial inclusion for a sustainable ecosystem.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/login"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-md"
              >
                Schedule Pickup
              </Link>

              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition shadow-md">
                Learn More
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max">
              <img
                src="/images/trash.jpg"
                width={500}
                height={350}
                alt="Recycling Bins"
                className="w-full h-auto rounded-3xl shadow-xl"
              />

              <div className="absolute -bottom-6 -left-5 bg-white shadow-lg px-4 py-3 rounded-xl flex items-center gap-3 w-48 h-15">
                <div className="bg-green-200 p-2 rounded-full">
                  <Leaf className="text-green-600" size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Eco Impact</p>
                  <p className="text-gray-900 font-bold text-sm">12.5k Tons Recycled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
