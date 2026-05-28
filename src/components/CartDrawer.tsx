import { ShoppingCart, X, Minus, Plus, Trash2, MapPin, CalendarDays, FileText, AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useCart, CartItem } from "@/hooks/useCart";
import { useLang } from "@/hooks/useLang";

export function CartButton() {
  const { count, setOpen } = useCart();
  const { t } = useLang();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={t("Open cart", "কার্ট খুলুন")}
      className="relative w-10 h-10 rounded-full glass hover:bg-white/15 flex items-center justify-center text-white transition-colors"
    >
      <ShoppingCart className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-orange-500/40">
          {count}
        </span>
      )}
    </button>
  );
}


function useCartProjectForm(t: (en: string, bn: string) => string, setOpen: (o: boolean) => void) {
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const errors = useMemo(() => {
    const e: { location?: string; start?: string; end?: string } = {};
    if (location.trim().length < 2) e.location = t("Please enter a project location.", "প্রজেক্ট লোকেশন লিখুন।");
    if (location.trim().length > 120) e.location = t("Location must be under 120 characters.", "লোকেশন ১২০ অক্ষরের কম হতে হবে।");
    if (!start) e.start = t("Pick a start date.", "শুরুর তারিখ বেছে নিন।");
    else if (start < today) e.start = t("Start date can't be in the past.", "শুরুর তারিখ অতীত হতে পারবে না।");
    if (!end) e.end = t("Pick an end date.", "শেষের তারিখ বেছে নিন।");
    else if (start && end < start) e.end = t("End date must be on or after start.", "শেষের তারিখ শুরুর পরে হতে হবে।");
    return e;
  }, [location, start, end, today, t]);

  const isValid = Object.keys(errors).length === 0;
  const safeNote = note.slice(0, 1000);

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isValid) {
      e.preventDefault();
      setTouched(true);
      const first = errors.location || errors.start || errors.end;
      if (first) toast.error(first);
      return;
    }
    setOpen(false);
  };

  const fieldErr = (k: "location" | "start" | "end") => touched && errors[k];

  return {
    location, setLocation,
    start, setStart,
    end, setEnd,
    note, setNote,
    touched, setTouched,
    today, errors, isValid, safeNote,
    handleCheckout, fieldErr
  };
}

function EmptyCart({ t }: { t: (en: string, bn: string) => string }) {
  return (
    <div className="text-center py-20">
      <ShoppingCart className="w-12 h-12 mx-auto text-white/20 mb-4" />
      <p className="text-white/60 text-sm">{t("Your cart is empty.", "আপনার কার্ট খালি।")}</p>
      <p className="text-white/30 text-xs mt-2">{t("Add equipment to request a combined quotation.", "একসাথে কোটেশনের জন্য ইকুইপমেন্ট যোগ করুন।")}</p>
    </div>
  );
}

