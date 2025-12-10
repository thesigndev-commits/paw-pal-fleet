// Mock Data for Pet Transport App

export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  vehicleType: 'car' | 'suv' | 'van';
  vehiclePlate: string;
  vehicleModel: string;
  isOnline: boolean;
  currentLocation?: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  customerId: string;
  driverId?: string;
  petId: string;
  petName: string;
  petType: string;
  pickupAddress: string;
  dropoffAddress: string;
  serviceType: 'pet-car' | 'pet-suv' | 'pet-van';
  tripMode: 'one-way' | 'round-trip' | 'hourly';
  scheduledTime: string;
  status: 'pending' | 'searching' | 'matched' | 'pickup' | 'in-transit' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
  options: {
    cage: boolean;
    ac: boolean;
    extraCare: boolean;
  };
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'quick-action';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  participantAvatars: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'customer-driver' | 'customer-support' | 'driver-support';
}

export interface WalletTransaction {
  id: string;
  type: 'topup' | 'payment' | 'refund' | 'cashback';
  amount: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'driver-matched' | 'trip-started' | 'eta-update' | 'promo' | 'system';
  timestamp: string;
  isRead: boolean;
}

// Mock Drivers
export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Somchai Petlover',
    phone: '+66 89 123 4567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    totalTrips: 1247,
    vehicleType: 'suv',
    vehiclePlate: 'กข 1234',
    vehicleModel: 'Toyota Fortuner',
    isOnline: true,
  },
  {
    id: 'd2',
    name: 'Nattaya Pawsome',
    phone: '+66 91 234 5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    totalTrips: 892,
    vehicleType: 'van',
    vehiclePlate: 'ขค 5678',
    vehicleModel: 'Hyundai H-1',
    isOnline: true,
  },
  {
    id: 'd3',
    name: 'Prasit Caretaker',
    phone: '+66 82 345 6789',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    totalTrips: 654,
    vehicleType: 'car',
    vehiclePlate: 'คง 9012',
    vehicleModel: 'Honda Civic',
    isOnline: false,
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    driverId: 'd1',
    petId: 'p1',
    petName: 'Buddy',
    petType: 'Golden Retriever',
    pickupAddress: 'Siam Paragon, Pathum Wan',
    dropoffAddress: 'Central World, Pathum Wan',
    serviceType: 'pet-suv',
    tripMode: 'one-way',
    scheduledTime: '2024-01-15T10:00:00',
    status: 'completed',
    fare: 250,
    distance: 3.2,
    duration: 15,
    options: { cage: true, ac: true, extraCare: false },
    createdAt: '2024-01-15T09:30:00',
  },
  {
    id: 'b2',
    customerId: 'c1',
    petId: 'p2',
    petName: 'Whiskers',
    petType: 'Persian Cat',
    pickupAddress: 'EmQuartier, Sukhumvit',
    dropoffAddress: 'Pet Hospital, Thonglor',
    serviceType: 'pet-car',
    tripMode: 'round-trip',
    scheduledTime: '2024-01-16T14:00:00',
    status: 'searching',
    fare: 380,
    distance: 5.8,
    duration: 25,
    options: { cage: true, ac: true, extraCare: true },
    createdAt: '2024-01-16T13:30:00',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: 'conv1',
    senderId: 'd1',
    senderName: 'Somchai',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'Hi! I\'m on my way to pick up Buddy. ETA 5 minutes.',
    type: 'text',
    timestamp: '2024-01-15T09:55:00',
    status: 'read',
  },
  {
    id: 'm2',
    conversationId: 'conv1',
    senderId: 'c1',
    senderName: 'You',
    senderAvatar: '',
    content: 'Great! We\'re waiting at the main entrance.',
    type: 'text',
    timestamp: '2024-01-15T09:56:00',
    status: 'read',
  },
  {
    id: 'm3',
    conversationId: 'conv1',
    senderId: 'd1',
    senderName: 'Somchai',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'I\'m here',
    type: 'quick-action',
    timestamp: '2024-01-15T10:00:00',
    status: 'delivered',
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['c1', 'd1'],
    participantNames: ['You', 'Somchai Petlover'],
    participantAvatars: ['', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'],
    lastMessage: 'I\'m here',
    lastMessageTime: '2024-01-15T10:00:00',
    unreadCount: 0,
    type: 'customer-driver',
  },
  {
    id: 'conv2',
    participants: ['c1', 'support'],
    participantNames: ['You', 'Pet Transport Support'],
    participantAvatars: ['', ''],
    lastMessage: 'How can I help you today?',
    lastMessageTime: '2024-01-14T15:30:00',
    unreadCount: 1,
    type: 'customer-support',
  },
];

