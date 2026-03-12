import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Shield, 
  History, 
  Eye, 
  ArrowRight, 
  UserPlus 
} from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white p-4 font-sans">
      
      {/* Main Card */}
      <div className="w-full max-w-[520px] bg-[#111726] border border-[#1E293B] rounded-[32px] p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600/20 p-5 rounded-3xl mb-6 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
            <ShieldCheck className="text-blue-500 w-16 h-16" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">FraudShield AI</h1>
          <p className="text-slate-400 text-lg">Secure Enterprise Portal</p>
        </div>

        {/* Feature Highlights Section */}
        <div className="grid grid-cols-3 gap-1 bg-[#0F172A] border border-[#1E293B] rounded-2xl py-4 px-2 mb-8">
          {/* Multi-Factor */}
          <div className="flex flex-col items-center text-center px-1 border-r border-slate-800">
            <Shield size={18} className="text-blue-400 mb-2" />
            <span className="text-[11px] font-semibold text-slate-200">Multi-Factor</span>
            <div className="flex items-center mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Authentication</span>
            </div>
          </div>
          
          {/* Real-time Threat */}
          <div className="flex flex-col items-center text-center px-1 border-r border-slate-800">
            <History size={18} className="text-blue-400 mb-2" />
            <span className="text-[11px] font-semibold text-slate-200">Real-time</span>
            <div className="flex items-center mt-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Threat Detection</span>
            </div>
          </div>

          {/* Encrypted Access */}
          <div className="flex flex-col items-center text-center px-1">
            <Lock size={18} className="text-blue-400 mb-2" />
            <span className="text-[11px] font-semibold text-slate-200 uppercase">Encrypted</span>
            <div className="flex items-center mt-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Access</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Email Address" 
              className="w-full bg-[#1A2234] border border-[#1E293B] rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#1A2234] border border-[#1E293B] rounded-xl py-4 pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer hover:text-slate-300" size={20} />
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-[#1E293B] bg-[#1A2234] checked:bg-blue-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-300 cursor-pointer">Remember me</label>
          </div>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
        </div>

        {/* Primary Action */}
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.98]">
          Access Dashboard <ArrowRight size={20} />
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-slate-800 w-full my-10"></div>

        {/* Onboarding Section */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 mb-4">
          <h2 className="text-lg font-bold mb-1">New to FraudShield AI?</h2>
          <p className="text-slate-400 text-sm mb-6">Create an account to get started with secure access.</p>
          
          <button className="w-full border border-blue-500/30 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-500/10 transition-all active:scale-[0.98]">
            <UserPlus size={20} className="text-slate-400" />
            Create Account
            <ArrowRight size={20} className="text-slate-400 ml-1" />
          </button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-center text-xs text-slate-500 mt-2">
          By signing in, you agree to our <a href="#" className="text-blue-400/80 hover:text-blue-400 underline decoration-blue-400/30">Terms of Service</a> and <a href="#" className="text-blue-400/80 hover:text-blue-400 underline decoration-blue-400/30">Privacy Policy</a>
        </p>

      </div>
    </div>
  );
}
