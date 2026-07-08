import React, { useState } from "react";
import { KeyRound, Shield, CheckCircle2, Phone, Mail, Chrome, Smartphone, RefreshCw } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "otp" | "sessions">("email");
  const [email, setEmail] = useState("shahidsaleemitoo@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [phone, setPhone] = useState("+1 (555) 017-3812");
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [sessions, setSessions] = useState([
    { id: "s1", device: "MacBook Pro (Apple Silicon)", browser: "Google Chrome", location: "Singapore (Active)", ip: "118.201.42.15", date: "Current Session" },
    { id: "s2", device: "iPhone 15 Pro", browser: "Mobile Safari", location: "New Delhi, IN", ip: "103.88.22.91", date: "Yesterday, 04:32 PM" }
  ]);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    setVerificationSent(true);
    // Simulate sending SMS/OTP code
    setTimeout(() => {
      alert("DEMO SECURITY CODE: 5912 has been dispatched to your device.");
    }, 400);
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join("");
    if (code === "5912") {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        onLoginSuccess("Shahid Saleem", email);
        onClose();
      }, 1000);
    } else {
      alert("Invalid code. Please use sandbox passcode: 5912");
    }
  };

  const handleSimpleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTwoFactor(true);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess("Shahid Saleem", email);
      onClose();
    }, 1000);
  };

  const revokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Header decoration */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-400 animate-pulse" />
              RaahRide Security Gate
            </h2>
            <p className="text-xs text-slate-400 mt-1">Enterprise multi-factor identity & session manager</p>
          </div>

          {!showTwoFactor ? (
            <>
              {/* Tabs */}
              <div className="flex border-b border-slate-800 mb-5">
                {[
                  { id: "email", label: "Email", icon: Mail },
                  { id: "phone", label: "Phone & OTP", icon: Phone },
                  { id: "sessions", label: "Sessions", icon: Shield }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                        activeTab === t.id
                          ? "border-indigo-500 text-indigo-400 font-bold"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Email Login Flow */}
              {activeTab === "email" && (
                <form onSubmit={handleSimpleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">
                      Enter Username / Corporate Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-slate-150 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Master Passphrase
                      </label>
                      <a href="#forgot" className="text-[10px] text-indigo-400 hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 text-slate-150 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md shadow-indigo-950/50"
                    >
                      Authenticate Account
                    </button>
                  </div>

                  <div className="relative my-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Or Social Onboarding
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        onLoginSuccess("Shahid Saleem", "shahid@google.com");
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-850 text-slate-200 py-2 rounded-lg text-xs border border-slate-800 transition-all font-medium"
                    >
                      <span className="text-sm">🌐</span> Google Auth
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onLoginSuccess("Shahid Saleem", "shahid@apple.com");
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-850 text-slate-200 py-2 rounded-lg text-xs border border-slate-800 transition-all font-medium"
                    >
                      <span className="text-sm"></span> Apple ID
                    </button>
                  </div>
                </form>
              )}

              {/* Phone OTP Login Flow */}
              {activeTab === "phone" && (
                <div className="space-y-4">
                  {!verificationSent ? (
                    <>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">
                          Registered Phone Number
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 text-slate-150 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                          />
                          <button
                            onClick={handleSendOtp}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all"
                          >
                            Send OTP
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 font-mono italic">
                          💡 Enter mobile vector. Try using +1 (555) 017-3812
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center bg-indigo-950/30 border border-indigo-900/45 p-3 rounded-xl mb-4">
                        <p className="text-xs text-indigo-350 font-semibold">
                          A 4-digit verification token was routed to {phone}
                        </p>
                        <p className="text-[10px] text-indigo-400 font-mono mt-1 font-bold">PASSCODE: 5912</p>
                      </div>

                      <div className="flex justify-center gap-3">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-digit-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value;
                              const updated = [...otpCode];
                              updated[idx] = val;
                              setOtpCode(updated);
                              if (val && idx < 3) {
                                document.getElementById(`otp-digit-${idx + 1}`)?.focus();
                              }
                            }}
                            className="w-12 h-12 text-center text-lg font-bold bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                          />
                        ))}
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => setVerificationSent(false)}
                          className="flex-1 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 rounded-lg text-xs font-semibold"
                        >
                          Modify Number
                        </button>
                        <button
                          onClick={handleVerifyOtp}
                          disabled={isVerifying}
                          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                        >
                          {isVerifying ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            "Verify OTP Token"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sessions Manager Flow */}
              {activeTab === "sessions" && (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wide">
                    Live Security Sessions
                  </p>
                  {sessions.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">All revoked. Secure.</div>
                  ) : (
                    sessions.map((s) => (
                      <div
                        key={s.id}
                        className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex items-start justify-between gap-2 text-xs"
                      >
                        <div className="flex gap-2">
                          {s.device.includes("iPhone") ? (
                            <Smartphone className="w-4 h-4 text-slate-450 mt-0.5" />
                          ) : (
                            <Chrome className="w-4 h-4 text-slate-450 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold text-slate-200">{s.device}</p>
                            <p className="text-[10px] text-slate-400">{s.browser} • {s.location}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">IP: {s.ip}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => revokeSession(s.id)}
                          className="text-[10px] font-bold text-rose-450 hover:bg-rose-950/20 px-2 py-1 rounded"
                        >
                          Revoke
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          ) : (
            /* 2FA Token screen */
            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div className="text-center bg-indigo-950/20 border border-indigo-900/30 p-3 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs text-indigo-300 font-bold">Two-Factor Authentication Active</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Please provide the safety passkey from your Google Authenticator token.
                </p>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">
                  6-Digit Auth Code
                </label>
                <input
                  type="text"
                  placeholder="000 000"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full text-center text-lg font-mono tracking-widest bg-slate-950 border border-slate-800 text-white rounded-lg py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTwoFactor(false)}
                  className="flex-1 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 rounded-lg text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Authorize Session"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
