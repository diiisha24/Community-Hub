// page.tsx - Main page component
'use client';
import React, { useState } from 'react';
import { communities, currentUser, notifications } from '@/utils/data';
import { Community, Post, User } from '@/utils/types';
import Image from 'next/image';

// Component for sidebar
const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Dee Community Hub</h1>
        
        {/* User profile */}
        <div className="mb-6 flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              width={40} 
              height={40} 
            />
          </div>
          <div>
            <h3 className="font-medium">{currentUser.name}</h3>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav>
          <ul>
            <li className="mb-1">
              <a href="#" className="block py-2 px-4 rounded bg-blue-600 text-white">
                Home
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Explore
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Notifications
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Messages
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Communities section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-2">My Communities</h2>
          <ul>
            {communities.map((community) => (
              <li key={community.id} className="mb-1">
                <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 flex items-center">
                  <div className="w-6 h-6 rounded overflow-hidden mr-2">
                    <Image 
                      src={community.coverImage} 
                      alt={community.name} 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <span>{community.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Component for header
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center fixed top-0 right-0 left-64 z-10">
      <div className="container mx-auto px-4 flex justify-end items-center">
        
        {/* Search */}
        {/* <div className="relative flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search communities..."
            className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        
        {/* Notifications */}
        <div className="flex items-center">
          <button className="relative p-2 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User profile */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                width={32} 
                height={32} 
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Component for posts
const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, this would call an API to add the comment
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Post header */}
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image 
            src={post.author.avatar} 
            alt={post.author.name} 
            width={40} 
            height={40} 
          />
        </div>
        <div>
          <h3 className="font-medium">{post.author.name}</h3>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()} • {post.community.name}
          </p>
        </div>
      </div>
      
      {/* Post content */}
      <p className="mb-4">{post.content}</p>
      
      {/* Post actions */}
      <div className="flex justify-between items-center border-t border-b py-2 mb-3">
        <button 
          className={`flex items-center ${liked ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={handleLike}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>{likes}</span>
        </button>
        <button 
          className="flex items-center text-gray-500"
          onClick={() => setShowComments(!showComments)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>
      
      {/* Comments section */}
      {showComments && (
        <div className="mt-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image 
                  src={comment.author.avatar} 
                  alt={comment.author.name} 
                  width={32} 
                  height={32} 
                />
              </div>
              <div className="bg-gray-100 p-2 rounded-lg flex-grow">
                <h4 className="font-medium text-sm">{comment.author.name}</h4>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
          
          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="flex mt-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                width={32} 
                height={32} 
              />
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow rounded-full border border-gray-300 py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      )}
    </div>
  );
};

// Component for event card
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-medium text-gray-800 text-lg mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      {event.location && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
      )}
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-3">
          {event.attendees.slice(0, 3).map((attendee) => (
            <div key={attendee.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
              <Image 
                src={attendee.avatar} 
                alt={attendee.name} 
                width={32} 
                height={32} 
              />
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {event.attendees.length} {event.attendees.length === 1 ? 'Attendee' : 'Attendees'}
        </span>
      </div>
      <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        RSVP
      </button>
    </div>
  );
};

// Component for member list
const MemberList: React.FC<{ community: Community }> = ({ community }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-medium text-lg mb-4">Members ({community.memberCount})</h3>
      <div className="space-y-3">
        {community.members.map((member) => (
          <div key={member.id} className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image 
                src={member.avatar} 
                alt={member.name} 
                width={40} 
                height={40} 
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">{member.name}</h4>
              <p className="text-xs text-gray-500">
                Joined {new Date(member.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
        View All Members
      </button>
    </div>
  );
};

// Component for community header
const CommunityHeader: React.FC<{ community: Community }> = ({ community }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="h-48 relative">
        <Image 
          src={community.coverImage} 
          alt={community.name} 
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl text-emerald-900 font-bold">{community.name}</h2>
            <p className="text-gray-600">{community.description}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Join Community
          </button>
        </div>
        <div className="flex mt-4">
          <div className="mr-6">
            <span className="font-bold">{community.memberCount}</span>
            <span className="text-gray-600 ml-1">Members</span>
          </div>
          <div className="mr-6">
            <span className="font-bold">{community.posts.length}</span>
            <span className="text-gray-600 ml-1">Posts</span>
          </div>
          <div>
            <span className="font-bold">{community.events.length}</span>
            <span className="text-gray-600 ml-1">Events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for the create post form
const CreatePostForm: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      // In a real app, this would call an API to create a post
      setPostContent('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              width={40} 
              height={40} 
            />
          </div>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <button type="button" className="mr-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button type="button" className="mr-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!postContent.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

// Main page component
export default function Home() {
  const [activeCommunity, setActiveCommunity] = useState<Community>(communities[0]);
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'members'>('feed');

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 pt-16">
        <Header />
        
        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left column - Community Content */}
            <div className="col-span-8">
              <CommunityHeader community={activeCommunity} />
              
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="flex border-b">
                  <button
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'feed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('feed')}
                  >
                    Feed
                  </button>
                  <button
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('events')}
                  >
                    Events
                  </button>
                  <button
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('members')}
                  >
                    Members
                  </button>
                </div>
              </div>
              
              {/* Tab content */}
              {activeTab === 'feed' && (
                <>
                  <CreatePostForm />
                  {activeCommunity.posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))}
                </>
              )}
              
              {activeTab === 'events' && (
                <>
                  {activeCommunity.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </>
              )}
              
              {activeTab === 'members' && (
                <div className="grid grid-cols-2 gap-4">
                  {activeCommunity.members.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image 
                            src={member.avatar} 
                            alt={member.name} 
                            width={48} 
                            height={48} 
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-500">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {/* <button className="mt-3 w-full py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                        View Profile
                      </button> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right column - Sidebar */}
            <div className="col-span-4">
              {/* Upcoming events */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 text-lg">Upcoming Events</h3>
                  <a href="#" className="text-sm text-blue-600">View All</a>
                </div>
                {activeCommunity.events.slice(0, 2).map((event) => (
                  <div key={event.id} className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                <button className="mt-2 w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Create Event
                </button>
              </div>
              
              {/* Popular communities */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Popular Communities</h3>
                  <a href="#" className="text-sm text-blue-600">Explore</a>
                </div>
                {communities.map((community) => (
                  <div 
                    key={community.id} 
                    className="flex items-center mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0 cursor-pointer"
                    onClick={() => setActiveCommunity(community)}
                  >
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <Image 
                        src={community.coverImage} 
                        alt={community.name} 
                        width={40} 
                        height={40} 
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{community.name}</h4>
                      <p className="text-xs text-gray-500">{community.memberCount} members</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Notifications</h3>
                  <a href="#" className="text-sm text-blue-600">Mark All Read</a>
                </div>
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-2 mb-2 rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}