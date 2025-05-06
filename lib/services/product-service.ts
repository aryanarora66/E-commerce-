import { Product } from '@/types';
import { getRandomInt } from '@/lib/utils';

// This is a mock service that would normally fetch data from an API
// In a real application, this would be replaced with actual API calls

// Mock product data
const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Wireless Bluetooth Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation technology.',
    price: 49.99,
    compareAtPrice: 79.99,
    category: 'Electronics',
    brand: 'SoundTech',
    rating: 4.5,
    reviewCount: 128,
    sold: 1240,
    inStock: true,
    isNew: true,
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5081399/pexels-photo-5081399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Active noise cancellation',
      'Bluetooth 5.0 connectivity',
      'Up to 20 hours battery life',
      'Water and sweat resistant',
      'Touch controls for music and calls',
    ],
    longDescription: `
      <p>Experience premium sound quality with our Wireless Bluetooth Earbuds. These earbuds feature active noise cancellation technology that blocks out unwanted ambient noise, allowing you to focus on your music or calls without distractions.</p>
      <p>With Bluetooth 5.0 connectivity, you'll enjoy a stable and fast connection to your devices, while the impressive 20-hour battery life ensures your earbuds are ready whenever you are. The included charging case provides additional power on the go.</p>
      <p>Designed for comfort and durability, these earbuds are water and sweat resistant, making them perfect for workouts and outdoor activities. The intuitive touch controls let you manage your music playback and phone calls with ease.</p>
    `,
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': 'Up to 20 hours (with charging case)',
      'Charging Time': '1.5 hours',
      'Noise Cancellation': 'Active',
      'Water Resistance': 'IPX4',
      'Weight': '5g per earbud, 50g charging case',
      'Warranty': '1 year manufacturer warranty'
    },
    variants: [
      { id: 'var_1', name: 'Black' },
      { id: 'var_2', name: 'White' },
      { id: 'var_3', name: 'Blue' },
    ],
    variantType: 'Color',
  },
  {
    id: 'prod_2',
    name: 'Smart Watch with Fitness Tracker',
    description: 'Track your health and stay connected with this advanced smartwatch.',
    price: 129.99,
    compareAtPrice: 159.99,
    category: 'Electronics',
    brand: 'TechFit',
    rating: 4.2,
    reviewCount: 85,
    sold: 720,
    inStock: true,
    isNew: false,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4482936/pexels-photo-4482936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'GPS functionality',
      'Water resistant up to 50m',
      'Up to 7 days battery life',
    ],
    variants: [
      { id: 'var_4', name: 'Black' },
      { id: 'var_5', name: 'Silver' },
      { id: 'var_6', name: 'Rose Gold' },
    ],
    variantType: 'Color',
  },
  {
    id: 'prod_3',
    name: 'Professional Camera Drone',
    description: 'Capture stunning aerial footage with this easy-to-fly professional drone.',
    price: 799.99,
    compareAtPrice: 999.99,
    category: 'Electronics',
    brand: 'SkyView',
    rating: 4.8,
    reviewCount: 42,
    sold: 310,
    inStock: true,
    isNew: true,
    images: [
      'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1182127/pexels-photo-1182127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/73910/drones-dji-phantom-electronics-73910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      '4K camera with stabilization',
      '30 minutes flight time',
      'Obstacle avoidance system',
      'Automated flight modes',
      'Range of up to 5km',
    ],
  },
  {
    id: 'prod_4',
    name: 'Leather Weekend Bag',
    description: 'Stylish and durable leather bag perfect for short trips.',
    price: 159.99,
    compareAtPrice: null,
    category: 'Fashion',
    brand: 'UrbanStyle',
    rating: 4.6,
    reviewCount: 56,
    sold: 420,
    inStock: true,
    isNew: false,
    images: [
      'https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Genuine premium leather',
      'Water-resistant lining',
      'Multiple compartments',
      'Padded laptop sleeve',
      'Detachable shoulder strap',
    ],
    variants: [
      { id: 'var_7', name: 'Brown' },
      { id: 'var_8', name: 'Black' },
      { id: 'var_9', name: 'Tan' },
    ],
    variantType: 'Color',
  },
  {
    id: 'prod_5',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with exceptional sound quality.',
    price: 249.99,
    compareAtPrice: 349.99,
    category: 'Electronics',
    brand: 'AudioPro',
    rating: 4.7,
    reviewCount: 112,
    sold: 860,
    inStock: true,
    isNew: false,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Active noise cancellation',
      'Up to 30 hours battery life',
      'Premium sound quality with deep bass',
      'Comfortable over-ear design',
      'Built-in microphone for calls',
    ],
    variants: [
      { id: 'var_10', name: 'Black' },
      { id: 'var_11', name: 'Silver' },
      { id: 'var_12', name: 'Blue' },
    ],
    variantType: 'Color',
  },
  {
    id: 'prod_6',
    name: 'Smart Home Security Camera',
    description: 'Keep your home secure with this HD security camera system.',
    price: 89.99,
    compareAtPrice: 119.99,
    category: 'Electronics',
    brand: 'SafeGuard',
    rating: 4.3,
    reviewCount: 78,
    sold: 630,
    inStock: true,
    isNew: true,
    images: [
      'https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1557311/pexels-photo-1557311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1279619/pexels-photo-1279619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      '1080p HD video quality',
      'Motion detection alerts',
      'Night vision capability',
      'Two-way audio communication',
      'Cloud storage for recordings',
    ],
  },
  {
    id: 'prod_7',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair designed for long working hours.',
    price: 199.99,
    compareAtPrice: 249.99,
    category: 'Home',
    brand: 'ComfortPlus',
    rating: 4.4,
    reviewCount: 92,
    sold: 540,
    inStock: true,
    isNew: false,
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5695117/pexels-photo-5695117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5695145/pexels-photo-5695145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6489601/pexels-photo-6489601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Adjustable lumbar support',
      'Breathable mesh back',
      'Padded armrests',
      'Height adjustment',
      'Tilt mechanism with tension control',
    ],
    variants: [
      { id: 'var_13', name: 'Black' },
      { id: 'var_14', name: 'Gray' },
      { id: 'var_15', name: 'Blue' },
    ],
    variantType: 'Color',
  },
  {
    id: 'prod_8',
    name: 'Premium Coffee Maker',
    description: 'Brew perfect coffee with this programmable coffee machine.',
    price: 129.99,
    compareAtPrice: 159.99,
    category: 'Home',
    brand: 'BrewMaster',
    rating: 4.5,
    reviewCount: 102,
    sold: 750,
    inStock: true,
    isNew: false,
    images: [
      'https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5875865/pexels-photo-5875865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5875862/pexels-photo-5875862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      '12-cup capacity',
      'Programmable timer',
      'Built-in grinder',
      'Keep-warm function',
      'Removable water reservoir',
    ],
  },
];

