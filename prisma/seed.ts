import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...\n");

  // Clean existing data to allow re-running
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.product.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.service.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.course.deleteMany();
  await prisma.event.deleteMany();
  await prisma.admin.deleteMany();
  console.log("Cleared existing data.");

  // ─────────────────────────────────────────────
  // 1. Admin User
  // ─────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.create({
    data: {
      email: "admin@neodivine.com",
      password: hashedPassword,
      name: "Neha V Shah",
    },
  });
  console.log(`Admin created: ${admin.email}`);

  // ─────────────────────────────────────────────
  // 2. Products
  // ─────────────────────────────────────────────
  const products = [
    // SPIRITUAL SPRAYS
    {
      name: "Camphor Spray",
      slug: "camphor-spray",
      description: "A sacred cleansing spray crafted with pure camphor essence to purify your space and elevate your spiritual practice.",
      benefits: "Cleanses Negative Energy, Promotes Positive Energy, Purifies the Air & Repels Insects, Eliminates Unpleasant Odors, Creates A Calming Atmosphere",
      price: 19.99,
      comparePrice: 29.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Money Spray",
      slug: "money-spray",
      description: "An abundance-attracting spray infused with prosperity-boosting energies to enhance your financial well-being.",
      benefits: "Attracts Wealth Energy, Boosts Money Flow, Brings Abundant Vibes, Enhances Financial Focus, Inspires Positive Mindset",
      price: 24.99,
      comparePrice: 34.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: true,
      sortOrder: 2,
    },
    {
      name: "Protection Spray",
      slug: "protection-spray",
      description: "A powerful spiritual defense spray designed to shield you from negative energies and harmful vibrations.",
      benefits: "Strengthens Spiritual Defense, Enhances Energy Shield, Promotes Safe Surroundings, Shields Against Negativity, Clears Harmful Vibrations",
      price: 22.99,
      comparePrice: 32.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: true,
      sortOrder: 3,
    },
    {
      name: "Aura Spray",
      slug: "aura-spray",
      description: "A transformative aura-enhancing spray that balances your energy field and restores inner harmony.",
      benefits: "Increase Your Aura, Balance Your Aura Chakra, Restores Inner Harmony, Elevates Spiritual Vibration, Clears Energy Blockages",
      price: 21.99,
      comparePrice: 31.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: true,
      sortOrder: 4,
    },
    {
      name: "Vastu Spray",
      slug: "vastu-spray",
      description: "A space-harmonizing spray formulated to align your environment with Vastu principles for positive energy flow.",
      benefits: "Aligns with Vastu, Clears negative vibes, Balances space energy, Uplifts home atmosphere, Supports well-being flow",
      price: 18.99,
      comparePrice: 28.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 5,
    },
    {
      name: "Relationship Spray",
      slug: "relationship-spray",
      description: "A love-enhancing spray that nurtures emotional bonds and fosters harmony in relationships.",
      benefits: "Improves emotional bonding, Sparks love and harmony, Encourages mutual understanding, Reduces emotional conflicts, Promotes loving communication",
      price: 23.99,
      comparePrice: 33.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 6,
    },
    {
      name: "Coffee Spray",
      slug: "coffee-spray",
      description: "An energizing aromatic spray that stimulates mental focus and uplifts your mood throughout the day.",
      benefits: "Stimulates alertness fast, Uplifts mood whole day, Boosts mental focus, Refreshes senses instantly, Reduces mental fatigue",
      price: 16.99,
      comparePrice: 24.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 7,
    },
    {
      name: "Business Spray",
      slug: "business-spray",
      description: "A success-oriented spray that attracts positive business energy and inspires professional growth.",
      benefits: "Boosts mental clarity, Attracts success energy, Inspires personal development, Supports career focus, Encourages daily progress",
      price: 24.99,
      comparePrice: 34.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 8,
    },
    {
      name: "Rose Spray",
      slug: "rose-spray",
      description: "A gentle floral spray that enhances emotional balance and promotes self-love with the essence of roses.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 17.99,
      comparePrice: 26.99,
      category: "Spiritual Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 9,
    },

    // PLANETARY SPRAYS
    {
      name: "Sun Spray (1)",
      slug: "sun-spray-1",
      description: "A radiant spray channeling the power of the Sun to boost confidence, vitality, and inner strength.",
      benefits: "Boosts Confidence & Inner Strength, Invites Success and Vital Vibrations, Enhances Personal Power & Focus, Energizes Aura With Radiance, Stimulates Motivation & Clarity",
      price: 26.99,
      comparePrice: 36.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 10,
    },
    {
      name: "Moon Spray (2)",
      slug: "moon-spray-2",
      description: "A calming spray infused with lunar energy to promote emotional balance and deep inner peace.",
      benefits: "Promotes Emotional Balance, Encourages Peaceful Calm Thoughts, Enhances Intuition & Inner Harmony, Supports Relaxation & Deep Rest, Creates a Soothing Aura around You",
      price: 26.99,
      comparePrice: 36.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 11,
    },
    {
      name: "Jupiter Spray (3)",
      slug: "jupiter-spray-3",
      description: "An expansive spray harnessing Jupiter's energy to attract wisdom, growth, and abundant opportunities.",
      benefits: "Attracts Wisdom & Growth, Expands Luck and Abundance, Supports Spiritual Development, Enhances Learning & Understanding, Brings Positive Opportunities",
      price: 27.99,
      comparePrice: 37.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 12,
    },
    {
      name: "Rahu Spray (4)",
      slug: "rahu-spray-4",
      description: "A clarity-bringing spray that clears confusion and mental clutter, aligning your mind with purpose.",
      benefits: "Clears Confusion & Overthinking, Reduces Anxiety and Mental Clutter, Promotes Focused Stable Decisions, Shields From Negative Influences, Aligns Mind With Clarity & Purpose",
      price: 28.99,
      comparePrice: 38.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 13,
    },
    {
      name: "Mercury Spray (5)",
      slug: "mercury-spray-5",
      description: "A communication-enhancing spray channeling Mercury's energy for mental sharpness and creative expression.",
      benefits: "Improves Communication Clarity, Boosts Mental Sharpness, Enhances Expression & Creativity, Inspires Smart Decision-Making, Aligns Thoughts With Positive Flow",
      price: 25.99,
      comparePrice: 35.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 14,
    },
    {
      name: "Venus Spray (6)",
      slug: "venus-spray-6",
      description: "A love-infused spray channeling Venus energy to enhance relationships, beauty, and creative joy.",
      benefits: "Enhances Love & Relationship Energy, Boosts Self-Worth & Attraction, Invites Harmony and Beauty, Inspires Creativity & Joy, Creates a Gentle Loving Vibration",
      price: 26.99,
      comparePrice: 36.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 15,
    },
    {
      name: "Ketu Spray (7)",
      slug: "ketu-spray-7",
      description: "A spiritual growth spray that releases past blockages and elevates higher awareness and intuition.",
      benefits: "Removes Past Energetic Blockages, Encourages Inner Peace & Calm, Supports Spiritual Growth & Detachment, Enhances Intuition & Higher Awareness, Helps Release Ego & Unwanted Patterns",
      price: 28.99,
      comparePrice: 38.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 16,
    },
    {
      name: "Saturn Spray (8)",
      slug: "saturn-spray-8",
      description: "A stabilizing spray harnessing Saturn's energy to encourage discipline, patience, and long-term growth.",
      benefits: "Encourages Discipline & Focus, Promotes Stability in Life, Strengthens Patience & Inner Control, Removes Delays & Obstacles, Supports Long-Term Growth",
      price: 27.99,
      comparePrice: 37.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 17,
    },
    {
      name: "Mars Spray (9)",
      slug: "mars-spray-9",
      description: "An empowering spray channeling Mars energy to activate courage, determination, and bold action.",
      benefits: "Activates Courage & Determination, Strengthens Willpower & Passion, Shields From Negative Intentions, Encourages Bold Confident Actions, Ignites Drive Towards Goals",
      price: 27.99,
      comparePrice: 37.99,
      category: "Planetary Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 18,
    },

    // CHAKRA SPRAYS
    {
      name: "Root Chakra Spray",
      slug: "root-chakra-spray",
      description: "A grounding spray that strengthens your root chakra for stability, security, and emotional balance.",
      benefits: "Strengthens Stability & Security, Grounds Mind Body & Energy, Promotes Emotional Balance, Reduces Fear & Restlessness, Creates a Safe Supportive Aura",
      price: 22.99,
      comparePrice: 32.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 19,
    },
    {
      name: "Sacral Chakra Spray",
      slug: "sacral-chakra-spray",
      description: "A creativity-boosting spray that energizes your sacral chakra for emotional expression and inner flow.",
      benefits: "Boosts Creativity & Imagination, Enhances Emotional Expression, Encourages Joy & Sensual Energy, Supports Healthy Relationships, Balances Mood & Inner Flow",
      price: 22.99,
      comparePrice: 32.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 20,
    },
    {
      name: "Solar Plexus Spray",
      slug: "solar-plexus-spray",
      description: "A confidence-building spray that empowers your solar plexus chakra for willpower and self-belief.",
      benefits: "Builds Confidence & Willpower, Enhances Decision-Making, Improves Focus & Determination, Strengthens Personal Power, Encourages Positive Self-Belief",
      price: 22.99,
      comparePrice: 32.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 21,
    },
    {
      name: "Heart Chakra Spray",
      slug: "heart-chakra-spray",
      description: "A love-opening spray that activates your heart chakra for compassion, forgiveness, and inner peace.",
      benefits: "Opens Heart for Love & Kindness, Promotes Forgiveness & Compassion, Heals Emotional Wounds, Enhances Inner Peace & Harmony, Attracts Loving Gentle Energy",
      price: 23.99,
      comparePrice: 33.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: true,
      sortOrder: 22,
    },
    {
      name: "Throat Chakra Spray",
      slug: "throat-chakra-spray",
      description: "A communication-enhancing spray that clears your throat chakra for honest self-expression and creativity.",
      benefits: "Improves Clear Communication, Encourages Honest Self-Expression, Boosts Confidence in Speaking, Releases Emotional Blockages, Supports Creative Voice Energy",
      price: 22.99,
      comparePrice: 32.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 23,
    },
    {
      name: "Third Eye Chakra Spray",
      slug: "third-eye-chakra-spray",
      description: "An intuition-enhancing spray that awakens your third eye chakra for clarity, insight, and inner wisdom.",
      benefits: "Enhances Intuition & Insight, Promotes Mental Clarity & Vision, Supports Focused Calm Thinking, Awakens Inner Wisdom, Strengthens Spiritual Awareness",
      price: 24.99,
      comparePrice: 34.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 24,
    },
    {
      name: "Crown Chakra Spray",
      slug: "crown-chakra-spray",
      description: "A divine connection spray that activates your crown chakra for higher consciousness and spiritual upliftment.",
      benefits: "Deepens Spiritual Connection, Expands Higher Consciousness, Supports Meditation & Stillness, Aligns Aura With Divine Light, Brings Peace Purity & Upliftment",
      price: 25.99,
      comparePrice: 35.99,
      category: "Chakra Sprays",
      packSize: "100 ML",
      featured: false,
      sortOrder: 25,
    },

    // DHOOP & INCENSE
    {
      name: "Dhoop Stick",
      slug: "dhoop-stick",
      description: "Traditional handcrafted dhoop sticks that create a sacred atmosphere with rich aromatic fragrance.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 12.99,
      comparePrice: 18.99,
      category: "Dhoop & Incense",
      packSize: "100 GM",
      featured: false,
      sortOrder: 26,
    },
    {
      name: "Dhoop Cone",
      slug: "dhoop-cone",
      description: "Premium dhoop cones crafted for easy use, filling your space with calming and purifying fragrance.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 11.99,
      comparePrice: 17.99,
      category: "Dhoop & Incense",
      packSize: "100 GM",
      featured: false,
      sortOrder: 27,
    },
    {
      name: "Sambrani Dhoop Cup",
      slug: "sambrani-dhoop-cup",
      description: "Ready-to-use sambrani dhoop cups that release pure, traditional fragrance for spiritual rituals.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 14.99,
      comparePrice: 21.99,
      category: "Dhoop & Incense",
      packSize: "24 NOS",
      featured: false,
      sortOrder: 28,
    },
    {
      name: "Divine Tilak",
      slug: "divine-tilak",
      description: "A sacred tilak preparation for spiritual marking, enhancing your connection to divine energy.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 9.99,
      comparePrice: 14.99,
      category: "Dhoop & Incense",
      packSize: "5 GM",
      featured: false,
      sortOrder: 29,
    },
    {
      name: "Divine Dhoop Tikki",
      slug: "divine-dhoop-tikki",
      description: "Handcrafted dhoop tikkis that bring traditional fragrance and positive energy to your sacred space.",
      benefits: "Improves emotional bonding, Sparks love and harmony, Encourages mutual understanding, Reduces emotional conflicts, Promotes loving communication",
      price: 10.99,
      comparePrice: 15.99,
      category: "Dhoop & Incense",
      packSize: "6 NOS",
      featured: false,
      sortOrder: 30,
    },

    // BATH & BODY
    {
      name: "Spiritual Perfume (20 ML)",
      slug: "spiritual-perfume-20ml",
      description: "A compact spiritual perfume that keeps you energized, focused, and uplifted throughout the day.",
      benefits: "Stimulates alertness fast, Uplifts mood whole day, Boosts mental focus, Refreshes senses instantly, Reduces mental fatigue",
      price: 15.99,
      comparePrice: 22.99,
      category: "Bath & Body",
      packSize: "20 ML",
      featured: false,
      sortOrder: 31,
    },
    {
      name: "Spiritual Perfume (50 ML)",
      slug: "spiritual-perfume-50ml",
      description: "A premium spiritual perfume that attracts success energy and inspires personal development all day long.",
      benefits: "Boosts mental clarity, Attracts success energy, Inspires personal development, Supports career focus, Encourages daily progress",
      price: 29.99,
      comparePrice: 39.99,
      category: "Bath & Body",
      packSize: "50 ML",
      featured: false,
      sortOrder: 32,
    },
    {
      name: "Aura Soap",
      slug: "aura-soap",
      description: "A handcrafted spiritual soap that cleanses your body while balancing and purifying your aura.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 12.99,
      comparePrice: 18.99,
      category: "Bath & Body",
      packSize: "95 GM",
      featured: false,
      sortOrder: 33,
    },
    {
      name: "Vastu Oil",
      slug: "vastu-oil",
      description: "A specially formulated oil to align your living spaces with Vastu principles and positive energy flow.",
      benefits: "Enhances emotional balance, Promotes self-love energy, Calms the heart chakra, Refreshes with floral aroma, Uplifts mood gently",
      price: 24.99,
      comparePrice: 34.99,
      category: "Bath & Body",
      packSize: "200 ML",
      featured: false,
      sortOrder: 34,
    },
    {
      name: "Sage Smudge Sticks",
      slug: "sage-smudge-sticks",
      description: "Premium sage smudge sticks for deep space cleansing, purifying aura, and inviting positive vibrations.",
      benefits: "Cleanses Spaces From Negative Energy, Purifies Aura & Restores Inner Balance, Enhances Peace Calmness & Clarity, Supports Meditation & Spiritual Healing, Invites Positive Vibrations Into Your Space",
      price: 14.99,
      comparePrice: 21.99,
      category: "Bath & Body",
      packSize: "1 NOS",
      featured: true,
      sortOrder: 35,
    },
    {
      name: "Cow Dung Chip",
      slug: "cow-dung-chip",
      description: "An eco-friendly Vedic component that creates a natural protective shield and balances surrounding energy.",
      benefits: "Helps Reduce Harmful Radiation Exposure, Creates a Natural Protective Shield, Balances Surrounding Energy Field, Supports Safe & Mindful Gadget Usage, Made From Eco-Friendly Vedic Components",
      price: 9.99,
      comparePrice: 14.99,
      category: "Bath & Body",
      packSize: "1 NOS",
      featured: false,
      sortOrder: 36,
    },
    {
      name: "NEH Vedic Bathing Powder",
      slug: "neh-vedic-bathing-powder",
      description: "A sacred bathing powder inspired by Jain traditions for deep cleansing, nourishment, and spiritual purification.",
      benefits: "Deep sacred cleansing, Organic body nourishment, Chemical-free Jain-inspired, Boosts Shukla Leshya for success",
      price: 18.99,
      comparePrice: 27.99,
      category: "Bath & Body",
      packSize: "25/50/100 GM",
      featured: false,
      sortOrder: 37,
    },
    {
      name: "Epsom Bath Salt",
      slug: "epsom-bath-salt",
      description: "Premium Epsom bath salt for deep relaxation, muscle relief, and full-body rejuvenation.",
      benefits: "Relaxes Muscles Reduces Stress, Detoxifies Skin Removes Impurities, Promotes Calm Deep Relaxation, Improves Sleep Eases Fatigue, Refreshes Body Boost Energy",
      price: 16.99,
      comparePrice: 24.99,
      category: "Bath & Body",
      packSize: "150 GM",
      featured: false,
      sortOrder: 38,
    },
  ];

  const createdProducts = await Promise.all(
    products.map((product) =>
      prisma.product.create({
        data: {
          ...product,
          image: "/images/product-placeholder.jpg",
          active: true,
        },
      })
    )
  );
  console.log(`Products created: ${createdProducts.length}`);

  // ─────────────────────────────────────────────
  // 3. Testimonials
  // ─────────────────────────────────────────────
  const testimonials = [
    {
      name: "Priya M.",
      location: "Mumbai",
      rating: 5,
      text: "The Aura Spray has completely transformed the energy of my home. I feel lighter and more at peace every single day.",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Rahul K.",
      location: "Delhi",
      rating: 5,
      text: "I was skeptical at first, but the Protection Spray is incredible. The negative energy in my workspace has noticeably shifted.",
      featured: true,
      sortOrder: 2,
    },
    {
      name: "Anita S.",
      location: "Ahmedabad",
      rating: 5,
      text: "Neha's products are truly divine. The Camphor Spray during my morning prayer creates such a sacred atmosphere.",
      featured: true,
      sortOrder: 3,
    },
    {
      name: "Dr. Meera P.",
      location: "Bangalore",
      rating: 5,
      text: "The Chakra Sprays have become an essential part of my meditation practice. I can feel the difference in my energy centers.",
      featured: false,
      sortOrder: 4,
    },
    {
      name: "Vikram T.",
      location: "Pune",
      rating: 4,
      text: "My business saw a positive shift after I started using the Business Spray and Vastu Spray in my office. Highly recommend!",
      featured: false,
      sortOrder: 5,
    },
    {
      name: "Kavita D.",
      location: "Jaipur",
      rating: 5,
      text: "The Relationship Spray brought so much harmony back into our home. My family noticed the change within days.",
      featured: false,
      sortOrder: 6,
    },
    {
      name: "Sarah L.",
      location: "New York",
      rating: 5,
      text: "As a yoga teacher, I use the Sage Smudge Sticks before every class. My students always comment on the peaceful energy.",
      featured: true,
      sortOrder: 7,
    },
    {
      name: "Deepa R.",
      location: "Surat",
      rating: 4,
      text: "NEH Vedic Bathing Powder has become my daily ritual. The purity and freshness it brings is unmatched.",
      featured: false,
      sortOrder: 8,
    },
  ];

  const createdTestimonials = await Promise.all(
    testimonials.map((t) =>
      prisma.testimonial.create({
        data: { ...t, active: true },
      })
    )
  );
  console.log(`Testimonials created: ${createdTestimonials.length}`);

  // ─────────────────────────────────────────────
  // 4. Page Content
  // ─────────────────────────────────────────────
  const pages = [
    {
      pageSlug: "home",
      title: "Welcome to NEO Divine Products",
      subtitle: "Making Moment Magical",
      content: `NEO Divine Products is a spiritual wellness brand founded by Neha V Shah, a certified Life Coach, Aura Practitioner, and Energy Healer. Our products are carefully crafted to help you cleanse negative energy, enhance your aura, balance your chakras, and create a harmonious living environment. Each product is infused with positive intentions and spiritual energy to support your journey toward inner peace, abundance, and well-being. From our signature Spiritual Sprays to our Chakra collection and traditional Dhoop & Incense, every item is designed to make your moments magical and your life more aligned with positive vibrations.`,
    },
    {
      pageSlug: "about",
      title: "About Neha V Shah",
      subtitle: "Life Coach, Aura Practitioner & Energy Healer",
      content: `Neha V Shah is a passionate and dedicated spiritual wellness practitioner with expertise in multiple healing modalities. As a certified Life Coach, Aura Practitioner, and Energy Healer, she has helped countless individuals transform their lives through the power of spiritual healing and positive energy. With deep knowledge in Reiki, Chakra Healing, NLP, Bach Flower Therapy, Access Bars, and many more holistic practices, Neha brings a unique and comprehensive approach to wellness. Her mission is to make spiritual healing accessible to everyone and to help people discover their inner strength, clarity, and purpose. Through NEO Divine Products, she has channeled her expertise into creating powerful spiritual tools that anyone can use in their daily life.`,
    },
    {
      pageSlug: "purpose",
      title: "Our Purpose",
      subtitle: null,
      content: `Our purpose is to empower individuals on their spiritual journey by providing high-quality, energy-infused products that promote healing, protection, and positive transformation. We believe that everyone deserves to live in an environment filled with positive energy, and our products are designed to help create that sacred space. Whether you are seeking to cleanse your home, enhance your meditation practice, attract abundance, or simply bring more peace into your daily life, NEO Divine Products is here to support you every step of the way.`,
    },
    {
      pageSlug: "philosophy",
      title: "Our Philosophy",
      subtitle: null,
      content: `At NEO Divine Products, we believe that true wellness begins from within. Our philosophy is rooted in the ancient wisdom that our thoughts, energy, and surroundings directly impact our well-being. By aligning ourselves with positive vibrations and cleansing our environment of negative energy, we can create a life of harmony, abundance, and inner peace. Every product we create is a reflection of this belief — crafted with intention, infused with positive energy, and designed to help you live your most aligned and magical life.`,
    },
    {
      pageSlug: "mission",
      title: "Our Mission",
      subtitle: null,
      content: `Our mission is to bridge the gap between ancient spiritual wisdom and modern living. We are committed to creating products that are not only effective but also accessible and easy to incorporate into everyday routines. Through continuous research, spiritual practice, and dedication to quality, we aim to be the leading brand in spiritual wellness products that truly make a difference in people's lives. We strive to educate, inspire, and empower our community to embrace spirituality as a path to a more fulfilling and purpose-driven life.`,
    },
    {
      pageSlug: "vision",
      title: "Our Vision",
      subtitle: null,
      content: `Our vision is to create a world where spiritual wellness is an integral part of everyday life. We envision a future where every home, office, and sacred space is filled with positive energy and divine vibrations. Through our growing range of spiritual products and healing services, we aim to reach millions of people worldwide, helping them discover the transformative power of spiritual practices. We aspire to build a global community of spiritually aware individuals who live with intention, purpose, and inner harmony.`,
    },
    {
      pageSlug: "spiritual-message",
      title: "Spiritual Message",
      subtitle: null,
      content: `Spirituality plays a vital role in our life by guiding us toward inner peace, clarity, and emotional balance. It helps us stay grounded during challenges, gives us strength to face difficulties, and brings a deeper sense of purpose to our everyday actions. By purifying our thoughts and surroundings, spirituality removes negativity and opens the path for positivity, abundance, and healing. It connects us with our true self, encourages mindfulness, and nurtures a calm, focused mind. When we embrace spiritual practices, our life becomes more meaningful, harmonious, and aligned with higher energy.`,
    },
  ];

  const createdPages = await Promise.all(
    pages.map((page) =>
      prisma.pageContent.create({
        data: { ...page, active: true },
      })
    )
  );
  console.log(`Page content created: ${createdPages.length}`);

  // ─────────────────────────────────────────────
  // 5. Services
  // ─────────────────────────────────────────────
  const services = [
    // Energy Healing
    { name: "Reiki Healing", slug: "reiki-healing", description: "A gentle energy healing technique that channels universal life force to promote physical, emotional, and spiritual well-being.", category: "Energy Healing", sortOrder: 1 },
    { name: "Chakra Healing", slug: "chakra-healing", description: "Targeted energy work to balance and align the seven major chakras, restoring harmony and vitality to your entire being.", category: "Energy Healing", sortOrder: 2 },
    { name: "Spiritual Healing & Energy Healing", slug: "spiritual-healing-energy-healing", description: "A comprehensive healing approach that addresses the spiritual root causes of imbalance, promoting deep transformation and renewal.", category: "Energy Healing", sortOrder: 3 },
    { name: "Frequency Healing", slug: "frequency-healing", description: "Therapeutic use of specific sound frequencies to realign the body's energy field, reduce stress, and promote cellular healing.", category: "Energy Healing", sortOrder: 4 },
    { name: "Biofield Therapy", slug: "biofield-therapy", description: "Advanced energy therapy that works with the body's biofield to detect and correct energetic imbalances for optimal health.", category: "Energy Healing", sortOrder: 5 },

    // Holistic Therapies
    { name: "Bach Flower Therapy", slug: "bach-flower-therapy", description: "Natural flower essence remedies that gently address emotional imbalances, stress, and negative mental patterns.", category: "Holistic Therapies", sortOrder: 6 },
    { name: "Colour Therapy", slug: "colour-therapy", description: "Therapeutic use of colors and light to balance energy, improve mood, and support physical and emotional healing.", category: "Holistic Therapies", sortOrder: 7 },
    { name: "Mudra Therapy", slug: "mudra-therapy", description: "Ancient hand gesture techniques that channel energy flow through the body, promoting healing and spiritual awareness.", category: "Holistic Therapies", sortOrder: 8 },
    { name: "Vitalization", slug: "vitalization", description: "A revitalizing energy treatment that restores depleted energy levels and recharges your body, mind, and spirit.", category: "Holistic Therapies", sortOrder: 9 },
    { name: "Holistic Healing", slug: "holistic-healing", description: "An integrated approach combining multiple healing modalities to address the whole person — body, mind, and spirit.", category: "Holistic Therapies", sortOrder: 10 },

    // Mind & Body
    { name: "NLP Therapy", slug: "nlp-therapy", description: "Neuro-Linguistic Programming techniques to reprogram thought patterns, overcome limiting beliefs, and achieve personal goals.", category: "Mind & Body", sortOrder: 11 },
    { name: "EFT Therapy", slug: "eft-therapy", description: "Emotional Freedom Technique (tapping therapy) that combines acupressure with psychology to release emotional blockages.", category: "Mind & Body", sortOrder: 12 },
    { name: "Access Bars Therapy", slug: "access-bars-therapy", description: "A gentle hands-on technique that releases stored limitations, thoughts, and beliefs, creating space for greater possibilities.", category: "Mind & Body", sortOrder: 13 },
    { name: "Access Bars for Youth", slug: "access-bars-for-youth", description: "Specially adapted Access Bars sessions for young people, helping them manage stress, improve focus, and build emotional resilience.", category: "Mind & Body", sortOrder: 14 },
    { name: "Correcting Vision", slug: "correcting-vision", description: "Holistic vision improvement techniques that combine energy healing with exercises to support natural eyesight enhancement.", category: "Mind & Body", sortOrder: 15 },

    // Consulting
    { name: "Image Consultancy", slug: "image-consultancy", description: "Professional guidance on personal presentation, style, and energy projection to help you make a powerful positive impression.", category: "Consulting", sortOrder: 16 },
    { name: "Numerology", slug: "numerology", description: "Detailed numerological analysis to reveal life path insights, personality traits, and guidance for important life decisions.", category: "Consulting", sortOrder: 17 },
    { name: "Aura Scanning Reading & Analysing", slug: "aura-scanning-reading-analysing", description: "Comprehensive aura assessment using advanced techniques to read, analyze, and provide insights into your energy field.", category: "Consulting", sortOrder: 18 },

    // Special Programs
    { name: "Senior Citizens Self Healing Awareness Program", slug: "senior-citizens-self-healing-awareness-program", description: "A specially designed program empowering senior citizens with simple, effective self-healing techniques for daily wellness and vitality.", category: "Special Programs", sortOrder: 19 },
  ];

  const createdServices = await Promise.all(
    services.map((service) =>
      prisma.service.create({
        data: { ...service, active: true },
      })
    )
  );
  console.log(`Services created: ${createdServices.length}`);

  // ─────────────────────────────────────────────
  // 6. Site Settings
  // ─────────────────────────────────────────────
  const settings = [
    { key: "siteName", value: "NEO Divine Products" },
    { key: "tagline", value: "Making Moment Magical" },
    { key: "email", value: "info@neodivineproducts.com" },
    { key: "phone", value: "+1-XXX-XXX-XXXX" },
    { key: "address", value: "NEH Wellness Centre" },
    { key: "instagram", value: "https://www.instagram.com/nehavshahlifecoach/" },
    { key: "facebook", value: "" },
    { key: "youtube", value: "" },
    { key: "whatsapp", value: "" },
    { key: "currency", value: "INR" },
  ];

  const createdSettings = await Promise.all(
    settings.map((setting) =>
      prisma.siteSetting.create({ data: setting })
    )
  );
  console.log(`Site settings created: ${createdSettings.length}`);

  // ─────────────────────────────────────────────
  // 7. Events
  // ─────────────────────────────────────────────
  const events = [
    {
      title: "Harmonizing the Soul: A Sacred Journey of Chakra Balancing with Jain Monks",
      slug: "harmonizing-the-soul-chakra-balancing-jain-monks",
      description: "A profound spiritual experience bringing together ancient Jain wisdom and modern chakra balancing techniques for deep soul healing.",
      date: "2025-08-15",
      time: "10:00 AM - 4:00 PM",
      category: "Jain Monk Sessions",
      upcoming: false,
      featured: false,
      sortOrder: 1,
    },
    {
      title: "Spiritual Harmony and Inner Wellness: An Aura Dowsing Session",
      slug: "spiritual-harmony-inner-wellness-aura-dowsing",
      description: "Discover the power of aura dowsing to identify energy imbalances and restore spiritual harmony in your life.",
      date: "2025-07-20",
      time: "10:00 AM - 1:00 PM",
      category: "Workshops",
      upcoming: false,
      featured: false,
      sortOrder: 2,
    },
    {
      title: "Bridging Spirituality and Science: Aura Wellness Session for Jain Monks",
      slug: "bridging-spirituality-science-aura-wellness-jain-monks",
      description: "An innovative session combining scientific aura analysis with spiritual wellness practices for Jain monks.",
      date: "2025-06-10",
      time: "9:00 AM - 3:00 PM",
      category: "Jain Monk Sessions",
      upcoming: false,
      featured: false,
      sortOrder: 3,
    },
    {
      title: "Empowering the Soul: Physical and Energetic Defense for Jain Monks",
      slug: "empowering-the-soul-physical-energetic-defense-jain-monks",
      description: "A specialized program teaching Jain monks physical and energetic defense techniques for holistic well-being.",
      date: "2025-05-25",
      time: "10:00 AM - 5:00 PM",
      category: "Jain Monk Sessions",
      upcoming: false,
      featured: false,
      sortOrder: 4,
    },
    {
      title: "Divine Connection: Energy Healing and Mudra Vigyan",
      slug: "divine-connection-energy-healing-mudra-vigyan",
      description: "Explore the ancient science of Mudra Vigyan combined with modern energy healing techniques for divine connection.",
      date: "2025-04-18",
      time: "10:00 AM - 2:00 PM",
      category: "Workshops",
      upcoming: false,
      featured: false,
      sortOrder: 5,
    },
    {
      title: "Energetic Wellness: Discover the Power of Shashwat Chikitsha and Life Coaching",
      slug: "energetic-wellness-shashwat-chikitsha-life-coaching",
      description: "A transformative workshop combining Shashwat Chikitsha healing methods with professional life coaching techniques.",
      date: "2025-03-12",
      time: "10:00 AM - 4:00 PM",
      category: "Workshops",
      upcoming: false,
      featured: false,
      sortOrder: 6,
    },
    {
      title: "Chakra Balancing Master Class",
      slug: "chakra-balancing-master-class",
      description: "An intensive masterclass on chakra balancing techniques for practitioners and enthusiasts alike.",
      date: "2025-02-28",
      time: "9:00 AM - 5:00 PM",
      category: "Masterclass",
      upcoming: false,
      featured: false,
      sortOrder: 7,
    },
    {
      title: "Mind Body Balance for Teens: Aura Dowsing and Aroma Wellness",
      slug: "mind-body-balance-teens-aura-dowsing-aroma-wellness",
      description: "A specially designed program for teens combining aura dowsing with aroma wellness for mind-body balance.",
      date: "2025-01-15",
      time: "11:00 AM - 3:00 PM",
      category: "Youth Programs",
      upcoming: false,
      featured: false,
      sortOrder: 8,
    },
    {
      title: "Transform Your Life with Affirmation",
      slug: "transform-your-life-with-affirmation",
      description: "Learn the power of positive affirmations and how to use them effectively to transform every area of your life.",
      date: "2024-12-20",
      time: "10:00 AM - 1:00 PM",
      category: "Workshops",
      upcoming: false,
      featured: false,
      sortOrder: 9,
    },
    {
      title: "Advanced Energy Healing Retreat",
      slug: "advanced-energy-healing-retreat",
      description: "An immersive multi-day retreat for advanced energy healing practitioners to deepen their practice and expand their abilities.",
      date: "2026-04-15",
      time: "9:00 AM - 6:00 PM",
      category: "Retreats",
      upcoming: true,
      featured: true,
      sortOrder: 10,
    },
    {
      title: "Chakra Activation & Aura Cleansing Workshop",
      slug: "chakra-activation-aura-cleansing-workshop",
      description: "A hands-on workshop to learn powerful chakra activation and aura cleansing techniques for personal transformation.",
      date: "2026-05-10",
      time: "10:00 AM - 4:00 PM",
      category: "Workshops",
      upcoming: true,
      featured: true,
      sortOrder: 11,
    },
  ];

  const createdEvents = await Promise.all(
    events.map((event) =>
      prisma.event.create({
        data: { ...event, active: true },
      })
    )
  );
  console.log(`Events created: ${createdEvents.length}`);

  // ─────────────────────────────────────────────
  // 8. Courses
  // ─────────────────────────────────────────────
  const courses = [
    {
      title: "Access Bars Certification",
      slug: "access-bars-certification",
      description: "Become a certified Access Bars practitioner in this comprehensive 2-day training program. Learn 32 points on the head that release stored limitations.",
      duration: "2 Days",
      level: "Beginner",
      price: 299,
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Chakra Healing Workshop",
      slug: "chakra-healing-workshop",
      description: "A one-day intensive workshop covering all seven chakras, their significance, and practical techniques for balancing and healing them.",
      duration: "1 Day",
      level: "All Levels",
      price: 149,
      featured: false,
      sortOrder: 2,
    },
    {
      title: "Aura Reading Masterclass",
      slug: "aura-reading-masterclass",
      description: "Master the art of aura reading and analysis in this 3-day advanced training. Learn to see, interpret, and work with the human energy field.",
      duration: "3 Days",
      level: "Intermediate",
      price: 449,
      featured: true,
      sortOrder: 3,
    },
    {
      title: "Corporate Wellness Program",
      slug: "corporate-wellness-program",
      description: "A customizable wellness program designed for corporate teams, focusing on stress management, energy balance, and workplace harmony.",
      duration: "Custom",
      level: "Professional",
      price: null,
      featured: false,
      sortOrder: 4,
    },
    {
      title: "Self-Healing Awareness for Senior Citizens",
      slug: "self-healing-awareness-senior-citizens",
      description: "A gentle and accessible program designed specifically for senior citizens to learn simple self-healing techniques for daily wellness.",
      duration: "1 Day",
      level: "Beginner",
      price: 99,
      featured: false,
      sortOrder: 5,
    },
  ];

  const createdCourses = await Promise.all(
    courses.map((course) =>
      prisma.course.create({
        data: { ...course, active: true },
      })
    )
  );
  console.log(`Courses created: ${createdCourses.length}`);

  // ─────────────────────────────────────────────
  // 9. Pricing Plans
  // ─────────────────────────────────────────────
  const pricingPlans = [
    {
      name: "Single Session",
      description: "Perfect for first-time visitors looking to experience spiritual healing.",
      price: 49,
      duration: "60 minutes",
      features: "One-on-one consultation\nPersonalized energy assessment\nCustomized healing session\nPost-session guidance",
      popular: false,
      sortOrder: 1,
    },
    {
      name: "5-Session Package",
      description: "Ideal for those committed to their healing journey with ongoing support.",
      price: 199,
      duration: "5 x 60 minutes",
      features: "All Single Session benefits\nProgress tracking\nCustomized treatment plan\n10% savings\nPriority booking",
      popular: true,
      sortOrder: 2,
    },
    {
      name: "10-Session Package",
      description: "Comprehensive healing program for deep transformation and lasting results.",
      price: 349,
      duration: "10 x 60 minutes",
      features: "All Package benefits\nMonthly progress review\nWhatsApp support\n30% savings\nFlexible scheduling",
      popular: false,
      sortOrder: 3,
    },
    {
      name: "Corporate Wellness",
      description: "Tailored wellness solutions for organizations and teams.",
      price: 0,
      duration: "Custom",
      features: "Team workshops\nStress management sessions\nAura reading for teams\nCustom program design\nOngoing support",
      popular: false,
      sortOrder: 4,
    },
  ];

  const createdPricingPlans = await Promise.all(
    pricingPlans.map((plan) =>
      prisma.pricingPlan.create({
        data: { ...plan, active: true },
      })
    )
  );
  console.log(`Pricing plans created: ${createdPricingPlans.length}`);

  // ─────────────────────────────────────────────
  // Summary
  // ─────────────────────────────────────────────
  console.log("\n========================================");
  console.log("Seed completed successfully!");
  console.log("========================================");
  console.log(`  Admin users:    1`);
  console.log(`  Products:       ${createdProducts.length}`);
  console.log(`  Testimonials:   ${createdTestimonials.length}`);
  console.log(`  Page content:   ${createdPages.length}`);
  console.log(`  Services:       ${createdServices.length}`);
  console.log(`  Site settings:  ${createdSettings.length}`);
  console.log(`  Events:         ${createdEvents.length}`);
  console.log(`  Courses:        ${createdCourses.length}`);
  console.log(`  Pricing plans:  ${createdPricingPlans.length}`);
  console.log("========================================");
  console.log(`\nAdmin login: admin@neodivine.com / admin123`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
