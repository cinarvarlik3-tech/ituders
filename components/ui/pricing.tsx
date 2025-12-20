"use client";

import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/base-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { BentoPricing } from "@/components/ui/bento-pricing";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans?: PricingPlan[];
  title?: string;
  description?: string;
}

type PlanType = "ozel-ders" | "kamp" | "derece-koclugu";

const ozelDersPlans: PricingPlan[] = [
  {
    name: "Deneme Dersi",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "50 dakikalık deneme dersi",
      "Öğretmen tanışması",
      "Seviye tespiti",
      "Eğitim planı önerisi",
      "Tamamen ücretsiz",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Hemen Başla",
    href: "https://wa.me/905551839644?text=Ücretsiz%20deneme%20dersi%20almak%20istiyorum.",
    isPopular: false,
  },
  {
    name: "2+ Ders Paketi",
    price: "850",
    yearlyPrice: "680",
    period: "Ders",
    features: [
      "50 dakikalık özel ders",
      "Ücretsiz ders materyali",
      "Ödevlendirme ve takip",
      "WhatsApp desteği",
      "Ücretsiz soru çözümü",
      "Detaylı performans raporu",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Paket Seç",
    href: "https://wa.me/905551839644?text=Özel%20ders%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: true,
  },
  {
    name: "Tek Ders",
    price: "950",
    yearlyPrice: "760",
    period: "Ders",
    features: [
      "50 dakika özel ders",
      "Ücretsiz ders materyali desteği",
      "Ödevlendirme ve takip",
      "WhatsApp desteği",
      "Ücretsiz soru çözümü",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Paket Seç",
    href: "https://wa.me/905551839644?text=Özel%20ders%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: false,
  },
];

const kampPlans: PricingPlan[] = [
  {
    name: "Haftalık Kamp",
    price: "2500",
    yearlyPrice: "2000",
    period: "Hafta",
    features: [
      "5 gün yoğun program",
      "Günlük 4 saat ders",
      "Özel ders materyalleri",
      "Günlük ödev takibi",
      "WhatsApp desteği",
      "Haftalık değerlendirme",
    ],
    description: "Kısa süreli yoğun hazırlık için ideal",
    buttonText: "Kamp Seç",
    href: "https://wa.me/905551839644?text=LGS%20Kamp%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: false,
  },
  {
    name: "Aylık Kamp",
    price: "8000",
    yearlyPrice: "6400",
    period: "Ay",
    features: [
      "20 gün yoğun program",
      "Günlük 4 saat ders",
      "Özel ders materyalleri",
      "Günlük ödev takibi",
      "7/24 WhatsApp desteği",
      "Haftalık değerlendirme",
      "Kişisel çalışma planı",
      "Motivasyon koçluğu",
    ],
    description: "Uzun vadeli hazırlık için en popüler seçenek",
    buttonText: "Kamp Seç",
    href: "https://wa.me/905551839644?text=LGS%20Kamp%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: true,
  },
  {
    name: "Özel Kamp Programı",
    price: "15000",
    yearlyPrice: "12000",
    period: "Program",
    features: [
      "Özelleştirilmiş program",
      "Esnek ders saatleri",
      "Tüm ders materyalleri",
      "7/24 destek",
      "Aylık değerlendirme",
      "Kişisel mentor",
      "Özel çalışma stratejileri",
    ],
    description: "Size özel tasarlanmış kamp programı",
    buttonText: "İletişime Geç",
    href: "/contact",
    isPopular: false,
  },
];

const dereceKocluguPlans: PricingPlan[] = [
  {
    name: "Temel Koçluk",
    price: "1300",
    yearlyPrice: "1040",
    period: "Ay",
    features: [
      "Aylık 2 koçluk seansı",
      "Hedef belirleme",
      "Çalışma planı oluşturma",
      "WhatsApp desteği",
      "Motivasyon desteği",
    ],
    description: "Derece hedefi olan öğrenciler için temel koçluk",
    buttonText: "Hemen Başlayın",
    href: "https://wa.me/905551839644?text=YKS%20Koçluk%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: false,
  },
  {
    name: "Tam Koçluk",
    price: "2600",
    yearlyPrice: "2340",
    period: "Ay",
    features: [
      "Haftalık koçluk seansları",
      "Hedef belirleme ve strateji",
      "Kişiselleştirilmiş çalışma planı",
      "Haftalık takip görüşmesi",
      "7/24 WhatsApp desteği",
      "Performans analizi",
      "Stres yönetimi",
      "Sınav stratejileri",
    ],
    description: "Derece hedefi için en kapsamlı koçluk programı",
    buttonText: "Hemen Başlayın",
    href: "https://wa.me/905551839644?text=YKS%20Koçluk%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: true,
  },
  {
    name: "VIP Koçluk",
    price: "8000",
    yearlyPrice: "7200",
    period: "Ay",
    features: [
      "Haftalık 2 koçluk seansı",
      "Kişisel mentor ataması",
      "Özel strateji geliştirme",
      "Günlük takip görüşmeleri",
      "7/24 öncelikli destek",
      "Detaylı performans raporları",
      "Stres ve kaygı yönetimi",
      "Özel sınav teknikleri",
      "Hedef odaklı motivasyon",
    ],
    description: "En üst düzey derece koçluğu için özel program",
    buttonText: "Hemen Başlayın",
    href: "https://wa.me/905551839644?text=YKS%20Koçluk%20paketleriyle%20ilgili%20bilgi%20istiyorum",
    isPopular: false,
  },
];

export function Pricing({
  plans,
  title = "Hemen Başlayın",
  description = "Sizin için en iyi planı seçin, emin değilseniz ücretsiz eğitim danışmanlığı için bize WhatsApp'tan ulaşabilirsiniz.",
}: PricingProps) {
  const [activePlanType, setActivePlanType] = useState<PlanType>("kamp");
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const planSets: Record<PlanType, PricingPlan[]> = {
    "ozel-ders": ozelDersPlans,
    "kamp": kampPlans,
    "derece-koclugu": dereceKocluguPlans,
  };

  const currentPlans = plans || planSets[activePlanType];

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <Button
            variant={activePlanType === "ozel-ders" ? "primary" : "ghost"}
            appearance={activePlanType === "ozel-ders" ? "default" : "ghost"}
            className={cn(
              "scale-[1.3] text-[#3D3072] transition-all duration-200 relative z-0",
              activePlanType === "ozel-ders"
                ? "bg-[#3D3072] text-white hover:bg-[#3D3072]/90 hover:scale-[1.32]"
                : "hover:bg-[#3D3072]/10 hover:scale-[1.32]"
            )}
            onClick={() => setActivePlanType("ozel-ders")}
          >
            Özel Ders
          </Button>
          <Button
            variant={activePlanType === "kamp" ? "primary" : "ghost"}
            appearance={activePlanType === "kamp" ? "default" : "ghost"}
            className={cn(
              "scale-[1.3] text-[#3D3072] transition-all duration-200 relative z-0",
              activePlanType === "kamp"
                ? "bg-[#3D3072] text-white hover:bg-[#3D3072]/90 hover:scale-[1.32]"
                : "hover:bg-[#3D3072]/10 hover:scale-[1.32]"
            )}
            onClick={() => setActivePlanType("kamp")}
          >
            LGS Kamp
          </Button>
          <Button
            variant={activePlanType === "derece-koclugu" ? "primary" : "ghost"}
            appearance={activePlanType === "derece-koclugu" ? "default" : "ghost"}
            className={cn(
              "scale-[1.3] text-[#3D3072] transition-all duration-200 relative z-0",
              activePlanType === "derece-koclugu"
                ? "bg-[#3D3072] text-white hover:bg-[#3D3072]/90 hover:scale-[1.32]"
                : "hover:bg-[#3D3072]/10 hover:scale-[1.32]"
            )}
            onClick={() => setActivePlanType("derece-koclugu")}
          >
            YKS Koçluğu
          </Button>
        </div>
      </div>

      {activePlanType === "kamp" ? (
        <div className="mt-8">
          <BentoPricing />
        </div>
      ) : (
        <>
          {activePlanType !== "ozel-ders" && (
            <div className="flex justify-center mb-10">
              <label className="relative inline-flex items-center cursor-pointer">
                <Label>
                  <Switch
                    ref={switchRef as any}
                    checked={!isMonthly}
                    onCheckedChange={handleToggle}
                    className="relative"
                  />
                </Label>
              </label>
              <span className="ml-2 font-semibold">
                Yıllık peşin ödeme <span className="text-primary">(%10 İndirim)</span>
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {currentPlans.map((plan, index) => (
          <motion.div
            key={`${activePlanType}-${index}`}
            initial={{ y: 50, opacity: 0 }}
            animate={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : { y: 0, opacity: 1 }
            }
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-[#3D3072] border-2" : "border-border",
              "flex flex-col",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#3D3072] py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white ml-1 font-sans font-semibold">
                  Popüler
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                {plan.name === "Deneme Dersi" ? (
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    Ücretsiz
                  </span>
                ) : (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-foreground">
                      <NumberFlow
                        value={
                          activePlanType !== "ozel-ders" && !isMonthly
                            ? Number(plan.yearlyPrice)
                            : Number(plan.price)
                        }
                        format={{
                          style: "decimal",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                        className="font-variant-numeric: tabular-nums"
                      />
                      <span>₺</span>
                    </span>
                    {plan.period !== "Next 3 months" && (
                      <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        / {plan.period}
                      </span>
                    )}
                  </>
                )}
              </div>

              {activePlanType !== "ozel-ders" && activePlanType !== "derece-koclugu" && plan.name !== "Deneme Dersi" && (
                <p className="text-xs leading-5 text-muted-foreground">
                  {isMonthly ? "aylık ödeme" : "yıllık ödeme"}
                </p>
              )}

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={cn("h-4 w-4 mt-1 flex-shrink-0", plan.isPopular ? "text-[#3D3072]" : "text-[#5A6DA4]")} />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              {plan.href.startsWith('http') ? (
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                    plan.isPopular
                      ? "bg-[#3D3072] text-white hover:ring-2 hover:ring-[#3D3072] hover:ring-offset-1 hover:bg-[#3D3072]/90 hover:text-white"
                      : "bg-background text-foreground hover:ring-2 hover:ring-[#5A6DA4] hover:ring-offset-1 hover:bg-[#5A6DA4] hover:text-white"
                  )}
                >
                  {plan.buttonText}
                </a>
              ) : (
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                    plan.isPopular
                      ? "bg-[#3D3072] text-white hover:ring-2 hover:ring-[#3D3072] hover:ring-offset-1 hover:bg-[#3D3072]/90 hover:text-white"
                      : "bg-background text-foreground hover:ring-2 hover:ring-[#5A6DA4] hover:ring-offset-1 hover:bg-[#5A6DA4] hover:text-white"
                  )}
                >
                  {plan.buttonText}
                </Link>
              )}
            </div>
          </motion.div>
        ))}
          </div>
        </>
      )}
    </div>
  );
}

