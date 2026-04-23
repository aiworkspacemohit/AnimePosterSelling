const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const products = [
  // ── NARUTO ──
  {
    title: 'NARUTO UZUMAKI - SAGE MODE',
    description: 'The Hidden Leaf\'s greatest ninja in full Sage Mode glory. Vibrant 300 GSM matte poster.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/naruto1.jpg',
    category: 'Naruto',
    stock: 50,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'SASUKE UCHIHA - RINNEGAN',
    description: 'The last Uchiha wielding the power of the Rinnegan. Studio-grade print on premium paper.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/naruto2.jpg',
    category: 'Naruto',
    stock: 50,
    size: 'A3',
    isFeatured: false,
  },
  {
    title: 'ITACHI UCHIHA - CROWS',
    description: 'Iconic aesthetic of Itachi Uchiha with his legendary crows. Premium matte finish.',
    price: 549,
    originalPrice: 849,
    imageUrl: '/assets/naruto3.jpg',
    category: 'Naruto',
    stock: 50,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'KAKASHI HATAKE - SHARINGAN',
    description: 'The Copy Ninja revealing his Sharingan. High-definition vibrant print.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/naruto4.jpg',
    category: 'Naruto',
    stock: 50,
    size: 'A3',
    isFeatured: false,
  },
  // ── ONE PIECE ──
  {
    title: 'MONKEY D. LUFFY - GEAR 5',
    description: 'The Sun God Nika transformation in high-definition glory. Premium matte paper.',
    price: 599,
    originalPrice: 899,
    imageUrl: '/assets/one1.jpg',
    category: 'One Piece',
    stock: 60,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'RORONOA ZORO - THREE SWORD STYLE',
    description: 'Studio-grade poster of the legendary swordsman. High-definition finish.',
    price: 549,
    originalPrice: 849,
    imageUrl: '/assets/one2.jpg',
    category: 'One Piece',
    stock: 60,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'PORTGAS D. ACE - FIRE FIST',
    description: 'Legacy poster of Fire Fist Ace. Vibrant colors on 300 GSM matte paper.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/one3.jpg',
    category: 'One Piece',
    stock: 60,
    size: 'A3',
    isFeatured: false,
  },
  {
    title: 'SHANKS - YONKO EMPEROR',
    description: 'Emperor Shanks commanding presence. Clean and professional studio poster.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/one4.jpg',
    category: 'One Piece',
    stock: 60,
    size: 'A3',
    isFeatured: false,
  },
  // ── DEMON SLAYER ──
  {
    title: 'TANJIRO KAMADO - HINOKAMI',
    description: 'Hinokami Kagura sun breathing technique in full bloom. Studio-quality print.',
    price: 449,
    originalPrice: 699,
    imageUrl: '/assets/demon1.jpg',
    category: 'Demon Slayer',
    stock: 40,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'RENGOKU - FLAME HASHIRA',
    description: 'Set your heart ablaze with this Flame Hashira poster. High-definition print.',
    price: 499,
    originalPrice: 749,
    imageUrl: '/assets/demon2.jpg',
    category: 'Demon Slayer',
    stock: 40,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'ZENITSU AGATSUMA - THUNDER BREATHING',
    description: 'Thunder Breathing First Form action shot. Breathtaking studio-grade poster.',
    price: 449,
    originalPrice: 699,
    imageUrl: '/assets/demon3.jpg',
    category: 'Demon Slayer',
    stock: 40,
    size: 'A3',
    isFeatured: false,
  },
  {
    title: 'NEZUKO KAMADO - DEMON BLOOM',
    description: 'Aesthetic poster of Nezuko in her demon form. Soft yet vibrant colors.',
    price: 449,
    originalPrice: 699,
    imageUrl: '/assets/demon4.jpg',
    category: 'Demon Slayer',
    stock: 40,
    size: 'A3',
    isFeatured: false,
  },
  // ── DEATH NOTE ──
  {
    title: 'RYUK - SHINIGAMI OF DEATH',
    description: 'Dark academia vibe poster of the Shinigami Ryuk. 300 GSM premium matte paper.',
    price: 399,
    originalPrice: 599,
    imageUrl: '/assets/death1.jpg',
    category: 'Death Note',
    stock: 30,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'LIGHT YAGAMI - KIRA',
    description: 'The God of the New World in his iconic pose. Studio-grade quality.',
    price: 399,
    originalPrice: 599,
    imageUrl: '/assets/death2.jpg',
    category: 'Death Note',
    stock: 30,
    size: 'A3',
    isFeatured: false,
  },
  {
    title: 'L LAWLIET - THE DETECTIVE',
    description: 'Minimalist detective L poster. Perfect for serious otaku spaces.',
    price: 399,
    originalPrice: 599,
    imageUrl: '/assets/death3.jpg',
    category: 'Death Note',
    stock: 30,
    size: 'A3',
    isFeatured: true,
  },
  // ── ATTACK ON TITAN ──
  {
    title: 'EREN YEAGER - FOUNDING TITAN',
    description: 'The titan who seeks freedom beyond the walls. High-definition studio matte.',
    price: 549,
    originalPrice: 849,
    imageUrl: '/assets/aot1.jpg',
    category: 'Attack on Titan',
    stock: 50,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'LEVI ACKERMAN - HUMANITY\'S STRONGEST',
    description: 'Humanity\'s strongest soldier in full ODM gear. Sharp, high-definition action.',
    price: 599,
    originalPrice: 899,
    imageUrl: '/assets/aot2.jpg',
    category: 'Attack on Titan',
    stock: 50,
    size: 'A3',
    isFeatured: true,
  },
  {
    title: 'MIKASA ACKERMAN - PROTECTOR',
    description: 'Mikasa\'s fierce resolve captured in premium 300 GSM matte finish.',
    price: 499,
    originalPrice: 799,
    imageUrl: '/assets/aot3.jpg',
    category: 'Attack on Titan',
    stock: 50,
    size: 'A3',
    isFeatured: false,
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
