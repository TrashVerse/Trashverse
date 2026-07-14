import { Mail } from "lucide-react";


const sampleTeamMembers = [
  {
    name: "Charles Ikechukwu",
    role: "Founder/ Chief Executive OFficer",
    photoUrl: "/images/charles.jpg"
  },
  {
    name: "Akobundu Wisdom",
    role: "Technical Chief",
    photoUrl: "/images/wisdom.png",
  },
//   {
//     name: "Grace Yusuf",
//     role: "Community Strategist",
//     photoUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
//   },
];

export default function OurTeamMembers({ teamMembers = sampleTeamMembers }) {
  return (
    <section className="w-full bg-slate-50 px-6 py-16 md:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-slate-700 sm:text-4xl h-25">Our Team Members</h2>

        <div className="mx-auto mt-4 flex items-center justify-center gap-0 h-2">
          <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600" />
          <span className="h-0.5 w-50 bg-emerald-600" />
          <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600" />
        </div>
        <div className="h-10"></div>
        <p className="mx-auto mt-16 text-xl font-medium text-bold text-slate-600 sm:text-base h-35">
          We love what we do and we do it with passion.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={member.photoUrl} alt={member.name} className="h-auto w-full object-center" />
              <div className="border-t-5 border-green-400 bg-white px-5 py-6 text-center">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
