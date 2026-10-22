import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Car,
  Lock,
  Unlock,
  Wind,
  Smartphone,
  Cpu,
  Bell,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap,
  MapPin,
  ChevronRight,
  Send,
  Sliders,
  CheckCircle2,
  Radio,
  ArrowRight,
  Terminal,
  Activity,
  Gauge
} from 'lucide-react';
import { translations, Language } from './locales.ts';
import CarSimulator3D from './components/CarSimulator3D.tsx';
import CockpitBlueprint from './components/CockpitBlueprint.tsx';
import cockpitRealPhoto from './assets/images/real_cockpit_interior_1792699063777.jpg';
import { Menu, X as CloseIcon } from 'lucide-react';

// Web Audio API Synthesizer with mechanical click and tactile feedback
class AudioSynth {
  ctx: AudioContext | null = null;
  enabled: boolean = true;

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playRelayClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSuccessIgnition() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    // Crisp mechanical chime
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.14, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.26);
    });

    // Deep starter motor crank
    setTimeout(() => {
      if (!this.ctx || !this.enabled) return;
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      oscLow.type = 'sawtooth';
      oscLow.frequency.setValueAtTime(70, this.ctx.currentTime);
      oscLow.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.35);
      oscLow.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.7);
      gainLow.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gainLow.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);
      oscLow.connect(gainLow);
      gainLow.connect(this.ctx.destination);
      oscLow.start();
      oscLow.stop(this.ctx.currentTime + 0.75);
    }, 220);
  }

  playLockoutAlert() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    // Urgent industrial lockout buzz
    const now = this.ctx.currentTime;
    [0, 0.2].forEach((offset) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now + offset);
      osc.frequency.linearRampToValueAtTime(210, now + offset + 0.12);
      gain.gain.setValueAtTime(0.15, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.16);
    });
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }
}

const synth = new AudioSynth();

