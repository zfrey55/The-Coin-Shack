import { Host, Stream, Game, Product, Post, SpotPrice } from './types';

export const mockHosts: Host[] = [
  { id: '1', name: 'Rari', avatar: 'https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?w=200', isLive: true, bio: 'Professional coin dealer specializing in rare Morgan Dollars', followers: 12847 },
  { id: '2', name: 'Mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', isLive: false, nextLiveTime: '1 hour', followers: 8432 },
  { id: '3', name: 'Dom', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', isLive: false, nextLiveTime: '3 hours', followers: 15234 },
  { id: '4', name: 'Manu', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', isLive: false, nextLiveTime: '5 hours', isVip: true, followers: 9876 },
];

export const mockStreams: Stream[] = [
  { id: '1', hostId: '1', hostName: 'Rari', hostAvatar: mockHosts[0].avatar, title: 'Rare Morgan Dollars Live Auction', isLive: true, viewers: 342 },
  { id: '2', hostId: '2', hostName: 'Mike', hostAvatar: mockHosts[1].avatar, title: 'Silver Round Breaks & Games', isLive: false, startsIn: '1 hour' },
  { id: '3', hostId: '3', hostName: 'Dom', hostAvatar: mockHosts[2].avatar, title: 'Gold Eagle Collection Showcase', isLive: false, startsIn: '3 hours' },
];

export const mockGames: Game[] = [
  { id: '1', name: 'Morgan Dollar Auction', type: 'Auction', hostId: '1', hostName: 'Rari', participants: 45, prizePool: 2500 },
  { id: '2', name: 'Silver Round Flip', type: 'Coin Flip', hostId: '2', hostName: 'Mike', participants: 23, prizePool: 1200 },
  { id: '3', name: 'Mystery Box Break', type: 'Case Break', hostId: '3', hostName: 'Dom', participants: 67, prizePool: 5000 },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Premium Mystery Coin Box', description: 'Curated selection of rare coins', price: 299.99, image: 'https://images.unsplash.com/photo-1643393670577-b214e610c8f8?w=600', isFeatured: true, stock: 12 },
  { id: '2', name: 'Gold Eagle Case Break', description: 'Break into a sealed case', price: 149.99, image: 'https://images.unsplash.com/photo-1745655604884-dd4fad590504?w=600', stock: 24 },
  { id: '3', name: 'Silver Morgan Dollar Pack', description: 'Five authentic Morgan Silver Dollars', price: 199.99, image: 'https://images.unsplash.com/photo-1643393670577-b214e610c8f8?w=600', stock: 8 },
];

export const mockPosts: Post[] = [
  { id: '1', authorId: '1', authorName: 'Rari', authorAvatar: mockHosts[0].avatar, authorIsVip: false, authorIsHost: true, content: 'Just got in an amazing Morgan Dollar collection! Going live in 30 minutes 🪙✨', image: 'https://images.unsplash.com/photo-1643393670577-b214e610c8f8?w=800', timestamp: new Date(Date.now() - 15 * 60000), likes: 48, comments: 12 },
  { id: '2', authorId: 'user1', authorName: 'CoinCollector_Mike', authorAvatar: mockHosts[1].avatar, authorIsVip: true, authorIsHost: false, content: 'Just won an incredible 1921 Peace Dollar from Mike\'s stream! 🎉', timestamp: new Date(Date.now() - 60 * 60000), likes: 23, comments: 5 },
];

export const mockSpotPrices: SpotPrice[] = [
  { metal: 'Gold', price: '$2,356', trend: 'up' },
  { metal: 'Silver', price: '$27.33', trend: 'down' },
  { metal: 'Platinum', price: '$1,002', trend: 'up' },
  { metal: 'Palladium', price: '$1,002', trend: 'down' },
];

