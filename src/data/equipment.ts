export const WHATSAPP_NUMBER = "8801712106242";

export function getWhatsAppRentUrl(name: string, id: string, capacity: string) {
  const msg = `Hello ATDB Trade International,\n\nI'd like to rent the ${name} (${id} · ${capacity}).\nProject location: \nDuration (days): \nPlease share availability and a quotation. — ATDB website`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getWhatsAppQuoteUrl() {
  const msg = `Hello ATDB Trade International,\n\nI'd like to discuss a heavy-equipment rental for an upcoming project. Please share availability and a quotation.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export interface EquipmentVideo {
  src: string;
  poster: string;
  label: string;
  labelBn?: string;
}

export interface EquipmentItem {
  id: string;
  category: "rollers" | "cranes" | "excavators" | "loaders" | "support";
  categoryLabel: string;
  name: string;
  brand: string;
  model: string;
  capacity: string;
  origin: string;
  year: number;
  fuel: string;
  quantity: string;
  notes: string;
  image: string;
  realPhotos?: string[];
  videos?: EquipmentVideo[];
  featured?: boolean;
  banglaLabel?: string;
}

export const equipmentCategories = [
  { slug: "rollers", label: "Road Rollers", bangla: "রোড রোলার", image: "/assets/sakai-sv900-CJzZY7Ph.webp", units: "9 units", range: "1T to 12T", brands: "Sakai, Dynapac, Bomag" },
  { slug: "cranes", label: "Mobile Cranes", bangla: "ক্রেন বহর", image: "/assets/liebherr-ltm-1120-BuAGIUOe.webp", units: "7 units", range: "10T to 120T", brands: "Liebherr & Kato" },
  { slug: "excavators", label: "Excavators & Compactors", bangla: "এক্সক্যাভেটর", image: "/assets/cat-320-BDmJ-mZM.webp", units: "3 units", range: "", brands: "CAT, Komatsu" },
  { slug: "loaders", label: "Loaders & Backhoes", bangla: "লোডার ও ব্যাকহো", image: "/assets/case-770ex-Bt_b90UZ.webp", units: "3 units", range: "", brands: "CASE, XCMG, JCB" },
  { slug: "support", label: "Support Equipment", bangla: "সাপোর্ট ইকুইপমেন্ট", image: "/assets/support-tools-Dnowl7z-.webp", units: "9 units", range: "", brands: "Generators, compactors, cutters & TATA trucks" },
];

export const fleetVideos: EquipmentVideo[] = [
  { src: "/videos/honda-rammer-action.mp4", poster: "/videos/honda-rammer-poster.jpg", label: "Honda 80k-100 Sand Compactor in Action", labelBn: "হোন্ডা ৮০কে স্যান্ড কম্প্যাক্টর — সক্রিয়" },
  { src: "/videos/cat-320bu-action.mp4", poster: "/videos/cat-320bu-poster.jpg", label: "CAT 320BU Excavator — Active Site Operation", labelBn: "ক্যাট ৩২০বিইউ এক্সক্যাভেটর — সাইট অপারেশন" },
];

export const equipmentData: EquipmentItem[] = [
  // --- CRANES ---
  { id: "ATDB-CR-001", category: "cranes", categoryLabel: "Mobile Cranes", name: "Liebherr LTM 1120-5.1", brand: "Liebherr", model: "LTM 1120-5.1", capacity: "120 Tons", origin: "Germany", year: 2005, fuel: "Diesel", quantity: "01", notes: "Telescopic", image: "/assets/liebherr-ltm-1120-BuAGIUOe.webp", featured: true, banglaLabel: "লিবহার ১২০ টন" },
  { id: "ATDB-CR-002", category: "cranes", categoryLabel: "Mobile Cranes", name: "Liebherr LTM 1070-4.1", brand: "Liebherr", model: "LTM 1070-4.1", capacity: "70 Tons", origin: "Germany", year: 2005, fuel: "Diesel", quantity: "01", notes: "Telescopic", image: "/assets/liebherr-ltm-1070-DfjcjeyC.webp", featured: true, banglaLabel: "লিবহার ৭০ টন", realPhotos: ["/equipment/ATDB-CR-002/ATDB-CR-002-01.webp", "/equipment/ATDB-CR-002/ATDB-CR-002-02.webp"] },
  { id: "ATDB-CR-003", category: "cranes", categoryLabel: "Mobile Cranes", name: "Kato KR-50H-V", brand: "Kato", model: "KR-50H-V", capacity: "50 Tons", origin: "Japan", year: 2003, fuel: "Diesel", quantity: "01", notes: "Hydraulic", image: "/assets/kato-kr50h-DGZcibeL.webp", featured: true, banglaLabel: "কাটো ৫০ টন" },
  { id: "ATDB-CR-004", category: "cranes", categoryLabel: "Mobile Cranes", name: "Kato KR-25H-V", brand: "Kato", model: "KR-25H-V", capacity: "25 Tons", origin: "Japan", year: 2000, fuel: "Diesel", quantity: "02", notes: "Hydraulic", image: "/assets/kato-kr25-FmtLzIgv.webp" },
  { id: "ATDB-CR-005", category: "cranes", categoryLabel: "Mobile Cranes", name: "Kato KR-25H-V (Unit B)", brand: "Kato", model: "KR-25H-V", capacity: "25 Tons", origin: "Japan", year: 2002, fuel: "Diesel", quantity: "01", notes: "Hydraulic", image: "/assets/kato-kr25-FmtLzIgv.webp" },
  { id: "ATDB-CR-006", category: "cranes", categoryLabel: "Mobile Cranes", name: "Kato KR-150 Lattice Boom", brand: "Kato", model: "KR-150", capacity: "15 Tons", origin: "Japan", year: 1998, fuel: "Diesel", quantity: "01", notes: "Lattice Boom", image: "/assets/kato-kr150-aViKxDv6.webp" },
  { id: "ATDB-CR-007", category: "cranes", categoryLabel: "Mobile Cranes", name: "Kato KR-100 Lattice Boom", brand: "Kato", model: "KR-100", capacity: "10 Tons", origin: "Japan", year: 1995, fuel: "Diesel", quantity: "01", notes: "Lattice Boom", image: "/assets/kato-kr150-aViKxDv6.webp" },

  // --- ROLLERS ---
  { id: "ATDB-RR-001", category: "rollers", categoryLabel: "Road Rollers", name: "Sakai SV902 3-Wheel Steel", brand: "Sakai", model: "SV902", capacity: "10 Ton", origin: "Japan", year: 2014, fuel: "Diesel", quantity: "01", notes: "3-Wheel Steel", image: "/assets/sakai-sv900-CJzZY7Ph.webp", featured: true },
  { id: "ATDB-RR-002", category: "rollers", categoryLabel: "Road Rollers", name: "Sakai RS902 3-Wheel Steel", brand: "Sakai", model: "RS902", capacity: "10 Ton", origin: "Japan", year: 2014, fuel: "Diesel", quantity: "01", notes: "3-Wheel Steel", image: "/assets/sakai-sv900-CJzZY7Ph.webp" },
  { id: "ATDB-RR-003", category: "rollers", categoryLabel: "Road Rollers", name: "Advance 3-Wheel Road Roller", brand: "Advance", model: "3-Wheel", capacity: "8 Ton", origin: "India", year: 2010, fuel: "Diesel", quantity: "01", notes: "3-Wheel", image: "/assets/advance-3wheel-AY1qh_Tr.webp" },
  { id: "ATDB-RR-004", category: "rollers", categoryLabel: "Road Rollers", name: "Dynapac CC20 Double Drum", brand: "Dynapac", model: "CC20 (489759)", capacity: "12 Ton", origin: "Italy", year: 2012, fuel: "Diesel", quantity: "01", notes: "Double Drum", image: "/assets/dynapac-cc20-C2Nvs5Az.webp", featured: true, banglaLabel: "ডায়নাপ্যাক CC20 ডাবল ড্রাম", realPhotos: ["/equipment/ATDB-RR-004/ATDB-RR-004-01.webp", "/equipment/ATDB-RR-004/ATDB-RR-004-02.webp"] },
  { id: "ATDB-RR-005", category: "rollers", categoryLabel: "Road Rollers", name: "Bomag BW Tandem Vibratory", brand: "Bomag", model: "BW121.A.C", capacity: "4/6 Ton", origin: "Germany", year: 2015, fuel: "Diesel", quantity: "01", notes: "Vibration", image: "/assets/bomag-bw-C1fM8YJB.webp", banglaLabel: "বোম্যাগ BW ট্যান্ডেম ভাইব্রেটরি", realPhotos: ["/equipment/ATDB-RR-005/ATDB-RR-005-01.webp", "/equipment/ATDB-RR-005/ATDB-RR-005-02.webp"] },
  { id: "ATDB-RR-006", category: "rollers", categoryLabel: "Road Rollers", name: "Hawa Tandem Vibratory", brand: "Hawa", model: "Tandem", capacity: "2 Ton", origin: "India", year: 2018, fuel: "Diesel", quantity: "01", notes: "Tandem", image: "/assets/hawa-tandem-CsNlDnh9.webp" },
  { id: "ATDB-RR-007", category: "rollers", categoryLabel: "Road Rollers", name: "CAT CS54 Vibratory Soil", brand: "CAT", model: "CS54", capacity: "5 Ton", origin: "Japan", year: 2016, fuel: "Diesel", quantity: "01", notes: "Vibratory Soil", image: "/assets/cat-cs54-BcKNEclD.webp" },
  { id: "ATDB-RR-008", category: "rollers", categoryLabel: "Road Rollers", name: "Sakai HV60 Mini Tandem", brand: "Sakai", model: "HV60ST", capacity: "1 Ton", origin: "Japan", year: 2020, fuel: "Diesel", quantity: "01", notes: "Mini Tandem", image: "/assets/sakai-mini-DjZpy-kY.webp", featured: true, banglaLabel: "সাকাই HV60 মিনি ট্যান্ডেম", realPhotos: ["/equipment/ATDB-RR-008/ATDB-RR-008-01.webp", "/equipment/ATDB-RR-008/ATDB-RR-008-02.webp", "/equipment/ATDB-RR-008/ATDB-RR-008-03.webp"] },
  { id: "ATDB-RR-009", category: "rollers", categoryLabel: "Road Rollers", name: "Sakai SV902 3-Wheel (Unit B)", brand: "Sakai", model: "SV902", capacity: "10 Ton", origin: "Japan", year: 2012, fuel: "Diesel", quantity: "01", notes: "3-Wheel", image: "/assets/sakai-sv900-CJzZY7Ph.webp" },

  // --- EXCAVATORS ---
  { id: "ATDB-EX-001", category: "excavators", categoryLabel: "Excavators & Compactors", name: "Komatsu PC40 Mini Excavator", brand: "Komatsu", model: "PC40", capacity: "4 Ton", origin: "Japan", year: 2018, fuel: "Diesel", quantity: "01", notes: "Mini", image: "/assets/komatsu-pc40-Bi6fnLlz.webp" },
  { id: "ATDB-EX-002", category: "excavators", categoryLabel: "Excavators & Compactors", name: "CAT 320BU Excavator", brand: "Caterpillar", model: "320BU", capacity: "20 Ton", origin: "Japan", year: 2015, fuel: "Diesel", quantity: "01", notes: "Chain Wheel", image: "/assets/cat-320-BDmJ-mZM.webp", featured: true, banglaLabel: "ক্যাট ৩২০বিইউ এক্সক্যাভেটর", realPhotos: ["/equipment/ATDB-EX-002/ATDB-EX-002-01.webp", "/equipment/ATDB-EX-002/ATDB-EX-002-02.webp"], videos: [{ src: "/videos/cat-320bu-action.mp4", poster: "/videos/cat-320bu-poster.jpg", label: "CAT 320BU in Action" }] },
  { id: "ATDB-EX-003", category: "excavators", categoryLabel: "Excavators & Compactors", name: "CAT Plate Compactor", brand: "CAT", model: "Plate Compactor", capacity: "200 kg", origin: "USA", year: 2020, fuel: "Petrol", quantity: "01", notes: "Plate", image: "/assets/cat-320-BDmJ-mZM.webp" },

  // --- LOADERS ---
  { id: "ATDB-LD-001", category: "loaders", categoryLabel: "Loaders & Backhoes", name: "CASE 770EX Backhoe Loader", brand: "CASE", model: "770EX Magnum", capacity: "Backhoe Loader", origin: "China", year: 2018, fuel: "Diesel", quantity: "01", notes: "Backhoe", image: "/assets/case-770ex-Bt_b90UZ.webp", featured: true, banglaLabel: "কেস ৭৭০EX ব্যাকহো লোডার", realPhotos: ["/equipment/ATDB-LD-001/ATDB-LD-001-01.webp"] },
  { id: "ATDB-LD-002", category: "loaders", categoryLabel: "Loaders & Backhoes", name: "XCMG Wheel Loader", brand: "XCMG", model: "Wheel Loader", capacity: "3 Ton", origin: "China", year: 2020, fuel: "Diesel", quantity: "01", notes: "Wheel Loader", image: "/assets/xcmg-loader-CkN5S8NO.webp" },
  { id: "ATDB-LD-003", category: "loaders", categoryLabel: "Loaders & Backhoes", name: "JCB Backhoe Loader", brand: "JCB", model: "Backhoe", capacity: "Backhoe Loader", origin: "UK", year: 2015, fuel: "Diesel", quantity: "01", notes: "Backhoe", image: "/assets/jcb-backhoe-CBqWILB0.webp" },

  // --- SUPPORT ---
  { id: "ATDB-SP-001", category: "support", categoryLabel: "Support Equipment", name: "Honda GX160 Vibrator", brand: "Honda", model: "GX160", capacity: "5.5 HP", origin: "Japan", year: 2022, fuel: "Petrol", quantity: "03", notes: "Concrete Vibrator", image: "/assets/support-tools-Dnowl7z-.webp" },
  { id: "ATDB-SP-002", category: "support", categoryLabel: "Support Equipment", name: "Concrete Cutter Machine", brand: "Honda", model: "GX390", capacity: "13 HP", origin: "Japan", year: 2020, fuel: "Petrol", quantity: "01", notes: "Concrete Cutter", image: "/assets/support-tools-Dnowl7z-.webp" },
  { id: "ATDB-SP-003", category: "support", categoryLabel: "Support Equipment", name: "TATA LPT 1613 Truck", brand: "TATA", model: "LPT 1613", capacity: "16 Ton", origin: "India", year: 2010, fuel: "Diesel", quantity: "02", notes: "Flatbed Truck", image: "/assets/tata-truck-k27qoXaB.webp" },
  { id: "ATDB-SP-004", category: "support", categoryLabel: "Support Equipment", name: "Honda 80k-100 Sand Compactor", brand: "Honda", model: "80k-100 Rammer", capacity: "80 kg", origin: "Japan", year: 2021, fuel: "Petrol", quantity: "02", notes: "Rammer", image: "/assets/support-tools-Dnowl7z-.webp", banglaLabel: "হোন্ডা ৮০কে স্যান্ড কম্প্যাক্টর", realPhotos: ["/equipment/ATDB-SP-004/ATDB-SP-004-01.webp", "/equipment/ATDB-SP-004/ATDB-SP-004-02.webp", "/equipment/ATDB-SP-004/ATDB-SP-004-03.webp"], videos: [{ src: "/videos/honda-rammer-action.mp4", poster: "/videos/honda-rammer-poster.jpg", label: "Honda Rammer — Sand Compaction" }] },
  { id: "ATDB-SP-005", category: "support", categoryLabel: "Support Equipment", name: "Honda ER2500CX Generator", brand: "Honda", model: "ER2500CX", capacity: "2.5 kVA", origin: "Japan", year: 2022, fuel: "Petrol", quantity: "01", notes: "Portable Generator", image: "/assets/support-tools-Dnowl7z-.webp", banglaLabel: "হোন্ডা ER2500CX জেনারেটর", realPhotos: ["/equipment/ATDB-SP-005/ATDB-SP-005-01.webp"] },
  { id: "ATDB-SP-006", category: "support", categoryLabel: "Support Equipment", name: "Robin EY20 Generator", brand: "Robin", model: "EY20", capacity: "5 kVA", origin: "Japan", year: 2018, fuel: "Petrol", quantity: "01", notes: "Generator", image: "/assets/support-tools-Dnowl7z-.webp" },
  { id: "ATDB-SP-007", category: "support", categoryLabel: "Support Equipment", name: "Water Pump Set", brand: "Honda", model: "WB30", capacity: "3 inch", origin: "Japan", year: 2020, fuel: "Petrol", quantity: "02", notes: "Water Pump", image: "/assets/support-tools-Dnowl7z-.webp" },
  { id: "ATDB-SP-008", category: "support", categoryLabel: "Support Equipment", name: "Welding Machine", brand: "Lincoln", model: "Electric", capacity: "400A", origin: "USA", year: 2019, fuel: "Electric", quantity: "01", notes: "Arc Welding", image: "/assets/support-tools-Dnowl7z-.webp" },
  { id: "ATDB-SP-009", category: "support", categoryLabel: "Support Equipment", name: "Bar Bending Machine", brand: "Generic", model: "Manual", capacity: "32mm", origin: "Local", year: 2020, fuel: "Electric", quantity: "01", notes: "Rebar Bending", image: "/assets/support-tools-Dnowl7z-.webp" },
];

export const projectsData = [
  { title: "Jamuna Multipurpose Bridge ", titleBn: "যমুনা বহুমুখী সেতু — কন্ট্রাক্ট ১", type: "Infrastructure", typeBn: "অবকাঠামো", location: "Tangail / Sirajganj", locationBn: "টাঙ্গাইল / সিরাজগঞ্জ", description: "Critical site clearance and outstanding remedial civil works on the iconic Jamuna bridge.", descriptionBn: "যমুনা সেতুর গুরুত্বপূর্ণ সাইট ক্লিয়ারেন্স এবং অবশিষ্ট রেমিডিয়াল সিভিল ওয়ার্কস।", image: "/assets/jamuna-bridge-DWAJN5oY.jpg" },
  { title: "RTIP-2 Road Project", titleBn: "RTIP-2 রোড প্রজেক্ট", type: "Infrastructure", typeBn: "অবকাঠামো", location: "Ghatail, Tangail · Ch. 15+800 → 14+800", locationBn: "ঘাটাইল, টাঙ্গাইল · চেইনেজ ১৫+৮০০ → ১৪+৮০০", description: "Roadway construction, repair and maintenance across a 1 km chainage section.", descriptionBn: "১ কি.মি. চেইনেজ অংশজুড়ে সড়ক নির্মাণ, মেরামত ও রক্ষণাবেক্ষণ কাজ।", image: "/assets/rtip2-ghatail-BjyhsUDn.jpg" },
  { title: "BRT Project (Airport → Gazipur)", titleBn: "বিআরটি প্রজেক্ট (এয়ারপোর্ট → গাজীপুর)", type: "Infrastructure", typeBn: "অবকাঠামো", location: "Dhaka–Gazipur Corridor", locationBn: "ঢাকা–গাজীপুর করিডোর", description: "Extensive cleaning, de-watering and pavement repair works along the BRT elevated corridor.", descriptionBn: "বিআরটি এলিভেটেড করিডোরজুড়ে ব্যাপক ক্লিনিং, ডি-ওয়াটারিং এবং পেভমেন্ট মেরামত কাজ।", image: "/assets/brt-airport-gazipur-BHRy-tFc.jpg" },
  { title: "Centeon Pharma — 3-Storey RCC Factory", titleBn: "সেন্টিয়ন ফার্মা — ৩-তলা আর.সি.সি ফ্যাক্টরি", type: "Industrial", typeBn: "শিল্প", location: "Mowna, Sreepur, Gazipur", locationBn: "মাওনা, শ্রীপুর, গাজীপুর", description: "45,000 sq.ft 3-storey RCC factory building, utility structures and 500 m boundary wall.", descriptionBn: "৪৫,০০০ স্কয়ার ফিটের ৩-তলা আর.সি.সি ফ্যাক্টরি বিল্ডিং, ইউটিলিটি স্ট্রাকচার ও ৫০০ মি. সীমানা প্রাচীর।", image: "/assets/centeon-pharma-Docq34Z7.jpg" },
  { title: "Pharmacil Ltd — 3-Storey Factory", titleBn: "ফার্মাসিল লিমিটেড — ৩-তলা ফ্যাক্টরি", type: "Industrial", typeBn: "শিল্প", location: "BSCIC, Tongi", locationBn: "বিসিক, টঙ্গী", description: "Construction of a 33,000 sq.ft 3-storey pharmaceutical factory building.", descriptionBn: "৩৩,০০০ স্কয়ার ফিটের ৩-তলা ফার্মাসিউটিক্যাল ফ্যাক্টরি বিল্ডিং নির্মাণ।", image: "/assets/pharmacil-tongi-CdLmYy7u.jpg" },
  { title: "Pharma Ashia Ltd — Site Development", titleBn: "ফার্মা এশিয়া লিমিটেড — সাইট ডেভেলপমেন্ট", type: "Industrial", typeBn: "শিল্প", location: "Rajendrapur, Gazipur", locationBn: "রাজেন্দ্রপুর, গাজীপুর", description: "General site development, protection-bund works and temporary site offices.", descriptionBn: "সাইট ডেভেলপমেন্ট, সাইট প্রোটেকশন বাঁধ নির্মাণ ও অস্থায়ী সাইট অফিস স্থাপন।", image: "/assets/pharma-ashia-site-BOvJJLGj.jpg" },
  { title: "Pharma Ashia — Bituminous Internal Road", titleBn: "ফার্মা এশিয়া — বিটুমিনাস ইন্টার্নাল রোড", type: "Roadways", typeBn: "সড়ক", location: "Gazipur · 400 m × 6 m", locationBn: "গাজীপুর · ৪০০ মি. × ৬ মি.", description: "Construction of an internal bituminous carpeting road, 400 m long × 6 m wide.", descriptionBn: "৪০০ মি. দৈর্ঘ্য × ৬ মি. প্রস্থের ইন্টার্নাল বিটুমিনাস কার্পেটিং রোড নির্মাণ।", image: "/assets/pharma-ashia-road-CqDGx7wV.jpg" },
  { title: "Centeon Pharma — RCC Internal Road", titleBn: "সেন্টিয়ন ফার্মা — আর.সি.সি ইন্টার্নাল রোড", type: "Roadways", typeBn: "সড়ক", location: "Gazipur · 300 m × 5.5 m", locationBn: "গাজীপুর · ৩০০ মি. × ৫.৫ মি.", description: "Construction of an internal RCC paved road, 300 m long × 5.5 m wide.", descriptionBn: "৩০০ মি. দৈর্ঘ্য × ৫.৫ মি. প্রস্থের ইন্টার্নাল আর.সি.সি পেভড রোড নির্মাণ।", image: "/assets/centeon-rcc-road-CfkOH6rw.jpg" },
  { title: "AMC Knit Composite — RCC Internal Road", titleBn: "এএমসি নিট কম্পোজিট — আর.সি.সি ইন্টার্নাল রোড", type: "Roadways", typeBn: "সড়ক", location: "Bhabanipur, Gazipur · 300 m × 5 m", locationBn: "ভবানীপুর, গাজীপুর · ৩০০ মি. × ৫ মি.", description: "Construction of an internal RCC paved road, 300 m long × 5 m wide.", descriptionBn: "৩০০ মি. দৈর্ঘ্য × ৫ মি. প্রস্থের ইন্টার্নাল আর.সি.সি পেভড রোড নির্মাণ।", image: "/assets/amc-knit-road-DimuXlSt.jpg" },
  { title: "SMC ORS — Underground RCC Reservoir", titleBn: "এসএমসি ওআরএস — ভূগর্ভস্থ আর.সি.সি রিজার্ভার", type: "Civil Works", typeBn: "সিভিল ওয়ার্কস", location: "Bhaluka, Mymensingh · 20 m × 10 m × 3 m", locationBn: "ভালুকা, ময়মনসিংহ · ২০ মি. × ১০ মি. × ৩ মি.", description: "Underground RCC reservoir for raw and treated water.", descriptionBn: "র' এবং ট্রিটেড পানির ভূগর্ভস্থ আর.সি.সি রিজার্ভার নির্মাণ।", image: "/assets/smc-reservoir-oJYMc6N8.jpg" },
  { title: "SMC ORS — 900 mm RCC Drainage Network", titleBn: "এসএমসি ওআরএস — ৯০০ মি.মি. আর.সি.সি ড্রেনেজ নেটওয়ার্ক", type: "Civil Works", typeBn: "সিভিল ওয়ার্কস", location: "Bhaluka, Mymensingh", locationBn: "ভালুকা, ময়মনসিংহ", description: "Internal and external 900 mm RCC pipe drainage installation and excavation.", descriptionBn: "অভ্যন্তরীণ ও বাহ্যিক ড্রেনেজের জন্য ৯০০ মি.মি. ব্যাসের আর.সি.সি পাইপ স্থাপন ও খনন।", image: "/assets/smc-drainage-pipes-ylQ0dxIR.jpg" },
  { title: "Nassa Super Garments — 800 mm RCC Drainage", titleBn: "নাসা সুপার গার্মেন্টস — ৮০০ মি.মি. আর.সি.সি ড্রেনেজ", type: "Civil Works", typeBn: "সিভিল ওয়ার্কস", location: "Ashulia, Savar", locationBn: "আশুলিয়া, সাভার", description: "Comprehensive 800 mm RCC pipe drainage installation and excavation works.", descriptionBn: "ব্যাপক ড্রেনেজ কাজের জন্য ৮০০ মি.মি. ব্যাসের আর.সি.সি পাইপ স্থাপন ও খনন।", image: "/assets/nassa-drainage-CdMrdjeZ.jpg" },
  { title: "Centeon Pharma — Effluent Treatment Plant", titleBn: "সেন্টিয়ন ফার্মা — এফ্লুয়েন্ট ট্রিটমেন্ট প্ল্যান্ট", type: "Civil Works", typeBn: "সিভিল ওয়ার্কস", location: "Gazipur · 12 m × 6 m", locationBn: "গাজীপুর · ১২ মি. × ৬ মি.", description: "12 m × 6 m RCC retaining wall for ETP and site protection.", descriptionBn: "১২ মি. × ৬ মি. ETP এবং সাইট সুরক্ষার জন্য আর.সি.সি রিটেইনিং ওয়াল নির্মাণ।", image: "/assets/centeon-etp-BxgQULpL.jpg" },
  { title: "AMC Knit Composite — RCC Retaining Wall", titleBn: "এএমসি নিট কম্পোজিট — আর.সি.সি রিটেইনিং ওয়াল", type: "Civil Works", typeBn: "সিভিল ওয়ার্কস", location: "Gazipur", locationBn: "গাজীপুর", description: "Robust RCC (Reinforced Concrete) retaining wall construction.", descriptionBn: "মজবুত আর.সি.সি (রিইনফোর্সড কংক্রিট) রিটেইনিং ওয়াল নির্মাণ।", image: "/assets/amc-retaining-wall-m2yZwpx8.jpg" },
];

export const brands = ["Liebherr", "Kato", "Sakai", "CAT", "Komatsu", "JCB", "Dynapac", "Bomag", "CASE", "XCMG"];