function CartItemRow({ it, setQty, remove, t }: { it: CartItem, setQty: (id: string, qty: number) => void, remove: (id: string) => void, t: (en: string, bn: string) => string }) {
  return (
    <div key={it.id} className="glass-card rounded-xl p-3 flex gap-3">
      {it.image && <img src={it.image} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono text-orange-300/80">{it.id}</p>
        <p className="text-sm font-semibold text-white line-clamp-2">{it.name}</p>
        <p className="text-[11px] text-white/50 mt-0.5">{it.brand} · {it.capacity}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 glass rounded-full">
            <button onClick={() => setQty(it.id, it.qty - 1)} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-orange-400" aria-label="-"><Minus className="w-3 h-3" /></button>
            <span className="text-xs font-semibold text-white w-5 text-center">{it.qty}</span>
            <button onClick={() => setQty(it.id, it.qty + 1)} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-orange-400" aria-label="+"><Plus className="w-3 h-3" /></button>
          </div>
          <button onClick={() => remove(it.id)} className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-red-400" aria-label={t("Remove", "মুছুন")}>
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailsForm({ form, t }: { form: ReturnType<typeof useCartProjectForm>, t: (en: string, bn: string) => string }) {
  const { location, setLocation, setTouched, fieldErr, errors, start, today, setStart, end, setEnd, note, setNote } = form;
  return (
    <div className="pt-4 mt-4 border-t border-orange-500/30">
      <p className="text-[11px] font-bold tracking-[0.24em] text-orange-300 uppercase mb-3">{t("Project Details", "প্রজেক্ট ডিটেইলস")}</p>
      <label className="block">
        <span className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5"><MapPin className="w-3 h-3 text-orange-400" /> {t("Location", "লোকেশন")} <span className="text-orange-400">*</span></span>
        <input
          type="text"
          value={location}
          maxLength={120}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={t("Dhaka, Tangail, Mymensingh…", "ঢাকা, টাঙ্গাইল, ময়মনসিংহ…")}
          aria-invalid={!!fieldErr("location")}
          className={`w-full bg-white/5 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none ${fieldErr("location") ? "border-red-500/70 focus:border-red-500" : "border-white/10 focus:border-orange-500/60"}`}
        />
        {fieldErr("location") && <span className="mt-1 flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="w-3 h-3" />{errors.location}</span>}
      </label>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <label className="block">
          <span className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5"><CalendarDays className="w-3 h-3 text-orange-400" /> {t("Start", "শুরু")} <span className="text-orange-400">*</span></span>
          <input
            type="date"
            value={start}
            min={today}
            onChange={(e) => setStart(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={!!fieldErr("start")}
            className={`w-full bg-white/5 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none ${fieldErr("start") ? "border-red-500/70 focus:border-red-500" : "border-white/10 focus:border-orange-500/60"}`}
          />
          {fieldErr("start") && <span className="mt-1 flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="w-3 h-3" />{errors.start}</span>}
        </label>
        <label className="block">
          <span className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5"><CalendarDays className="w-3 h-3 text-orange-400" /> {t("End", "শেষ")} <span className="text-orange-400">*</span></span>
          <input
            type="date"
            value={end}
            min={start || today}
            onChange={(e) => setEnd(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={!!fieldErr("end")}
            className={`w-full bg-white/5 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none ${fieldErr("end") ? "border-red-500/70 focus:border-red-500" : "border-white/10 focus:border-orange-500/60"}`}
          />
          {fieldErr("end") && <span className="mt-1 flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="w-3 h-3" />{errors.end}</span>}
        </label>
      </div>
      <label className="block mt-3">
        <span className="flex items-center justify-between text-xs text-white/70 mb-1.5">
          <span className="flex items-center gap-1.5"><FileText className="w-3 h-3 text-orange-400" /> {t("Note", "নোট")}</span>
          <span className="text-[10px] text-white/30">{note.length}/1000</span>
        </span>
        <textarea
          value={note}
          maxLength={1000}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder={t("Site access, working hours, special requirements…", "সাইট অ্যাক্সেস, কাজের সময়, বিশেষ প্রয়োজন…")}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/60 resize-none"
        />
      </label>
    </div>
  );
}

function CartFooter({ form, clear, whatsappCheckoutUrl, t }: { form: ReturnType<typeof useCartProjectForm>, clear: () => void, whatsappCheckoutUrl: (note?: string, project?: { location?: string; start?: string; end?: string }) => string, t: (en: string, bn: string) => string }) {
  const { touched, isValid, location, start, end, safeNote, handleCheckout } = form;
  return (
    <footer className="p-5 border-t border-white/10 space-y-2 bg-[hsl(220_20%_8%)]">
      {touched && !isValid && (
        <p className="flex items-center gap-1.5 text-[11px] text-red-400 px-1"><AlertCircle className="w-3 h-3" />{t("Please complete the required project details above.", "দয়া করে উপরের প্রজেক্ট তথ্যগুলি পূরণ করুন।")}</p>
      )}
      <a
        href={isValid ? whatsappCheckoutUrl(safeNote, { location: location.trim(), start, end }) : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCheckout}
        aria-disabled={!isValid}
        aria-describedby="cart-cta-hint"
        title={isValid ? t("Send your quotation to ATDB on WhatsApp", "হোয়াটসঅ্যাপে ATDB-কে কোটেশন পাঠান") : t("Add Location, Start and End dates to enable WhatsApp checkout.", "WhatsApp চেকআউট চালু করতে লোকেশন, শুরুর ও শেষের তারিখ দিন।")}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm shadow-xl transition-colors ${isValid ? "bg-green-600 hover:bg-green-500 shadow-green-600/20" : "bg-white/10 hover:bg-white/15 cursor-not-allowed shadow-none"}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
        {t("Send Quote on WhatsApp", "হোয়াটসঅ্যাপে কোটেশন পাঠান")}
      </a>
      <p id="cart-cta-hint" className="sr-only">
        {isValid
          ? t("Opens WhatsApp with your quotation prefilled.", "আপনার কোটেশন প্রি-ফিল করে হোয়াটসঅ্যাপ খুলবে।")
          : t("Disabled until Location, Start and End dates are valid.", "লোকেশন, শুরুর ও শেষের তারিখ ঠিক না করা পর্যন্ত নিষ্ক্রিয়।")}
      </p>
      <button onClick={clear} className="w-full text-xs text-white/40 hover:text-white/70 py-2">
        {t("Clear cart", "কার্ট খালি করুন")}
      </button>
    </footer>
  );
}

export default function CartDrawer() {
  const { items, open, setOpen, remove, setQty, clear, whatsappCheckoutUrl, count } = useCart();
  const { t } = useLang();

  const form = useCartProjectForm(t, setOpen);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cart-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex justify-end"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.2, 0.7, 0.2, 1], duration: 0.35 }}
            className="relative w-full max-w-md h-full bg-[hsl(220_20%_10%)] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-400" />
                <h3 className="font-display font-bold text-lg text-white">{t("Quotation Cart", "কোটেশন কার্ট")}</h3>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold">{count} {t("Unit(s)", "ইউনিট")}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t("Close", "বন্ধ")} className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70">
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <EmptyCart t={t} />
              ) : (
                <>
                  {items.map(it => (
                    <CartItemRow key={it.id} it={it} setQty={setQty} remove={remove} t={t} />
                  ))}
                  <ProjectDetailsForm form={form} t={t} />
                </>
              )}
            </div>

            {items.length > 0 && (
              <CartFooter form={form} clear={clear} whatsappCheckoutUrl={whatsappCheckoutUrl} t={t} />
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
