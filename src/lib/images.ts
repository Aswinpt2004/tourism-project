/** Curated Kerala tourism photography — Unsplash IDs verified for travel context */

export const keralaImages = {
  hero: {
    main: "https://images.unsplash.com/photo-1602216052126-53e08ef12970?w=1600&q=85",
    backwaters: "https://images.unsplash.com/photo-1602216052126-53e08ef12970?w=800&q=85",
    houseboat: "https://images.unsplash.com/photo-1585139226532-8751d7d6b272?w=800&q=85",
    temple: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85",
    tea: "https://images.unsplash.com/photo-1570168007204-dfb528c1978f?w=800&q=85",
  },
  destinations: {
    trivandrum: "https://images.unsplash.com/photo-1593693397690-362cb7be786c?w=900&q=85",
    munnar: "https://images.unsplash.com/photo-1570168007204-dfb528c1978f?w=900&q=85",
    wayanad: "https://images.unsplash.com/photo-1441974231530-c3367fd5b0e3?w=900&q=85",
    varkala: "https://images.unsplash.com/photo-1585139226532-8751d7d6b272?w=900&q=85",
    vagamon: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
    athirapally: "https://images.unsplash.com/photo-1439066615861-d1af7746ba4f?w=900&q=85",
  },
  experiences: [
    {
      src: "https://images.unsplash.com/photo-1602216052126-53e08ef12970?w=700&q=85",
      alt: "Kerala backwaters at dawn",
      caption: "Backwater cruises",
    },
    {
      src: "https://images.unsplash.com/photo-1570168007204-dfb528c1978f?w=700&q=85",
      alt: "Tea plantations in Munnar",
      caption: "Tea country trails",
    },
    {
      src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=85",
      alt: "Traditional Kerala temple architecture",
      caption: "Heritage & temples",
    },
    {
      src: "https://images.unsplash.com/photo-1585139226532-8751d7d6b272?w=700&q=85",
      alt: "Cliff beach at Varkala",
      caption: "Coastal escapes",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231530-c3367fd5b0e3?w=700&q=85",
      alt: "Wayanad forest trail",
      caption: "Wildlife & forests",
    },
    {
      src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=85",
      alt: "Traditional Kerala cuisine",
      caption: "Local food journeys",
    },
  ],
  planner: {
    collage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85",
    map: "https://images.unsplash.com/photo-1526778548025-fa2f6cd581cf?w=800&q=85",
  },
  guides: {
    coverDefault: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602216052126-53e08ef12970?w=600&q=85",
      "https://images.unsplash.com/photo-1570168007204-dfb528c1978f?w=600&q=85",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=85",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85",
    ],
  },
} as const;

export function destinationImage(slug: string): string {
  const map = keralaImages.destinations as Record<string, string>;
  return map[slug] ?? keralaImages.hero.main;
}
