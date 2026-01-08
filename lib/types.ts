export type UserRole = 'guest' | 'user' | 'vip' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  isFollowing?: string[];
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  isLive: boolean;
  nextLiveTime?: string;
  isVip?: boolean;
  followers?: number;
}

export interface Stream {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  title: string;
  thumbnail?: string;
  isLive: boolean;
  startsIn?: string;
  startsAt?: Date;
  viewers?: number;
}

export interface Game {
  id: string;
  name: string;
  type: 'Coin Flip' | 'Case Break' | 'Auction' | 'Mystery Box';
  hostId: string;
  hostName: string;
  participants?: number;
  prizePool?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured?: boolean;
  stock?: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorIsVip: boolean;
  authorIsHost: boolean;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  likedBy?: string[]; // Array of user IDs who liked
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  timestamp: Date;
  expiresAt?: Date; // Stories expire after 24 hours
  views?: number;
  viewedBy?: string[]; // Array of user IDs who viewed
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  likes?: number;
}

export interface SpotPrice {
  metal: 'Gold' | 'Silver' | 'Platinum' | 'Palladium';
  price: string;
  trend: 'up' | 'down';
}

