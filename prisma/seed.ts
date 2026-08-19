import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = "postgresql://neondb_owner:npg_1guNYthUSX7B@ep-hidden-pond-azkyiswo.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ─────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@fatimaoverseas.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });
  console.log(`✓ Admin user: ${adminEmail}`);

  // ── Packages ───────────────────────────────────────────────────────────────
  const packages = [
    {
      title: "Economy Umrah Package — 10 Days",
      slug: "economy-umrah",
      type: "Umrah",
      durationDays: 10,
      price: 6500000,
      priceLabel: "₹65,000",
      hotelCategory: "3★",
      hotelName: "Al Massa Hotel Makkah",
      departureCity: "Delhi / Mumbai",
      tag: "Budget",
      inclusions: "Visa Processing\nReturn Flights\nZiyarat Tours\nMeals (2x/day)\nLocal Transport\nZamzam Water (5L)\nTour Guide",
      itinerary: "An affordable 10-day Umrah journey covering Makkah and Madinah with essential amenities, comfortable 3-star accommodation, and guided ziyarat to all major holy sites.",
    },
    {
      title: "Standard Umrah Package — 12 Days",
      slug: "standard-umrah",
      type: "Umrah",
      durationDays: 12,
      price: 7800000,
      priceLabel: "₹78,000",
      hotelCategory: "4★",
      hotelName: "Swissotel Al Maqam Makkah",
      departureCity: "Delhi / Mumbai / Hyderabad",
      tag: "Popular",
      inclusions: "Visa Processing\nReturn Flights\nZiyarat Tours\nBuffet Meals (3x/day)\nLocal Transport\nZamzam Water (5L)\nTour Guide\nTravel Insurance",
      itinerary: "A balanced 12-day Umrah experience with 4-star hotel accommodation close to the Haram, full-board meals, and comprehensive ziyarat coverage in Makkah and Madinah.",
    },
    {
      title: "Premium Umrah Package — 15 Days",
      slug: "premium-umrah",
      type: "Umrah",
      durationDays: 15,
      price: 9500000,
      priceLabel: "₹95,000",
      hotelCategory: "5★",
      hotelName: "Hilton Makkah Convention Hotel",
      departureCity: "Delhi / Mumbai / Hyderabad",
      tag: "Luxury",
      inclusions: "Visa Processing\nReturn Flights\nZiyarat Tours\nBuffet Meals (3x/day)\nLocal Transport\nZamzam Water (5L)\nTour Guide\nTravel Insurance\nVIP Lounge Access",
      itinerary: "A spiritually enriching 15-day journey covering Makkah and Madinah with complete spiritual guidance, ziyarat to all holy sites, and the best 5-star accommodations.",
    },
    {
      title: "Economy Hajj Package — 21 Days",
      slug: "economy-hajj",
      type: "Hajj",
      durationDays: 21,
      price: 15500000,
      priceLabel: "₹1,55,000",
      hotelCategory: "3★",
      hotelName: "Dar Al Tawhid Hotel",
      departureCity: "Delhi / Hyderabad",
      tag: "Economy",
      inclusions: "Hajj Visa\nReturn Flights\nMina Tent Accommodation\nMeals (3x/day)\nArafat Transport\nZamzam Water\nExperienced Aalim Guide",
      itinerary: "A complete 21-day Hajj pilgrimage package covering all Hajj rituals including Mina, Arafat, Muzdalifah, and Jamarat with budget-friendly 3-star accommodation.",
    },
    {
      title: "Family Hajj Package — 21 Days",
      slug: "family-hajj",
      type: "Hajj",
      durationDays: 21,
      price: 18500000,
      priceLabel: "₹1,85,000",
      hotelCategory: "4★",
      hotelName: "Pullman Zamzam Makkah",
      departureCity: "Delhi / Mumbai / Hyderabad",
      tag: "Family",
      inclusions: "Hajj Visa\nReturn Flights\nFamily Room Accommodation\nFull Board Meals\nAll Transport\nZamzam Water\nScholar Guide\nTravel Insurance\nMedical Support",
      itinerary: "A comfortable family-friendly 21-day Hajj package designed for families travelling together with premium 4-star hotels, family rooms, and dedicated family support.",
    },
    {
      title: "Holiday Package — 15 Days",
      slug: "holiday-special",
      type: "Holiday Packages",
      durationDays: 15,
      price: 9000000,
      priceLabel: "₹90,000",
      hotelCategory: "4★",
      hotelName: "Marriott Madinah",
      departureCity: "Delhi / Mumbai / Hyderabad / Bangalore",
      tag: "Seasonal",
      inclusions: "Visa Processing\nReturn Flights\nSuhoor & Iftar Buffet\nTarawih Arrangements\nZiyarat Tours\nLocal Transport\nZamzam Water\nScholar Guide",
      itinerary: "Experience the unparalleled beauty of this holiday destination. Timed perfectly for your family vacation.",
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log(`✓ Seeded ${packages.length} packages`);

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const posts = [
    {
      title: "Complete Guide to Umrah Visa Requirements for Indian Pilgrims (2024)",
      slug: "umrah-visa-2024-guide",
      category: "Visa & Documents",
      excerpt: "Everything you need to know about the Umrah visa application process, required documents, processing time, and tips to avoid rejection.",
      content: `## Overview\n\nThe Saudi government has streamlined the Umrah visa process significantly. Indian pilgrims can now obtain their Umrah visa through authorized travel agents or directly through the Nusuk app.\n\n## Required Documents\n\n1. Valid Passport — Minimum 6 months validity from travel date\n2. Passport-size photographs — White background, recent\n3. Confirmed return flight tickets\n4. Hotel booking confirmation in Makkah and Madinah\n5. Meningitis vaccination certificate (ACWY vaccine)\n6. For women under 45 — Must travel with a Mahram (male guardian)\n7. Marriage certificate (for couples)\n\n## Application Process\n\n1. Contact an authorized agent like Fatima Overseas\n2. Submit all documents\n3. Agent applies through the Nusuk portal\n4. Biometrics may be required at authorized centers\n5. Visa typically issued within 5-7 business days\n\n## Tips for a Smooth Process\n\n- Apply at least 3-4 weeks before your travel date\n- Ensure your passport has at least 2 blank pages\n- Double-check all document spelling matches exactly\n\nFor hassle-free visa processing, contact our team and we will handle everything for you.`,
    },
    {
      title: "Top 5 Hotels Near Masjid al-Haram for Umrah Pilgrims",
      slug: "best-hotels-near-haram-makkah",
      category: "Travel Tips",
      excerpt: "A detailed review of the best hotels within walking distance of the Haram in Makkah — from budget-friendly options to 5-star luxury stays.",
      content: `## Why Hotel Location Matters for Umrah\n\nChoosing the right hotel can make or break your Umrah experience. Proximity to the Haram means you can pray every Salah in congregation without tiring yourself.\n\n## Top 5 Hotels\n\n1. Hilton Makkah Convention Hotel — 5 minutes walk, world-class facilities\n2. Pullman Zamzam Makkah — Directly connected to Abraj Al-Bait mall\n3. Swissotel Al Maqam Makkah — Breathtaking Haram views from rooms\n4. Marriott Hotel Makkah — Excellent buffet meals, comfortable rooms\n5. Al Massa Hotel — Best budget option with clean rooms\n\n## Tips for Booking\n\n- Book at least 3 months in advance for peak seasons\n- Check if breakfast is included\n- Verify the exact distance from the Haram before booking\n\nAll Fatima Overseas packages include hotels within 500 meters of the Haram.`,
    },
    {
      title: "Performing Umrah in Ramadan: A Complete Spiritual Guide",
      slug: "ramadan-umrah-spiritual-guide",
      category: "Spiritual Guidance",
      excerpt: "The blessings of Ramadan Umrah are immense. This guide covers everything from timing your tawaf to making the most of your Ramadan nights in Makkah.",
      content: `## The Virtue of Ramadan Umrah\n\nThe Prophet (PBUH) said: 'Umrah in Ramadan is like performing Hajj with me.' (Bukhari & Muslim). This hadith alone shows the immense reward of Umrah during the blessed month.\n\n## Best Times for Tawaf in Ramadan\n\n- After Fajr prayer — Relatively quieter\n- After Asr — Before the Iftar rush\n- After Tarawih (after midnight) — Spiritual and less crowded\n\n## Making the Most of Your Ramadan Umrah\n\n- Arrive before the last 10 nights for Laylatul Qadr\n- Spend time in Itikaaf if possible\n- Read Quran inside the Haram as much as possible\n- Make extensive dua especially at the Multazam\n- Don't miss Tarawih prayers — they are special in the Haram\n\n## Health Tips\n\n- Stay hydrated — carry a water bottle (Zamzam is available everywhere)\n- Rest during the hottest hours\n- Eat light Suhoor and balanced Iftar`,
    },
    {
      title: "India's Hajj 2024 Quota & Registration: What You Need to Know",
      slug: "hajj-2024-quota-india",
      category: "Hajj Updates",
      excerpt: "The Hajj Committee of India has announced the 2024 quota. Here's a breakdown of the registration process, eligibility criteria, and important dates.",
      content: `## India's Hajj 2024 Quota\n\nSaudi Arabia has allocated 1,75,025 Hajj seats to India for the year 2024, which is India's full pre-pandemic quota restored.\n\n## Important Dates\n\n- Registration Opens: January 2024\n- Last Date for Application: February 2024\n- Lottery (if oversubscribed): March 2024\n- Hajj Season: June 2024\n\n## Eligibility Criteria\n\n1. Must be a Muslim Indian citizen\n2. Valid Indian passport (minimum 6 months validity)\n3. Age 18 and above (women below 45 must travel with Mahram)\n4. Must not have performed Hajj in the last 5 years (for subsidized quota)\n\n## Private Tour Operators\n\nBesides the Hajj Committee quota, private operators like Fatima Overseas offer Hajj seats under the Private Tour Operator (PTO) quota which often has faster processing and premium accommodation options.\n\nContact us for 2024 Hajj availability.`,
    },
    {
      title: "Must-Visit Ziyarat Places in Madinah for Every Pilgrim",
      slug: "madinah-ziyarat-places",
      category: "Travel Tips",
      excerpt: "Madinah holds some of the most spiritually significant sites in Islam. This guide covers all must-visit locations and the etiquette for visiting them.",
      content: `## Al-Masjid an-Nabawi (The Prophet's Mosque)\n\nThe most important site in Madinah. The mosque houses the blessed tomb of Prophet Muhammad (PBUH). Visiting and sending salawat upon the Prophet is the primary reason for coming to Madinah.\n\n## Masjid Quba\n\nThe first mosque built in Islamic history. Praying 2 rakah here equals the reward of one Umrah (Tirmidhi).\n\n## Masjid al-Qiblatayn\n\nThe mosque where the Qibla was changed from Jerusalem to Makkah during prayer.\n\n## Jannatul Baqi\n\nThe historic graveyard next to the Prophet's Mosque where many Sahabah (companions) are buried, including Sayyida Fatima (RA).\n\n## Uhud Mountain\n\nThe site of the Battle of Uhud. Visit the graves of the Shuhada (martyrs) including Sayyiduna Hamza (RA).\n\n## Etiquette for Ziyarat\n\n- Maintain silence and recite salawat\n- Do not take photos inside the mosque\n- Women must be fully covered\n- Avoid bidah (innovations) — focus on authentic duas`,
    },
    {
      title: "The Ultimate Umrah Packing Checklist — Don't Forget These!",
      slug: "packing-checklist-umrah",
      category: "Travel Tips",
      excerpt: "A comprehensive packing guide for Umrah pilgrims — from Ihram essentials to health kit items and tech accessories that will make your journey easier.",
      content: `## Ihram Essentials (Men)\n\n- 2 sets of white unstitched Ihram cloth\n- Ihram belt\n- Ihram flip-flops (no stitched footwear when in Ihram)\n- Unscented soap and shampoo\n\n## Ihram Essentials (Women)\n\n- Loose, modest clothing covering the full body\n- Face veil (niqab) — optional but recommended\n- Comfortable walking shoes\n\n## Health & Medications\n\n- Paracetamol and basic first aid\n- Antacids and diarrhea medication\n- Personal prescription medications with doctor's letter\n- Sunscreen (SPF 50+)\n- Oral Rehydration Salts (ORS) sachets\n- Small travel umbrella for sun protection\n\n## Documents (Keep Originals Safe)\n\n- Passport + visa\n- Return flight tickets\n- Hotel booking confirmation\n- Vaccination certificate (Meningitis ACWY)\n- Travel insurance\n- Emergency contact numbers\n\n## Tech & Accessories\n\n- Power bank (at least 20,000 mAh)\n- Universal travel adapter\n- Saudi SIM card (buy at airport or market)\n- Offline Quran app downloaded\n- Small backpack for daily use\n\n## Tips\n\n- Pack light — you will be walking a lot\n- Bring a small Arabic phrasebook\n- Label your luggage with your name and hotel address`,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✓ Seeded ${posts.length} blog posts`);

  // ── Settings ───────────────────────────────────────────────────────────────
  const existing = await prisma.settings.findFirst();
  if (!existing) {
    await prisma.settings.create({ data: {} });
    console.log("✓ Default settings created");
  } else {
    console.log("✓ Settings already exist, skipping");
  }

  // ── Visas ───────────────────────────────────────────────────────────────
  const visas = [
    {
      title: "Saudi Arabia Tourist e-Visa",
      slug: "saudi-tourist-evisa",
      country: "Saudi Arabia",
      price: 1050000,
      priceLabel: "₹10,500",
      processingTime: "24 - 48 Hours",
      validity: "1 Year (Multiple Entry)",
      documentsRequired: "Passport Copy (Front & Back)\nPassport Size Photo (White Background)\nPAN Card\nEmail ID",
      imageUrl: "/menu/visa.png"
    },
    {
      title: "Saudi Arabia Umrah Visa",
      slug: "saudi-umrah-visa",
      country: "Saudi Arabia",
      price: 1550000,
      priceLabel: "₹15,500",
      processingTime: "2 - 4 Working Days",
      validity: "90 Days (Single Entry)",
      documentsRequired: "Original Passport (6 months validity)\n2 Passport Size Photos (White Background)\nBiometrics (if applicable)\nVaccination Certificate",
      imageUrl: "/menu/visa.png"
    },
    {
      title: "UAE Tourist Visa (Dubai)",
      slug: "uae-tourist-visa",
      country: "United Arab Emirates",
      price: 650000,
      priceLabel: "₹6,500",
      processingTime: "3 - 5 Working Days",
      validity: "30 Days (Single Entry)",
      documentsRequired: "Passport Copy (Front & Back)\nPassport Size Photo (White Background)\nFlight Tickets\nHotel Booking",
      imageUrl: "/menu/visa.png"
    }
  ];

  for (const visa of visas) {
    await prisma.visa.upsert({
      where: { slug: visa.slug },
      update: visa,
      create: visa,
    });
  }
  console.log(`✓ Seeded ${visas.length} visas`);

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
