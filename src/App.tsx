import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/hooks/useLang";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";

// Code-split non-landing routes — keeps the initial JS bundle small
const Equipment = lazy(() => import("./pages/Equipment"));
const EquipmentDetail = lazy(() => import("./pages/EquipmentDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/:category" element={<Equipment />} />
                <Route path="/equipment/:category/:id" element={<EquipmentDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          <CartDrawer />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LangProvider>
  </QueryClientProvider>
);

export default App;
