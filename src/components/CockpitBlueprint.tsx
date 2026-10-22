import React, { useState } from 'react';
import { Wind, Zap, Activity, Cpu, ShieldCheck, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';

interface CockpitBlueprintProps {
  isRelayArmed?: boolean;
  bacLevel?: number;
}

export default function CockpitBlueprint({ isRelayArmed = true, bacLevel = 0.00 }: CockpitBlueprintProps) {
  const [activeComponent, setActiveComponent] = useState<'sensor' | 'relay' | 'cluster'>('sensor');
  const isSafe = bacLevel < 0.05;

  return (
    <div className="w-full rounded-lg bg-[#07080b] border border-zinc-800 p-3 sm:p-5 font-mono select-none overflow-hidden">
      
      {/* Blueprint Header Wire */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-800/80 text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-zinc-200 font-semibold tracking-wide">SYSTEM BLUEPRINT // COCKPIT INTERFACE MK-1</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-500">
          <span>SCALE: 1:1 VECTOR</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-emerald-400">STATUS: CALIBRATED</span>
        </div>
      </div>

      {/* Main Interactive Vector Schematic */}
      <div className="relative w-full aspect-[16/9] min-h-[260px] max-h-[440px] rounded border border-zinc-800/70 bg-[#090b10] flex items-center justify-center overflow-hidden">
        
        {/* Subtle CAD graph grid lines */}
        <div className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none"></div>

        {/* SVG Schematic Blueprint */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full text-zinc-600 transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Car Cockpit Windshield & Dash Frame */}
          <path
            d="M 50 80 L 750 80 L 780 400 L 20 400 Z"
            stroke="#27272a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="#090a0f"
          />

          {/* Steering Wheel Outline (Left Side) */}
          <circle
            cx="220"
            cy="270"
            r="85"
            stroke="#3f3f46"
            strokeWidth="8"
            fill="#0f1117"
            className="cursor-pointer hover:stroke-zinc-400 transition-colors"
            onClick={() => setActiveComponent('cluster')}
          />
          <circle cx="220" cy="270" r="45" stroke="#27272a" strokeWidth="3" fill="#18181b" />
          <line x1="135" y1="270" x2="305" y2="270" stroke="#3f3f46" strokeWidth="4" />
          <line x1="220" y1="270" x2="220" y2="355" stroke="#3f3f46" strokeWidth="4" />
          <text x="220" y="274" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="monospace">STEERING</text>

          {/* Dual Digital Gauge Cluster Behind Steering Wheel */}
          <path d="M 120 160 L 320 160 L 340 210 L 100 210 Z" fill="#05070a" stroke="#27272a" strokeWidth="1" />
          <text x="160" y="185" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">0 km/h</text>
          <text x="160" y="200" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">SPEED</text>
          <text x="280" y="185" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">850 RPM</text>
          <text x="280" y="200" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">IDLE READY</text>

          {/* Wiring Harness: Battery (+12V) -> AlcoholiCar Relay -> Starter Motor */}
          <path
            d="M 520 220 L 680 220 L 680 320 L 730 320"
            stroke={isSafe ? "#f97316" : "#ef4444"}
            strokeWidth="2.5"
            strokeDasharray={isSafe ? "none" : "6 4"}
            className="transition-colors duration-300"
          />

          {/* Center Console Panel (AlcoholiCar Hardware Module) */}
          <rect
            x="380"
            y="140"
            width="240"
            height="230"
            rx="12"
            fill="#101218"
            stroke={activeComponent === 'sensor' ? '#f97316' : '#3f3f46'}
            strokeWidth="2"
            className="cursor-pointer transition-colors"
            onClick={() => setActiveComponent('sensor')}
          />

          {/* Module Label */}
          <rect x="400" y="155" width="200" height="24" rx="4" fill="#18181b" stroke="#27272a" />
          <text x="500" y="171" fill="#f4f4f5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ALCOHOLICAR MK-1
          </text>

          {/* Precision Breath Intake Aperture */}
          <circle
            cx="500"
            cy="240"
            r="42"
            fill="#090a0e"
            stroke={isSafe ? "#10b981" : "#f97316"}
            strokeWidth="4"
            className="transition-colors duration-300"
          />
          <circle cx="500" cy="240" r="30" fill="#141822" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="500" cy="240" r="14" fill="#090a0e" />
          
          {/* Animated intake flow vector indicators */}
          <path d="M 470 240 L 485 240" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 530 240 L 515 240" stroke="#f59e0b" strokeWidth="2" />
          <text x="500" y="244" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="monospace">INTAKE</text>

          {/* Relay Status Box inside Module */}
          <rect
            x="410"
            y="305"
            width="180"
            height="45"
            rx="6"
            fill="#090b10"
            stroke={activeComponent === 'relay' ? '#f97316' : '#27272a'}
            strokeWidth="1.5"
            className="cursor-pointer hover:stroke-zinc-400 transition-colors"
            onClick={() => setActiveComponent('relay')}
          />
          <text x="500" y="323" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="monospace">
            40A SOLID STATE RELAY (TERM 50)
          </text>
          <text
            x="500"
            y="340"
            fill={isSafe ? "#10b981" : "#f97316"}
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {isSafe ? "CIRCUIT: CLOSED (READY)" : "CIRCUIT: OPEN (LOCKED)"}
          </text>

          {/* Starter Solenoid Wire Callout (Right) */}
          <rect x="670" y="300" width="110" height="42" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="725" y="318" fill="#e4e4e7" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">STARTER MOTOR</text>
          <text x="725" y="332" fill={isSafe ? "#10b981" : "#f97316"} fontSize="9" textAnchor="middle" fontFamily="monospace">
            {isSafe ? "CRANK ALLOWED" : "NO CURRENT"}
          </text>

          {/* Ambient Lighting & Status Ring */}
          <circle cx="500" cy="240" r="48" stroke={isSafe ? "#10b981" : "#f97316"} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        </svg>

        {/* Inset Technical Specs Badge (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-zinc-950/90 border border-zinc-800 p-2 rounded text-[10px] text-zinc-300 font-mono hidden sm:block">
          <div><span className="text-zinc-500">CHAMBER: </span><span>ELECTROCHEMICAL FUEL CELL</span></div>
          <div><span className="text-zinc-500">RELAY: </span><span className="text-orange-400">40A DIRECT SOLENOID INTERCEPT</span></div>
        </div>

        {/* Status Callout (Bottom Right) */}
        <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-zinc-800 p-2 rounded text-[10px] font-mono flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-orange-500'}`}></span>
          <span className={isSafe ? 'text-emerald-300 font-bold' : 'text-orange-400 font-bold'}>
            {isSafe ? 'IGNITION UNLOCKED' : 'IGNITION CUTOFF ENGAGED'}
          </span>
        </div>

      </div>

      {/* Interactive Telemetry Details Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
        <button
          type="button"
          onClick={() => setActiveComponent('sensor')}
          className={`p-2.5 rounded text-left border transition-all ${
            activeComponent === 'sensor' ? 'bg-zinc-900 border-orange-500/80 text-white' : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
            <Wind className="w-3.5 h-3.5 text-orange-400" />
            <span>01. SMART SENSOR</span>
          </div>
          <div className="text-zinc-200 mt-1 font-sans text-xs">Exhalation intake reads ethanol molecules with dual-check airflow.</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveComponent('relay')}
          className={`p-2.5 rounded text-left border transition-all ${
            activeComponent === 'relay' ? 'bg-zinc-900 border-orange-500/80 text-white' : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>02. 40A RELAY INTERLOCK</span>
          </div>
          <div className="text-zinc-200 mt-1 font-sans text-xs">Directly interrupts terminal 50 starter current before engine cranks.</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveComponent('cluster')}
          className={`p-2.5 rounded text-left border transition-all ${
            activeComponent === 'cluster' ? 'bg-zinc-900 border-orange-500/80 text-white' : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>03. VEHICLE CLUSTER</span>
          </div>
          <div className="text-zinc-200 mt-1 font-sans text-xs">Zero battery drain (&lt;8mA) when vehicle is parked and switched off.</div>
        </button>
      </div>

    </div>
  );
}
