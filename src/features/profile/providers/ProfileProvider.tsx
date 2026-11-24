"use client";

import { createContext, useContext } from "react";
import type { Profile } from "@/features/profile/types/profile.types";

const ProfileContext = createContext<Profile | null>(null);

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return context;
}
