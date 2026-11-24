import "server-only";

import { getProfile } from "@/features/profile/server/profile.service";
import { getServices } from "@/features/services/server/service.service";
import { getFeaturedProjects } from "@/features/projects/server/project.service";
import { getSkills } from "@/features/skills/server/skill.service";

export async function getHomePageData() {
  const results = await Promise.allSettled([
    getProfile(),
    getServices(),
    getFeaturedProjects(),
    getSkills(),
  ]);

  const [profileResult, servicesResult, projectsResult, skillsResult] = results;

  return {
    profile: profileResult.status === "fulfilled" ? profileResult.value : null,

    services: servicesResult.status === "fulfilled" ? servicesResult.value : [],

    projects: projectsResult.status === "fulfilled" ? projectsResult.value : [],

    skills: skillsResult.status === "fulfilled" ? skillsResult.value : [],
  };
}
