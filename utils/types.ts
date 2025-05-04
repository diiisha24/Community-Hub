// types.ts - Domain models
export interface User {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
    joinedAt: Date;
  }
  
  export interface Community {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    memberCount: number;
    members: User[];
    posts: Post[];
    events: Event[];
    createdAt: Date;
  }
  
  export interface Post {
    id: string;
    author: User;
    community: Community;
    content: string;
    likes: number;
    comments: Comment[];
    createdAt: Date;
  }
  
  export interface Comment {
    id: string;
    author: User;
    post: Post;
    content: string;
    createdAt: Date;
  }
  
  export interface Event {
    id: string;
    title: string;
    description: string;
    community: Community;
    date: Date;
    location?: string;
    attendees: User[];
  }
  
  export interface Notification {
    id: string;
    user: User;
    content: string;
    read: boolean;
    createdAt: Date;
  }
  