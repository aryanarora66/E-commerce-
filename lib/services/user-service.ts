// Mock user data
export function getAddresses() {
  return [
    {
      id: 'addr_1',
      fullName: 'John Doe',
      phoneNumber: '+1 (555) 123-4567',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
    },
    {
      id: 'addr_2',
      fullName: 'John Doe',
      phoneNumber: '+1 (555) 123-4567',
      addressLine1: '456 Work Ave',
      addressLine2: '',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'US',
      isDefault: false,
    },
  ];
}

export function getWishlist() {
  return [
    {
      id: 'prod_12',
      name: 'Wireless Gaming Headset',
      brand: 'AudioPro',
      price: 149.99,
      images: [
        'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      id: 'prod_13',
      name: 'Ultra HD Smart TV',
      brand: 'TechVision',
      price: 899.99,
      images: [
        'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      id: 'prod_14',
      name: 'Designer Leather Wallet',
      brand: 'LuxStyle',
      price: 79.99,
      images: [
        'https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      id: 'prod_15',
      name: 'Stainless Steel Water Bottle',
      brand: 'EcoLife',
      price: 29.99,
      images: [
        'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
    {
      id: 'prod_16',
      name: 'Fitness Tracker Watch',
      brand: 'FitTech',
      price: 89.99,
      images: [
        'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
    },
  ];
}