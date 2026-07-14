import { useState } from "react";
import { Mail } from "lucide-react";

export default function SubscribeSection({ companyName = "Trashverse", onSubscribe }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe) {
      onSubscribe(email);
    } else {
      console.log("Subscribe requested", email);
    }
    setEmail("");
  };

  return (
    <section className="w-full h-100 bg-white">
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-600 sm:text-3xl h-10">
          Subscribe For
        </h2>
        <h2>
          <span className="font-bold text-green-600 text-3xl h-10">Exclusive Trashvere</span>
        </h2>
        <div className="flex items-center justify-center gap-1 h-15">
        <h4 className="font-bold text-2xl">Updates!</h4>
        </div>
        

      </div>

      <div className="flex items-center justify-center gap-0 h-10">
        
          <span className="h-2.5 w-2.5 rotate-45 bg-green-600" />
          <span className="h-0.5 w-40 bg-green-600" />
          <span className="h-2.5 w-2.5 rotate-45 bg-green-600 " />
          
        </div>
            <div className="flex items-center justify-center gap-0 h-25">
        
          {/* <span className="h-2.5 w-2.5 rotate-45 bg-green-600" />
          <span className="h-0.5 w-40 bg-green-600" />
          <span className="h-2.5 w-2.5 rotate-45 bg-green-600 " /> */}
          
        </div>
    <form onSubmit={handleSubmit} className=" flex-1 gap-4">
          <label className="h-12 w-full flex items-center gap-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <Mail className=" h-5 w-5 text-green-700 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              required
            />
          </label>
          <div className="h-5">
          </div>

          <button
            type="submit"
            className="mt-20 h-12 w-full rounded-xl bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Subscribe
          </button>
        </form>

      
    </section>
  );
}