// Generate more mock products
Array.from({ length: 20 }).forEach((_, i) => {
  const index = i + 9;
  const price = getRandomInt(20, 200);
  const hasDiscount = Math.random() > 0.5;
  
  products.push({
    id: `prod_${index}`,
    name: `Product ${index}`,
    description: `This is a description for product ${index}.`,
    price: price,
    compareAtPrice: hasDiscount ? price * 1.2 : null,
    category: i % 2 === 0 ? 'Electronics' : i % 3 === 0 ? 'Fashion' : 'Home',
    brand: i % 2 === 0 ? 'TechBrand' : i % 3 === 0 ? 'FashionBrand' : 'HomeBrand',
    rating: 3 + Math.random() * 2,
    reviewCount: getRandomInt(10, 200),
    sold: getRandomInt(50, 1000),
    inStock: Math.random() > 0.1,
    isNew: Math.random() > 0.8,
    images: [
      `https://picsum.photos/id/${getRandomInt(10, 1000)}/600/600`,
      `https://picsum.photos/id/${getRandomInt(10, 1000)}/600/600`,
      `https://picsum.photos/id/${getRandomInt(10, 1000)}/600/600`,
    ],
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  });
});

// Service methods
export async function getProducts(params: any = {}): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = [...products];

  // Apply filters
  if (params?.category) {
    const categories = params.category.split(',');
    filteredProducts = filteredProducts.filter(product => 
      categories.some(cat => product.category.toLowerCase() === cat.toLowerCase())
    );
  }

  if (params?.brand) {
    const brands = params.brand.split(',');
    filteredProducts = filteredProducts.filter(product => 
      brands.some(brand => product.brand.toLowerCase() === brand.toLowerCase())
    );
  }

  if (params?.minPrice || params?.maxPrice) {
    const minPrice = parseFloat(params.minPrice || '0');
    const maxPrice = parseFloat(params.maxPrice || '10000');
    filteredProducts = filteredProducts.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }

  if (params?.rating) {
    const minRating = parseFloat(params.rating);
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
  }

  if (params?.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (params?.sort) {
    switch (params.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.sold - a.sold);
        break;
      default:
        // featured - no specific sort
        break;
    }
  }

  // Pagination
  if (params?.page) {
    const page = parseInt(params.page) || 1;
    const pageSize = 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    filteredProducts = filteredProducts.slice(start, end);
  }

  return filteredProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return 4 featured products
  return products
    .filter(product => product.rating >= 4.5 || product.isNew)
    .slice(0, 4);
}

export async function getDeals(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return products with discounts
  return products
    .filter(product => product.compareAtPrice !== null)
    .slice(0, 4);
}

export async function getRecommendedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Shuffle array and return 4 products
  return [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const currentProduct = products.find(p => p.id === productId);
  
  if (!currentProduct) {
    return products.slice(0, 4);
  }
  
  // Return products in the same category
  return products
    .filter(p => p.id !== productId && p.category === currentProduct.category)
    .slice(0, 4);
}

export function getProduct(id: string): Product {
  const product = products.find(p => p.id === id);
  
  if (!product) {
    // Fallback to first product if not found
    return products[0];
  }
  
  return product;
}