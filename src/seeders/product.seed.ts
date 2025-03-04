import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    const productsData = [
      {
        name: "Apple iPhone 13",
        description:
          "The latest iPhone with A15 Bionic chip, advanced dual-camera system, and a super retina display.",
        price: 799.99,
      },
      {
        name: "Samsung Galaxy S21",
        description:
          "Flagship smartphone with a 120Hz display, powerful Exynos processor, and a triple-camera system.",
        price: 699.99,
      },
      {
        name: "Sony WH-1000XM4 Headphones",
        description:
          "Industry-leading noise-cancelling over-ear headphones with superior sound quality.",
        price: 349.99,
      },
      {
        name: "Dell XPS 13 Laptop",
        description:
          "Compact and powerful laptop with InfinityEdge display and long battery life.",
        price: 999.99,
      },
      {
        name: "Apple MacBook Pro",
        description:
          "High-performance laptop with the M1 chip, Retina display, and exceptional battery life.",
        price: 1299.99,
      },
      {
        name: "HP Spectre x360",
        description:
          "Convertible laptop with a sleek design, powerful performance, and optional 4K display.",
        price: 1099.99,
      },
      {
        name: "Amazon Echo Dot",
        description:
          "Compact smart speaker with Alexa, ideal for controlling smart home devices and streaming music.",
        price: 49.99,
      },
      {
        name: "Google Nest Hub",
        description:
          "Smart display for controlling smart home devices, viewing photos, and getting recipes.",
        price: 89.99,
      },
      {
        name: "Bose QuietComfort Earbuds",
        description:
          "Wireless earbuds with top-notch noise cancellation and superior sound quality.",
        price: 279.99,
      },
      {
        name: "Nintendo Switch",
        description:
          "Versatile gaming console that works as both a portable device and a home console.",
        price: 299.99,
      },
      {
        name: "Canon EOS Rebel T7",
        description:
          "Entry-level DSLR camera featuring an 18MP sensor and built-in WiFi, perfect for beginners.",
        price: 449.99,
      },
      {
        name: "Fitbit Charge 5",
        description:
          "Advanced fitness tracker with built-in GPS, heart rate monitoring, and stress management tools.",
        price: 179.99,
      },
      {
        name: "Microsoft Surface Pro 7",
        description:
          "A versatile 2-in-1 laptop and tablet that’s perfect for work and play.",
        price: 899.99,
      },
      {
        name: "JBL Flip 5 Speaker",
        description:
          "Portable Bluetooth speaker with powerful sound and a waterproof design, ideal for outdoor use.",
        price: 99.99,
      },
      {
        name: "LG OLED TV",
        description:
          "Stunning 4K OLED television with perfect blacks, vibrant colors, and smart features.",
        price: 1499.99,
      },
    ];

    for (const product of productsData) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Product '${product.name}' created successfully.`);
      } else {
        console.log(`Product '${product.name}' already exists.`);
      }
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedProducts();
