import { getRandomInt } from '@/lib/utils';

// Mock order data
export function getOrders() {
  // Generate random orders
  const statuses = ['processing', 'shipped', 'delivered', 'canceled'];
  const dates = [
    new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 minutes ago
    new Date(Date.now() - 1000 * 60 * 43).toISOString(), // 43 minutes ago
    new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
  ];

  return Array.from({ length: 10 }).map((_, i) => ({
    id: `ORD-${100000 + i}`,
    date: dates[i],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    total: getRandomInt(50, 500),
    items: getRandomInt(1, 5),
  }));
}