"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";

interface UserProfileProps {
    params: {
        id: string;
      };}


const UserProfile: React.FC<UserProfileProps> = ({ params }) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName || ''}
      desc={`Welcome to ${userName}'s personalized profile page`}
      data={userPosts}
    />
  );
};

export default UserProfile;
