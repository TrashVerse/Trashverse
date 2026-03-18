import { BarChart3, Truck, Wallet,} from "lucide-react";


export default function CoreSolutions() {
  return (
    <section className="container-x h-200">
      <div className="w-full text-center mb-1">   
      <h2 className="text-[32px] px font-semibold mb-5">Our Core Solutions<div2 className=" flex justify-center" /></h2>
      <div className=" flex justify-center" />
      
      </div>

      <divcard className="grid grid-cols-3 gap-35px max-md:grid-cols-1 ">
        {/* Card 1 */}
        <divbod className="bg-white border border-gray-200 rounded-16px p-[40px_30px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
          <divicon className="w-12 h-12 rounded-[10px] bg-green-50 flex items-center justify-center mb-22px">
            <Truck size={22} className="text-green-500" />
          </divicon>
          <h3text className="text-[22px] font-semibold mb-6">
            Smart Collection
          </h3text>          
          <p className="text-[20px] leading-[1.6] text-gray-500">
            <ptext>
            Scheduled waste pickup using AI-
            <ptext2>optimized routing to reduce carbon <br/>
            <ptext3>footprint.</ptext3>
            </ptext2>
            </ptext>
          </p>
        </divbod>

        {/* Card 2 - Highlighted */}
        <divbod className="bg-white border border-gray-200 rounded-16px p-[40px_30px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
          <divicon className="w-12 h-12 rounded-[10px] bg-green-50 flex items-center justify-center mb-22px">
            <Wallet size={22} className="text-green-500" />
          </divicon>
          <h3text className="text-[22px] font-semibold mb-6">
            Eco-Credits
          </h3text>          
          <p className="text-[18px] leading-[1.6] text-gray-500">
            <ptext>
            Earn digital rewards for every kilogram of 
            </ptext>
          </p>
          <ptext className="text-[18px] leading-[1.6] text-gray-500">
            waste recycled through our platform. 
            </ptext>
        </divbod>

        {/* Card 3 */}
          <divbod className="bg-white border border-gray-200 rounded-16px p-[40px_30px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
          <divicon className="w-12 h-12 rounded-[10px] bg-green-50 flex items-center justify-center mb-22px">
            <BarChart3 size={22} className="text-green-500" />
          </divicon>
          <h3text className="text-[22px] font-semibold mb-6">
            Data Insights
          </h3text>          
          <p className="text-[18px] leading-[1.6] text-gray-500">
            <ptext>
            Track your environmental impact and 
            </ptext>
          </p>
          <ptext className="text-[18px] leading-[1.6] text-gray-500">
            earnings with real-time analytics. 
            </ptext>
        </divbod>
      </divcard>
    </section>
  );
}
