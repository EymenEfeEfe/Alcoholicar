import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  X,
  Camera,
  RotateCcw,
  Wind,
  ShieldCheck,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Volume2,
  VolumeX,
  Gauge,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock
} from 'lucide-react';
import { Translation, Language } from '../locales.ts';

interface CarSimulator3DProps {
  initialBac: number;
  lang: Language;
  t: Translation;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function CarSimulator3D({
  initialBac,
  lang,
  t,
  onClose,
  soundEnabled,
  onToggleSound
}: CarSimulator3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Simulation State
  const [currentBac, setCurrentBac] = useState<number>(initialBac);
  const [speed, setSpeed] = useState<number>(0);
  const [isIgnitionUnlocked, setIsIgnitionUnlocked] = useState<boolean>(initialBac < 0.05);
  const [cameraMode, setCameraMode] = useState<'chase' | 'cockpit'>('chase');
  const [isBlowing, setIsBlowing] = useState<boolean>(false);
  const [blowCountdown, setBlowCountdown] = useState<number>(0);
  const [alarmActive, setAlarmActive] = useState<boolean>(initialBac >= 0.05);
  const [lockoutNotice, setLockoutNotice] = useState<string | null>(
    initialBac >= 0.05 ? t.simulator.sim3dEngineLocked : null
  );

  // Mutable refs for driving physics & 3D loop
  const inputRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false
  });

  const physicsRef = useRef({
    speed: 0,
    maxSpeed: 38, // ~135 km/h
    acceleration: 14,
    braking: 28,
    friction: 6,
    steerAngle: 0,
    maxSteer: 0.55,
    carX: 0,
    carZ: 0,
    carHeading: 0,
    isUnlocked: initialBac < 0.05
  });

  const partsRef = useRef<{
    carGroup?: THREE.Group;
    steeringWheel?: THREE.Mesh;
    frontLeftWheel?: THREE.Group;
    frontRightWheel?: THREE.Group;
    rearLeftWheel?: THREE.Group;
    rearRightWheel?: THREE.Group;
    sensorLedRing?: THREE.Mesh;
    headlightLeft?: THREE.SpotLight;
    headlightRight?: THREE.SpotLight;
    taillightMesh?: THREE.Mesh;
    cockpitScreenMesh?: THREE.Mesh;
    screenContext?: CanvasRenderingContext2D;
    screenTexture?: THREE.CanvasTexture;
  }>({});

  // Audio synthesizer for engine / lockout
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playClick = () => {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtxRef.current.currentTime + 0.04);
    gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.05);
  };

  const playLockoutSound = () => {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtxRef.current) return;
    const now = audioCtxRef.current.currentTime;
    [0, 0.18].forEach((timeOffset) => {
      const osc = audioCtxRef.current!.createOscillator();
      const gain = audioCtxRef.current!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, now + timeOffset);
      osc.frequency.linearRampToValueAtTime(180, now + timeOffset + 0.12);
      gain.gain.setValueAtTime(0.2, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + 0.14);
      osc.connect(gain);
      gain.connect(audioCtxRef.current!.destination);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.15);
    });
  };

  const playEngineRev = () => {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, audioCtxRef.current.currentTime);
    osc.frequency.linearRampToValueAtTime(160, audioCtxRef.current.currentTime + 0.3);
    osc.frequency.exponentialRampToValueAtTime(90, audioCtxRef.current.currentTime + 0.8);
    gain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.85);
  };

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        inputRef.current.forward = true;
        if (!physicsRef.current.isUnlocked) {
          playLockoutSound();
          setLockoutNotice(t.simulator.sim3dEngineLocked);
        }
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) inputRef.current.backward = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
      if (['Space'].includes(e.code)) inputRef.current.brake = true;
      if (['KeyC'].includes(e.code)) {
        setCameraMode((prev) => (prev === 'chase' ? 'cockpit' : 'chase'));
        playClick();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) inputRef.current.forward = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) inputRef.current.backward = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = false;
      if (['Space'].includes(e.code)) inputRef.current.brake = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [t]);

  // Update in-cockpit screen canvas texture
  const updateCockpitScreen = (unlocked: boolean, bac: number, spd: number) => {
    const ctx = partsRef.current.screenContext;
    const tex = partsRef.current.screenTexture;
    if (!ctx || !tex) return;

    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, 256, 128);

    // Screen grid line
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, 248, 120);

    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText('ALCOHOLICAR INTERLOCK MK-1', 12, 24);

    ctx.font = '10px monospace';
    ctx.fillStyle = unlocked ? '#10b981' : '#f97316';
    ctx.fillText(unlocked ? 'STATUS: UNLOCKED' : 'STATUS: RELAY CUT OFF', 12, 44);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`BAC: ${bac.toFixed(3)}%`, 12, 70);

    ctx.fillStyle = '#71717a';
    ctx.font = '10px monospace';
    ctx.fillText(`SPEED: ${Math.round(spd * 3.6)} KM/H`, 12, 92);

    ctx.fillStyle = unlocked ? '#059669' : '#dc2626';
    ctx.fillRect(12, 102, 232, 14);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(unlocked ? 'STARTER RELAY CLOSED · SAFE' : 'STARTER MOTOR IS DISABLED', 16, 112);

    tex.needsUpdate = true;
  };

  // Perform a 3D breathalyzer re-test
  const trigger3dTest = (targetBac: number) => {
    if (isBlowing) return;
    setIsBlowing(true);
    setBlowCountdown(3);
    playClick();

    let count = 3;
    const countTimer = setInterval(() => {
      count -= 1;
      setBlowCountdown(count);
      playClick();
      if (count <= 0) {
        clearInterval(countTimer);
        setIsBlowing(false);
        setCurrentBac(targetBac);

        const safe = targetBac < 0.05;
        setIsIgnitionUnlocked(safe);
        physicsRef.current.isUnlocked = safe;

        if (safe) {
          setAlarmActive(false);
          setLockoutNotice(null);
          playEngineRev();
          if (partsRef.current.sensorLedRing) {
            (partsRef.current.sensorLedRing.material as THREE.MeshStandardMaterial).color.set('#10b981');
            (partsRef.current.sensorLedRing.material as THREE.MeshStandardMaterial).emissive.set('#059669');
          }
        } else {
          setAlarmActive(true);
          setLockoutNotice(t.simulator.sim3dEngineLocked);
          playLockoutSound();
          if (partsRef.current.sensorLedRing) {
            (partsRef.current.sensorLedRing.material as THREE.MeshStandardMaterial).color.set('#f97316');
            (partsRef.current.sensorLedRing.material as THREE.MeshStandardMaterial).emissive.set('#ea580c');
          }
        }
      }
    }, 700);
  };

  // Setup Three.js Scene, Camera, Procedural Car & World
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090e');
    scene.fog = new THREE.FogExp2('#07090e', 0.015);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Mandatory PMREM Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      600
    );

    // Lighting: Key, Fill, Hemisphere
    const hemiLight = new THREE.HemisphereLight('#60a5fa', '#18181b', 0.45);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#fff7ed', 1.2);
    dirLight.position.set(30, 45, 20);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 5;
      dirLight.shadow.camera.far = 120;
      dirLight.shadow.camera.left = -30;
      dirLight.shadow.camera.right = 30;
      dirLight.shadow.camera.top = 30;
      dirLight.shadow.camera.bottom = -30;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    // --- PROCEDURAL TRACK & ENVIRONMENT ---
    // Ground plane (Asphalt)
    const groundGeo = new THREE.PlaneGeometry(800, 800);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#0e1117',
      roughness: 0.85,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Main Test Runway Track (Straight highway loop with curbs)
    const roadLength = 700;
    const roadWidth = 16;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength);
    const roadMat = new THREE.MeshStandardMaterial({
      color: '#12141a',
      roughness: 0.65,
      metalness: 0.2
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.02; // Offset to prevent Z-fighting
    road.receiveShadow = true;
    scene.add(road);

    // Dashed center line markings
    const dashGroup = new THREE.Group();
    const roadStripeGeo = new THREE.PlaneGeometry(0.3, 5);
    const roadStripeMat = new THREE.MeshBasicMaterial({ color: '#f59e0b' });
    for (let z = -roadLength / 2; z < roadLength / 2; z += 10) {
      const dash = new THREE.Mesh(roadStripeGeo, roadStripeMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.03, z);
      dashGroup.add(dash);
    }
    scene.add(dashGroup);

    // Outer white lane borders
    const borderGeo = new THREE.PlaneGeometry(0.25, roadLength);
    const borderMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const leftBorder = new THREE.Mesh(borderGeo, borderMat);
    leftBorder.rotation.x = -Math.PI / 2;
    leftBorder.position.set(-roadWidth / 2 + 0.8, 0.03, 0);
    scene.add(leftBorder);

    const rightBorder = new THREE.Mesh(borderGeo, borderMat);
    rightBorder.rotation.x = -Math.PI / 2;
    rightBorder.position.set(roadWidth / 2 - 0.8, 0.03, 0);
    scene.add(rightBorder);

    // Street Lamps alongside track
    const lampGeo = new THREE.CylinderGeometry(0.08, 0.12, 8, 8);
    const lampMat = new THREE.MeshStandardMaterial({ color: '#27272a', metalness: 0.8, roughness: 0.3 });
    const lampArmGeo = new THREE.BoxGeometry(2.5, 0.1, 0.1);
    const lampHeadGeo = new THREE.BoxGeometry(0.8, 0.15, 0.4);
    const lampHeadMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });

    for (let z = -roadLength / 2 + 20; z < roadLength / 2; z += 40) {
      [-roadWidth / 2 - 2, roadWidth / 2 + 2].forEach((xSide) => {
        const lamp = new THREE.Group();
        const pole = new THREE.Mesh(lampGeo, lampMat);
        pole.position.y = 4;
        lamp.add(pole);

        const arm = new THREE.Mesh(lampArmGeo, lampMat);
        arm.position.set(xSide < 0 ? 1 : -1, 7.8, 0);
        lamp.add(arm);

        const lightHead = new THREE.Mesh(lampHeadGeo, lampHeadMat);
        lightHead.position.set(xSide < 0 ? 2 : -2, 7.7, 0);
        lamp.add(lightHead);

        lamp.position.set(xSide, 0, z);
        scene.add(lamp);
      });
    }

    // Distant architecture / silhouettes
    const buildingMat = new THREE.MeshStandardMaterial({ color: '#090b10', roughness: 0.9 });
    for (let i = 0; i < 40; i++) {
      const h = 20 + Math.random() * 45;
      const w = 15 + Math.random() * 25;
      const bGeo = new THREE.BoxGeometry(w, h, w);
      const bMesh = new THREE.Mesh(bGeo, buildingMat);
      const side = (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 80);
      const zPos = -300 + Math.random() * 600;
      bMesh.position.set(side, h / 2, zPos);
      scene.add(bMesh);
    }

    // --- PROCEDURAL 10-PART COMPOSITE SPORTS CAR ---
    const car = new THREE.Group();

    // 1. Lower Main Chassis
    const bodyGeo = new THREE.BoxGeometry(2.0, 0.55, 4.4);
    const carPaintMat = new THREE.MeshStandardMaterial({
      color: '#18181b', // Obsidian sports finish
      metalness: 0.85,
      roughness: 0.2
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, carPaintMat);
    bodyMesh.position.y = 0.55;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    car.add(bodyMesh);

    // Front aerodynamic splitter
    const splitterGeo = new THREE.BoxGeometry(2.05, 0.1, 0.8);
    const splitterMat = new THREE.MeshStandardMaterial({ color: '#09090b', metalness: 0.5, roughness: 0.5 });
    const splitter = new THREE.Mesh(splitterGeo, splitterMat);
    splitter.position.set(0, 0.32, -2.1);
    splitter.castShadow = true;
    car.add(splitter);

    // 2. Greenhouse / Cockpit Cabin
    const cabinGeo = new THREE.BoxGeometry(1.65, 0.55, 2.2);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: '#09090b',
      metalness: 0.8,
      roughness: 0.15
    });
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0, 1.05, 0.1);
    cabinMesh.castShadow = true;
    car.add(cabinMesh);

    // Windshield (Front glass)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#1e293b',
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.75
    });
    const windshieldGeo = new THREE.BoxGeometry(1.58, 0.5, 0.05);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 1.05, -0.98);
    windshield.rotation.x = -0.35;
    car.add(windshield);

    // 3. In-Cabin Dashboard & Steering Wheel
    const dashGeo = new THREE.BoxGeometry(1.5, 0.25, 0.45);
    const dashMat = new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.8 });
    const dashMesh = new THREE.Mesh(dashGeo, dashMat);
    dashMesh.position.set(0, 0.92, -0.65);
    car.add(dashMesh);

    // Steering wheel (Torus)
    const wheelTorusGeo = new THREE.TorusGeometry(0.18, 0.025, 12, 24);
    const wheelTorusMat = new THREE.MeshStandardMaterial({ color: '#27272a', roughness: 0.4 });
    const steeringWheel = new THREE.Mesh(wheelTorusGeo, wheelTorusMat);
    steeringWheel.position.set(-0.35, 0.98, -0.4);
    steeringWheel.rotation.x = 0.35;
    car.add(steeringWheel);
    partsRef.current.steeringWheel = steeringWheel;

    // 4. Center Console Screen (AlcoholiCar UI)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 256;
    screenCanvas.height = 128;
    const screenCtx = screenCanvas.getContext('2d')!;
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    partsRef.current.screenContext = screenCtx;
    partsRef.current.screenTexture = screenTex;

    const screenGeo = new THREE.PlaneGeometry(0.38, 0.2);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.96, -0.48);
    screenMesh.rotation.x = -0.2;
    car.add(screenMesh);
    partsRef.current.cockpitScreenMesh = screenMesh;

    // 5. AlcoholiCar Hardware Interlock Device Mounted on Dash
    const alcDeviceGeo = new THREE.BoxGeometry(0.16, 0.1, 0.06);
    const alcDeviceMat = new THREE.MeshStandardMaterial({ color: '#09090b', roughness: 0.5, metalness: 0.5 });
    const alcDevice = new THREE.Mesh(alcDeviceGeo, alcDeviceMat);
    alcDevice.position.set(0.24, 0.95, -0.47);
    alcDevice.rotation.x = -0.15;
    car.add(alcDevice);

    // LED Status Halo Ring on AlcoholiCar Device
    const ledRingGeo = new THREE.TorusGeometry(0.025, 0.007, 8, 16);
    const ledRingMat = new THREE.MeshStandardMaterial({
      color: initialBac < 0.05 ? '#10b981' : '#f97316',
      emissive: initialBac < 0.05 ? '#059669' : '#ea580c',
      emissiveIntensity: 1.5
    });
    const ledRing = new THREE.Mesh(ledRingGeo, ledRingMat);
    ledRing.position.set(0.24, 0.95, -0.43);
    ledRing.rotation.x = -0.15;
    car.add(ledRing);
    partsRef.current.sensorLedRing = ledRing;

    // 6. Wheels (Front & Rear with Rims and Brake Calipers)
    const createWheel = () => {
      const wGroup = new THREE.Group();
      // Rubber tire
      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 20);
      const tireMat = new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.9 });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wGroup.add(tire);

      // Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 12);
      const rimMat = new THREE.MeshStandardMaterial({ color: '#a1a1aa', metalness: 0.9, roughness: 0.2 });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wGroup.add(rim);

      // Brake caliper
      const calGeo = new THREE.BoxGeometry(0.08, 0.16, 0.14);
      const calMat = new THREE.MeshStandardMaterial({ color: '#ea580c', metalness: 0.5, roughness: 0.3 });
      const caliper = new THREE.Mesh(calGeo, calMat);
      caliper.position.set(0, 0.12, 0);
      wGroup.add(caliper);

      return wGroup;
    };

    const flWheel = createWheel();
    flWheel.position.set(-1.08, 0.36, -1.35);
    car.add(flWheel);
    partsRef.current.frontLeftWheel = flWheel;

    const frWheel = createWheel();
    frWheel.position.set(1.08, 0.36, -1.35);
    car.add(frWheel);
    partsRef.current.frontRightWheel = frWheel;

    const rlWheel = createWheel();
    rlWheel.position.set(-1.08, 0.36, 1.35);
    car.add(rlWheel);
    partsRef.current.rearLeftWheel = rlWheel;

    const rrWheel = createWheel();
    rrWheel.position.set(1.08, 0.36, 1.35);
    car.add(rrWheel);
    partsRef.current.rearRightWheel = rrWheel;

    // 7. Headlights (Mesh + Real Spotlights)
    const headlightMat = new THREE.MeshBasicMaterial({ color: '#fef08a' });
    const hlGeo = new THREE.BoxGeometry(0.35, 0.12, 0.1);

    const leftHl = new THREE.Mesh(hlGeo, headlightMat);
    leftHl.position.set(-0.75, 0.55, -2.18);
    car.add(leftHl);

    const rightHl = new THREE.Mesh(hlGeo, headlightMat);
    rightHl.position.set(0.75, 0.55, -2.18);
    car.add(rightHl);

    // Dynamic front spotlights
    const spotLeft = new THREE.SpotLight('#fef08a', 2.5, 60, Math.PI / 7, 0.4);
    spotLeft.position.set(-0.75, 0.6, -2.2);
    spotLeft.target.position.set(-0.75, 0, -20);
    car.add(spotLeft);
    car.add(spotLeft.target);
    partsRef.current.headlightLeft = spotLeft;

    const spotRight = new THREE.SpotLight('#fef08a', 2.5, 60, Math.PI / 7, 0.4);
    spotRight.position.set(0.75, 0.6, -2.2);
    spotRight.target.position.set(0.75, 0, -20);
    car.add(spotRight);
    car.add(spotRight.target);
    partsRef.current.headlightRight = spotRight;

    // 8. Taillights (Red LED Strip)
    const tailMat = new THREE.MeshBasicMaterial({ color: '#ef4444' });
    const tailGeo = new THREE.BoxGeometry(1.85, 0.08, 0.05);
    const tailMesh = new THREE.Mesh(tailGeo, tailMat);
    tailMesh.position.set(0, 0.65, 2.2);
    car.add(tailMesh);
    partsRef.current.taillightMesh = tailMesh;

    // 9. Contact Shadow Plane Grounding
    const contactShadowGeo = new THREE.PlaneGeometry(2.4, 4.8);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0.55
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.03;
    car.add(contactShadow);

    scene.add(car);
    partsRef.current.carGroup = car;

    // Initial render of screen
    updateCockpitScreen(initialBac < 0.05, initialBac, 0);

    // Animation Loop with Clock
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      const p = physicsRef.current;
      const inp = inputRef.current;

      // DRIVING PHYSICS
      // Can only accelerate if ignition is unlocked!
      if (p.isUnlocked) {
        if (inp.forward) {
          p.speed = Math.min(p.speed + p.acceleration * delta, p.maxSpeed);
        } else if (inp.backward) {
          p.speed = Math.max(p.speed - p.braking * 0.5 * delta, -p.maxSpeed * 0.3);
        } else {
          // Friction decay
          if (p.speed > 0) {
            p.speed = Math.max(0, p.speed - p.friction * delta);
          } else if (p.speed < 0) {
            p.speed = Math.min(0, p.speed + p.friction * delta);
          }
        }

        if (inp.brake) {
          if (p.speed > 0) p.speed = Math.max(0, p.speed - p.braking * delta);
          else if (p.speed < 0) p.speed = Math.min(0, p.speed + p.braking * delta);
        }
      } else {
        // Locked: friction brings speed to dead zero quickly
        if (p.speed > 0) p.speed = Math.max(0, p.speed - p.braking * delta);
      }

      // Steering
      const targetSteer = inp.left ? p.maxSteer : inp.right ? -p.maxSteer : 0;
      p.steerAngle = THREE.MathUtils.damp(p.steerAngle, targetSteer, 8, delta);

      // Update heading & position
      if (Math.abs(p.speed) > 0.1) {
        const turnMult = p.speed > 0 ? 1 : -1;
        p.carHeading += (p.steerAngle * (p.speed / p.maxSpeed) * 1.5 * delta) * turnMult;
      }

      p.carX -= Math.sin(p.carHeading) * p.speed * delta;
      p.carZ -= Math.cos(p.carHeading) * p.speed * delta;

      // Wrap around track boundaries so user never falls off
      if (p.carZ < -roadLength / 2) p.carZ = roadLength / 2;
      if (p.carZ > roadLength / 2) p.carZ = -roadLength / 2;
      p.carX = Math.max(-roadWidth / 2 + 1.2, Math.min(roadWidth / 2 - 1.2, p.carX));

      // Apply to 3D car mesh
      if (car) {
        car.position.set(p.carX, 0, p.carZ);
        car.rotation.y = p.carHeading;

        // Front wheels steering angle
        if (partsRef.current.frontLeftWheel && partsRef.current.frontRightWheel) {
          partsRef.current.frontLeftWheel.rotation.y = p.steerAngle;
          partsRef.current.frontRightWheel.rotation.y = p.steerAngle;
        }

        // Wheel rolling rotation proportional to speed
        const wheelRollDelta = (p.speed / 0.36) * delta;
        if (partsRef.current.frontLeftWheel) partsRef.current.frontLeftWheel.children[0].rotation.x += wheelRollDelta;
        if (partsRef.current.frontRightWheel) partsRef.current.frontRightWheel.children[0].rotation.x += wheelRollDelta;
        if (partsRef.current.rearLeftWheel) partsRef.current.rearLeftWheel.children[0].rotation.x += wheelRollDelta;
        if (partsRef.current.rearRightWheel) partsRef.current.rearRightWheel.children[0].rotation.x += wheelRollDelta;

        // Steering wheel interior rotation
        if (partsRef.current.steeringWheel) {
          partsRef.current.steeringWheel.rotation.z = -p.steerAngle * 2.5;
        }

        // Taillight brake flare
        if (partsRef.current.taillightMesh) {
          (partsRef.current.taillightMesh.material as THREE.MeshBasicMaterial).color.set(
            inp.brake ? '#ff2222' : '#7f1d1d'
          );
        }
      }

      // Camera positioning (Chase vs Cockpit)
      if (cameraMode === 'chase') {
        const idealOffset = new THREE.Vector3(
          Math.sin(p.carHeading) * 7.5,
          3.2,
          Math.cos(p.carHeading) * 7.5
        );
        camera.position.lerp(
          new THREE.Vector3(p.carX + idealOffset.x, idealOffset.y, p.carZ + idealOffset.z),
          0.1
        );
        camera.lookAt(p.carX, 1.2, p.carZ);
      } else {
        // Cockpit Camera: Inside cabin looking forward over dashboard
        const cockpitPos = new THREE.Vector3(
          p.carX - Math.sin(p.carHeading) * 0.35 - Math.cos(p.carHeading) * 0.35,
          1.15,
          p.carZ - Math.cos(p.carHeading) * 0.35 + Math.sin(p.carHeading) * 0.35
        );
        camera.position.copy(cockpitPos);

        const lookTarget = new THREE.Vector3(
          p.carX - Math.sin(p.carHeading) * 15,
          1.0,
          p.carZ - Math.cos(p.carHeading) * 15
        );
        camera.lookAt(lookTarget);
      }

      // Update cockpit screen every few frames
      if (Math.random() < 0.2) {
        updateCockpitScreen(p.isUnlocked, currentBac, p.speed);
      }

      setSpeed(p.speed);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
    };
  }, [cameraMode]);

  const resetCarPosition = () => {
    physicsRef.current.carX = 0;
    physicsRef.current.carZ = 0;
    physicsRef.current.carHeading = 0;
    physicsRef.current.speed = 0;
    playClick();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col font-mono text-zinc-100 animate-fadeIn">
      
      {/* 3D Top Header Bar */}
      <div className="h-14 border-b border-zinc-800 bg-zinc-950/90 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-orange-400 font-bold text-xs">
            3D
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>{t.simulator.sim3dModalTitle}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                isIgnitionUnlocked ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-orange-950 text-orange-300 border border-orange-800'
              }`}>
                {isIgnitionUnlocked ? 'UNLOCKED · IGNITION ARMED' : 'LOCKED · RELAY CUT OFF'}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 hidden sm:block">
              {t.simulator.sim3dModalSubtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs"
            title={soundEnabled ? "Audio On" : "Audio Muted"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Camera Switcher Button */}
          <button
            type="button"
            onClick={() => {
              setCameraMode((prev) => (prev === 'chase' ? 'cockpit' : 'chase'));
              playClick();
            }}
            className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-orange-400" />
            <span>{cameraMode === 'chase' ? t.simulator.sim3dCockpit : t.simulator.sim3dChase}</span>
          </button>

          {/* Close / Exit 3D View */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            title={t.simulator.sim3dClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* In-Cockpit / On-HUD Diagnostic Overlay */}
        <div className="absolute top-4 left-4 p-3.5 rounded bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-xs font-mono space-y-2 pointer-events-none max-w-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-zinc-400">
            <span>TELEMETRY BUS</span>
            <span className={isIgnitionUnlocked ? 'text-emerald-400' : 'text-orange-500'}>
              {isIgnitionUnlocked ? '12V SOLENOID: ENGAGED' : '12V SOLENOID: CUT'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-zinc-400">{t.simulator.sim3dSpeed}:</span>
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {Math.round(speed * 3.6)} <span className="text-xs font-normal text-zinc-500">km/h</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            <span>MEASURED BAC:</span>
            <span className={`font-bold tabular-nums ${currentBac >= 0.05 ? 'text-orange-400' : 'text-emerald-400'}`}>
              {currentBac.toFixed(3)}%
            </span>
          </div>

          <div className="text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-1">
            {t.simulator.sim3dControlsHint}
          </div>
        </div>

        {/* Lockout Warning Banner when driver attempts to start while impaired */}
        {!isIgnitionUnlocked && (
          <div className="absolute top-4 right-4 max-w-sm p-4 rounded bg-zinc-950/95 border border-orange-500/80 text-xs font-mono shadow-2xl space-y-2 animate-bounce">
            <div className="flex items-center gap-2 text-orange-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.simulator.sim3dEngineLocked}</span>
            </div>
            <p className="text-zinc-300 font-sans text-xs leading-relaxed">
              AlcoholiCar starter motor relay is OPEN. The gas pedal is unresponsive. You cannot drive this vehicle.
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
              <span>SMS Alert: Dispatched</span>
              <span className="text-orange-400 font-bold">FAIL: {currentBac.toFixed(3)}%</span>
            </div>
          </div>
        )}

        {/* Blowing Animation Modal / Overlay during breath re-test */}
        {isBlowing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center pointer-events-none">
            <div className="p-6 rounded-xl bg-zinc-950 border border-orange-500/80 text-center space-y-3 shadow-2xl max-w-xs">
              <Wind className="w-8 h-8 text-orange-400 mx-auto animate-spin" />
              <div className="text-white font-bold text-sm">SAMPLING BREATH ALVEOLAR FLOW...</div>
              <div className="text-3xl font-extrabold text-orange-400 tabular-nums">{blowCountdown}s</div>
              <div className="text-xs text-zinc-400">Exhale into the dashboard sensor nozzle</div>
            </div>
          </div>
        )}

        {/* On-Screen Mobile Touch Controls (Bottom Left & Right) */}
        <div className="absolute bottom-20 left-4 flex gap-2 sm:hidden">
          <button
            onPointerDown={() => { inputRef.current.left = true; }}
            onPointerUp={() => { inputRef.current.left = false; }}
            className="w-12 h-12 rounded bg-zinc-900/90 border border-zinc-700 active:bg-zinc-700 text-white flex items-center justify-center font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onPointerDown={() => { inputRef.current.right = true; }}
            onPointerUp={() => { inputRef.current.right = false; }}
            className="w-12 h-12 rounded bg-zinc-900/90 border border-zinc-700 active:bg-zinc-700 text-white flex items-center justify-center font-bold"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-20 right-4 flex gap-2 sm:hidden">
          <button
            onPointerDown={() => {
              inputRef.current.forward = true;
              if (!physicsRef.current.isUnlocked) playLockoutSound();
            }}
            onPointerUp={() => { inputRef.current.forward = false; }}
            className="w-14 h-14 rounded bg-orange-600/90 active:bg-orange-500 text-white flex flex-col items-center justify-center font-bold text-[10px]"
          >
            <ArrowUp className="w-5 h-5" />
            <span>GAS</span>
          </button>
          <button
            onPointerDown={() => { inputRef.current.brake = true; }}
            onPointerUp={() => { inputRef.current.brake = false; }}
            className="w-14 h-14 rounded bg-zinc-800/90 active:bg-zinc-700 text-white flex flex-col items-center justify-center font-bold text-[10px]"
          >
            <ArrowDown className="w-5 h-5" />
            <span>BRAKE</span>
          </button>
        </div>

        {/* Collapsible Bottom Control Dock */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex items-center justify-between gap-3 p-2.5 rounded bg-zinc-950/95 border border-zinc-800 text-xs shadow-2xl">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 text-[11px] font-mono mr-1">TEST BAC:</span>
            <button
              type="button"
              onClick={() => trigger3dTest(0.00)}
              disabled={isBlowing}
              className={`px-2.5 py-1.5 rounded border transition-colors ${
                currentBac === 0.00
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              0.00% (Sober)
            </button>

            <button
              type="button"
              onClick={() => trigger3dTest(0.04)}
              disabled={isBlowing}
              className={`px-2.5 py-1.5 rounded border transition-colors ${
                currentBac === 0.04
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              0.04% (Border)
            </button>

            <button
              type="button"
              onClick={() => trigger3dTest(0.08)}
              disabled={isBlowing}
              className={`px-2.5 py-1.5 rounded border transition-colors ${
                currentBac >= 0.05
                  ? 'bg-orange-950 text-orange-300 border-orange-700 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              0.08% (Locked)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetCarPosition}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white"
              title={t.simulator.sim3dRestartEngine}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors whitespace-nowrap"
            >
              {t.simulator.sim3dClose}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
