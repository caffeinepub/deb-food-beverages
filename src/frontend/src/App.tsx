import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Leaf,
  Loader2,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { Category } from "./backend.d";
import { useActor } from "./hooks/useActor";

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const links = [
    { label: "Home", id: "home", ocid: "nav.home_link" },
    { label: "Products", id: "products", ocid: "nav.products_link" },
    { label: "About", id: "about", ocid: "nav.about_link" },
    { label: "Contact", id: "contact", ocid: "nav.contact_link" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-saffron/20 shadow-xs"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2.5 group"
            aria-label="Deb Food & Beverages home"
          >
            <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center shadow-saffron-sm group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-800 text-foreground text-sm tracking-tight">
                Deb Food &amp;
              </span>
              <span className="font-display font-800 text-saffron text-sm tracking-tight -mt-0.5">
                Beverages
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-saffron rounded-lg hover:bg-saffron/10 transition-all duration-200 font-body"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="ml-3 px-5 py-2 rounded-full btn-saffron text-sm"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-saffron/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-cream border-t border-saffron/15"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-foreground/70 hover:text-saffron hover:bg-saffron/10 font-semibold text-sm transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="w-full mt-2 px-5 py-2.5 rounded-full btn-saffron text-sm"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-sodas.dim_1200x600.jpg"
          alt="Deb Food & Beverages signature sodas"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Floating bubble decorations */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full border border-white/20 bg-white/5"
            style={{
              width: `${20 + i * 12}px`,
              height: `${20 + i * 12}px`,
              left: `${10 + i * 11}%`,
              bottom: `${10 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -(80 + i * 20), 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/90 text-primary-foreground text-sm font-bold mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-display tracking-wide">
              Born in India, Made for India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl font-900 leading-[0.9] tracking-tight text-white mb-6"
          >
            Refreshingly{" "}
            <span className="text-saffron drop-shadow-lg">Yours</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/85 text-xl sm:text-2xl font-body leading-relaxed mb-10 max-w-lg"
          >
            Taste the freshness of India in every sip. Crafted with quality
            ingredients for flavors that feel like home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-saffron text-base shadow-saffron-lg"
            >
              Explore Our Drinks
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 text-white font-display font-700 text-base hover:bg-white/15 hover:border-white transition-all duration-200"
            >
              Our Story
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────

type ProductCardProps = {
  name: string;
  tagline: string;
  image: string;
  index: number;
  ocidCard: string;
  ocidBtn: string;
  onInquire: () => void;
  color: "amber" | "yellow" | "green";
};

const colorConfig = {
  amber: {
    bg: "from-amber-50 to-orange-50",
    badge: "bg-saffron text-primary-foreground",
    btnClass: "btn-saffron",
    glow: "oklch(0.72 0.18 55 / 0.20)",
    accent: "border-saffron/30",
  },
  yellow: {
    bg: "from-yellow-50 to-amber-50",
    badge: "bg-yellow-400 text-yellow-900",
    btnClass: "btn-saffron",
    glow: "oklch(0.82 0.16 80 / 0.20)",
    accent: "border-yellow-400/40",
  },
  green: {
    bg: "from-green-50 to-emerald-50",
    badge: "bg-green-mango text-white",
    btnClass: "btn-green",
    glow: "oklch(0.68 0.22 140 / 0.20)",
    accent: "border-green-mango/30",
  },
};

function ProductCard({
  name,
  tagline,
  image,
  index,
  ocidCard,
  ocidBtn,
  onInquire,
  color,
}: ProductCardProps) {
  const cfg = colorConfig[color];

  return (
    <motion.div
      data-ocid={ocidCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative rounded-3xl bg-gradient-to-b ${cfg.bg} border-2 ${cfg.accent} overflow-hidden shadow-card group cursor-default`}
    >
      {/* Number badge */}
      <div
        className={`absolute top-4 left-4 z-10 w-8 h-8 rounded-full ${cfg.badge} flex items-center justify-center text-xs font-display font-900`}
      >
        0{index + 1}
      </div>

      {/* Product Image */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      {/* Card Body */}
      <div className="p-6 pt-4">
        <h3 className="font-display font-800 text-2xl text-foreground mb-1">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
          {tagline}
        </p>

        {/* Pricing row */}
        <div className="flex items-center gap-1.5 mb-5 flex-wrap">
          {[
            { size: "160ml", price: "₹10" },
            { size: "300ml", price: "₹20" },
            { size: "500ml", price: "₹40" },
          ].map(({ size, price }, idx) => (
            <span
              key={size}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-display font-700 ${cfg.badge}`}
            >
              <span className="opacity-75">{size}</span>
              <span className="opacity-40 mx-0.5">·</span>
              <span>{price}</span>
              {idx < 2 && (
                <span className="ml-1 text-foreground/20 font-normal hidden" />
              )}
            </span>
          ))}
        </div>

        <button
          type="button"
          data-ocid={ocidBtn}
          onClick={onInquire}
          className={`w-full py-3 px-6 rounded-xl ${cfg.btnClass} text-sm flex items-center justify-center gap-2`}
        >
          Inquire Now
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

const products = [
  {
    name: "Jeera Soda",
    tagline: "Bold & Zingy — the classic Indian cumin kick",
    image: "/assets/generated/product-jeera-soda.dim_400x500.png",
    interest: Category.jeeraSoda,
    color: "amber" as const,
    ocidCard: "products.item.1",
    ocidBtn: "products.inquire_button.1",
  },
  {
    name: "Lemon Soda",
    tagline: "Crisp & Tangy — a burst of fresh lemon",
    image: "/assets/generated/product-lemon-soda.dim_400x500.png",
    interest: Category.lemonSoda,
    color: "yellow" as const,
    ocidCard: "products.item.2",
    ocidBtn: "products.inquire_button.2",
  },
  {
    name: "Green Mango Soda",
    tagline: "Sweet & Sour — the taste of raw aam",
    image: "/assets/generated/product-green-mango-soda.dim_400x500.png",
    interest: Category.greenMangoSoda,
    color: "green" as const,
    ocidCard: "products.item.3",
    ocidBtn: "products.inquire_button.3",
  },
];

function ProductsSection({
  setContactProduct,
}: {
  setContactProduct: (p: Category) => void;
}) {
  const handleInquire = useCallback(
    (interest: Category) => {
      setContactProduct(interest);
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [setContactProduct],
  );

  return (
    <section
      id="products"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-saffron/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-green-mango/8 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/15 text-saffron text-sm font-display font-700 tracking-wider uppercase mb-4">
            Our Collection
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-900 text-foreground leading-tight mb-4">
            Three Flavours, <span className="text-saffron">One Passion</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto">
            Each soda is crafted to celebrate the bold, vibrant flavors of
            India. Pure. Refreshing. Unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              name={product.name}
              tagline={product.tagline}
              image={product.image}
              index={i}
              ocidCard={product.ocidCard}
              ocidBtn={product.ocidBtn}
              onInquire={() => handleInquire(product.interest)}
              color={product.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

const highlights = [
  {
    icon: Leaf,
    title: "Quality Ingredients",
    desc: "We source only the finest, freshest ingredients to craft every bottle.",
    color: "text-green-mango bg-green-mango/10",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Production",
    desc: "Our manufacturing follows strict hygiene standards at every step.",
    color: "text-saffron bg-saffron/10",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    desc: "Premium taste shouldn't cost a premium price. Refreshment for all.",
    color: "text-terracotta bg-terracotta/10",
  },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.06 50) 0%, oklch(0.16 0.05 45) 50%, oklch(0.14 0.04 140) 100%)",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.90 0.12 75) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/20 text-saffron text-sm font-display font-700 tracking-wider uppercase mb-5 border border-saffron/30">
              Our Story
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-900 text-white leading-[0.95] mb-6">
              Born in India,{" "}
              <span className="text-saffron">Made for India.</span>
            </h2>
            <p className="text-white/75 text-lg font-body leading-relaxed mb-4">
              At Deb Food &amp; Beverages, we believe great-tasting drinks
              should be within everyone's reach. Our sodas are crafted with
              quality ingredients, maintaining the highest hygiene standards, to
              bring you flavors that remind you of home.
            </p>
            <p className="text-white/60 text-base font-body leading-relaxed">
              From the earthy warmth of jeera to the bright tang of fresh lemon,
              and the nostalgic sweetness of raw mango — every sip is a
              celebration of Indian flavors, bottled with love.
            </p>
          </motion.div>

          {/* Highlight Cards */}
          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm hover:bg-white/12 transition-colors"
              >
                <div className={`p-3 rounded-xl ${item.color} shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-white text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Distribution Section ─────────────────────────────────────────────────────

const distributionChannels = [
  {
    icon: Store,
    title: "Local Retail Shops",
    desc: "Available at kirana stores and local shops near you",
    color: "bg-saffron/15 text-saffron border-saffron/25",
  },
  {
    icon: ShoppingCart,
    title: "Supermarkets",
    desc: "Find us in the beverages aisle of major supermarkets",
    color: "bg-green-mango/15 text-green-mango border-green-mango/25",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafes",
    desc: "The perfect accompaniment for any meal at restaurants",
    color: "bg-terracotta/15 text-terracotta border-terracotta/25",
  },
  {
    icon: Users,
    title: "Direct Consumers",
    desc: "Bulk orders and direct purchasing for households",
    color: "bg-amber-400/20 text-amber-700 border-amber-400/30",
  },
];

function DistributionSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-saffron/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/15 text-saffron text-sm font-display font-700 tracking-wider uppercase mb-4">
            Availability
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-900 text-foreground leading-tight">
            Where to <span className="text-saffron">Find Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {distributionChannels.map((channel, i) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`p-6 rounded-2xl border-2 ${channel.color} text-center transition-shadow hover:shadow-card`}
            >
              <div className="inline-flex p-4 rounded-xl bg-white/60 mb-4 shadow-xs">
                <channel.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-700 text-foreground text-lg mb-2">
                {channel.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {channel.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Inquiry Form ───────────────────────────────────────────────────

const productOptions = [
  { value: Category.jeeraSoda, label: "Jeera Soda" },
  { value: Category.lemonSoda, label: "Lemon Soda" },
  { value: Category.greenMangoSoda, label: "Green Mango Soda" },
  { value: Category.general, label: "General Inquiry" },
];

function ContactSection({
  defaultProduct,
}: { defaultProduct: Category | null }) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [productInterest, setProductInterest] = useState<Category>(
    defaultProduct ?? Category.general,
  );

  // Sync default product when it changes (from "Inquire Now" button)
  const prevDefaultRef = useRef<Category | null>(null);
  if (defaultProduct !== null && defaultProduct !== prevDefaultRef.current) {
    prevDefaultRef.current = defaultProduct;
    setProductInterest(defaultProduct);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.submitInquiry(name, email, message, productInterest);
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setMessage("");
      setProductInterest(Category.general);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.96 0.02 75) 0%, oklch(0.93 0.05 70) 100%)",
      }}
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-green-mango/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/20 text-saffron text-sm font-display font-700 tracking-wider uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-900 text-foreground leading-tight mb-4">
            Let's <span className="text-saffron">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Interested in stocking our sodas or have a question? Reach out and
            we'll get back to you promptly.
          </p>

          {/* Direct contact links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
          >
            <a
              data-ocid="contact.phone_link"
              href="tel:+919588892607"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-saffron/12 border border-saffron/25 text-foreground hover:bg-saffron/20 hover:border-saffron/40 transition-all duration-200 font-body text-sm font-600 group"
            >
              <Phone className="w-4 h-4 text-saffron group-hover:scale-110 transition-transform" />
              +91 95888 92607
            </a>
            <a
              data-ocid="contact.email_link"
              href="mailto:ankushdeb83@gmail.com"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-saffron/12 border border-saffron/25 text-foreground hover:bg-saffron/20 hover:border-saffron/40 transition-all duration-200 font-body text-sm font-600 group"
            >
              <Mail className="w-4 h-4 text-saffron group-hover:scale-110 transition-transform" />
              ankushdeb83@gmail.com
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-saffron/15"
        >
          <AnimatePresence mode="wait">
            {mutation.isSuccess ? (
              <motion.div
                key="success"
                data-ocid="contact.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-mango/15 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-mango" />
                </div>
                <h3 className="font-display font-800 text-2xl text-foreground mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-muted-foreground font-body">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => mutation.reset()}
                  className="mt-6 px-6 py-2.5 rounded-full btn-saffron text-sm"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="font-display font-600 text-foreground"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.name_input"
                      placeholder="Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-xl border-border focus:border-saffron focus:ring-saffron/30 bg-background font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="font-display font-600 text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      data-ocid="contact.email_input"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-xl border-border focus:border-saffron focus:ring-saffron/30 bg-background font-body"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-display font-600 text-foreground">
                    Product Interest
                  </Label>
                  <Select
                    value={productInterest}
                    onValueChange={(v) => setProductInterest(v as Category)}
                  >
                    <SelectTrigger
                      data-ocid="contact.product_select"
                      className="rounded-xl border-border focus:border-saffron focus:ring-saffron/30 bg-background font-body"
                    >
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="font-body"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="font-display font-600 text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.message_textarea"
                    placeholder="Tell us about your interest — bulk orders, partnerships, or just a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="rounded-xl border-border focus:border-saffron focus:ring-saffron/30 bg-background font-body resize-none"
                  />
                </div>

                {/* Error state */}
                <AnimatePresence>
                  {mutation.isError && (
                    <motion.div
                      data-ocid="contact.error_state"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 p-4 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-sm font-body"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>
                        Something went wrong. Please try again or contact us
                        directly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full py-3.5 px-6 rounded-xl btn-saffron text-base flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2
                        data-ocid="contact.loading_state"
                        className="w-4 h-4 animate-spin"
                      />
                      Sending Inquiry...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="py-12 border-t border-saffron/15 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.05 45) 0%, oklch(0.14 0.04 40) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.90 0.12 75) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="font-display font-800 text-white text-sm">
                Deb Food &amp; Beverages
              </span>
              <span className="font-display text-saffron text-xs -mt-0.5">
                Refreshingly Yours
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-sm font-body max-w-sm">
            Crafted with quality. Bottled with love. Made for India.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
            <a
              data-ocid="footer.phone_link"
              href="tel:+919588892607"
              className="inline-flex items-center gap-2 text-white/55 hover:text-saffron text-xs font-body transition-colors duration-200 group"
            >
              <Phone className="w-3.5 h-3.5 text-saffron/70 group-hover:text-saffron transition-colors shrink-0" />
              +91 95888 92607
            </a>
            <span className="hidden sm:inline text-white/20 text-xs">·</span>
            <a
              data-ocid="footer.email_link"
              href="mailto:ankushdeb83@gmail.com"
              className="inline-flex items-center gap-2 text-white/55 hover:text-saffron text-xs font-body transition-colors duration-200 group"
            >
              <Mail className="w-3.5 h-3.5 text-saffron/70 group-hover:text-saffron transition-colors shrink-0" />
              ankushdeb83@gmail.com
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 my-2" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-white/35 text-xs font-body">
            <span>© {year} Deb Food &amp; Beverages. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron hover:text-saffron/80 transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [contactProduct, setContactProduct] = useState<Category | null>(null);

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection setContactProduct={setContactProduct} />
        <AboutSection />
        <DistributionSection />
        <ContactSection defaultProduct={contactProduct} />
      </main>
      <Footer />
    </div>
  );
}
