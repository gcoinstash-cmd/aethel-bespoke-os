import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  LogOut, 
  Search, 
  Key, 
  Sparkles,
  Scissors,
  CheckCircle,
  PackageCheck,
  Ruler,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface BespokeCommission {
  id: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  model: string;
  leatherType: string;
  size: number;
  lastProfile: string;
  totalPrice: number;
  depositPaid: number;
  status: 'Pattern Drafting' | 'Last Sculpting' | 'Goodyear Welting' | 'Sole Burnishing' | 'Ready for Dispatch';
  createdAt: string;
}

interface AtelierAdminDashboardProps {
  onExit: () => void;
}

export default function AtelierAdminDashboard({ onExit }: AtelierAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'commissions' | 'inventory' | 'economics'>('commissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [commissions, setCommissions] = useState<BespokeCommission[]>([
    {
      id: 'ORD-801',
      orderNumber: 'AETH-9021',
      clientName: 'Lord Sterling Vance',
      clientEmail: 'vance@sterling-holdings.co.uk',
      model: 'The Soho Oxford',
      leatherType: 'Annonay French Box Calf (Midnight Noir)',
      size: 10.5,
      lastProfile: 'Chiseled Sovereign Hornbeam Last',
      totalPrice: 1850,
      depositPaid: 1850,
      status: 'Last Sculpting',
      createdAt: '2026-09-20'
    },
    {
      id: 'ORD-802',
      orderNumber: 'AETH-7740',
      clientName: 'Julian H. Croft',
      clientEmail: 'jcroft@mayfair-advisory.com',
      model: 'The Bruton Monk',
      leatherType: 'Annonay Box Calf (Cognac Brown)',
      size: 9.0,
      lastProfile: 'Soft Almond Classic Last',
      totalPrice: 1890,
      depositPaid: 1890,
      status: 'Goodyear Welting',
      createdAt: '2026-09-18'
    },
    {
      id: 'ORD-803',
      orderNumber: 'AETH-6512',
      clientName: 'Dr. Evelyn St. Claire',
      clientEmail: 'evelyn@stclaire-health.com',
      model: 'The Chelsea II',
      leatherType: 'Repello Suede (Tobacco)',
      size: 8.5,
      lastProfile: 'Elongated Architectural Last',
      totalPrice: 1920,
      depositPaid: 1920,
      status: 'Sole Burnishing',
      createdAt: '2026-09-15'
    },
    {
      id: 'ORD-804',
      orderNumber: 'AETH-5590',
      clientName: 'Elena Rostova',
      clientEmail: 'elena@rostovacap.com',
      model: 'The Savile Derby',
      leatherType: 'Annonay French Box Calf (Burgundy Wine)',
      size: 7.5,
      lastProfile: 'Chunky Semi-Square Last',
      totalPrice: 1870,
      depositPaid: 1870,
      status: 'Ready for Dispatch',
      createdAt: '2026-09-10'
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: BespokeCommission['status']) => {
    setCommissions(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredCommissions = commissions.filter(c => {
    const matchesSearch = c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalCommissionsValue = commissions.reduce((acc, c) => acc + c.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-stone-200 font-sans selection:bg-[#C5A85C]/30 selection:text-white">
      {/* Top Telemetry HUD */}
      <header className="sticky top-0 z-50 bg-[#121214]/95 backdrop-blur-md border-b border-stone-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#C5A85C]/30 flex items-center justify-center text-[#C5A85C] bg-[#C5A85C]/10">
              <Scissors className="w-5 h-5 text-[#C5A85C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-[0.25em] uppercase font-mono text-white">AETHEL CORDWAINER</h1>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-[#C5A85C]/20 text-[#C5A85C] border border-[#C5A85C]/30 font-bold">
                  MASTER CORDWAINER & LASTMAKER OS
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">Bespoke Footwear Atelier · Benchmade Goodyear Bench</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-stone-800 text-xs font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PASSCODE: <strong className="text-[#C5A85C]">aethel2026</strong></span>
            </div>
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-5 py-3 min-h-[44px] border border-stone-700 bg-stone-900/60 hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-base font-semibold min-h-[44px] font-mono tracking-wider transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>RETURN TO ATELIER LOOKBOOK</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-[#121214] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Active Commissions Value</span>
              <DollarSign className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">${totalCommissionsValue.toLocaleString()}</div>
            <div className="text-xs font-semibold font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>4 Pairs Hand-Lasting In-Bench</span>
            </div>
          </div>

          <div className="p-5 bg-[#121214] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Avg Pair Value</span>
              <Ruler className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#C5A85C]">$1,882.50</div>
            <div className="text-xs font-semibold font-mono text-stone-400 mt-1">Full Goodyear + Custom Last</div>
          </div>

          <div className="p-5 bg-[#121214] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Turnaround Schedule</span>
              <Clock className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">4–6 Weeks</div>
            <div className="text-xs font-semibold font-mono text-emerald-400 mt-1">Joh. Rendenbach Sole Cured</div>
          </div>

          <div className="p-5 bg-[#121214] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Turnkey Database</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">ACTIVE</div>
            <div className="text-xs font-semibold font-mono text-stone-400 mt-1">RLS Protected · Supabase 2.4</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-stone-800 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('commissions')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'commissions'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            ACTIVE COMMISSIONS PIPELINE ({commissions.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            HORNBEAM LASTS & ANNONAY CALF STOCK
          </button>
          <button
            onClick={() => setActiveTab('economics')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'economics'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            ATELIER BENCH ECONOMICS
          </button>
        </div>

        {/* Tab 1: Commissions */}
        {activeTab === 'commissions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121214] p-4 border border-stone-800 font-mono text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search client, order #, or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/60 border border-stone-700 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#C5A85C]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-stone-500 uppercase">Stage:</span>
                {['All', 'Last Sculpting', 'Goodyear Welting', 'Sole Burnishing', 'Ready for Dispatch'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 text-xs font-semibold border cursor-pointer ${
                      filterStatus === s
                        ? 'border-[#C5A85C] bg-[#C5A85C]/10 text-[#C5A85C]'
                        : 'border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-stone-800 bg-[#121214]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/60 text-stone-400 border-b border-stone-800 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th className="py-3 px-4">Order # & Date</th>
                    <th className="py-3 px-4">Client Patron</th>
                    <th className="py-3 px-4">Shoe Model & Last</th>
                    <th className="py-3 px-4">Tannery Leather</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Production Stage & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredCommissions.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#C5A85C]">{c.orderNumber}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-500">{c.createdAt}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{c.clientName}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-400">{c.clientEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-200">{c.model} (UK {c.size})</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-400">{c.lastProfile}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-300 text-xs font-semibold">{c.leatherType}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        ${c.totalPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-semibold tracking-wider font-bold uppercase ${
                            c.status === 'Ready for Dispatch' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                            c.status === 'Goodyear Welting' ? 'bg-amber-950/60 text-amber-400 border border-amber-800' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {c.status}
                          </span>
                          <select
                            value={c.status}
                            onChange={(e) => handleUpdateStatus(c.id, e.target.value as BespokeCommission['status'])}
                            className="bg-black border border-stone-700 text-stone-300 px-1.5 py-0.5 text-xs font-semibold tracking-wider focus:outline-none focus:border-[#C5A85C]"
                          >
                            <option value="Pattern Drafting">Pattern Drafting</option>
                            <option value="Last Sculpting">Last Sculpting</option>
                            <option value="Goodyear Welting">Goodyear Welting</option>
                            <option value="Sole Burnishing">Sole Burnishing</option>
                            <option value="Ready for Dispatch">Ready for Dispatch</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-[#121214] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C5A85C] uppercase tracking-wider font-bold">RAW HIDE SUPPLY</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Annonay French Box Calf</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">Direct from Annonay, France · Aniline finished full-grain</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Midnight Noir Box Calf</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Thickness: 1.2–1.4mm</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">14 Hides</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">Available</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Cognac Repello Suede</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Scotchgard treated nap</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">8 Hides</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">Available</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#121214] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C5A85C] uppercase tracking-wider font-bold">OUTSOLE STOCK</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Joh. Rendenbach Oak-Bark</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">Pit-cured 9 months in oak bark extract · Trier, Germany</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">5.5mm Fiddleback Soles</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Pre-beveled waist</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">22 Bends</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">In Stock</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Waxed Irish Linen Welt Thread</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Barbour Linens, N. Ireland</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">18 Spools</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">Optimal</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#121214] border border-stone-800">
              <span className="text-xs font-semibold tracking-wider text-[#C5A85C] uppercase tracking-wider font-bold">LAST STORAGE</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">Bavarian Hornbeam Vault</h3>
              <p className="text-stone-400 text-xs font-semibold mb-4">Permanent client anatomical lasts carved to 0.5mm precision</p>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Archived Client Lasts</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Private client repository</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">64 Lasts</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-400">Vault Protected</div>
                  </div>
                </div>
                <div className="p-3 bg-black/50 border border-stone-800 flex justify-between">
                  <div>
                    <div className="text-white font-bold">Rough Hornbeam Blocks</div>
                    <div className="text-xs font-semibold tracking-wider text-stone-500">Awaiting new commission</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#C5A85C] font-bold">12 Pairs</div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-400">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Economics */}
        {activeTab === 'economics' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#121214] border border-stone-800 font-mono">
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C5A85C]" />
                <span>30-Day Atelier Economics Architecture</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black/60 border border-stone-800">
                  <div className="text-stone-500 mb-1">Gross Commission Volume</div>
                  <div className="text-2xl font-bold text-white">$45,200</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">24 bespoke commissions placed</div>
                </div>
                <div className="p-4 bg-black/60 border border-stone-800">
                  <div className="text-stone-500 mb-1">Average Order Value (AOV)</div>
                  <div className="text-2xl font-bold text-[#C5A85C]">$1,883</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">High-ticket direct-to-consumer</div>
                </div>
                <div className="p-4 bg-black/60 border border-stone-800">
                  <div className="text-stone-500 mb-1">Gross Atelier Margin</div>
                  <div className="text-2xl font-bold text-emerald-400">74.6%</div>
                  <div className="text-stone-400 text-xs font-semibold mt-1">Zero wholesale consignment discounts</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#121214] border border-[#C5A85C]/20 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#C5A85C] font-bold text-sm uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Turnkey Commercial Acquisition Note</span>
              </div>
              <p className="text-stone-300 leading-relaxed font-sans text-xs">
                Aethel Bespoke Cordwainer Studio is engineered for bespoke cordwainers, luxury leather goods ateliers, and high-ticket menswear craftsmen. Features an interactive last-measuring portal, modular Goodyear-welt lookbook, and turnkey PostgreSQL commission order ledger.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
