"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProfile = async () => {
      try {
        const randomId = Math.floor(Math.random() * 1000);
        const response = await fetch(`https://picsum.photos/id/${randomId}/info`);
        const data = await response.json();
        setProfileImage(data.download_url);
      } catch (error) {
        console.error('Error fetching profile image:', error);
        // Fallback to a default image if fetch fails
        setProfileImage('https://picsum.photos/200');
      }
    };

    fetchRandomProfile();
  }, []);

  return (
    <nav className="bg-[#2B4172] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-2xl font-semibold">TasksBoard</span>
        </div>
        
        <div className="flex items-center">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          )}
        </div>
      </div>
    </nav>
  );
}