/**
 * Social Media Links Configuration
 * Stereographic Production - Team Social Media Links
 */

export interface StevanSocialLinks {
  upwork: string
  instagram: string
  linkedin: string
}

export interface NikolaSocialLinks {
  instagram: string
  linkedin: string
}

export interface SocialLinksConfig {
  stevan: StevanSocialLinks
  nikola: NikolaSocialLinks
}

export const socialLinks: SocialLinksConfig = {
  stevan: {
    upwork: "https://www.upwork.com/freelancers/~01261fc2e6ad5249ca",
    instagram: "https://www.instagram.com/marinkovicstevan/",
    linkedin: "https://www.linkedin.com/in/stevan-marinkovi%C4%87-8b7ba0199/"
  },
  nikola: {
    instagram: "https://www.instagram.com/nikola___mijailovic/",
    linkedin: "https://www.linkedin.com/in/nikola-mijailovi%C4%87/"
  }
}

export const contactInfo = {
  email: "stev.marinkovic@gmail.com",
  phone: "+381621576924"
} as const