// Mock Wallet Transactions
export const mockWalletTransactions: WalletTransaction[] = [
  { id: 't1', type: 'topup', amount: 500, description: 'Top-up via Credit Card', timestamp: '2024-01-15T08:00:00', status: 'completed' },
  { id: 't2', type: 'payment', amount: -250, description: 'Trip payment - Buddy', timestamp: '2024-01-15T10:30:00', status: 'completed' },
  { id: 't3', type: 'cashback', amount: 25, description: '10% cashback reward', timestamp: '2024-01-15T10:31:00', status: 'completed' },
  { id: 't4', type: 'topup', amount: 1000, description: 'Top-up via PromptPay', timestamp: '2024-01-10T14:00:00', status: 'completed' },
  { id: 't5', type: 'refund', amount: 150, description: 'Cancelled trip refund', timestamp: '2024-01-08T16:00:00', status: 'completed' },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Driver Matched!', message: 'Somchai is on his way to pick up Buddy', type: 'driver-matched', timestamp: '2024-01-15T09:50:00', isRead: true },
  { id: 'n2', title: 'Trip Started', message: 'Your pet is now en route to the destination', type: 'trip-started', timestamp: '2024-01-15T10:05:00', isRead: true },
  { id: 'n3', title: '🎉 Special Offer!', message: 'Get 20% off your next 3 rides. Code: PETLOVE20', type: 'promo', timestamp: '2024-01-14T09:00:00', isRead: false },
  { id: 'n4', title: 'ETA Update', message: 'Your driver will arrive in 3 minutes', type: 'eta-update', timestamp: '2024-01-15T09:57:00', isRead: true },
];

// Mock Pets
export const mockPets = [
  { id: 'p1', name: 'Buddy', type: 'dog' as const, breed: 'Golden Retriever', weight: 32, photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop', notes: 'Very friendly, loves car rides' },
  { id: 'p2', name: 'Whiskers', type: 'cat' as const, breed: 'Persian', weight: 5, photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop', notes: 'Needs quiet environment' },
  { id: 'p3', name: 'Max', type: 'dog' as const, breed: 'French Bulldog', weight: 12, photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop', notes: 'May need AC, sensitive to heat' },
];

// Service Types
export const serviceTypes = [
  { id: 'pet-car', name: 'Pet Car', description: 'Standard sedan for small pets', capacity: '1-2 small pets', icon: '🚗', basePrice: 150 },
  { id: 'pet-suv', name: 'Pet SUV', description: 'Spacious SUV for medium pets', capacity: '1-2 medium pets', icon: '🚙', basePrice: 200 },
  { id: 'pet-van', name: 'Pet Van', description: 'Large van for multiple or large pets', capacity: '3+ or large pets', icon: '🚐', basePrice: 350 },
];

// Promotions
export const mockPromotions = [
  { id: 'promo1', title: 'First Ride Free', description: 'New users get their first ride free up to ฿200', code: 'FIRSTPET', discount: 200, validUntil: '2024-02-28', image: '' },
  { id: 'promo2', title: '20% Off Weekend', description: 'Enjoy 20% off all weekend rides', code: 'WEEKEND20', discount: 0.2, validUntil: '2024-01-31', image: '' },
  { id: 'promo3', title: 'Refer & Earn', description: 'Get ฿100 for each friend you refer', code: 'REFER100', discount: 100, validUntil: '2024-12-31', image: '' },
];