export default function App() {
  const [lang, setLang] = useState<Language>('tr');
  const t = translations[lang];

  // Simulator State
  const [bacValue, setBacValue] = useState<number>(0.00);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testProgress, setTestProgress] = useState<number>(0);
  const [simStatus, setSimStatus] = useState<'idle' | 'testing' | 'passed' | 'locked'>('idle');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedPreset, setSelectedPreset] = useState<string>('sober');

  const [show3dSim, setShow3dSim] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [heroViewMode, setHeroViewMode] = useState<'photo' | 'blueprint'>('photo');

  // Drink Estimator State
  const [drinksCount, setDrinksCount] = useState<number>(2);
  const [hoursElapsed, setHoursElapsed] = useState<number>(1);
  const [userWeight, setUserWeight] = useState<number>(70);
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');
  const [estimatedBac, setEstimatedBac] = useState<number>(0.04);

  // Email form state
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [subscribeSubmitted, setSubscribeSubmitted] = useState<boolean>(false);

  useEffect(() => {
    synth.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const alcoholGrams = drinksCount * 14;
    const bodyWaterFactor = userGender === 'male' ? 0.68 : 0.55;
    const weightGrams = userWeight * 1000;
    const rawBac = (alcoholGrams / (weightGrams * bodyWaterFactor)) * 100;
    const metabolized = hoursElapsed * 0.015;
    const finalBac = Math.max(0, Math.round((rawBac - metabolized) * 1000) / 1000);
    setEstimatedBac(finalBac);
  }, [drinksCount, hoursElapsed, userWeight, userGender]);

  const presets = [
    { id: 'sober', label: t.simulator.presets.sober.label, bac: 0.00, desc: t.simulator.presets.sober.desc },
    { id: 'cider', label: t.simulator.presets.cider.label, bac: 0.02, desc: t.simulator.presets.cider.desc },
    { id: 'border', label: t.simulator.presets.border.label, bac: 0.05, desc: t.simulator.presets.border.desc },
    { id: 'impaired', label: t.simulator.presets.impaired.label, bac: 0.08, desc: t.simulator.presets.impaired.desc },
    { id: 'party', label: t.simulator.presets.party.label, bac: 0.14, desc: t.simulator.presets.party.desc }
  ];

  const handleSelectPreset = (pId: string, val: number) => {
    setSelectedPreset(pId);
    setBacValue(val);
    setSimStatus('idle');
    synth.playTick();
  };

  const runSimulationTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setSimStatus('testing');
    setTestProgress(0);
    synth.playRelayClick();

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setTestProgress(Math.min(current, 100));

      if (current % 24 === 0) {
        synth.playTick();
      }

      if (current >= 100) {
        clearInterval(interval);
        setIsTesting(false);
        const isSafe = bacValue < 0.05;
        if (isSafe) {
          setSimStatus('passed');
          synth.playSuccessIgnition();
        } else {
          setSimStatus('locked');
          synth.playLockoutAlert();
        }
      }
    }, 65);
  };

  const handleResetSimulator = () => {
    setSimStatus('idle');
    setTestProgress(0);
    setIsTesting(false);
    synth.playRelayClick();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail && subscribeEmail.includes('@')) {
      setSubscribeSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-200">
      
      {/* 1. TOP BAR: Crisp, Minimalist, Precision Border */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090b]/90 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
          
          {/* Zone 1: Wordmark with Industrial Sub-label */}
          <a href="#" className="flex items-center gap-3 text-white tracking-tight group whitespace-nowrap shrink-0">
            <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-500 font-mono font-bold text-xs">
              <i className="fa-solid fa-car-side"></i>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">AlcoholiCar</span>
              <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">MK-1</span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-zinc-400">
            <a href="#problem" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t.nav.problem}</a>
            <a href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t.nav.howItWorks}</a>
            <a href="#simulator" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t.nav.simulator}</a>
            <a href="#features" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t.nav.features}</a>
            <a href="#team" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t.nav.team}</a>
          </nav>

          {/* Zone 3: Language Segmented Selector + Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Minimal Segmented Language Switcher */}
            <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono">
              {(['tr', 'en', 'de'] as Language[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded transition-all uppercase ${
                    lang === l
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('simulator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 rounded transition-colors shadow-xs whitespace-nowrap shrink-0 hidden sm:flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-orange-600" />
              <span>{t.nav.trySimulator}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-4 space-y-3 font-mono text-xs animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-zinc-300 hover:text-white border-b border-zinc-900 flex items-center justify-between"
              >
                <span>{t.nav.problem}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-zinc-300 hover:text-white border-b border-zinc-900 flex items-center justify-between"
              >
                <span>{t.nav.howItWorks}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
              <a
                href="#simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-zinc-300 hover:text-white border-b border-zinc-900 flex items-center justify-between"
              >
                <span>{t.nav.simulator}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-zinc-300 hover:text-white border-b border-zinc-900 flex items-center justify-between"
              >
                <span>{t.nav.features}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
              <a
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>{t.nav.team}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShow3dSim(true);
                }}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-cube text-xs"></i>
                <span>{t.simulator.experience3dBtn}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION: Clean Monolithic Centered Hierarchy (Linear / Teenage Engineering aesthetic) */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-zinc-800/80 bg-tech-grid overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Centered Typography Block */}
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-6">
            
            {/* Technical Metadata Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-zinc-900/90 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span className="text-zinc-300 font-medium">{t.hero.badgeStatus}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{t.hero.badgeBuild}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-amber-400 font-medium">{t.hero.badgeBench}</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04] text-balance">
              {t.hero.titleLine1} <br />
              <span className="text-zinc-400">
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShow3dSim(true)}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-sm rounded transition-colors shadow-xs flex items-center gap-2 whitespace-nowrap shrink-0 tactile-press"
              >
                <i className="fa-solid fa-cube text-xs"></i>
                <span>{t.simulator.experience3dBtn}</span>
              </button>

              <a
                href="#simulator"
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-medium text-sm rounded transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 tactile-press"
              >
                <Activity className="w-4 h-4 text-orange-400" />
                <span>{t.hero.trySimBtn}</span>
              </a>

              <a
                href="#how-it-works"
                className="px-5 py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-sm rounded transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 tactile-press"
              >
                <span>{t.hero.seeHowBtn}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
                title={soundEnabled ? "Audio effects active" : "Audio muted"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{soundEnabled ? t.hero.soundOn : t.hero.soundOff}</span>
              </button>
            </div>

          </div>

          {/* Monolithic Visual Frame: Real Debadged Cockpit & Blueprint Switcher */}
          <div className="mt-10 sm:mt-14 relative rounded-xl border border-zinc-800 bg-zinc-950 p-2 sm:p-3 shadow-2xl">
            
            {/* Frame Navigation Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-zinc-200 font-semibold">VEHICLE COCKPIT // ALCOHOLICAR INTERLOCK</span>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px]">
                <button
                  type="button"
                  onClick={() => setHeroViewMode('photo')}
                  className={`px-2.5 py-1 rounded transition-colors font-medium ${
                    heroViewMode === 'photo' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <i className="fa-solid fa-camera mr-1"></i>
                  <span>Kokpit Fotoğrafı</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroViewMode('blueprint')}
                  className={`px-2.5 py-1 rounded transition-colors font-medium ${
                    heroViewMode === 'blueprint' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <i className="fa-solid fa-diagram-project mr-1"></i>
                  <span>Devre Şematiği</span>
                </button>
              </div>
            </div>

            {/* Display Body: Real Cockpit Photo vs Vector Blueprint */}
            {heroViewMode === 'photo' ? (
              <div className="relative rounded-lg overflow-hidden border border-zinc-800/60 aspect-[16/9] min-h-[260px] max-h-[460px] bg-zinc-950">
                <img
                  src={cockpitRealPhoto}
                  onError={(e) => {
                    // Fail-safe fallback to public root
                    e.currentTarget.src = '/cockpit_real.jpg';
                  }}
                  alt="Real debadged car cockpit interior with unbranded steering wheel"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>

                {/* Minimalist Inset Telemetry Strip */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 sm:p-4 rounded bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-xs font-mono">
                  <div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span>{t.hero.telemetryRelayTitle}</span>
                    </div>
                    <div className="text-zinc-400 text-[11px] mt-0.5">{t.hero.telemetryRelayDesc}</div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 text-zinc-300 text-[11px]">
                    <div>
                      <span className="text-zinc-400">CHIP: </span>
                      <span className="text-white">ESP32-S3</span>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-zinc-400">SOLENOID: </span>
                      <span className="text-white">{t.hero.telemetrySolenoid}</span>
                    </div>
                    <div className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      {t.hero.telemetryReady}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <CockpitBlueprint isRelayArmed={bacValue < 0.05} bacLevel={bacValue} />
            )}

            {/* Hardware Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-3 mt-2 border-t border-zinc-800/80 text-xs font-mono">
              <div className="p-3 bg-zinc-900/50 border border-zinc-800/60 rounded flex items-center justify-between">
                <span className="text-zinc-400">{t.hero.metricResponseLabel}</span>
                <span className="text-white font-bold text-sm tabular-nums">{t.hero.metricResponse}</span>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800/60 rounded flex items-center justify-between">
                <span className="text-zinc-400">{t.hero.metricRelayLabel}</span>
                <span className="text-orange-400 font-bold text-sm tabular-nums">{t.hero.metricRelay}</span>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800/60 rounded flex items-center justify-between">
                <span className="text-zinc-400">{t.hero.metricLimitLabel}</span>
                <span className="text-amber-400 font-bold text-sm tabular-nums">{t.hero.metricLimit}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE PROBLEM SECTION: Asymmetric Industrial Bento */}
      <section id="problem" className="py-20 lg:py-24 border-b border-zinc-800/80 bg-[#0c0d10]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              {t.problem.badge}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t.problem.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.problem.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-6 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 text-xs font-mono mb-4">
                  01
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.problem.card1Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.problem.card1Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-orange-400">
                {t.problem.card1Fact}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 text-xs font-mono mb-4">
                  02
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.problem.card2Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.problem.card2Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-amber-400">
                {t.problem.card2Fact}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-mono mb-4">
                  03
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.problem.card3Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.problem.card3Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-zinc-300">
                {t.problem.card3Fact}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS: 3 Steps with Precision Wireframes */}
      <section id="how-it-works" className="py-20 lg:py-24 border-b border-zinc-800/80 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              {t.howItWorks.badge}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm">
              {t.howItWorks.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-zinc-600 mb-3">01/</div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.howItWorks.step1Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.howItWorks.step1Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span>{t.howItWorks.step1Tag}</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-zinc-600 mb-3">02/</div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.howItWorks.step2Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.howItWorks.step2Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{t.howItWorks.step2Tag}</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-zinc-600 mb-3">03/</div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{t.howItWorks.step3Title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.howItWorks.step3Desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-zinc-800 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.howItWorks.step3Tag}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HARDWARE BENCH & OSCILLOSCOPE BAC SIMULATOR */}
      <section id="simulator" className="py-20 lg:py-28 border-b border-zinc-800/80 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.simulator.badge}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t.simulator.title}
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">
              {t.simulator.desc}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShow3dSim(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-xs tactile-press"
              >
                <i className="fa-solid fa-cube text-xs"></i>
                <span>{t.simulator.experience3dBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Diagnostic Instrument Chassis */}
          <div className="rounded-xl border border-zinc-700/80 bg-zinc-950 p-4 sm:p-7 shadow-2xl">
            
            {/* Instrument Top Frame with Screw Markings */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">+</span>
                <span className="text-white font-semibold">TEST BENCH CALIBRATOR</span>
                <span className="text-zinc-600">//</span>
                <span>MODEL-BP-01</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-600">SAMPLE FREQ: 1000Hz</span>
                <span className="text-zinc-600">+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Rotary / Stepped Preset Control Panel (Col 5) */}
              <div className="lg:col-span-5 space-y-5">
                
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-semibold uppercase">{t.simulator.selectScenario}</span>
                    <span className="text-zinc-500">{t.simulator.thresholdNotice}</span>
                  </div>

                  <div className="space-y-1.5">
                    {presets.map((preset) => {
                      const isSelected = selectedPreset === preset.id;
                      const isDanger = preset.bac >= 0.05;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset.id, preset.bac)}
                          className={`w-full text-left px-3.5 py-2.5 rounded border transition-all flex items-center justify-between font-mono text-xs ${
                            isSelected
                              ? isDanger
                                ? 'bg-orange-950/40 border-orange-500/80 text-white'
                                : 'bg-zinc-800 border-zinc-600 text-white'
                              : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <div>
                            <span className="font-semibold">{preset.label}</span>
                            <div className="text-[10px] text-zinc-500 mt-0.5">{preset.desc}</div>
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[11px] tabular-nums font-bold ${
                            isDanger ? 'bg-orange-500/20 text-orange-300' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {preset.bac.toFixed(2)}%
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Fine Manual Stepper Slider */}
                <div className="p-3.5 rounded bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">{t.simulator.customBac}</span>
                    <span className="text-orange-400 font-bold tabular-nums text-sm">
                      {bacValue.toFixed(3)}% BAC
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="0.25"
                    step="0.005"
                    value={bacValue}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setBacValue(val);
                      setSelectedPreset('custom');
                      setSimStatus('idle');
                    }}
                    className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer accent-orange-500"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>{t.simulator.soberLabel}</span>
                    <span className="text-amber-400">{t.simulator.limitLabel}</span>
                    <span className="text-orange-400">{t.simulator.dangerousLabel}</span>
                  </div>
                </div>

                {/* Trigger Control Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={runSimulationTest}
                    disabled={isTesting}
                    className={`flex-1 py-3 px-4 rounded font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
                      isTesting
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-white hover:bg-zinc-200 text-zinc-950 tactile-press'
                    }`}
                  >
                    {isTesting ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                        <span>{t.simulator.analyzingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Wind className="w-3.5 h-3.5 text-orange-600" />
                        <span>{t.simulator.breatheBtn}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShow3dSim(true)}
                    className="py-3 px-3.5 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold rounded transition-colors flex items-center gap-1.5 uppercase tactile-press shrink-0"
                    title={t.simulator.experience3dBtn}
                  >
                    <i className="fa-solid fa-cube text-xs"></i>
                    <span className="hidden sm:inline">{t.simulator.experience3dBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSimulator}
                    className="p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition-colors"
                    title={t.simulator.resetTitle}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Column: Oscilloscope Display & Ignition Cutoff Interlock (Col 7) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* CRT Reticle Screen */}
                <div className="rounded-lg border border-zinc-800 p-5 oscilloscope-screen relative overflow-hidden">
                  
                  {/* CRT Screen Top Status */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80 font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        simStatus === 'passed' ? 'bg-emerald-400' : simStatus === 'locked' ? 'bg-orange-500 animate-ping' : 'bg-zinc-600'
                      }`}></span>
                      <span className="text-zinc-300 font-semibold">SIGNAL CH-1 [FUEL CELL]</span>
                    </div>
                    <span className="text-zinc-500">2.5V REF · 50ms/DIV</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Simulated Waveform & Large Segmented Display */}
                    <div className="p-4 rounded bg-zinc-950/90 border border-zinc-800/80 text-center font-mono">
                      
                      {/* Synthetic Waveform SVG */}
                      <div className="h-16 w-full flex items-center justify-center mb-2">
                        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                          <path
                            d={
                              isTesting
                                ? `M 0 30 Q 25 ${30 - (testProgress % 30)}, 50 30 T 100 30 T 150 30 T 200 30`
                                : simStatus === 'locked'
                                ? "M 0 30 L 30 10 L 60 50 L 90 10 L 120 50 L 150 15 L 200 30"
                                : simStatus === 'passed'
                                ? "M 0 30 Q 50 20, 100 30 T 200 30"
                                : "M 0 30 L 200 30"
                            }
                            fill="transparent"
                            stroke={
                              simStatus === 'locked' ? '#f97316' : simStatus === 'passed' ? '#10b981' : '#71717a'
                            }
                            strokeWidth="2"
                          />
                        </svg>
                      </div>

                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.simulator.currentBac}</div>
                      <div className={`text-3xl font-extrabold tracking-tight tabular-nums mt-0.5 ${
                        simStatus === 'locked' ? 'text-orange-400' : simStatus === 'passed' ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {bacValue.toFixed(3)}%
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">{t.simulator.safeLimitText}</div>
                    </div>

                    {/* Hardware Relay State Console */}
                    <div className="space-y-3 font-mono text-xs">
                      
                      <div className="p-3 rounded bg-zinc-950/80 border border-zinc-800">
                        <div className="text-[10px] text-zinc-500 uppercase">STARTER RELAY (TERM 50)</div>
                        <div className={`text-sm font-bold mt-1 ${
                          simStatus === 'passed'
                            ? 'text-emerald-400'
                            : simStatus === 'locked'
                            ? 'text-orange-500'
                            : 'text-zinc-300'
                        }`}>
                          {simStatus === 'passed'
                            ? 'CLOSED [CURRENT ENGAGED]'
                            : simStatus === 'locked'
                            ? 'OPEN [CIRCUIT LOCKED]'
                            : 'STANDBY [ARMED]'}
                        </div>
                      </div>

                      <div className="p-3 rounded bg-zinc-950/80 border border-zinc-800">
                        <div className="text-[10px] text-zinc-500 uppercase">DECISION ENGINE</div>
                        <div className="text-xs text-zinc-300 mt-1">
                          {simStatus === 'passed' && t.simulator.statusPassedTitle}
                          {simStatus === 'locked' && t.simulator.statusLockedTitle}
                          {simStatus === 'testing' && t.simulator.statusTestingTitle}
                          {simStatus === 'idle' && t.simulator.statusIdleTitle}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Simulated Emergency LTE Alert Box (When Locked) */}
                {simStatus === 'locked' && (
                  <div className="p-4 rounded border border-orange-500/60 bg-zinc-950 font-mono text-xs animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-orange-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{t.simulator.sosHeader}</span>
                      </span>
                      <span className="text-[11px] text-zinc-500">GSM CAT-M1</span>
                    </div>
                    <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                      {t.simulator.sosMessage.replace('{bac}', bacValue.toFixed(3))}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400">
                      <span>{t.simulator.gpsText}</span>
                      <span>·</span>
                      <span>{t.simulator.batteryText}</span>
                    </div>
                  </div>
                )}

                {/* Tactile Widmark Drink Estimator Strip */}
                <div className="p-4 rounded bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-zinc-300 font-semibold">{t.simulator.calcTitle}</span>
                    <span className="text-orange-400 font-bold">{t.simulator.calcEst.replace('{bac}', estimatedBac.toFixed(3))}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <span className="text-zinc-500 block mb-1">{t.simulator.drinksLabel}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setDrinksCount(Math.max(0, drinksCount - 1))} className="px-2 py-0.5 bg-zinc-800 rounded font-bold">-</button>
                        <span className="text-white font-bold">{drinksCount}</span>
                        <button onClick={() => setDrinksCount(drinksCount + 1)} className="px-2 py-0.5 bg-zinc-800 rounded font-bold">+</button>
                      </div>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">{t.simulator.hoursLabel}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setHoursElapsed(Math.max(1, hoursElapsed - 1))} className="px-2 py-0.5 bg-zinc-800 rounded font-bold">-</button>
                        <span className="text-white font-bold">{hoursElapsed}h</span>
                        <button onClick={() => setHoursElapsed(hoursElapsed + 1)} className="px-2 py-0.5 bg-zinc-800 rounded font-bold">+</button>
                      </div>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">{t.simulator.weightLabel}</span>
                      <select
                        value={userWeight}
                        onChange={(e) => setUserWeight(parseInt(e.target.value))}
                        className="bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-zinc-300 w-full"
                      >
                        <option value="60">60 kg</option>
                        <option value="70">70 kg</option>
                        <option value="80">80 kg</option>
                        <option value="90">90 kg</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">SYNC</span>
                      <button
                        onClick={() => {
                          setBacValue(estimatedBac);
                          setSelectedPreset('custom');
                          setSimStatus('idle');
                          synth.playTick();
                        }}
                        className="w-full py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold"
                      >
                        {t.simulator.applyBtn}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. KEY FEATURES: Monolithic Grid with Wireframe Badges */}
      <section id="features" className="py-20 lg:py-24 border-b border-zinc-800/80 bg-[#0c0d10]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              {t.features.badge}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t.features.title}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm">
              {t.features.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat1Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat1Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat1Tag}</div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat2Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat2Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat2Tag}</div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat3Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat3Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat3Tag}</div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat4Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat4Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat4Tag}</div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat5Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat5Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat5Tag}</div>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400 mb-4">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{t.features.feat6Title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{t.features.feat6Desc}</p>
              <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">{t.features.feat6Tag}</div>
            </div>

          </div>

        </div>
      </section>



      {/* 8. STUDENT TEAM */}
      <section id="team" className="py-20 lg:py-24 border-b border-zinc-800/80 bg-[#0c0d10]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              {t.team.badge}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t.team.title}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm">
              {t.team.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="w-12 h-12 rounded bg-zinc-800 border border-zinc-700 font-mono font-bold text-sm text-white flex items-center justify-center mb-4">
                EE
              </div>
              <h3 className="font-display font-semibold text-base text-white">{t.team.member1Role}</h3>
              <div className="text-[11px] font-mono text-orange-400 mt-0.5">Hardware & Circuits</div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{t.team.member1Desc}</p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="w-12 h-12 rounded bg-zinc-800 border border-zinc-700 font-mono font-bold text-sm text-white flex items-center justify-center mb-4">
                CS
              </div>
              <h3 className="font-display font-semibold text-base text-white">{t.team.member2Role}</h3>
              <div className="text-[11px] font-mono text-orange-400 mt-0.5">Firmware & Systems</div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{t.team.member2Desc}</p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="w-12 h-12 rounded bg-zinc-800 border border-zinc-700 font-mono font-bold text-sm text-white flex items-center justify-center mb-4">
                UX
              </div>
              <h3 className="font-display font-semibold text-base text-white">{t.team.member3Role}</h3>
              <div className="text-[11px] font-mono text-orange-400 mt-0.5">Industrial CAD & Enclosure</div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{t.team.member3Desc}</p>
            </div>

          </div>

          <div className="mt-10 p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-semibold text-base text-white">{t.team.visionTitle}</h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">{t.team.visionDesc}</p>
            </div>
            <a
              href="#simulator"
              className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>{t.team.exploreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 9. FAQ & NEWSLETTER */}
      <section className="py-20 lg:py-24 border-b border-zinc-800/80 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white tracking-tight">
              {t.faq.title}
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">
              {t.faq.desc}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <h3 className="font-display font-semibold text-white text-sm mb-1">{item.q}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Minimalist Newsletter Form */}
          <div className="mt-12 p-8 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
            <h3 className="font-display font-bold text-xl text-white mb-2">{t.faq.formTitle}</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">{t.faq.formDesc}</p>

            {subscribeSubmitted ? (
              <div className="p-3 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.faq.formSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder={t.faq.formPlaceholder}
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs rounded transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2 font-mono"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.faq.formBtn}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 10. QUIET BESPOKE FOOTER */}
      <footer className="py-10 bg-[#070709] border-t border-zinc-900 text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-zinc-300">AlcoholiCar</span>
            <span className="text-zinc-700">·</span>
            <span>{t.footer.tagline}</span>
          </div>

          <div className="flex items-center gap-5 text-zinc-400 text-xs font-sans">
            <a href="#problem" className="hover:text-white transition-colors">{t.nav.problem}</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#simulator" className="hover:text-white transition-colors">{t.nav.simulator}</a>
            <a href="#team" className="hover:text-white transition-colors">{t.nav.team}</a>
          </div>

          <div className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </footer>

      {/* 3D Car & Cockpit Simulator Modal */}
      {show3dSim && (
        <CarSimulator3D
          initialBac={bacValue}
          lang={lang}
          t={t}
          onClose={() => setShow3dSim(false)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      )}

    </div>
  );
}
