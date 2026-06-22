export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  guideCount: number;
  highlights: string[];
}

export interface GuideService {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface Guide {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  coverImage: string;
  location: string;
  destinationSlug: string;
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  specializations: string[];
  pricePerDay: number;
  verified: boolean;
  bio: string;
  services: GuideService[];
  certifications: string[];
  gallery: string[];
  itinerary: ItineraryItem[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type TripRequestStatus = "open" | "bidding" | "accepted" | "closed";

export interface GuideBid {
  id: string;
  guideId: string;
  guideName: string;
  guideAvatar: string;
  price: number;
  message: string;
  includes: string[];
  status: "pending" | "accepted" | "rejected";
}

export interface TripRequest {
  id: string;
  customerName: string;
  destination: string;
  destinationSlug: string;
  duration: number;
  budget: number;
  groupSize: number;
  interests: string[];
  travelStyle: string;
  description: string;
  status: TripRequestStatus;
  createdAt: string;
  bids: GuideBid[];
}

export interface TripRequestFormData {
  destination: string;
  destinationSlug: string;
  duration: number;
  budget: number;
  groupSize: number;
  interests: string[];
  travelStyle: string;
  description: string;
}

/** Single activity inside a day plan */
export interface PlanActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  estimatedCost?: number;
}

/** One day in a refined itinerary */
export interface PlanDay {
  day: number;
  title: string;
  activities: PlanActivity[];
}

/** User's raw trip suggestion before AI refinement */
export interface UserPlanInput {
  destination: string;
  destinationSlug: string;
  duration: number;
  budget: number;
  groupSize: number;
  travelStyle: string;
  roughPlan: string;
  interests: string[];
}

/** AI-refined (or locally refined) trip plan the user can edit */
export interface RefinedTripPlan {
  title: string;
  destination: string;
  destinationSlug: string;
  duration: number;
  summary: string;
  estimatedBudget: number;
  aiNotes: string[];
  days: PlanDay[];
}
