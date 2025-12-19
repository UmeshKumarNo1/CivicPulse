// Sample data for demo purposes
export const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=DC2626&color=fff"
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=059669&color=fff"
  }
];

export const sampleProblems = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and potential vehicle damage. It's been here for over 2 weeks and getting worse with rain.",
    category: "Roads",
    location: { lat: 40.7128, lng: -74.0060, address: "Main Street, Downtown" },
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    upvotes: 45,
    reportedBy: 1,
    reportedDate: "2024-01-15",
    comments: [
      { id: 1, userId: 2, text: "We've assigned a crew to fix this. Expected completion in 3 days.", date: "2024-01-16" },
      { id: 2, userId: 3, text: "Thank you for the update!", date: "2024-01-16" }
    ]
  },
  {
    id: 2,
    title: "Broken Street Light",
    description: "Street light not working on Oak Avenue near the park. Makes the area unsafe at night.",
    category: "Electricity",
    location: { lat: 40.7580, lng: -73.9855, address: "Oak Avenue, Near Central Park" },
    status: "Pending",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
    upvotes: 23,
    reportedBy: 3,
    reportedDate: "2024-01-18",
    comments: []
  },
  {
    id: 3,
    title: "Overflowing Garbage Bins",
    description: "Multiple garbage bins overflowing in the residential area. Attracting pests and creating health hazards.",
    category: "Garbage",
    location: { lat: 40.7489, lng: -73.9680, address: "Elm Street, Residential Area" },
    status: "Resolved",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
    upvotes: 67,
    reportedBy: 1,
    reportedDate: "2024-01-10",
    resolvedDate: "2024-01-14",
    comments: [
      { id: 3, userId: 2, text: "Additional bins have been placed and collection frequency increased.", date: "2024-01-14" }
    ]
  },
  {
    id: 4,
    title: "Water Leak on Pine Road",
    description: "Continuous water leak from underground pipe. Water is pooling on the road.",
    category: "Water",
    location: { lat: 40.7614, lng: -73.9776, address: "Pine Road, Industrial Zone" },
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1584555684040-bad07f3f0b1e?w=400",
    upvotes: 89,
    reportedBy: 3,
    reportedDate: "2024-01-17",
    comments: [
      { id: 4, userId: 2, text: "Emergency crew dispatched. Water main will be shut off temporarily.", date: "2024-01-17" }
    ]
  },
  {
    id: 5,
    title: "Damaged Sidewalk",
    description: "Cracked and uneven sidewalk creating tripping hazard for pedestrians.",
    category: "Roads",
    location: { lat: 40.7282, lng: -73.9942, address: "Broadway, Shopping District" },
    status: "Pending",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    upvotes: 34,
    reportedBy: 1,
    reportedDate: "2024-01-19",
    comments: []
  },
  {
    id: 6,
    title: "Illegal Dumping Site",
    description: "Construction debris and household waste dumped illegally in vacant lot.",
    category: "Garbage",
    location: { lat: 40.7505, lng: -73.9934, address: "Vacant Lot, 5th Avenue" },
    status: "Pending",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400",
    upvotes: 56,
    reportedBy: 3,
    reportedDate: "2024-01-18",
    comments: []
  },
  {
    id: 7,
    title: "Graffiti on Public Building",
    description: "Vandalism on the community center wall. Needs cleaning and repainting.",
    category: "Other",
    location: { lat: 40.7359, lng: -73.9911, address: "Community Center, Union Square" },
    status: "Resolved",
    image: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400",
    upvotes: 28,
    reportedBy: 2,
    reportedDate: "2024-01-12",
    resolvedDate: "2024-01-15",
    comments: [
      { id: 5, userId: 2, text: "Wall has been cleaned and repainted. Security cameras installed.", date: "2024-01-15" }
    ]
  },
  {
    id: 8,
    title: "Stray Dogs in Park",
    description: "Pack of stray dogs roaming in children's play area. Safety concern for families.",
    category: "Other",
    location: { lat: 40.7411, lng: -73.9897, address: "Madison Square Park" },
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    upvotes: 72,
    reportedBy: 1,
    reportedDate: "2024-01-16",
    comments: [
      { id: 6, userId: 2, text: "Animal control has been notified. Temporary fencing installed.", date: "2024-01-17" }
    ]
  }
];

export const categories = ["Roads", "Water", "Garbage", "Electricity", "Other"];
export const statuses = ["Pending", "In Progress", "Resolved"];

