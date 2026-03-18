import { Link } from "react-router-dom";

export default function JoinTeam() {
  return (
    <section className="container-x w-full h-100 bg-white py-16 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
          Join the Green Revolution
        </h3>
        <div>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-0-relaxed text-center">
            We are looking for passionate individuals to help us scale our impacts across Abia
            State and beyond.
          </p>
        </div>
      </div>

      <div>
        <div className="max-w h-23 max-auto bg-green-100 border border-green-200 rounded-lg p-8 mb-8 md:p-10 lg:p-12">
          <h4 className="text-2xl font-semibold text-green-800 mb-3 ml-2.5 mt-2">
            We are hiring Field Supervisors!
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-green-800 text-base md:text-lg">
                Help manage collection hubs and lead community outreach programs.
              </p>
            </div>
            <Link
              to="/careers"
              className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors font-medium whitespace-nowrap shrink-0 shadow-sm w-full sm:w-auto"
            >
              View Openings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
