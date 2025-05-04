// Mock data for the platform
// data.ts
import { User, Community, Post, Comment, Event, Notification } from './types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Williams',
  avatar: '/assets/img/user/1.jpg',
  bio: 'Software developer passionate about building communities',
  joinedAt: new Date('2023-01-15')
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Janie Smith',
    avatar: '/assets/img/other_user/1.jpeg',
    joinedAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: '/assets/img/other_user/2.jpeg',
    joinedAt: new Date('2023-03-05')
  },
  {
    id: '4',
    name: 'John Doe',
    avatar: '/assets/img/other_user/3.jpeg',
    joinedAt: new Date('2023-04-20')
  }
];

export const communities: Community[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'A community for web developers to share knowledge and resources',
    coverImage: '/assets/img/community_banners/1.jpg',
    memberCount: 1250,
    members: users,
    posts: [],
    events: [],
    createdAt: new Date('2022-11-10')
  },
  {
    id: '2',
    name: 'UI/UX Design',
    description: 'Discuss design principles, share work, and get feedback',
    coverImage: '/assets/img/community_banners/2.jpeg',
    memberCount: 843,
    members: [users[0], users[1]],
    posts: [],
    events: [],
    createdAt: new Date('2022-12-15')
  },
  {
    id: '3',
    name: 'Data Science',
    description: 'Explore data analysis, machine learning, and AI',
    coverImage: '/assets/img/community_banners/3.jpg',
    memberCount: 976,
    members: [users[2], users[3]],
    posts: [],
    events: [],
    createdAt: new Date('2023-01-05')
  }
];

// Add posts to communities
const posts: Post[] = [
  {
    id: '1',
    author: users[0],
    community: communities[0],
    content: 'Just launched my new portfolio website using Next.js and Tailwind CSS. Check it out!',
    likes: 24,
    comments: [],
    createdAt: new Date('2023-05-10')
  },
  {
    id: '2',
    author: users[1],
    community: communities[0],
    content: 'What are your favorite React hooks? I\'ve been using useMemo and useCallback a lot lately.',
    likes: 15,
    comments: [],
    createdAt: new Date('2023-05-12')
  },
  {
    id: '3',
    author: users[2],
    community: communities[1],
    content: 'Sharing my latest UI design for a meditation app. Would love some feedback!',
    likes: 32,
    comments: [],
    createdAt: new Date('2023-05-11')
  }
];

// Add comments to posts
const comments: Comment[] = [
  {
    id: '1',
    author: users[1],
    post: posts[0],
    content: 'Looks amazing! What hosting provider are you using?',
    createdAt: new Date('2023-05-10T14:30:00')
  },
  {
    id: '2',
    author: users[2],
    post: posts[0],
    content: 'Great work! The design is very clean.',
    createdAt: new Date('2023-05-10T15:45:00')
  },
  {
    id: '3',
    author: users[0],
    post: posts[2],
    content: 'I love the color scheme! The navigation looks intuitive.',
    createdAt: new Date('2023-05-11T10:20:00')
  }
];

// Update posts with comments
posts[0].comments = [comments[0], comments[1]];
posts[2].comments = [comments[2]];

// Add events to communities
const events: Event[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Learn how to build a full-stack application with Next.js',
    community: communities[0],
    date: new Date('2023-06-15T18:00:00'),
    location: 'Online',
    attendees: [users[0], users[1], users[3]]
  },
  {
    id: '2',
    title: 'Design Systems Meetup',
    description: 'Discussing best practices for creating scalable design systems',
    community: communities[1],
    date: new Date('2023-06-20T19:00:00'),
    location: 'Tech Hub, Downtown',
    attendees: [users[1], users[2]]
  },
  {
    id: '3',
    title: 'Data Visualization Workshop',
    description: 'Hands-on session on creating effective data visualizations',
    community: communities[2],
    date: new Date('2023-06-25T17:30:00'),
    location: 'Online',
    attendees: [users[0], users[2], users[3]]
  }
];

// Update communities with posts and events
communities[0].posts = [posts[0], posts[1]];
communities[0].events = [events[0]];
communities[1].posts = [posts[2]];
communities[1].events = [events[1]];
communities[2].events = [events[2]];

// Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    user: currentUser,
    content: 'Jane Smith commented on your post',
    read: false,
    createdAt: new Date('2023-05-10T14:30:00')
  },
  {
    id: '2',
    user: currentUser,
    content: 'Mike Johnson liked your post',
    read: true,
    createdAt: new Date('2023-05-11T09:15:00')
  },
  {
    id: '3',
    user: currentUser,
    content: 'Web Development Workshop starting in 1 hour',
    read: false,
    createdAt: new Date('2023-06-15T17:00:00')
  }
];