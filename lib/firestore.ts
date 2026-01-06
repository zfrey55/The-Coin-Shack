import { db, isFirebaseEnabled } from './firebase';
import { mockHosts, mockStreams, mockGames, mockProducts, mockPosts, mockSpotPrices } from './mock-data';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QuerySnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { Host, Stream, Game, Product, Post, User, SpotPrice } from './types';

// Collections
const COLLECTIONS = {
  hosts: 'hosts',
  streams: 'streams',
  games: 'games',
  products: 'products',
  posts: 'posts',
  users: 'users',
  spotPrices: 'spotPrices',
} as const;

// Helper to convert Firestore timestamp to Date
const toDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date(timestamp);
};

// Helper to convert Date to Firestore timestamp
const toTimestamp = (date: Date | string): Timestamp => {
  if (typeof date === 'string') {
    return Timestamp.fromDate(new Date(date));
  }
  return Timestamp.fromDate(date);
};

// ============ Hosts ============
export const getHosts = async (): Promise<Host[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockHosts;
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(collection(db, COLLECTIONS.hosts));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Host[];
  } catch (error) {
    console.error('Error fetching hosts from Firestore:', error);
    return mockHosts;
  }
};

export const getHost = async (id: string): Promise<Host | null> => {
  if (!isFirebaseEnabled() || !db) {
    return mockHosts.find(h => h.id === id) || null;
  }
  try {
    const docSnap: DocumentSnapshot = await getDoc(doc(db, COLLECTIONS.hosts, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Host;
    }
    return null;
  } catch (error) {
    console.error('Error fetching host from Firestore:', error);
    return mockHosts.find(h => h.id === id) || null;
  }
};

export const createHost = async (host: Omit<Host, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create host.');
  }
  const docRef = await addDoc(collection(db, COLLECTIONS.hosts), host);
  return docRef.id;
};

export const updateHost = async (id: string, data: Partial<Host>): Promise<void> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot update host.');
  }
  await updateDoc(doc(db, COLLECTIONS.hosts, id), data as any);
};

// ============ Streams ============
export const getStreams = async (): Promise<Stream[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockStreams;
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.streams), orderBy('createdAt', 'desc'))
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startsAt: doc.data().startsAt ? toDate(doc.data().startsAt) : undefined,
    })) as Stream[];
  } catch (error) {
    console.error('Error fetching streams from Firestore:', error);
    return mockStreams;
  }
};

export const getLiveStreams = async (): Promise<Stream[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockStreams.filter(s => s.isLive);
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.streams), where('isLive', '==', true))
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startsAt: doc.data().startsAt ? toDate(doc.data().startsAt) : undefined,
    })) as Stream[];
  } catch (error) {
    console.error('Error fetching live streams from Firestore:', error);
    return mockStreams.filter(s => s.isLive);
  }
};

export const createStream = async (stream: Omit<Stream, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create stream.');
  }
  const data = {
    ...stream,
    startsAt: stream.startsAt ? toTimestamp(stream.startsAt) : undefined,
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.streams), data);
  return docRef.id;
};

// ============ Games ============
export const getGames = async (): Promise<Game[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockGames;
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.games), orderBy('createdAt', 'desc'))
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Game[];
  } catch (error) {
    console.error('Error fetching games from Firestore:', error);
    return mockGames;
  }
};

export const getGamesByHost = async (hostId: string): Promise<Game[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockGames.filter(g => g.hostId === hostId);
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.games),
        where('hostId', '==', hostId),
        orderBy('createdAt', 'desc')
      )
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Game[];
  } catch (error) {
    console.error('Error fetching games by host from Firestore:', error);
    return mockGames.filter(g => g.hostId === hostId);
  }
};

export const createGame = async (game: Omit<Game, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create game.');
  }
  const data = {
    ...game,
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.games), data);
  return docRef.id;
};

// ============ Products ============
export const getProducts = async (): Promise<Product[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockProducts;
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.products), orderBy('createdAt', 'desc'))
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return mockProducts;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockProducts.filter(p => p.isFeatured);
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.products),
        where('isFeatured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Error fetching featured products from Firestore:', error);
    return mockProducts.filter(p => p.isFeatured);
  }
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create product.');
  }
  const data = {
    ...product,
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.products), product);
  return docRef.id;
};

// ============ Posts ============
export const getPosts = async (limitCount?: number): Promise<Post[]> => {
  if (!isFirebaseEnabled() || !db) {
    const posts = mockPosts;
    return limitCount ? posts.slice(0, limitCount) : posts;
  }
  try {
    let q = query(collection(db, COLLECTIONS.posts), orderBy('timestamp', 'desc'));
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    const snapshot: QuerySnapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: toDate(doc.data().timestamp),
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    const posts = mockPosts;
    return limitCount ? posts.slice(0, limitCount) : posts;
  }
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create post.');
  }
  const data = {
    ...post,
    timestamp: toTimestamp(post.timestamp),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.posts), data);
  return docRef.id;
};

export const updatePostLikes = async (postId: string, likes: number): Promise<void> => {
  if (!isFirebaseEnabled() || !db) {
    console.warn('Firebase is not configured. Cannot update post likes.');
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.posts, postId), { likes });
};

// ============ Users ============
export const getUser = async (id: string): Promise<User | null> => {
  if (!isFirebaseEnabled() || !db) {
    return null;
  }
  try {
    const docSnap: DocumentSnapshot = await getDoc(doc(db, COLLECTIONS.users, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user from Firestore:', error);
    return null;
  }
};

export const createUser = async (user: Omit<User, 'id'>): Promise<string> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot create user.');
  }
  const docRef = await addDoc(collection(db, COLLECTIONS.users), user);
  return docRef.id;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
  if (!isFirebaseEnabled() || !db) {
    throw new Error('Firebase is not configured. Cannot update user.');
  }
  await updateDoc(doc(db, COLLECTIONS.users, id), data as any);
};

// ============ Spot Prices ============
export const getSpotPrices = async (): Promise<SpotPrice[]> => {
  if (!isFirebaseEnabled() || !db) {
    return mockSpotPrices;
  }
  try {
    const snapshot: QuerySnapshot = await getDocs(collection(db, COLLECTIONS.spotPrices));
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as SpotPrice[];
  } catch (error) {
    console.error('Error fetching spot prices from Firestore:', error);
    return mockSpotPrices;
  }
};

export const updateSpotPrice = async (metal: string, price: SpotPrice): Promise<void> => {
  if (!isFirebaseEnabled() || !db) {
    console.warn('Firebase is not configured. Cannot update spot price.');
    return;
  }
  const priceDoc = await getDocs(
    query(collection(db, COLLECTIONS.spotPrices), where('metal', '==', metal))
  );
  if (!priceDoc.empty) {
    await updateDoc(priceDoc.docs[0].ref, price as any);
  } else {
    await addDoc(collection(db, COLLECTIONS.spotPrices), price as any);
  }
};

