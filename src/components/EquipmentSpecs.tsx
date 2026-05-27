import { MapPin, Calendar, Fuel, Wrench, FileText } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Equipment } from "@/data/equipment";

export default function EquipmentSpecs({ equipment }: { equipment: Equipment }) {
  const { t } = useLang();

  return (
    <>
      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { icon: Wrench, label: t("Capacity", "ক্ষমতা"), value: equipment.capacity },
          { icon: MapPin, label: t("Origin", "উৎপত্তি"), value: equipment.origin },
          { icon: Calendar, label: t("Year", "সাল"), value: String(equipment.year) },
          { icon: Fuel, label: t("Fuel", "জ্বালানি"), value: equipment.fuel },
        ].map(spec => (
          <div key={spec.label} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
              <spec.icon className="w-3.5 h-3.5" />
              {spec.label}
            </div>
            <p className="font-semibold">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Structured technical specifications table */}
      <div className="glass-card rounded-2xl overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
          <FileText className="w-4 h-4 text-orange-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-white/80">
            {t("Technical Specifications", "টেকনিক্যাল স্পেসিফিকেশন")}
          </h2>
        </div>
        <table className="w-full text-sm table-fixed">
          <tbody className="divide-y divide-white/5">
            {[
              { k: t("Model Number", "মডেল নম্বর"), v: equipment.model },
              { k: t("Lifting / Operating Capacity", "লিফটিং / অপারেটিং ক্ষমতা"), v: equipment.capacity },
              { k: t("Engine / Power", "ইঞ্জিন / পাওয়ার"), v: `${equipment.fuel}${equipment.notes ? ` · ${equipment.notes}` : ""}` },
              { k: t("Country of Origin", "উৎপত্তির দেশ"), v: equipment.origin },
              { k: t("Year of Manufacture", "নির্মাণ সাল"), v: String(equipment.year) },
              { k: t("Brand", "ব্র্যান্ড"), v: equipment.brand },
              { k: t("Asset ID", "অ্যাসেট আইডি"), v: equipment.id },
              { k: t("Quantity Available", "উপলব্ধ পরিমাণ"), v: `${equipment.quantity} ${t("Unit(s)", "ইউনিট")}` },
            ].map(row => (
              <tr key={row.k} className="align-top">
                <th scope="row" className="text-left px-4 sm:px-5 py-2.5 text-white/50 font-normal w-[46%] break-words">{row.k}</th>
                <td className="px-4 sm:px-5 py-2.5 text-white font-semibold break-words">{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
