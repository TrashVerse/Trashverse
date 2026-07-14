import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800 md:text-5xl">
            About Trashverse
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center h-12">
            <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600"></span>
            <span className="mx-2 h-0.5 w-50 bg-emerald-600"></span>
            <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600"></span>
          </div>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-slate-900">
            Trashverse is a climate-tech waste management platform building a
            circular economy by connecting households, businesses, recyclers,
            and government agencies through an incentive-driven digital
            ecosystem that transforms waste into value.
          </p>
        </div>
        <div className="h-7"></div>
        {/* Content */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          {/* Left */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-2xl items-center justify-center font-bold text-slate-900 h-20">
              Driving Sustainable Change
            </h1>

            <p className="mb-6 text-lg leading-8 text-slate-600">
              We believe waste is not rubbish—it is a valuable resource waiting
              to be recovered. Our platform empowers individuals, businesses,
              institutions, and governments to recycle efficiently while earning
              rewards for responsible environmental practices.
            </p>

            <p className="text-lg leading-8 text-slate-600">
              Through technology, innovation, and strategic partnerships,
              Trashverse is helping build cleaner communities, reduce pollution,
              create green jobs, and promote a sustainable future for Africa.
            </p>

            <Link
              href="/blog"
              className="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Learn More
            </Link>
          </div>

          {/* Right */}
          <div className="grid gap-6">

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <h4 className="mb-3 text-xl font-semibold text-emerald-700">
                ♻️ Circular Economy
              </h4>
              <p className="text-slate-600 leading-7">
                Turning recyclable waste into economic opportunities through
                smart collection and recycling systems.
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h4 className="mb-3 text-xl font-semibold text-blue-700">
                🌍 Environmental Impact
              </h4>
              <p className="text-slate-600 leading-7">
                Reducing pollution, keeping communities clean, and promoting
                responsible waste disposal across Nigeria.
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
              <h4 className="mb-3 text-xl font-semibold text-amber-700">
                💰 Reward System
              </h4>
              <p className="text-slate-600 leading-7">
                Earn points and incentives for recycling plastics, cans, paper,
                glass, and other recyclable materials.
              </p>
            </div>

            <div className="rounded-xl border border-purple-100 bg-purple-50 p-6 shadow-sm">
              <h4 className="mb-3 text-xl font-semibold text-purple-700">
                🤖 Reverse Vending Machine
              </h4>
              <p className="text-slate-600 leading-7">
                Our innovative Reverse Vending Machine allows users to deposit
                recyclable materials and receive instant rewards through the
                Trashverse platform.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}