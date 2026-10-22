export type Language = 'tr' | 'en' | 'de';

export interface Translation {
  nav: {
    problem: string;
    howItWorks: string;
    features: string;
    simulator: string;
    hardware: string;
    team: string;
    trySimulator: string;
  };
  hero: {
    badgeStatus: string;
    badgeBuild: string;
    badgeBench: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    trySimBtn: string;
    seeHowBtn: string;
    soundOn: string;
    soundOff: string;
    metricResponse: string;
    metricResponseLabel: string;
    metricRelay: string;
    metricRelayLabel: string;
    metricLimit: string;
    metricLimitLabel: string;
    telemetryArmed: string;
    telemetrySolenoid: string;
    telemetryRelayTitle: string;
    telemetryRelayDesc: string;
    telemetryReady: string;
    telemetryChip: string;
  };
  problem: {
    badge: string;
    title: string;
    desc: string;
    card1Title: string;
    card1Desc: string;
    card1Fact: string;
    card2Title: string;
    card2Desc: string;
    card2Fact: string;
    card3Title: string;
    card3Desc: string;
    card3Fact: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    desc: string;
    step1Title: string;
    step1Desc: string;
    step1Tag: string;
    step2Title: string;
    step2Desc: string;
    step2Tag: string;
    step3Title: string;
    step3Desc: string;
    step3Tag: string;
  };
  simulator: {
    badge: string;
    title: string;
    desc: string;
    selectScenario: string;
    thresholdNotice: string;
    presets: {
      sober: { label: string; desc: string };
      cider: { label: string; desc: string };
      border: { label: string; desc: string };
      impaired: { label: string; desc: string };
      party: { label: string; desc: string };
    };
    customBac: string;
    soberLabel: string;
    limitLabel: string;
    dangerousLabel: string;
    breatheBtn: string;
    analyzingBtn: string;
    resetTitle: string;
    relayBus: string;
    engineStarter: string;
    starterReady: string;
    starterEngaged: string;
    starterLocked: string;
    analyzingText: string;
    currentBac: string;
    safeLimitText: string;
    sampleIntake: string;
    fuelCellMeasurement: string;
    statusIdleTitle: string;
    statusIdleDesc: string;
    statusTestingTitle: string;
    statusTestingDesc: string;
    statusPassedTitle: string;
    statusPassedDesc: string;
    statusPassedBadge: string;
    statusLockedTitle: string;
    statusLockedDesc: string;
    statusLockedBadge: string;
    pushToStartTitle: string;
    pushToStartWire: string;
    engineText: string;
    startText: string;
    stopText: string;
    sosHeader: string;
    sosRecipient: string;
    sosDelivered: string;
    sosMessage: string;
    gpsText: string;
    batteryText: string;
    calcTitle: string;
    calcEst: string;
    drinksLabel: string;
    hoursLabel: string;
    weightLabel: string;
    applyBtn: string;
    experience3dBtn: string;
    sim3dModalTitle: string;
    sim3dModalSubtitle: string;
    sim3dControlsHint: string;
    sim3dCockpit: string;
    sim3dChase: string;
    sim3dTestBlow: string;
    sim3dRestartEngine: string;
    sim3dSpeed: string;
    sim3dEngineUnlocked: string;
    sim3dEngineLocked: string;
    sim3dClose: string;
  };
  features: {
    badge: string;
    title: string;
    desc: string;
    feat1Title: string;
    feat1Desc: string;
    feat1Tag: string;
    feat2Title: string;
    feat2Desc: string;
    feat2Tag: string;
    feat3Title: string;
    feat3Desc: string;
    feat3Tag: string;
    feat4Title: string;
    feat4Desc: string;
    feat4Tag: string;
    feat5Title: string;
    feat5Desc: string;
    feat5Tag: string;
    feat6Title: string;
    feat6Desc: string;
    feat6Tag: string;
  };
  hardware: {
    badge: string;
    title: string;
    desc: string;
    modelBadge: string;
    housingBadge: string;
    imageCaption: string;
    tabSensor: string;
    tabRelay: string;
    tabComms: string;
    tabBypass: string;
    sensorComp: string;
    sensorDrift: string;
    sensorDesc: string;
    sensorSpecs: string[];
    relayComp: string;
    relayCurrent: string;
    relayDesc: string;
    relaySpecs: string[];
    commsComp: string;
    commsBands: string;
    commsDesc: string;
    commsSpecs: string[];
    bypassComp: string;
    bypassVerif: string;
    bypassDesc: string;
    bypassSpecs: string[];
  };
  team: {
    badge: string;
    title: string;
    desc: string;
    member1Role: string;
    member1Desc: string;
    member2Role: string;
    member2Desc: string;
    member3Role: string;
    member3Desc: string;
    visionTitle: string;
    visionDesc: string;
    exploreBtn: string;
  };
  faq: {
    title: string;
    desc: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    formTitle: string;
    formDesc: string;
    formPlaceholder: string;
    formBtn: string;
    formSuccess: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translation> = {
  tr: {
    nav: {
      problem: "Sorun",
      howItWorks: "Nasıl Çalışır",
      features: "Özellikler",
      simulator: "Canlı Simülatör",
      hardware: "Donanım Laboratuvarı",
      team: "Öğrenci Ekibi",
      trySimulator: "Simülatörü Dene"
    },
    hero: {
      badgeStatus: "Öğrenci Prototip Projesi",
      badgeBuild: "Aktif Donanım Geliştirme",
      badgeBench: "v1.2 Test Edildi",
      titleLine1: "Sürmeden Önce Üfle.",
      titleLine2: "Sadece Güvenli Sürüşler.",
      subtitle: "Bahanelere yer bırakmayan akıllı bir kontak kilitleme cihazı üreten genç öğrenci mühendisleriz. Motoru çalıştırmadan önce 2 saniyelik nefes testi yapılır. Güvenli limitin üzerindeysen marş rölesi kilitlenir ve eve tek parça dönebilmen için yakınlarına anında acil durum uyarısı iletilir.",
      trySimBtn: "Canlı Simülatörü Dene",
      seeHowBtn: "Nasıl Çalışır?",
      soundOn: "Ses: Açık",
      soundOff: "Ses: Kapalı",
      metricResponse: "< 2.8sn",
      metricResponseLabel: "Sensör Tepki Süresi",
      metricRelay: "%100",
      metricRelayLabel: "Fiziksel Röle Kesme",
      metricLimit: "%0.05",
      metricLimitLabel: "Kilit Eşik Promili",
      telemetryArmed: "SİSTEM DURUMU: AKTİF",
      telemetrySolenoid: "12V Selenoid Devrede",
      telemetryRelayTitle: "Marş Motoru Kilitleme",
      telemetryRelayDesc: "Çift katı hal 40A kesme rölesi",
      telemetryReady: "Hazır",
      telemetryChip: "ESP32-S3 Uç İşlemci"
    },
    problem: {
      badge: "Acı Gerçekler",
      title: "Alkolün Beynine 'İyiyim' Dedirtmesi Bir Fikir Değil. Biyolojidir.",
      desc: "Her yıl yüz binlerce önlenebilir kaza, birilerinin 'Kanka ben gayet iyiyim, arabayı sürerim' demesi yüzünden gerçekleşiyor. Kandaki alkol arttığında, beynin risk ölçen merkezi ilk önce devreden çıkar. Gece 02:00'de iradeye güvenemezsin; senin yerine 'Hayır' diyebilen bir donanıma ihtiyacın var.",
      card1Title: "'Bana Bir Şey Olmaz' Yanılgısı",
      card1Desc: "Alkol, kas kontrolü kaybolmadan önce oto-kontrol mekanizmasını felç eder. Sürücüler, frene 10 metre geç basana kadar her şeyi kontrol edebildiklerini sanırlar.",
      card1Fact: "Gerçek: 0.05% promilde kaza riski tam 4 kat artar",
      card2Title: "Kontak Anahtarı Çıkmazı",
      card2Desc: "Alkol almış bir sürücü anahtarı çevirip marşa bastığı anda araba artık yoldadır. Uygulamalar veya nutuklar otoyolda müdahale edemez. Çözüm, marş motoru dönmeden önce gerçekleşmelidir.",
      card2Fact: "Çözüm: Marş akımını doğrudan donanımdan kesmek",
      card3Title: "Kimse Yolda Kalmaz",
      card3Desc: "Arabanın marşını kesmek tek başına yetmez; gecenin bir yarısı yolda kalan sarhoş insanlar daha tehlikeli kararlar alabilir. AlcoholiCar güvendiğin arkadaşlarına canlı konumla acil SMS gönderir.",
      card3Fact: "Özellik: Canlı GPS harita konumuyla otomatik SMS"
    },
    howItWorks: {
      badge: "3 Saniyelik Güvenlik Protokolü",
      title: "AlcoholiCar 3 Basit Adımda Nasıl Çalışır?",
      desc: "Karmaşık şifreler yok, yavaş mobil uygulama girişleri yok. Sadece üfle, doğrula ve güvenle sür.",
      step1Title: "Akıllı Sensöre Üfle",
      step1Desc: "Sürücü koltuğuna otur ve AlcoholiCar sensör ağızlığına 2 saniye boyunca üfle. Çift hazneli hava sensörü vücut ısısını ve akciğer derin hava akışını doğrular.",
      step1Tag: "Termal & hava akış hacmi doğrulaması",
      step2Title: "Anlık Uç Promil Analizi",
      step2Desc: "Yüksek hassasiyetli elektrokimyasal yakıt hücresi sensörü etanol molekül yoğunluğunu okur. Yerleşik mikrodenetleyici promilini ±0.005% hassasiyetle 3 saniyede hesaplar.",
      step2Tag: "Sıfır bulut gecikmesiyle yerel hesaplama",
      step3Title: "Yeşil = Sür / Kırmızı = Kilit + SOS",
      step3Desc: "Yeşil Işık: Röle marş devresini bağlar ve araba anında çalışır. Kırmızı Işık: Kontak kilitlenir, acil durum flaşörü yanar ve yakınlarına konumlu SMS fırlatılır.",
      step3Tag: "Yakınlara anlık taksi/kurtarma çağrısı linki"
    },
    simulator: {
      badge: "İnteraktif Donanım Test Masası",
      title: "AlcoholiCar'ı Canlı Olarak Test Et",
      desc: "Aşağıdan bir senaryo seç veya kendi promil değerini gir, ardından 'Üfle & Kontağı Test Et' butonuna basarak kontak tepkisini anında deneyimle.",
      selectScenario: "1. Test Senaryosu Seç",
      thresholdNotice: "Eşik: %0.05 BAC",
      presets: {
        sober: { label: "Sıfır Alkol", desc: "Bir bardak su, %100 berrak zihin ve tam ayık hal" },
        cider: { label: "1 Hafif İçecek", desc: "Tek bir hafif bira veya yarım kadeh şarap" },
        border: { label: "Yasal Eşik Sınırı", desc: "Reflekslerin zayıfladığı tehlikeli gri sınır bölgesi" },
        impaired: { label: "Sınırın Üstünde", desc: "Yasal sınır aşıldı; tepki süresi yarı yarıya gecikir" },
        party: { label: "Ağır Gece / Felekten", desc: "Ciddi motor koordinasyon kaybı ve tünel görüşü" }
      },
      customBac: "Özel Promil Değeri",
      soberLabel: "%0.00 (Ayık)",
      limitLabel: "%0.05 (Yasal Sınır)",
      dangerousLabel: "%0.20+ (Tehlikeli)",
      breatheBtn: "Üfle & Kontağı Test Et",
      analyzingBtn: "Üfleniyor & Ölçülüyor...",
      resetTitle: "Paneli Sıfırla",
      relayBus: "Araç Kontak Röle Veriyolu #01",
      engineStarter: "Motor Marş Durumu",
      starterReady: "HAZIR",
      starterEngaged: "DEVREDE",
      starterLocked: "KİLİTLİ",
      analyzingText: "Analiz Ediliyor",
      currentBac: "Ölçülen Promil",
      safeLimitText: "Güvenli Sınır: %0.050",
      sampleIntake: "Yakıt hücresi elektrokimyasal ölçümü",
      fuelCellMeasurement: "Yakıt hücresi alkol ölçümü aktif",
      statusIdleTitle: "NEFES ÖRNEĞİ BEKLENİYOR",
      statusIdleDesc: "AlcoholiCar sensör haznesine nefes üflenmesini simüle etmek için 'Üfle & Kontağı Test Et' butonuna bas.",
      statusTestingTitle: "ALVEOLLER HAVA AKIŞI ÖLÇÜLÜYOR",
      statusTestingDesc: "Nefes sıcaklık kontrolü: TAMAM (34.2°C). Çift akış sensörü derin akciğer nefesini doğruladı.",
      statusPassedTitle: "KONTAK AÇIK · SÜRÜŞE UYGUN",
      statusPassedDesc: "Promil seviyesi temiz (%{bac}). 12V marş motoru rölesi akımı iletti. Motor pürüzsüzce çalıştı.",
      statusPassedBadge: "Kilit devresi kapalı · Güvenli yolculuklar dileriz",
      statusLockedTitle: "KONTAK KİLİTLİ · MARŞ DEVRE DIŞI",
      statusLockedDesc: "Promil (%{bac}) güvenli sınırı (%0.050) aştı. Fiziksel marş rölesi kesildi. Motor KESİNLİKLE çalıştırılamaz.",
      statusLockedBadge: "Acil durum SOS bildirimi kayıtlı kişilere gönderildi",
      pushToStartTitle: "Start-Stop Marş Düğmesi",
      pushToStartWire: "Doğrudan CAN/Röle Hattı",
      engineText: "MOTOR",
      startText: "START",
      stopText: "STOP",
      sosHeader: "HÜCRESEL LTE ÜZERİNDEN CANLI SOS GÖNDERİLDİ",
      sosRecipient: "SMS Alıcısı: Anne & Baba (+90 532 100 2030)",
      sosDelivered: "İletildi",
      sosMessage: "🚨 AlcoholiCar Uyarısı: Alex aracı %{bac} promil ile çalıştırmayı denedi. Kontak kilitlendi. Alex şu an Beşiktaş Barbaros Bulvarı No:42 civarında. Canlı konum veya taksi çağırmak için tıklayın.",
      gpsText: "GPS: 41.0422° N, 29.0067° E",
      batteryText: "Akü voltajı: 12.6V",
      calcTitle: "Alkol Vücutta Ne Kadar Hızlı Birikir? (Widmark Eğrisi)",
      calcEst: "Tahmini: %{bac} BAC",
      drinksLabel: "Standart İçecek Sayısı",
      hoursLabel: "Geçen Süre (Saat)",
      weightLabel: "Vücut Ağırlığı",
      applyBtn: "Promili Uygula",
      experience3dBtn: "3D Deneyimle",
      sim3dModalTitle: "AlcoholiCar 3D Araç & Kokpit Simülasyonu",
      sim3dModalSubtitle: "Gerçek zamanlı 3D sürüş, araç içi akıllı sensör ve kontak kilitleme tepkisi",
      sim3dControlsHint: "Sürüş: [W / A / S / D] veya Yön Tuşları · C: Kamera Değiştir · Boşluk: El Freni",
      sim3dCockpit: "Kokpit Görünümü",
      sim3dChase: "Dış Takip Kamerası",
      sim3dTestBlow: "Sensöre Üfle & Test Et",
      sim3dRestartEngine: "Aracı Sıfırla",
      sim3dSpeed: "Hız",
      sim3dEngineUnlocked: "KONTAK AÇIK · MOTOR ÇALIŞIYOR (GAZA BASABİLİRSİN)",
      sim3dEngineLocked: "KONTAK KİLİTLİ · MARŞ KESİLDİ (MOTOR ÇALIŞMAZ)",
      sim3dClose: "Simülasyondan Çık"
    },
    features: {
      badge: "Öğrenci Makerlar Tarafından Üretildi",
      title: "Hiçbir Kolaylığa Kaçmayan Donanım Mimarisi",
      desc: "Geleneksel ticari cihazlar hantal, binlerce dolar ve bir sürü açığa sahip. AlcoholiCar'ı kompakt, kurcalamaya dayanıklı ve inanılmaz hızlı yaptık.",
      feat1Title: "Akıllı Kontak Kilitleme",
      feat1Desc: "Doğrudan otomobilin marş selenoid hattına bağlanır. Alkol tespit edildiğinde devre fiziksel olarak ayrılır ve motora marş gücü gitmez.",
      feat1Tag: "40A Otomotiv Katı Hal Rölesi",
      feat2Title: "Anlık Yakınlara / Aileye SOS Bildirimi",
      feat2Desc: "Kayıtlı arkadaşlarına veya ailene anında otomatik SMS iletir. Canlı araç koordinatları ve tek dokunuşla taksi çağırma linki içerir.",
      feat2Tag: "Entegre Quectel 4G LTE + GNSS GPS",
      feat3Title: "Hile ve Baypas Koruması",
      feat3Desc: "Balonla, hava kompresörüyle veya saç kurutma makinesiyle kandırılamaz! Hazne insan vücut ısısını (34°C) ve dinamik hava basıncını doğrular.",
      feat3Tag: "Çift Termistör + Pitot Akış Sensörü",
      feat4Title: "3 Saniyenin Altında Uç Karar",
      feat4Desc: "Bütün sensör birleştirme ve eşik kontrolü çift çekirdekli 240MHz işlemcide yerel çalışır. Yeraltı otoparkında şebeke olmasa bile anında kilitler.",
      feat4Tag: "ESP32-S3 Çift Çekirdek Xtensa LX7",
      feat5Title: "Gizli Orijinal Tarz Montaj",
      feat5Desc: "Modern araç konsollarına kusursuz entegre olur. Standart 12V sigorta veya OBD-II soketinden beslenir; kontak kapalıyken aküyü tüketmez.",
      feat5Tag: "Uyku modunda akım < 8mA",
      feat6Title: "Yoldaş Ekip Mobil Uygulaması",
      feat6Desc: "Genç sürücüler yakın arkadaşları veya aileleriyle eşleşebilir. Gece sokağa çıkma hatırlatmaları, akü sağlığı ve şifreli yerel loglar sunar.",
      feat6Tag: "Bluetooth 5.0 LE + Web Bluetooth API"
    },
    hardware: {
      badge: "Atölye Masası & Parça İnceleme",
      title: "Gerçek Silikon. Gerçek Lehim. Gerçek Koruma.",
      desc: "Asla gerçeğe dönüşmeyen süslü 3D animasyonlar yapmıyoruz. Devreleri KiCad ile çizdik, FreeRTOS C++ ile kodladık ve test tezgahında denedik.",
      modelBadge: "MODEL: BP-01 REV 2.4",
      housingBadge: "Özel 3D PETG Kasa",
      imageCaption: "İşlenmiş mikro ızgaralı nefes haznesi ve adreslenebilir RGB durum halkası.",
      tabSensor: "Yakıt Hücresi Sensörü",
      tabRelay: "40A Röle Kilidi",
      tabComms: "4G LTE & GPS",
      tabBypass: "Hile Önleme",
      sensorComp: "BİLEŞEN: Elektrokimyasal Yakıt Hücresi",
      sensorDrift: "KAYMA: < 0.002%/yıl",
      sensorDesc: "Naneli sakız, gargara veya ortam kokularıyla sahte alarm veren ucuz MQ-3 yarı iletken sensörlerin aksine, platin yakıt hücremiz doğrudan etanol moleküllerini oksitleyerek promille tam orantılı akım üretir.",
      sensorSpecs: ["• 2.8sn hızlı ısınma", "• Platin katalizör", "• Otomatik sıfır kalibrasyonu"],
      relayComp: "BİLEŞEN: Otomotiv MOSFET / Katı Hal Rölesi",
      relayCurrent: "AKIM: 40A Sürekli",
      relayDesc: "Kontak anahtarı marş selenoid kablosuyla seri bağlanır. Güvenli olduğunda optik izolasyon kapıyı açar. Kilitliyken röle pasif kalarak marş motorunun dönmesini imkansız kılar.",
      relaySpecs: ["• Galvanik opto-izolasyon", "• Sıfır ark oluşumu", "• Güvenli kapalı mantık"],
      commsComp: "BİLEŞEN: Quectel LTE Cat-M1 + GNSS",
      commsBands: "BANTLAR: B2/B4/B12/B25",
      commsDesc: "Sürücünün telefonundan bağımsız çalışan dahili hücresel modem. Sürücü alkollü çıkarsa, telefon olmasa bile arka planda doğrudan acil yardım grubuna Google Haritalar konumuyla SMS yollar.",
      commsSpecs: ["• Dahili seramik yama anten", "• 3GPP Rel.14 uyumlu"],
      bypassComp: "BİLEŞEN: Fark Basınç Hava Akışı + NTC Isı Sensörü",
      bypassVerif: "DOĞRULAMA: Çok noktalı",
      bypassDesc: "Balon veya kompresörle cihazı geçmeyi engeller. En az 2.2 saniye boyunca insan vücut sıcaklığında (33.5°C - 36.5°C) kesintisiz hava akışı şart koşulur. Oda sıcaklığındaki hava hemen testi reddeder.",
      bypassSpecs: ["• Basınç fark kapısı", "• Sıcaklık gradyan kontrolü"]
    },
    team: {
      badge: "Hedefi Olan Genç Geliştiriciler",
      title: "Alkollü Araç Kazalarını Kabullenmeyen Öğrenciler Tarafından Geliştirildi",
      desc: "Üniversite mühendislik ve tasarım öğrencileriyiz. AlcoholiCar'ı kampüs garajımızda inşa ettik çünkü hepimizin bir partiden sonra dikkatsiz kararlar alan arkadaşları oldu. İnsan iradesinin bocaladığı yerde teknoloji devreye girmeli.",
      member1Role: "Donanım & Gömülü Sistemler",
      member1Desc: "KiCad PCB şematiğini, sensör kalibrasyon haznesini ve 12V otomotiv marş röle devresini tasarladı.",
      member2Role: "Gömülü Yazılım & Mobil Ekosistem",
      member2Desc: "FreeRTOS uç yazılımını, hava akış kontrol algoritmalarını ve acil SMS gönderim altyapısını kodladı.",
      member3Role: "Endüstriyel CAD & Ürün Tasarımı",
      member3Desc: "Fusion 360'ta mat siyah ergonomik kasayı modelledi, nefes hunisini ve araç içi gösterge panelini tasarladı.",
      visionTitle: "Öğrenci Vizyonumuz: Açık Donanım, Sıfır Can Kaybı",
      visionDesc: "Güvenlik teknolojilerinin lüks otomobil opsiyonlarına veya fahiş mahkeme kilitlerine hapsedilmemesi gerektiğine inanıyoruz. Mahallemizdeki her aracın güvenli olmasını istiyoruz.",
      exploreBtn: "Prototipi Keşfet"
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      desc: "AlcoholiCar'ın gerçek hayatta nasıl çalıştığına dair doğrudan cevaplar.",
      q1: "Cihaz arabada takılı kalınca aküyü bitirir mi?",
      a1: "Kesinlikle hayır. Kontak kapatıldığında AlcoholiCar ultra düşük güçte derin uyku moduna geçer (< 8 mA). Gösterge panelindeki dijital saatten bile daha az enerji çeker.",
      q2: "Ayık bir arkadaşım benim yerime üflerse ne olur?",
      a2: "ESP32 üzerinde sürücü koltuğunda oturan kişinin üflediğini doğrulayan bir mikro kamera modeli entegre ediyoruz. Ayrıca hareketten 10 dakika sonra sürüş esnasında rastgele doğrulama testleri ister.",
      q3: "Otoyolda 120 km/s hızla giderken motoru aniden kapatabilir mi?",
      a3: "ASLA. AlcoholiCar sadece ve sadece marş motoru selenoid kablosuna (Terminal 50) bağlanır. Sadece ilk motor kalkışını denetler. Araba çalıştıktan sonra alternatörü veya yakıt pompasını KESİNLİKLE kesemez.",
      q4: "Geliştirme loglarınızı ve şemalarınızı nereden takip edebilirim?",
      a4: "Aşağıdan bültenimize katılabilirsin! Açık kaynak CAD dosyalarını, KiCad devre şemalarını ve test tezgahı videolarını topluluğumuzla paylaşıyoruz.",
      formTitle: "AlcoholiCar Donanım Geliştirme Günlüklerini Takip Et",
      formDesc: "Öğrenci garaj atölyemizden açık kaynak şemaları, gömülü yazılım güncellemelerini ve test sonuçlarını al.",
      formPlaceholder: "E-posta adresini gir",
      formBtn: "Bültene Katıl",
      formSuccess: "Harika! Öğrenci geliştirme notlarımız e-posta kutuna gelecek."
    },
    footer: {
      tagline: "Öğrenci Donanım İnisiyatifi",
      copyright: "AlcoholiCar Öğrenci Laboratuvarı. Sadece güvenli sürüşler."
    }
  },

  en: {
    nav: {
      problem: "The Problem",
      howItWorks: "How It Works",
      features: "Tech Features",
      simulator: "Live Simulator",
      hardware: "Hardware Lab",
      team: "Student Team",
      trySimulator: "Try Simulator"
    },
    hero: {
      badgeStatus: "Student Prototype Project",
      badgeBuild: "Active Hardware Build",
      badgeBench: "v1.2 Bench Tested",
      titleLine1: "Blow Before You Drive.",
      titleLine2: "Safe Rides Only.",
      subtitle: "We're a crew of young student engineers building a zero-excuses ignition interlock. Before the engine fires up, you take a 2-second breath test. If you're over the safe limit, your starter relay locks cold—and an instant SOS ping heads straight to your crew to get you home safely.",
      trySimBtn: "Test Live Simulator",
      seeHowBtn: "See How It Works",
      soundOn: "FX: On",
      soundOff: "FX: Off",
      metricResponse: "< 2.8s",
      metricResponseLabel: "Sensor Response Time",
      metricRelay: "100%",
      metricRelayLabel: "Physical Relay Cut-Off",
      metricLimit: "0.05%",
      metricLimitLabel: "Configurable Lockout BAC",
      telemetryArmed: "SYSTEM STATUS: ARMED",
      telemetrySolenoid: "12V Solenoid Active",
      telemetryRelayTitle: "Starter Motor Interlock",
      telemetryRelayDesc: "Dual solid-state 40A cutoff relay",
      telemetryReady: "Ready",
      telemetryChip: "ESP32-S3 Edge Processor"
    },
    problem: {
      badge: "The Reality Check",
      title: "Alcohol Lying to Your Brain is Not an Opinion. It’s Biology.",
      desc: "Every year, over a million preventable accidents happen because someone said 'Bro, I'm totally fine to drive.' When blood alcohol rises, the very part of your brain that evaluates risk shuts off first. You can't rely on willpower at 2:00 AM. You need a device that says no for you.",
      card1Title: "The 'I'm Fine' Bias",
      card1Desc: "Alcohol reduces inhibitions before motor control fails. Drivers genuinely believe they're fully capable until braking 25 feet too late.",
      card1Fact: "Fact: 4x crash probability at just 0.05% BAC",
      card2Title: "The Key-Turn Bottleneck",
      card2Desc: "Once an impaired driver turns the ignition key, the car is in motion. Apps and lectures can't intervene on the highway. Prevention must happen before the starter motor cranks.",
      card2Fact: "Solution: Cut starter current directly",
      card3Title: "Nobody Left Stranded",
      card3Desc: "Locking the car alone isn't enough—stranded drunk people make worse decisions. AlcoholiCar automatically alerts trusted friends or parents with coordinates to arrange safe transport.",
      card3Fact: "Feature: Auto-SMS with live GPS coordinates"
    },
    howItWorks: {
      badge: "Three-Second Safety Protocol",
      title: "How AlcoholiCar Works in 3 Quick Steps",
      desc: "No complicated passwords, zero slow app logins. Just breathe, verify, and drive safely.",
      step1Title: "Blow Into The Smart Sensor",
      step1Desc: "Sit in the driver's seat and exhale into the AlcoholiCar console mouthpiece for 2 seconds. The dual air-chamber validates deep lung alveolar air while checking breath temperature.",
      step1Tag: "Thermal & volume flow verified",
      step2Title: "Instant BAC Edge Check",
      step2Desc: "The high-precision electrochemical fuel cell sensor reads ethanol molecular density. The embedded microcontroller computes your exact BAC in under three seconds with ±0.005% accuracy.",
      step2Tag: "Zero cloud latency calculation",
      step3Title: "Green = Drive / Red = Lock + SOS",
      step3Desc: "Green Light: Relay energizes the starter circuit and your car starts immediately. Red Light: Ignition drops dead, alarm flashes, and an emergency SOS text pings your loved ones with live GPS.",
      step3Tag: "Auto-dispatches emergency rideshare link"
    },
    simulator: {
      badge: "Interactive Hardware Test Bench",
      title: "Test AlcoholiCar in Real Time",
      desc: "Select or type a Blood Alcohol Content (BAC) level, then press 'Breathe & Test Ignition' to experience the ignition response.",
      selectScenario: "1. Select Test Scenario",
      thresholdNotice: "Threshold: 0.05% BAC",
      presets: {
        sober: { label: "Zero Alcohol", desc: "Fresh glass of water, 100% stone cold sober" },
        cider: { label: "1 Light Drink", desc: "Single session beer or small glass of wine" },
        border: { label: "Legal Threshold", desc: "The dangerous gray zone where reflexes degrade" },
        impaired: { label: "Over The Limit", desc: "Illegal in nearly all jurisdictions; reaction time halved" },
        party: { label: "Heavy Night Out", desc: "Severe motor impairment and tunnel vision" }
      },
      customBac: "Custom BAC Level",
      soberLabel: "0.00% (Sober)",
      limitLabel: "0.05% (Limit)",
      dangerousLabel: "0.20%+ (Dangerous)",
      breatheBtn: "Breathe & Test Ignition",
      analyzingBtn: "Exhaling & Analyzing...",
      resetTitle: "Reset Bench",
      relayBus: "Vehicle Ignition Relay Bus #01",
      engineStarter: "Engine Starter",
      starterReady: "READY",
      starterEngaged: "ENGAGED",
      starterLocked: "LOCKED",
      analyzingText: "Analyzing",
      currentBac: "Current BAC",
      safeLimitText: "Limit: 0.050%",
      sampleIntake: "Fuel-cell alcohol measurement",
      fuelCellMeasurement: "Sample intake chamber active...",
      statusIdleTitle: "WAITING FOR BREATH SAMPLE",
      statusIdleDesc: "Click 'Breathe & Test Ignition' to simulate driver exhalation into the AlcoholiCar sensor nozzle.",
      statusTestingTitle: "SAMPLING ALVEOLAR AIRFLOW",
      statusTestingDesc: "Thermal breath check: OK (34.2°C). Dual air volume sensor verified deep lung sample.",
      statusPassedTitle: "IGNITION UNLOCKED · SAFE TO DRIVE",
      statusPassedDesc: "BAC level is clean (%{bac}). 12V starter motor relay energized. Engine starts smoothly.",
      statusPassedBadge: "Drive alert disabled · Have a safe journey",
      statusLockedTitle: "IGNITION LOCKED · STARTER DISABLED",
      statusLockedDesc: "BAC (%{bac}) exceeds safe threshold (0.050%). Physical starter relay cut off. The engine CANNOT be cranked.",
      statusLockedBadge: "Emergency SOS text dispatched to contacts",
      pushToStartTitle: "Push-To-Start Switch",
      pushToStartWire: "Direct CAN/Relay Wire",
      engineText: "ENGINE",
      startText: "START",
      stopText: "STOP",
      sosHeader: "LIVE SOS DISPATCHED VIA CELLULAR LTE",
      sosRecipient: "SMS Recipient: Mom & Dad (+1 555-0192)",
      sosDelivered: "Delivered",
      sosMessage: "🚨 AlcoholiCar Alert: Alex just attempted to start the vehicle with an impaired BAC of %{bac}. The ignition has been locked. Alex is currently at 842 Elm St. Tap here for live coordinates or to call an Uber.",
      gpsText: "GPS: 37.7749° N, 122.4194° W",
      batteryText: "Car battery: 12.6V",
      calcTitle: "How Quickly Does Alcohol Pile Up? (Widmark Curve)",
      calcEst: "Est: %{bac} BAC",
      drinksLabel: "Standard Drinks",
      hoursLabel: "Hours Elapsed",
      weightLabel: "Weight",
      applyBtn: "Apply BAC",
      experience3dBtn: "Experience in 3D",
      sim3dModalTitle: "AlcoholiCar 3D Vehicle & Cockpit Simulator",
      sim3dModalSubtitle: "Real-time 3D driving physics, in-cabin smart sensor and starter lockout response",
      sim3dControlsHint: "Drive: [W / A / S / D] or Arrow Keys · C: Switch Camera · Space: Handbrake",
      sim3dCockpit: "Cockpit View",
      sim3dChase: "Chase Camera",
      sim3dTestBlow: "Blow Sensor & Test",
      sim3dRestartEngine: "Reset Car",
      sim3dSpeed: "Speed",
      sim3dEngineUnlocked: "IGNITION UNLOCKED · ENGINE ACTIVE (READY TO DRIVE)",
      sim3dEngineLocked: "IGNITION LOCKED · STARTER DISABLED (ENGINE SHUT OFF)",
      sim3dClose: "Exit Simulator"
    },
    features: {
      badge: "Engineered By Student Makers",
      title: "Hardware Architecture That Doesn’t Cut Corners",
      desc: "Traditional commercial breathalyzers are clunky, cost thousands, and have huge loopholes. We designed AlcoholiCar to be compact, tamper-resistant, and lightning fast.",
      feat1Title: "Smart Ignition Interlock",
      feat1Desc: "Connects directly to the car's starter relay solenoid. If alcohol is detected, the relay circuit is physically broken. The engine simply will not receive ignition power.",
      feat1Tag: "40A Automotive Solid-State Relay",
      feat2Title: "Instant Loved Ones / SOS Alerts",
      feat2Desc: "Sends automated SMS and push notifications to registered friends, family, or partners. Includes vehicle coordinates and one-tap rideshare summoning to ensure you're never stranded.",
      feat2Tag: "Integrated Quectel 4G LTE + GNSS GPS",
      feat3Title: "Anti-Cheat & Bypass Protection",
      feat3Desc: "Can't use a balloon, compressed air can, or hair dryer! The intake chamber measures air temperature (34°C body heat) and dynamic airflow resistance to verify human lung exhalation.",
      feat3Tag: "Dual Thermistor + Pitot Flow Sensor",
      feat4Title: "Sub-3-Second Edge Decision",
      feat4Desc: "All sensor fusion and thresholding executes locally on the dual-core 240MHz microcontroller. Even in an underground concrete parking garage without cell signal, the lockout works instantly.",
      feat4Tag: "ESP32-S3 Dual-Core Xtensa LX7",
      feat5Title: "Stealth OEM-Style Mounting",
      feat5Desc: "Designed to blend cleanly into modern car dashboards. Powered through standard 12V automotive fuse tap or OBD-II connector with zero battery drain when vehicle is turned off.",
      feat5Tag: "Sleep mode draw < 8mA",
      feat6Title: "Companion Crew App",
      feat6Desc: "Young drivers can pair with designated buddies or parents. Set customizable curfew notifications, battery health pings, and view historical safety logs encrypted on-device.",
      feat6Tag: "Bluetooth 5.0 LE + Web Bluetooth API"
    },
    hardware: {
      badge: "Maker Workbench & Teardown",
      title: "Real Silicon. Real Soldering. Real Protection.",
      desc: "We aren't making concept mockups or 3D animations that never exist in reality. We soldered the boards, coded the firmware in C++/FreeRTOS, and stress-tested the relays on an actual test rig.",
      modelBadge: "MODEL: BP-01 REV 2.4",
      housingBadge: "Custom 3D PETG Housing",
      imageCaption: "Machined micro-mesh breath intake with integrated RGB addressable status halo.",
      tabSensor: "Fuel Cell Sensor",
      tabRelay: "40A Relay Interlock",
      tabComms: "4G LTE & GPS",
      tabBypass: "Anti-Cheat",
      sensorComp: "COMPONENT: Electrochemical Fuel Cell",
      sensorDrift: "DRIFT: < 0.002%/yr",
      sensorDesc: "Unlike cheap consumer MQ-3 semiconductor sensors that trigger false alarms from mints, mouthwash, or ambient fumes, our platinum fuel cell oxidizes ethanol molecules specifically, generating a measurable milli-amp current directly proportional to blood alcohol content.",
      sensorSpecs: ["• Fast 2.8s warm-up", "• Platinum catalyst", "• Auto-zero calibration"],
      relayComp: "COMPONENT: Automotive MOSFET / Solid State Relay",
      relayCurrent: "CURRENT: 40A Continuous",
      relayDesc: "Sits in series with the ignition switch starter solenoid wire (Terminal 50). When armed and safe, optical isolation closes the gate to permit ignition. If locked, the relay stays de-energized, making starter motor rotation physically impossible.",
      relaySpecs: ["• Galvanic opto-isolation", "• Zero arcing", "• Failsafe closed logic"],
      commsComp: "COMPONENT: Quectel LTE Cat-M1 + GNSS",
      commsBands: "BANDS: B2/B4/B12/B25",
      commsDesc: "Independent cellular modem with integrated eSIM. Operates completely separately from the driver's phone. If the driver is drunk, it triggers a background HTTPS webhook and direct cellular SMS to the emergency circle with exact Google Maps coordinates.",
      commsSpecs: ["• Onboard ceramic patch antenna", "• 3GPP Rel.14 compliant"],
      bypassComp: "COMPONENT: Differential Air Flow + NTC Temp Sensor",
      bypassVerif: "VERIFICATION: Multi-point",
      bypassDesc: "Prevents drivers from using a balloon or air compressor to bypass the test. The sensor requires sustained exhalation pressure between 12-18 kPa for at least 2.2 seconds at human body temperature (33.5°C to 36.5°C). Any ambient temperature blow immediately fails the test.",
      bypassSpecs: ["• Pressure differential gate", "• Temperature gradient check"]
    },
    team: {
      badge: "Young Builders With A Mission",
      title: "Built by Students Who Refuse to Accept Drunk Driving Crashes",
      desc: "We're a team of university engineering, design, and software students. We built AlcoholiCar in our campus maker garage because every one of us has friends who made reckless choices after a party. Tech should solve problems where human willpower fails.",
      member1Role: "Hardware & Embedded Systems",
      member1Desc: "Designed the PCB schematic in KiCad, breadboard prototypes, sensor calibration chamber, and 12V automotive starter relay circuit.",
      member2Role: "Firmware & Mobile Ecosystem",
      member2Desc: "Wrote the FreeRTOS edge firmware, anti-cheat airflow sensor algorithms, emergency SMS webhook dispatcher, and telemetry sync.",
      member3Role: "Industrial CAD & Product Design",
      member3Desc: "Modeled the sleek matte-black 3D printed housing in Fusion 360, engineered the ergonomic breath funnel, and designed the dashboard UI.",
      visionTitle: "Our Student Vision: Open Hardware, Zero Fatalities",
      visionDesc: "We believe smart safety tech shouldn't be locked behind luxury car paywalls or $2,500 court-mandated systems. We want every car on campus and in our neighborhoods to be safe.",
      exploreBtn: "Explore The Prototype"
    },
    faq: {
      title: "Frequently Asked Questions",
      desc: "Straight answers on how AlcoholiCar operates in the real world.",
      q1: "Will this drain my car's battery if it stays plugged in?",
      a1: "Not at all. When the vehicle ignition is turned off, AlcoholiCar drops into deep ultra-low-power sleep (< 8 milliamps). It draws less standby current than your car's digital dashboard clock.",
      q2: "What happens if my sober friend blows for me?",
      a2: "We're currently training a micro-camera face verification model right on the ESP32 to confirm the person blowing is the one sitting in the driver's seat. Plus, our system triggers random rolling re-tests after 10 minutes of driving to ensure the driver hasn't swapped.",
      q3: "Can it shut the engine off while I'm speeding on the highway?",
      a3: "Never. AlcoholiCar is wired exclusively into the starter motor solenoid wire (terminal 50). It only blocks engine STARTING. Once the vehicle is running, the interlock cannot cut off the alternator or fuel pump, ensuring total highway safety.",
      q4: "How do I get updates or follow your build logs?",
      a4: "Drop your email below! We publish our open-source CAD files, KiCad schematics, and test bench video logs directly to our student community.",
      formTitle: "Follow The AlcoholiCar Hardware Build",
      formDesc: "Get open-source schematics, firmware updates, and field test results from our student garage lab.",
      formPlaceholder: "Enter your email address",
      formBtn: "Join Build Log",
      formSuccess: "You're locked in! Check your inbox for our student build notes."
    },
    footer: {
      tagline: "Student Hardware Initiative",
      copyright: "AlcoholiCar Student Lab. Safe rides only."
    }
  },

  de: {
    nav: {
      problem: "Das Problem",
      howItWorks: "Funktionsweise",
      features: "Tech-Features",
      simulator: "Live-Simulator",
      hardware: "Hardware-Labor",
      team: "Studenten-Team",
      trySimulator: "Simulator testen"
    },
    hero: {
      badgeStatus: "Studentisches Prototypenprojekt",
      badgeBuild: "Aktive Hardware-Entwicklung",
      badgeBench: "v1.2 Prüfstand-getestet",
      titleLine1: "Erst Pusten, dann Fahren.",
      titleLine2: "Nur sichere Fahrten.",
      subtitle: "Wir sind ein junges Team von Ingenieurstudenten und bauen eine kompromisslose Zündsperre. Vor dem Start machst du einen 2-Sekunden-Atemtest. Liegst du über dem Grenzwert, sperrt das Starterrelais sofort – und ein Notfall-Alert geht direkt an deine Freunde, damit du sicher nach Hause kommst.",
      trySimBtn: "Live-Simulator testen",
      seeHowBtn: "So funktioniert's",
      soundOn: "Audio: An",
      soundOff: "Audio: Aus",
      metricResponse: "< 2,8s",
      metricResponseLabel: "Sensor-Reaktionszeit",
      metricRelay: "100%",
      metricRelayLabel: "Physische Relais-Trennung",
      metricLimit: "0,5‰",
      metricLimitLabel: "Sperr-Grenzwert",
      telemetryArmed: "SYSTEMSTATUS: SCHARF",
      telemetrySolenoid: "12V Magnetschalter aktiv",
      telemetryRelayTitle: "Anlasser-Zündsperre",
      telemetryRelayDesc: "Duales 40A Solid-State-Relais",
      telemetryReady: "Bereit",
      telemetryChip: "ESP32-S3 Edge-Prozessor"
    },
    problem: {
      badge: "Realitätscheck",
      title: "Wenn Alkohol deinem Kopf vorgaukelt 'Alles gut', ist das Biologie.",
      desc: "Jedes Jahr passieren unzählige vermeidbare Unfälle, weil jemand um 2 Uhr nachts sagt: 'Ich kann noch locker fahren.' Sobald der Alkoholpegel steigt, setzt das Risikozentrum im Gehirn zuerst aus. Verlass dich nicht auf Willenskraft – vertraue auf Hardware, die Nein sagt.",
      card1Title: "Der 'Alles gut'-Trugschluss",
      card1Desc: "Alkohol dämpft Hemmungen lange bevor die Motorik spürbar versagt. Fahrer glauben fest an ihre Reaktionsfähigkeit – bis sie 15 Meter zu spät bremsen.",
      card1Fact: "Fakt: 4-faches Unfallrisiko schon ab 0,5‰",
      card2Title: "Der Zündschlüssel-Engpass",
      card2Desc: "Sobald der Schlüssel gedreht und der Motor gestartet ist, rollt der Wagen. Auf der Landstraße hilft keine Ermahnung mehr. Die Prävention muss vor dem Anlasser greifen.",
      card2Fact: "Lösung: Direkte hardwareseitige Trennung des Anlasserstroms",
      card3Title: "Niemand bleibt stranden",
      card3Desc: "Nur das Auto zu sperren reicht nicht: Betrunkene Personen treffen allein im Dunkeln schlechte Entscheidungen. AlcoholiCar alarmiert Angehörige mit Live-GPS für sicheren Heimweg.",
      card3Fact: "Feature: Automatische SMS mit Live-GPS-Koordinaten"
    },
    howItWorks: {
      badge: "3-Sekunden-Sicherheitsprotokoll",
      title: "Wie AlcoholiCar in 3 einfachen Schritten funktioniert",
      desc: "Keine Passwörter, kein langsames Einloggen. Einatmen, pusten, verifizieren und sicher losfahren.",
      step1Title: "In den smarten Sensor pusten",
      step1Desc: "Setz dich ins Auto und atme 2 Sekunden lang gleichmäßig in das AlcoholiCar-Mundstück. Die Doppelkammer prüft Atemtemperatur und Tiefenlungen-Luftstrom.",
      step1Tag: "Thermo- & Volumenstrom-Verifikation",
      step2Title: "Sofortige Edge-Promilleanalyse",
      step2Desc: "Die elektrochemische Platin-Brennstoffzelle misst die Ethanol-Moleküldichte. Der Onboard-Mikrocontroller ermittelt den exakten Promillewert in unter 3 Sekunden.",
      step2Tag: "Lokale Berechnung ohne Cloud-Verzögerung",
      step3Title: "Grün = Start / Rot = Sperre + SOS",
      step3Desc: "Grünes Licht: Relais schließt den Stromkreis und der Motor springt sofort an. Rotes Licht: Zündung blockiert, Alarm pulsiert und Notfall-SMS mit GPS geht an Vertrauenspersonen.",
      step3Tag: "Automatischer Taxi- & Notfall-Abhol-Link"
    },
    simulator: {
      badge: "Interaktiver Hardware-Prüfstand",
      title: "AlcoholiCar in Echtzeit testen",
      desc: "Wähle ein Szenario oder stelle deinen Wunsch-Promillewert ein, drücke auf 'Pusten & Zündung testen' und erlebe die Fahrzeugreaktion.",
      selectScenario: "1. Testszenario wählen",
      thresholdNotice: "Grenzwert: 0,5‰ BAC",
      presets: {
        sober: { label: "Null Alkohol", desc: "Ein Glas Wasser, 100% nüchtern und fahrbereit" },
        cider: { label: "1 leichtes Getränk", desc: "Ein kleines Bier oder ein Schluck Wein" },
        border: { label: "Gesetzlicher Grenzwert", desc: "Die gefährliche Grauzone beginnender Reaktionsverzögerung" },
        impaired: { label: "Über dem Limit", desc: "Fahruntüchtig; Reaktionszeit drastisch verlangsamt" },
        party: { label: "Lange Partynacht", desc: "Schwere motorische Beeinträchtigung und Tunnelblick" }
      },
      customBac: "Individueller Promillewert",
      soberLabel: "0,0‰ (Nüchtern)",
      limitLabel: "0,5‰ (Grenze)",
      dangerousLabel: "2,0‰+ (Kritisch)",
      breatheBtn: "Pusten & Zündung testen",
      analyzingBtn: "Ausatmen & Analyse...",
      resetTitle: "Prüfstand zurücksetzen",
      relayBus: "Fahrzeug-Zündrelais-Bus #01",
      engineStarter: "Motor-Anlasser",
      starterReady: "BEREIT",
      starterEngaged: "FREIGEGEBEN",
      starterLocked: "GESPERRT",
      analyzingText: "Analysiere",
      currentBac: "Gemessener Wert",
      safeLimitText: "Grenzwert: 0,050%",
      sampleIntake: "Brennstoffzellen-Atemgasmessung",
      fuelCellMeasurement: "Probenkammer aktiv...",
      statusIdleTitle: "WARTE AUF ATEMPROBE",
      statusIdleDesc: "Klicke auf 'Pusten & Zündung testen', um das Ausatmen in den AlcoholiCar-Sensor zu simulieren.",
      statusTestingTitle: "ALVEOLARER LUFTSTROM WIRD GEMESSEN",
      statusTestingDesc: "Temperaturprüfung: OK (34,2°C). Dualer Differenzdrucksensor hat Tiefenlungenprobe bestätigt.",
      statusPassedTitle: "ZÜNDUNG FREIGEGEBEN · GUTE FAHRT",
      statusPassedDesc: "Promillewert ist im grünen Bereich (%{bac}). 12V-Anlasserrelais bestromt. Motor startet tadellos.",
      statusPassedBadge: "Sperre inaktiv · Sicher ans Ziel kommen",
      statusLockedTitle: "ZÜNDUNG GESPERRT · ANLASSER BLOCKIERT",
      statusLockedDesc: "Promillewert (%{bac}) überschreitet Grenzwert (0,050%). Physisches Relais geöffnet. Motor KANN NICHT gestartet werden.",
      statusLockedBadge: "Notfall-SOS per SMS an Vertrauenspersonen versendet",
      pushToStartTitle: "Start-Stopp-Taste",
      pushToStartWire: "Direkte CAN/Relais-Leitung",
      engineText: "MOTOR",
      startText: "START",
      stopText: "STOP",
      sosHeader: "LIVE-NOTRUF ÜBER MOBILFUNK LTE VERSENDET",
      sosRecipient: "SMS-Empfänger: Eltern & Partner (+49 171 889201)",
      sosDelivered: "Zugestellt",
      sosMessage: "🚨 AlcoholiCar Alert: Alex hat versucht, das Fahrzeug mit %{bac} zu starten. Zündung wurde gesperrt. Standort: Kaiser-Wilhelm-Ring 18. Hier tippen für Live-GPS oder Taxi-Bestellung.",
      gpsText: "GPS: 50.9375° N, 6.9603° E",
      batteryText: "Bordnetz: 12,6V",
      calcTitle: "Wie schnell steigt der Alkoholspiegel? (Widmark-Kurve)",
      calcEst: "Geschätzt: %{bac} BAC",
      drinksLabel: "Standard-Getränke",
      hoursLabel: "Verstrichene Stunden",
      weightLabel: "Körpergewicht",
      applyBtn: "Wert übernehmen",
      experience3dBtn: "In 3D erleben",
      sim3dModalTitle: "AlcoholiCar 3D Fahrzeug- & Cockpit-Simulator",
      sim3dModalSubtitle: "Echtzeit-3D-Fahrphysik, Cockpit-Sensormodul und Zündsperren-Verhalten",
      sim3dControlsHint: "Fahren: [W / A / S / D] oder Pfeiltasten · C: Kamera wechseln · Leertaste: Handbremse",
      sim3dCockpit: "Cockpit-Ansicht",
      sim3dChase: "Außen-Kamera",
      sim3dTestBlow: "Sensor anblasen & testen",
      sim3dRestartEngine: "Fahrzeug zurücksetzen",
      sim3dSpeed: "Geschwindigkeit",
      sim3dEngineUnlocked: "ZÜNDUNG FREIGEGEBEN · MOTOR LÄUFT (FAHRBEREIT)",
      sim3dEngineLocked: "ZÜNDUNG GESPERRT · ANLASSER TRENNUNG (MOTOR STARTET NICHT)",
      sim3dClose: "Simulation beenden"
    },
    features: {
      badge: "Entwickelt von studentischen Tüftlern",
      title: "Hardware-Architektur ohne Kompromisse",
      desc: "Kommerzielle Gerichts-Pustegeräte kosten Tausende, sind unhandlich und fehleranfällig. Wir haben AlcoholiCar kompakt, manipulationssicher und extrem schnell gebaut.",
      feat1Title: "Smarte Zündunterbrechung",
      feat1Desc: "Wird direkt in die Anlasser-Steuerleitung geschleift. Bei Alkoholnachweis wird der Stromkreis physisch unterbrochen – der Motor erhält keinen Zündimpuls.",
      feat1Tag: "40A Kfz-Solid-State-Relais",
      feat2Title: "Sofortige Vertrauens- / SOS-Benachrichtigung",
      feat2Desc: "Sendet automatische SMS an hinterlegte Freunde oder Angehörige. Enthält GPS-Standort und einen 1-Klick-Fahrdienst-Link, damit niemand friert.",
      feat2Tag: "Integriertes Quectel 4G LTE + GNSS GPS",
      feat3Title: "Manipulations- & Bypass-Schutz",
      feat3Desc: "Keine Chance für Luftballons, Druckluftdosen oder Föhns! Die Messkammer verlangt menschliche Körperwärme (34°C) und echten Lungenblasdruck.",
      feat3Tag: "Dualer NTC-Thermistor + Pitot-Sensor",
      feat4Title: "Sub-3-Sekunden Edge-Entscheidung",
      feat4Desc: "Sämtliche Sensorfusion läuft autark auf dem 240MHz Dual-Core-Chip. Selbst in tiefen Tiefgaragen ohne Mobilfunkempfang greift die Sperre sofort.",
      feat4Tag: "ESP32-S3 Dual-Core Xtensa LX7",
      feat5Title: "Dezente OEM-Dashboard-Integration",
      feat5Desc: "Fügt sich unauffällig in moderne Cockpits ein. Stromversorgung über 12V-Sicherung oder OBD-II-Port mit minimalstem Ruhestrom.",
      feat5Tag: "Ruhestromaufnahme < 8mA",
      feat6Title: "Crew-Begleit-App",
      feat6Desc: "Junge Fahrer koppeln sich mit engen Freunden. Ermöglicht Heimkehr-Erinnerungen, Batteriechecks und verschlüsselte lokale Fahrten-Logs.",
      feat6Tag: "Bluetooth 5.0 LE + Web Bluetooth API"
    },
    hardware: {
      badge: "Werkbank & Teardown",
      title: "Echtes Silizium. Echtes Lötzinn. Echter Schutz.",
      desc: "Keine leeren Marketing-Mockups oder Utopien. Wir haben die Platinen in KiCad geroutet, die Firmware in FreeRTOS/C++ programmiert und Relais auf dem Prüfstand gequält.",
      modelBadge: "MODELL: BP-01 REV 2.4",
      housingBadge: "3D-gedrucktes PETG-Gehäuse",
      imageCaption: "Präzise mikroperforierte Atemöffnung mit adressierbarem RGB-Status-Leuchtring.",
      tabSensor: "Brennstoffzelle",
      tabRelay: "40A Zündrelais",
      tabComms: "4G LTE & GPS",
      tabBypass: "Manipulationsschutz",
      sensorComp: "KOMPONENTE: Elektrochemische Brennstoffzelle",
      sensorDrift: "DRIFT: < 0,002%/Jahr",
      sensorDesc: "Anders als billige MQ-3-Halbleitersensoren, die bei Kaugummis oder Mundspülung Fehlalarme auslösen, oxidiert unsere Platin-Brennstoffzelle ausschließlich Ethanol und erzeugt hochpräzise Ströme.",
      sensorSpecs: ["• 2,8s schnelle Vorheizung", "• Platin-Katalysator", "• Automatische Nullpunkt-Kalibrierung"],
      relayComp: "KOMPONENTE: Kfz-MOSFET / Halbleiterrelais",
      relayCurrent: "STROM: 40A Dauerlast",
      relayDesc: "In Reihe mit Klemme 50 des Anlassers geschaltet. Bei Freigabe schließt die Optoisolierung den Kreis. Bei Sperrung bleibt das Relais offen – Motorstart unmöglich.",
      relaySpecs: ["• Galvanische Opto-Trennung", "• Kein Kontaktabbrand", "• Failsafe-Closed-Logik"],
      commsComp: "KOMPONENTE: Quectel LTE Cat-M1 + GNSS",
      commsBands: "BÄNDER: B2/B4/B12/B25",
      commsDesc: "Autarkes Mobilfunkmodul mit integrierter eSIM. Funktioniert völlig unabhängig vom Smartphone des Fahrers und alarmiert im Notfall zuverlässig per SMS mit Google-Maps-Pin.",
      commsSpecs: ["• Keramische Patch-Antenne", "• 3GPP Rel.14 konform"],
      bypassComp: "KOMPONENTE: Differenzdruck- & NTC-Temperatursensor",
      bypassVerif: "VERIFIKATION: Mehrstufig",
      bypassDesc: "Verhindert die Umgehung mit Druckluft oder Ballons. Erfordert mindestens 2,2 Sekunden kontinuierlichen Atemstrom bei Körpertemperatur (33,5°C bis 36,5°C).",
      bypassSpecs: ["• Differenzdruck-Schranke", "• Temperatur-Gradientenprüfung"]
    },
    team: {
      badge: "Junge Macher mit Mission",
      title: "Entwickelt von Studenten, die keine Unfälle mehr ertragen",
      desc: "Wir studieren Ingenieurwesen, Informatik und Design. AlcoholiCar entstand in unserer Campus-Garage, weil jeder von uns schon Freunde erlebt hat, die nach Partys unverantwortlich ins Auto gestiegen sind. Wenn die Selbstbeherrschung versagt, muss Technik schützen.",
      member1Role: "Hardware & Eingebettete Systeme",
      member1Desc: "Entwickelte das KiCad-Schaltbild, Prototypen-Breadboards, die Sensorkalibrierkammer und den 12V-Relaiskreis.",
      member2Role: "Firmware & Mobiles Ökosystem",
      member2Desc: "Schrieb die FreeRTOS-Edge-Software, die Atemstrom-Filteralgorithmen und den Notfall-SMS-Dienst.",
      member3Role: "Industriedesign & CAD",
      member3Desc: "Modellierte in Fusion 360 das mattschwarze ergonomische Gehäuse, den Atemtrichter und das Cockpit-Interface.",
      visionTitle: "Unsere Vision: Open Hardware, null Verkehrstote",
      visionDesc: "Sicherheitstechnologie darf kein Luxus-Extra für Oberklasse-Neuwagen sein. Wir möchten, dass jedes Studentenauto und jedes Fahrzeug auf unseren Straßen geschützt ist.",
      exploreBtn: "Prototyp entdecken"
    },
    faq: {
      title: "Häufig gestellte Fragen",
      desc: "Ehrliche Antworten zur Funktionsweise von AlcoholiCar im Alltag.",
      q1: "Entlädt das Gerät die Autobatterie bei längerem Stand?",
      a1: "Überhaupt nicht. Bei ausgeschalteter Zündung schaltet AlcoholiCar in einen extremen Tiefschlaf (< 8 mA). Das ist weniger als die Uhr im Armaturenbrett verbraucht.",
      q2: "Was, wenn ein nüchterner Beifahrer für mich pustet?",
      a2: "Wir trainieren derzeit ein Mikro-Kamera-Gesichtsmodell auf dem ESP32, das prüft, ob die pustende Person am Steuer sitzt. Zudem fordert das System nach 10 Minuten Fahrt stichprobenartige Wiederholungstests.",
      q3: "Kann der Motor auf der Autobahn bei 130 km/h plötzlich ausgehen?",
      a3: "NIEMALS. AlcoholiCar greift ausschließlich in die Anlasser-Leitung (Klemme 50) ein. Es verhindert nur das Anlassen. Ist der Motor einmal an, kann das System Lichtmaschine oder Kraftstoffpumpe nicht beeinflussen.",
      q4: "Wo kann ich Baupläne und Fortschritte mitverfolgen?",
      a4: "Trage dich einfach unten in unseren Newsletter ein! Wir teilen CAD-Modelle, KiCad-Schaltpläne und Prüfstandsvideos offen mit unserer Community.",
      formTitle: "Den AlcoholiCar Hardware-Build verfolgen",
      formDesc: "Erhalte Open-Source-Schaltpläne, Firmware-Updates und Testergebnisse aus unserer Campus-Garage.",
      formPlaceholder: "Deine E-Mail-Adresse eingeben",
      formBtn: "Zum Baubericht anmelden",
      formSuccess: "Klasse! Du bist eingetragen und erhältst unsere studentischen Entwicklungsnotizen."
    },
    footer: {
      tagline: "Studentische Hardware-Initiative",
      copyright: "AlcoholiCar Student Lab. Nur sichere Fahrten."
    }
  }
};
