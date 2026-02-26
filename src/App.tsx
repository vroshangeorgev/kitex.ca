import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Star,
  Search,
  Menu,
  ChevronDown,
  Filter,
  X,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  RefreshCcw,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Grid3X3,
  List,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Package,
  Award,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: 'boys' | 'girls' | 'infants';
  ageRange: string;
  brand: string;
  manufacturer: string;
  countryOfOrigin: string;
  material: string;
  amazonLink: string;
  prime: boolean;
  bestseller?: boolean;
  description: string;
  features: string[];
  asin: string;
}

const products: Product[] = [
  // Boys Products
  {
    id: 1,
    name: "Classic Cotton Oxford Shirt",
    price: 24.50,
    originalPrice: 32.00,
    rating: 4.8,
    reviews: 1240,
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Tailored Kids",
    manufacturer: "Tailored Kids International Ltd.",
    countryOfOrigin: "Portugal",
    material: "100% Organic Cotton",
    amazonLink: "https://amazon.com/s?k=boys+oxford+shirt+kids",
    prime: true,
    bestseller: true,
    description: "Premium cotton blend with classic oxford weave. Machine washable, wrinkle-resistant finish. This elegant shirt is perfect for school, special occasions, or everyday smart dressing.",
    features: ["Machine washable", "Wrinkle-resistant finish", "Reinforced collar & cuffs", "GOTS-certified organic cotton"],
    asin: "B09XK1234"
  },
  {
    id: 2,
    name: "Slim Fit Indigo Denim Jeans",
    price: 29.99,
    rating: 4.5,
    reviews: 850,
    images: [
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '5-10',
    brand: "Heritage Denim",
    manufacturer: "Heritage Denim Co.",
    countryOfOrigin: "Turkey",
    material: "98% Cotton, 2% Elastane",
    amazonLink: "https://amazon.com/s?k=boys+slim+fit+denim+jeans+kids",
    prime: true,
    description: "Comfort stretch denim with adjustable waistband. Durable construction for active play, with a classic 5-pocket design. These jeans move with your child all day long.",
    features: ["Adjustable inner waistband", "Comfort stretch fabric", "Reinforced knees", "Classic 5-pocket design"],
    asin: "B09XK5678"
  },
  {
    id: 3,
    name: "Essential Cashmere Blend Sweater",
    price: 34.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 520,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Little Luxury",
    manufacturer: "Little Luxury Knitwear Ltd.",
    countryOfOrigin: "Scotland, UK",
    material: "70% Merino Wool, 30% Cashmere",
    amazonLink: "https://amazon.com/s?k=boys+cashmere+sweater+kids",
    prime: true,
    bestseller: true,
    description: "Soft cashmere blend with ribbed cuffs and hem. Perfect for layering during cooler months, this sweater offers unmatched warmth without bulk, keeping your child comfortable in style.",
    features: ["Ribbed cuffs & hem", "Hand-washable", "Pilling resistant", "Naturally temperature regulating"],
    asin: "B09XK9012"
  },
  {
    id: 4,
    name: "Modern Chino Shorts",
    price: 19.50,
    rating: 4.4,
    reviews: 420,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '5-10',
    brand: "Prep Collection",
    manufacturer: "Prep Collection Europe",
    countryOfOrigin: "Spain",
    material: "100% Cotton Twill",
    amazonLink: "https://amazon.com/s?k=boys+chino+shorts+kids",
    prime: true,
    description: "Classic chino styling with modern comfort fit. Wrinkle-resistant fabric ideal for school or special occasions. Features a flat-front design with a half-elasticated waistband.",
    features: ["Half-elasticated waistband", "Wrinkle resistant", "Front & back pockets", "Flat-front design"],
    asin: "B09XK3456"
  },
  {
    id: 5,
    name: "Signature Pique Polo Shirt",
    price: 22.00,
    rating: 4.7,
    reviews: 1100,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Tailored Kids",
    manufacturer: "Tailored Kids International Ltd.",
    countryOfOrigin: "Portugal",
    material: "100% Pique Cotton",
    amazonLink: "https://amazon.com/s?k=boys+pique+polo+shirt+kids",
    prime: true,
    description: "Pique cotton polo with mother-of-pearl buttons. Breathable fabric perfect for everyday wear. The classic three-button placket and ribbed collar add a touch of sophistication.",
    features: ["Mother-of-pearl buttons", "Ribbed collar & cuffs", "Breathable pique weave", "Machine washable"],
    asin: "B09XK7890"
  },
  {
    id: 6,
    name: "Quilted Winter Parka",
    price: 34.99,
    originalPrice: 55.00,
    rating: 4.8,
    reviews: 210,
    images: [
      "https://images.unsplash.com/photo-1544923408-75c774c94a6d?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Arctic Edge",
    manufacturer: "Arctic Edge Outerwear",
    countryOfOrigin: "Canada",
    material: "Shell: 100% Nylon, Fill: 90% Down",
    amazonLink: "https://amazon.com/s?k=boys+quilted+winter+parka+kids",
    prime: true,
    bestseller: true,
    description: "Water-resistant quilted parka with fleece-lined hood. Warmth rated for temperatures down to -10°C. Multiple pockets including a hidden internal security pocket for essentials.",
    features: ["Water-resistant outer shell", "Fleece-lined hood", "Rated to -10°C", "Multiple secure pockets"],
    asin: "B09XK2345"
  },
  {
    id: 7,
    name: "Linen Blend Summer Trousers",
    price: 26.00,
    rating: 4.6,
    reviews: 180,
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '5-10',
    brand: "Heritage Collection",
    manufacturer: "Heritage Collection Ltd.",
    countryOfOrigin: "Italy",
    material: "55% Linen, 45% Cotton",
    amazonLink: "https://amazon.com/s?k=boys+linen+trousers+kids",
    prime: true,
    description: "Lightweight linen blend for summer comfort. Elastic waistband with adjustable drawstring for a perfect fit. These breathable trousers keep kids cool during warm weather.",
    features: ["Elastic drawstring waist", "Breathable linen blend", "Side & back pockets", "Quick-dry fabric"],
    asin: "B09XK6789"
  },
  {
    id: 8,
    name: "Classic Striped Breton Tee",
    price: 18.00,
    rating: 4.5,
    reviews: 640,
    images: [
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Petite Marine",
    manufacturer: "Petite Marine SAS",
    countryOfOrigin: "France",
    material: "100% Organic Cotton",
    amazonLink: "https://amazon.com/s?k=boys+breton+stripe+tee+kids",
    prime: true,
    description: "Nautical-inspired Breton stripe tee in soft organic cotton. Timeless design for any occasion, whether a casual day out or a seaside adventure.",
    features: ["GOTS organic cotton", "Pre-washed for softness", "Crew neckline", "Relaxed fit"],
    asin: "B09XK0123"
  },
  {
    id: 9,
    name: "Premium Organic Pajama Set",
    price: 24.00,
    rating: 4.9,
    reviews: 930,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Cloud Soft",
    manufacturer: "Cloud Soft Sleep Co.",
    countryOfOrigin: "USA",
    material: "100% GOTS Certified Organic Cotton",
    amazonLink: "https://amazon.com/s?k=boys+organic+pajama+set+kids",
    prime: true,
    description: "GOTS-certified organic cotton pajama set. Soft, breathable, and gentle on sensitive skin. The snug fit design meets safety standards for children's sleepwear.",
    features: ["GOTS certified organic", "Snug-fit sleepwear safety", "Tag-free comfort label", "Pre-shrunk fabric"],
    asin: "B09XK4567"
  },
  {
    id: 10,
    name: "Canvas Deck Shoes",
    price: 28.00,
    rating: 4.3,
    reviews: 310,
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop"
    ],
    category: 'boys',
    ageRange: '4-10',
    brand: "Harbor Walk",
    manufacturer: "Harbor Walk Footwear Inc.",
    countryOfOrigin: "Vietnam",
    material: "Canvas Upper, Rubber Sole",
    amazonLink: "https://amazon.com/s?k=boys+canvas+deck+shoes+kids",
    prime: true,
    description: "Classic boat shoe styling with non-slip rubber sole. Easy slip-on design with elastic laces ensures a secure fit during all activities, on land or near water.",
    features: ["Non-slip rubber sole", "Elastic laces", "Washable canvas", "Cushioned insole"],
    asin: "B09XK8901"
  },

  // Girls Products
  {
    id: 11,
    name: "Embroidered Tulle Party Dress",
    price: 34.50,
    originalPrice: 48.00,
    rating: 4.9,
    reviews: 840,
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Enchanted Bloom",
    manufacturer: "Enchanted Bloom Atelier",
    countryOfOrigin: "France",
    material: "Outer: 100% Tulle, Lining: 100% Cotton",
    amazonLink: "https://amazon.com/s?k=girls+embroidered+tulle+party+dress+kids",
    prime: true,
    bestseller: true,
    description: "Hand-embroidered floral details on layers of soft tulle. Satin ribbon waist with bow detail. Perfect for birthday parties, recitals, and special family occasions.",
    features: ["Hand-embroidered florals", "Satin ribbon waist", "Full lining", "Hidden zip closure"],
    asin: "B09YK1234"
  },
  {
    id: 12,
    name: "Pearl Button Knit Cardigan",
    price: 26.00,
    rating: 4.7,
    reviews: 1150,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Petit Maison",
    manufacturer: "Petit Maison Knitwear",
    countryOfOrigin: "Italy",
    material: "80% Cotton, 20% Nylon",
    amazonLink: "https://amazon.com/s?k=girls+pearl+button+cardigan+kids",
    prime: true,
    description: "Button-front cardigan in premium cotton knit. Pearl buttons and ribbed trim details make this a versatile piece that pairs beautifully with dresses or trousers.",
    features: ["Pearl button closure", "Ribbed trim details", "Relaxed fit", "Machine washable"],
    asin: "B09YK5678"
  },
  {
    id: 13,
    name: "Classic Denim Trucker Jacket",
    price: 32.00,
    rating: 4.6,
    reviews: 730,
    images: [
      "https://images.unsplash.com/photo-1544923408-75c774c94a6d?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '5-10',
    brand: "Heritage Denim",
    manufacturer: "Heritage Denim Co.",
    countryOfOrigin: "Turkey",
    material: "100% Cotton Denim",
    amazonLink: "https://amazon.com/s?k=girls+denim+trucker+jacket+kids",
    prime: true,
    description: "Iconic trucker jacket silhouette in premium stretch denim. Vintage wash with subtle distressing adds character. The perfect layer for transitional weather.",
    features: ["Premium stretch denim", "Vintage wash finish", "Chest & side pockets", "Adjustable button cuffs"],
    asin: "B09YK9012"
  },
  {
    id: 14,
    name: "Organic Cotton Leggings 3-Pack",
    price: 24.00,
    rating: 4.8,
    reviews: 2300,
    images: [
      "https://images.unsplash.com/photo-1542272617-08f08630329e?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "EcoKids",
    manufacturer: "EcoKids Essentials",
    countryOfOrigin: "India",
    material: "95% Organic Cotton, 5% Elastane",
    amazonLink: "https://amazon.com/s?k=girls+organic+cotton+leggings+kids",
    prime: true,
    bestseller: true,
    description: "Set of 3 organic cotton leggings in coordinating colors. Soft elastic waistband for all-day comfort. OEKO-TEX certified, free from harmful substances.",
    features: ["Pack of 3 pairs", "Wide soft waistband", "OEKO-TEX certified", "4-way stretch"],
    asin: "B09YK3456"
  },
  {
    id: 15,
    name: "Velvet Ribbon Ballet Flats",
    price: 29.00,
    rating: 4.4,
    reviews: 380,
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Belle Et Bebe",
    manufacturer: "Belle Et Bebe Footwear",
    countryOfOrigin: "Spain",
    material: "Velvet Upper, Leather Lining",
    amazonLink: "https://amazon.com/s?k=girls+velvet+ballet+flats+kids",
    prime: true,
    description: "Elegant velvet ballet flats with ribbon ankle ties. Cushioned insole for extended wear. The real leather lining ensures breathability and comfort throughout the day.",
    features: ["Satin ribbon ties", "Real leather lining", "Cushioned insole", "Anti-slip sole"],
    asin: "B09YK7890"
  },
  {
    id: 16,
    name: "Floral Print Chiffon Blouse",
    price: 19.99,
    rating: 4.5,
    reviews: 410,
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Petit Maison",
    manufacturer: "Petit Maison Knitwear",
    countryOfOrigin: "Italy",
    material: "100% Chiffon (Polyester)",
    amazonLink: "https://amazon.com/s?k=girls+floral+chiffon+blouse+kids",
    prime: true,
    description: "Sweet floral print on floaty chiffon with scalloped edge detailing on sleeves and hem. Lined for comfort and modesty. A beautiful top for any special occasion.",
    features: ["Scalloped hem & sleeves", "Fully lined", "Floaty chiffon fabric", "Delicate floral print"],
    asin: "B09YK2345"
  },
  {
    id: 17,
    name: "Scalloped Edge Cotton Sundress",
    price: 22.50,
    rating: 4.6,
    reviews: 560,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Petit Maison",
    manufacturer: "Petit Maison Knitwear",
    countryOfOrigin: "Italy",
    material: "100% Organic Cotton",
    amazonLink: "https://amazon.com/s?k=girls+scalloped+cotton+sundress+kids",
    prime: true,
    description: "Breathable organic cotton sundress perfect for warm days. Features scalloped detailing at the hem and adjustable shoulder straps for a customised fit.",
    features: ["Adjustable shoulder straps", "Scalloped hem detail", "Organic cotton", "Relaxed A-line silhouette"],
    asin: "B09YK6789"
  },
  {
    id: 18,
    name: "Traditional Hand-Smocked Dress",
    price: 34.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 560,
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Heritage Heirloom",
    manufacturer: "Heritage Heirloom Dress Co.",
    countryOfOrigin: "UK",
    material: "100% Liberty Cotton",
    amazonLink: "https://amazon.com/s?k=girls+smocked+dress+heirloom+kids",
    prime: true,
    bestseller: true,
    description: "Hand-smocked bodice with delicate embroidery. Full skirt with built-in slip for comfort and modesty. An heirloom-quality dress made to be cherished and passed on.",
    features: ["Hand-smocked bodice", "Built-in cotton slip", "Liberty fabric print", "Back zip & button closure"],
    asin: "B09YK0123"
  },
  {
    id: 19,
    name: "Merino Wool Pom-Pom Beanie",
    price: 18.50,
    rating: 4.7,
    reviews: 290,
    images: [
      "https://images.unsplash.com/photo-1544923408-75c774c94a6d?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Arctic Edge",
    manufacturer: "Arctic Edge Outerwear",
    countryOfOrigin: "New Zealand",
    material: "100% Merino Wool",
    amazonLink: "https://amazon.com/s?k=girls+merino+wool+beanie+kids",
    prime: true,
    description: "Luxuriously soft merino wool beanie with pom-pom detail. Naturally temperature regulating, keeping little heads warm without overheating. Machine washable.",
    features: ["Removable pom-pom", "Machine washable", "Naturally anti-odour", "One size fits most"],
    asin: "B09YK4567"
  },
  {
    id: 20,
    name: "Lace Trim Cotton Nightgown",
    price: 28.00,
    rating: 4.8,
    reviews: 420,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'girls',
    ageRange: '4-10',
    brand: "Sweet Dreams",
    manufacturer: "Sweet Dreams Sleepwear Ltd.",
    countryOfOrigin: "Portugal",
    material: "100% Brushed Cotton",
    amazonLink: "https://amazon.com/s?k=girls+lace+trim+nightgown+kids",
    prime: true,
    description: "Elegant nightgown with delicate lace trim at hem and sleeves. Made from the softest brushed cotton for a cosy night's sleep. Compliant with UK children's nightwear safety standards.",
    features: ["Delicate lace trim", "Brushed cotton", "Safety compliant", "Relaxed nightgown fit"],
    asin: "B09YK8901"
  },

  // Infants Products
  {
    id: 21,
    name: "Organic Cotton Heirloom Onesie",
    price: 18.00,
    originalPrice: 24.00,
    rating: 4.9,
    reviews: 1450,
    images: [
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Pure Born",
    manufacturer: "Pure Born Organics",
    countryOfOrigin: "USA",
    material: "100% GOTS Certified Organic Cotton",
    amazonLink: "https://amazon.com/s?k=baby+organic+cotton+onesie+heirloom",
    prime: true,
    bestseller: true,
    description: "Heirloom-quality onesie in GOTS-certified organic cotton. Reinforced snaps for durability. The softest fabric against your baby's delicate skin, free from all harmful chemicals.",
    features: ["GOTS certified", "Reinforced snaps", "Envelope neckline", "Tag-free label"],
    asin: "B09ZK1234"
  },
  {
    id: 22,
    name: "Cashmere Knit Baby Booties",
    price: 29.00,
    rating: 4.8,
    reviews: 320,
    images: [
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-12M',
    brand: "Petit Luxe",
    manufacturer: "Petit Luxe Baby",
    countryOfOrigin: "Scotland, UK",
    material: "100% Cashmere",
    amazonLink: "https://amazon.com/s?k=baby+cashmere+booties",
    prime: true,
    description: "Luxuriously soft cashmere booties with ribbon tie. Keeps tiny feet warm and cozy. Knitted in Scotland from the finest cashmere for a truly special start in life.",
    features: ["100% pure cashmere", "Satin ribbon tie", "Stays on securely", "Hand wash only"],
    asin: "B09ZK5678"
  },
  {
    id: 23,
    name: "Pointelle Knit Baby Blanket",
    price: 32.00,
    rating: 4.9,
    reviews: 890,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Cloud Soft",
    manufacturer: "Cloud Soft Sleep Co.",
    countryOfOrigin: "USA",
    material: "100% Organic Cotton",
    amazonLink: "https://amazon.com/s?k=baby+pointelle+knit+blanket+organic",
    prime: true,
    bestseller: true,
    description: "Delicate pointelle knit blanket in organic cotton. Perfect for swaddling or stroller use. The open-weave pattern provides warmth while maintaining breathability for safe sleep.",
    features: ["Breathable pointelle knit", "Organic cotton", "Generous 100x80cm size", "Machine washable"],
    asin: "B09ZK9012"
  },
  {
    id: 24,
    name: "Natural Linen Baby Romper",
    price: 26.50,
    rating: 4.7,
    reviews: 410,
    images: [
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Nature's Own",
    manufacturer: "Nature's Own Baby",
    countryOfOrigin: "Lithuania",
    material: "100% European Linen",
    amazonLink: "https://amazon.com/s?k=baby+linen+romper+natural",
    prime: true,
    description: "Breathable European linen romper with wooden buttons. Natural temperature regulation for baby's comfort in all seasons. Gets softer and more beautiful with each wash.",
    features: ["European linen", "Wooden buttons", "Envelope neckline", "Poppers at crotch"],
    asin: "B09ZK3456"
  },
  {
    id: 25,
    name: "Sherpa Lined All-in-One Pram Suit",
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.8,
    reviews: 260,
    images: [
      "https://images.unsplash.com/photo-1544923408-75c774c94a6d?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Arctic Edge",
    manufacturer: "Arctic Edge Outerwear",
    countryOfOrigin: "Canada",
    material: "Shell: Polyester, Lining: Sherpa Fleece",
    amazonLink: "https://amazon.com/s?k=baby+sherpa+pram+suit+all-in-one",
    prime: true,
    description: "Cozy sherpa-lined pram suit with fold-over mittens and footies. Wind and water resistant outer shell. Full-length zip for easy dressing, even on the fussiest of days.",
    features: ["Fold-over mittens & footies", "Wind & water resistant", "Full-length zip", "Machine washable"],
    asin: "B09ZK7890"
  },
  {
    id: 26,
    name: "Silicone Teething Bib Set (3-Pack)",
    price: 14.00,
    rating: 4.6,
    reviews: 1200,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Modern Baby",
    manufacturer: "Modern Baby Ltd.",
    countryOfOrigin: "UK",
    material: "100% Food-Grade Silicone",
    amazonLink: "https://amazon.com/s?k=baby+silicone+teething+bib+set",
    prime: true,
    description: "Set of 3 silicone bibs with integrated teether. Easy clean, dishwasher safe. The adjustable snap closure fits from birth through toddler years with no irritating velcro.",
    features: ["Pack of 3 bibs", "Integrated teether", "Dishwasher safe", "Adjustable snap closure"],
    asin: "B09ZK2345"
  },
  {
    id: 27,
    name: "Hand-Knitted Merino Bonnet",
    price: 19.00,
    rating: 4.9,
    reviews: 180,
    images: [
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-12M',
    brand: "Heritage Heirloom",
    manufacturer: "Heritage Heirloom Dress Co.",
    countryOfOrigin: "UK",
    material: "100% Merino Wool",
    amazonLink: "https://amazon.com/s?k=baby+hand+knitted+merino+bonnet",
    prime: true,
    description: "Hand-knitted baby bonnet in superfine merino wool. Vintage styling with modern comfort. Ties at the chin with a soft satin ribbon to stay in place on even the wriggliest babies.",
    features: ["Hand-knitted", "Superfine merino wool", "Satin ribbon chin tie", "Makes a wonderful gift"],
    asin: "B09ZK6789"
  },
  {
    id: 28,
    name: "Bamboo Fibre Sock Set (5-Pack)",
    price: 12.00,
    rating: 4.7,
    reviews: 640,
    images: [
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519238263496-6361937a42d8?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "EcoKids",
    manufacturer: "EcoKids Essentials",
    countryOfOrigin: "India",
    material: "80% Bamboo Fibre, 15% Cotton, 5% Elastane",
    amazonLink: "https://amazon.com/s?k=baby+bamboo+socks+5+pack",
    prime: true,
    description: "Set of 5 pairs of bamboo fibre socks in coordinating colours. Naturally antibacterial and hypoallergenic. Non-slip grips on the sole once baby starts to stand.",
    features: ["Pack of 5 pairs", "Naturally antibacterial", "Non-slip sole grips", "Hypoallergenic"],
    asin: "B09ZK0123"
  },
  {
    id: 29,
    name: "Premium Muslin Swaddle Set (3-Pack)",
    price: 28.00,
    rating: 4.9,
    reviews: 2100,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-12M',
    brand: "Cloud Soft",
    manufacturer: "Cloud Soft Sleep Co.",
    countryOfOrigin: "USA",
    material: "100% Organic Muslin Cotton",
    amazonLink: "https://amazon.com/s?k=baby+muslin+swaddle+blanket+3+pack",
    prime: true,
    bestseller: true,
    description: "Premium muslin swaddles in coordinating prints. Gets softer with every wash. The generous 120x120cm size is perfect for swaddling, using as a nursing cover, or pram blanket.",
    features: ["Pack of 3 swaddles", "120x120cm each", "Gets softer over time", "Multi-use design"],
    asin: "B09ZK4567"
  },
  {
    id: 30,
    name: "Hooded Organic Cotton Towel",
    price: 22.00,
    rating: 4.8,
    reviews: 840,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&h=700&fit=crop",
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=700&h=700&fit=crop"
    ],
    category: 'infants',
    ageRange: '0-24M',
    brand: "Pure Born",
    manufacturer: "Pure Born Organics",
    countryOfOrigin: "USA",
    material: "100% Organic Cotton Terry",
    amazonLink: "https://amazon.com/s?k=baby+hooded+organic+cotton+towel",
    prime: true,
    description: "Plush hooded towel in organic cotton terry. Generous 90x90cm size for growing babies. The structured hood stays in place to keep little heads warm straight out of the bath.",
    features: ["GOTS certified organic", "90x90cm generous size", "Structured hood", "Machine washable"],
    asin: "B09ZK8901"
  }
];

// ─── Star Rating ─────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={star <= Math.round(rating) ? 'fill-amber-500 text-amber-500' : 'fill-stone-200 text-stone-200'}
      />
    ))}
  </div>
);

// ─── Product Modal ────────────────────────────────────────────────────────────
const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [activeImage, setActiveImage] = useState(0);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  }, [product.images.length]);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
  }, [product.images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, product.images.length]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-stone-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[96vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-white/95 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <X size={16} className="text-stone-600" />
        </button>

        {/* Two-Column Layout - No Scrolling */}
        <div className="grid md:grid-cols-2 gap-0 h-full max-h-[96vh]">
          {/* ── Left: Image Carousel ── */}
          <div className="relative bg-stone-100 rounded-tl-2xl md:rounded-bl-2xl overflow-hidden flex flex-col">
            {/* Main Image */}
            <div className="relative flex-1 overflow-hidden">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.bestseller && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow">
                  Bestseller
                </span>
              )}
              {discount && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow">
                  -{discount}%
                </span>
              )}
              {/* Carousel Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                  >
                    <ChevronLeft size={16} className="text-stone-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                  >
                    <ChevronRight size={16} className="text-stone-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails + Dots */}
            <div className="flex-shrink-0 py-3 px-3 bg-stone-100">
              <div className="flex gap-1.5 justify-center mb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Dot indicators */}
              <div className="flex justify-center gap-1">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                    className={`rounded-full transition-all ${activeImage === idx ? 'w-4 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Product Details ── */}
          <div className="flex flex-col overflow-y-auto max-h-[96vh] p-5 md:p-6">
            {/* Brand & Category */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-amber-600">{product.brand}</span>
              <span className="text-[9px] uppercase tracking-wider bg-stone-100 text-stone-500 px-2.5 py-0.5 rounded-full capitalize">
                {product.category} · Ages {product.ageRange}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-serif text-stone-900 leading-tight mb-3">{product.name}</h2>

            {/* Rating Row */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} size={14} />
              <span className="text-xs font-bold text-amber-600">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviews.toLocaleString()})</span>
              {product.prime && (
                <span className="ml-auto text-[9px] font-bold text-sky-600 flex items-center gap-1 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                  <CheckCircle size={10} /> Prime
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 border-t border-b border-stone-100 py-3 mb-3">
              <span className="text-2xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-stone-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 leading-relaxed mb-3">{product.description}</p>

            {/* Features */}
            <div className="mb-3">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-2">Key Features</h4>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-stone-600">
                    <CheckCircle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Manufacturer Details */}
            <div className="bg-stone-50 rounded-lg p-3 mb-4">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-2 flex items-center gap-1.5">
                <Package size={11} /> Product Details
              </h4>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                <span className="text-stone-400 font-medium">Brand</span>
                <span className="text-stone-700">{product.brand}</span>
                <span className="text-stone-400 font-medium">Manufacturer</span>
                <span className="text-stone-700 text-[10px]">{product.manufacturer}</span>
                <span className="text-stone-400 font-medium">Material</span>
                <span className="text-stone-700 text-[10px]">{product.material}</span>
                <span className="text-stone-400 font-medium">Country</span>
                <span className="text-stone-700">{product.countryOfOrigin}</span>
                <span className="text-stone-400 font-medium">Age Range</span>
                <span className="text-stone-700">{product.ageRange}</span>
                <span className="text-stone-400 font-medium">ASIN</span>
                <span className="text-stone-700 font-mono text-[10px]">{product.asin}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 mt-auto">
              <a
                href={product.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <ShoppingBag size={16} /> Buy on Amazon
              </a>
              <a
                href={product.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 border-2 border-stone-200 hover:border-stone-400 text-stone-700 font-medium text-xs py-3 rounded-xl transition-all hover:bg-stone-50 active:scale-[0.98]"
              >
                <ExternalLink size={14} /> View Full Listing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || ageRange !== 'all' || searchQuery !== '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setAgeRange('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const categories = [
    { value: 'all', label: 'All Departments' },
    { value: 'boys', label: 'Boys' },
    { value: 'girls', label: 'Girls' },
    { value: 'infants', label: 'Infants' },
  ];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-15', label: 'Under $15' },
    { value: '15-25', label: '$15 – $25' },
    { value: '25-35', label: '$25 – $35' },
    { value: '35-999', label: 'Over $35' },
  ];
  const ageRanges = [
    { value: 'all', label: 'All Ages' },
    { value: '0-12M', label: 'Infant (0–12 Months)' },
    { value: '0-24M', label: 'Baby (0–24 Months)' },
    { value: '4-6', label: 'Toddler (4–6 Years)' },
    { value: '7-10', label: 'Kids (7–10 Years)' },
  ];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'reviews', label: 'Most Reviewed' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    if (ageRange !== 'all') {
      if (ageRange === '0-12M') filtered = filtered.filter(p => p.ageRange === '0-12M');
      else if (ageRange === '0-24M') filtered = filtered.filter(p => p.ageRange === '0-24M' || p.ageRange === '0-12M');
      else if (ageRange === '4-6') filtered = filtered.filter(p => p.ageRange === '4-10');
      else if (ageRange === '7-10') filtered = filtered.filter(p => p.ageRange === '5-10' || p.ageRange === '4-10');
    }

    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': filtered.sort((a, b) => b.reviews - a.reviews); break;
    }

    return filtered;
  }, [selectedCategory, priceRange, ageRange, sortBy, searchQuery]);

  const RadioGroup = ({ name, options, value, onChange }: { name: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
            <input type="radio" name={name} checked={value === opt.value} onChange={() => onChange(opt.value)}
              className="appearance-none w-4 h-4 border-2 border-stone-300 rounded-full checked:border-amber-500 transition-all" />
            {value === opt.value && <div className="absolute w-2 h-2 bg-amber-500 rounded-full pointer-events-none" />}
          </div>
          <span className={`text-[13px] transition-colors leading-tight ${value === opt.value ? 'text-amber-600 font-semibold' : 'text-stone-600 group-hover:text-stone-900'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );

  const SidebarContent = () => (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-800 flex items-center gap-2">
          <Filter size={13} /> Refine By
        </h3>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-[10px] uppercase tracking-widest text-amber-600 hover:text-amber-700 font-medium">
            Clear All
          </button>
        )}
      </div>

      {/* Search (mobile) */}
      <div className="lg:hidden">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-stone-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3 pb-2 border-b border-stone-100">Department</p>
        <RadioGroup name="category" options={categories} value={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3 pb-2 border-b border-stone-100">Price Range</p>
        <RadioGroup name="price" options={priceRanges} value={priceRange} onChange={setPriceRange} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3 pb-2 border-b border-stone-100">Age Range</p>
        <RadioGroup name="age" options={ageRanges} value={ageRange} onChange={setAgeRange} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3 pb-2 border-b border-stone-100">Sort By</p>
        <div className="relative">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-stone-100 px-4 py-2.5 text-[13px] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-stone-700 pr-9 cursor-pointer">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-[10px] uppercase tracking-[0.25em] py-2 text-center">
        Complimentary shipping on orders over $75 &nbsp;·&nbsp; Curated premium collection
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Menu */}
            <button className="lg:hidden p-2 text-stone-500 hover:text-stone-900 transition-colors">
              <Menu size={22} />
            </button>

            {/* Logo */}
            <div className="flex flex-col items-start lg:items-center flex-shrink-0">
              <h1 className="text-2xl font-serif tracking-tight text-stone-900 leading-none">Kitex</h1>
              <p className="text-[8px] uppercase tracking-[0.35em] text-stone-400 mt-0.5">Premium Kids Collection</p>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-widest font-semibold text-stone-500">
              {['all', 'boys', 'girls', 'infants'].map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`pb-0.5 border-b-2 transition-all capitalize ${selectedCategory === cat ? 'border-amber-500 text-amber-600' : 'border-transparent hover:text-stone-900 hover:border-stone-300'}`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-3 flex-1 lg:flex-none justify-end">
              <div className="hidden md:flex items-center relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products, brands, materials…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 py-2.5 w-72 bg-stone-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
              <button className="md:hidden p-2 text-stone-500 hover:text-amber-600 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1800&h=900&fit=crop&q=80"
          alt="Hero – Kids Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/30 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-20 lg:px-32">
          <div className="max-w-xl text-white">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] mb-5 bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold">
              Summer 2025 Collection
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-5 leading-tight drop-shadow-lg">
              Timeless style<br />for little dreamers.
            </h2>
            <p className="text-stone-100/90 text-sm md:text-base mb-8 max-w-md font-light leading-relaxed">
              Discover our curated collection where comfort meets sophistication — crafted for every stage of childhood.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#collection"
                className="group flex items-center gap-2 bg-amber-400 text-stone-900 px-8 py-4 text-[11px] uppercase tracking-widest font-bold rounded-xl hover:bg-amber-300 transition-all shadow-lg">
                Shop Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#collection"
                className="flex items-center gap-2 bg-white/15 backdrop-blur text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold rounded-xl border border-white/30 hover:bg-white/25 transition-all">
                Browse All
              </a>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-center gap-12 flex-wrap">
            {[
              { icon: <Award size={16} />, label: '30+ Curated Products' },
              { icon: <ShieldCheck size={16} />, label: 'Amazon Prime Eligible' },
              { icon: <Truck size={16} />, label: 'Fast Delivery' },
              { icon: <RefreshCcw size={16} />, label: 'Easy Returns' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-stone-600 text-[11px] uppercase tracking-widest font-semibold">
                <span className="text-amber-500">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="collection" className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="flex gap-8">
          {/* Sidebar – Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-[80] flex">
              <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
              <div className="relative bg-white w-72 max-w-full h-full overflow-y-auto p-6 shadow-2xl ml-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg text-stone-900">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="font-serif text-xl text-stone-900">
                  {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </h2>
                <p className="text-xs text-stone-400 tracking-wider uppercase mt-0.5">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-[11px] uppercase tracking-widest font-bold text-stone-600 hover:bg-stone-50 transition-colors">
                  <Filter size={14} /> Filters
                  {hasActiveFilters && <span className="w-2 h-2 bg-amber-500 rounded-full" />}
                </button>

                {/* View Toggle */}
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode('grid')}
                    title="Grid View"
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
                    <Grid3X3 size={17} />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    title="List View"
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
                    <List size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== 'all' && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-amber-900"><X size={12} /></button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                    {priceRanges.find(p => p.value === priceRange)?.label}
                    <button onClick={() => setPriceRange('all')} className="hover:text-amber-900"><X size={12} /></button>
                  </span>
                )}
                {ageRange !== 'all' && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                    {ageRanges.find(a => a.value === ageRange)?.label}
                    <button onClick={() => setAgeRange('all')} className="hover:text-amber-900"><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-amber-900"><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-stone-300" />
                </div>
                <h3 className="text-lg font-serif text-stone-500 mb-2">No products found</h3>
                <p className="text-sm text-stone-400 mb-6">Try adjusting your filters or search query.</p>
                <button onClick={clearAllFilters} className="bg-amber-400 text-stone-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-amber-300 transition-colors">
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              // ── Grid View: 4 per row ──
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                      <img src={product.images[0]} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.bestseller && (
                        <span className="absolute top-3 left-3 bg-amber-400 text-stone-900 text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                          Bestseller
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="block w-full text-center bg-white/95 text-stone-800 text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-xl shadow-sm">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-600">{product.brand}</span>
                      <h4 className="text-sm font-serif text-stone-800 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h4>

                      <div className="flex items-center gap-1.5">
                        <StarRating rating={product.rating} size={12} />
                        <span className="text-[11px] text-stone-400">({product.reviews.toLocaleString()})</span>
                      </div>

                      <div className="flex items-center gap-2 mt-auto pt-1">
                        <span className="text-base font-bold text-stone-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] uppercase tracking-widest bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                          Ages {product.ageRange}
                        </span>
                        {product.prime && (
                          <span className="text-[9px] font-bold text-sky-600 flex items-center gap-0.5">
                            <CheckCircle size={9} /> Prime
                          </span>
                        )}
                      </div>

                      {/* Buy Button */}
                      <a
                        href={product.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
                      >
                        <ShoppingBag size={13} /> Buy on Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // ── List View ──
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex flex-col sm:flex-row gap-0">
                      {/* Image */}
                      <div className="relative w-full sm:w-52 h-52 bg-stone-100 overflow-hidden flex-shrink-0 sm:rounded-l-2xl rounded-t-2xl sm:rounded-t-none">
                        <img src={product.images[0]} alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        {product.bestseller && (
                          <span className="absolute top-3 left-3 bg-amber-400 text-stone-900 text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                            Bestseller
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-full">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-6 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-600 block mb-1">{product.brand}</span>
                            <h4 className="text-lg font-serif text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
                              {product.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-stone-400 line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <StarRating rating={product.rating} size={14} />
                          <span className="text-xs font-semibold text-amber-600">{product.rating}</span>
                          <span className="text-xs text-stone-400">({product.reviews.toLocaleString()} reviews)</span>
                        </div>

                        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">{product.description}</p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase tracking-widest bg-stone-100 text-stone-500 px-3 py-1 rounded-full capitalize">{product.category}</span>
                          <span className="text-[10px] uppercase tracking-widest bg-stone-100 text-stone-500 px-3 py-1 rounded-full">Ages {product.ageRange}</span>
                          <span className="text-[10px] text-stone-500 px-3 py-1 rounded-full bg-stone-100">{product.material}</span>
                          {product.prime && (
                            <span className="text-[10px] font-bold text-sky-600 flex items-center gap-1 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                              <CheckCircle size={10} /> Prime
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-center gap-3 pt-1 flex-wrap">
                          <a
                            href={product.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-[11px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
                          >
                            <ShoppingBag size={15} /> Buy on Amazon
                          </a>
                          <a
                            href={product.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 border border-stone-200 hover:border-stone-400 text-stone-600 font-medium text-[11px] uppercase tracking-widest px-5 py-3 rounded-xl transition-all hover:bg-stone-50 active:scale-[0.97]"
                          >
                            <ExternalLink size={14} /> View on Amazon
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-stone-200 bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Truck size={22} />, title: "Fast Shipping", desc: "Prime-eligible delivery" },
            { icon: <RefreshCcw size={22} />, title: "Easy Returns", desc: "30-day hassle-free" },
            { icon: <ShieldCheck size={22} />, title: "Quality Assured", desc: "Curated by experts" },
            { icon: <Tag size={22} />, title: "Best Value", desc: "Competitive pricing" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                {item.icon}
              </div>
              <div>
                <h5 className="text-[11px] uppercase tracking-widest font-bold text-stone-800">{item.title}</h5>
                <p className="text-[11px] text-stone-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-3">Stay in the Loop</h2>
          <p className="text-stone-400 text-sm mb-8 font-light">
            Join our newsletter for early access to new collections and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Your email address"
              className="flex-1 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition" />
            <button className="bg-amber-400 text-stone-900 px-8 py-3.5 rounded-xl text-[11px] uppercase tracking-widest font-bold hover:bg-amber-300 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h1 className="text-xl font-serif text-stone-900 mb-3">Little Stars</h1>
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-5">
                Premium kids clothing, curated from the world's best brands. Quality that grows with your child.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-amber-500 hover:border-amber-300 transition-all">
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-widest font-bold text-stone-800 mb-5">Collections</h5>
              <ul className="space-y-3 text-stone-400 text-sm">
                {['Boys Clothing', 'Girls Clothing', 'Infant Essentials', 'New Arrivals'].map((l) => (
                  <li key={l} className="hover:text-amber-600 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-widest font-bold text-stone-800 mb-5">Support</h5>
              <ul className="space-y-3 text-stone-400 text-sm">
                {['Contact Us', 'Shipping Info', 'Return Policy', 'Size Guide'].map((l) => (
                  <li key={l} className="hover:text-amber-600 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-widest font-bold text-stone-800 mb-5">Contact</h5>
              <div className="space-y-3 text-stone-400 text-sm">
                <p className="flex items-center gap-2"><Mail size={14} className="text-amber-400" /> hello@littlestars.com</p>
                <p className="text-stone-400 text-xs leading-relaxed">
                  All product links lead to Amazon.com. Little Stars is an affiliate storefront.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-stone-300 uppercase tracking-widest">© 2025 Little Stars. All rights reserved.</p>
            <div className="flex gap-6 text-[10px] text-stone-300 uppercase tracking-widest">
              {['Privacy', 'Terms', 'Accessibility'].map((l) => (
                <span key={l} className="hover:text-stone-600 cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;
