export interface MenuItem {
  id: string; // Changed to string based on API data
  name: string;
  description: string; // Assuming description will be available or can be derived
  price: number; // Assuming price will be available
  image: string; // Changed from 'img' to 'image'
  category: string; // Category ID
  subcategory: string;
  tags?: string[];
  rating?: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Level2Category {
  id: string;
  name: string;
  color: string;
  img: string;
  but_mast_id: string;
  items: MenuItem[];
}

export interface Category {
  id: string;
  name: string;
  description: string; // Assuming description will be available or can be derived
  image: string; // Changed from 'img' to 'image'
  tagline?: string;
  items?: MenuItem[]; // Make items optional as it might be in level2Categories
  level2Categories?: Level2Category[]; // New property for nested categories
  color?: string; // Added color from raw data
}

// Array of local placeholder images
const localImages = [
  "/pizza1.jpg",
  "/pizza2.jpg",
  "/cold-drinks.jpg",
  "/hot-drinks.jpg",
];

// Function to get a local image URL based on an index
function getLocalImageUrl(index: number): string {
  return localImages[index % localImages.length];
}

export async function fetchMenuData(): Promise<Category[]> {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();

    console.log("Raw API data:", rawData); // Log raw data for debugging

    let categoriesArray: any[] = [];

    // Expecting rawData.table[0] to be the array of categories
    if (
      rawData &&
      typeof rawData === "object" &&
      Array.isArray(rawData.table) &&
      Array.isArray(rawData.table[0])
    ) {
      categoriesArray = rawData.table[0];
    } else if (Array.isArray(rawData)) {
      // Fallback if API directly returns an array (less likely now)
      categoriesArray = rawData;
    } else if (
      rawData &&
      typeof rawData === "object" &&
      Array.isArray(rawData.categories)
    ) {
      // Fallback for previous assumption if API changes
      categoriesArray = rawData.categories;
    } else {
      console.error(
        "API response is not in an expected array format:",
        rawData
      );
      return [];
    }

    let categoryImageIndex = 0;
    // Map raw API data to our Category and MenuItem interfaces
    const processedCategories: Category[] = categoriesArray.map((cat: any) => {
      if (cat.id === "1" && Array.isArray(cat.level2)) {
        // Special handling for "drinks" category with nested level2 structure
        const level2Categories: Level2Category[] = cat.level2.map(
          (level2Cat: any) => ({
            id: level2Cat.id.toString(),
            name: level2Cat.name,
            color: level2Cat.color || "",
            img: level2Cat.img || "",
            but_mast_id: level2Cat.but_mast_id.toString(),
            items: (level2Cat.items || []).map((item: any) => ({
              id: item.id.toString(),
              name: item.name,
              description: item.description || "",
              price: item.price || 0,
              image: item.img || getLocalImageUrl(categoryImageIndex++),
              category: cat.id.toString(),
              subcategory: level2Cat.name, // Use level2 category name as subcategory
              tags: item.tags || [],
              rating: item.rating || 0,
              isPopular: item.isPopular || false,
              isNew: item.isNew || false,
            })),
          })
        );

        return {
          id: cat.id.toString(),
          name: cat.name,
          description: cat.description || "",
          image: cat.img || getLocalImageUrl(categoryImageIndex++),
          tagline: cat.tagline || cat.description || "",
          level2Categories: level2Categories,
          color: cat.color || "",
        };
      } else {
        // Standard handling for other categories
        const items: MenuItem[] = (cat.level2 || cat.items || []).map(
          (item: any) => ({
            id: item.id.toString(), // Ensure ID is string
            name: item.name,
            description: item.description || "", // Provide default if missing
            price: item.price || 0, // Provide default if missing
            image: item.img || getLocalImageUrl(categoryImageIndex++), // Use 'img' from API, fallback to local image
            category: cat.id.toString(),
            subcategory: item.subcategory || "general", // Provide default if missing
            tags: item.tags || [],
            rating: item.rating || 0,
            isPopular: item.isPopular || false,
            isNew: item.isNew || false,
          })
        );

        return {
          id: cat.id.toString(), // Ensure ID is string
          name: cat.name,
          description: cat.description || "", // Provide default if missing
          image: cat.img || getLocalImageUrl(categoryImageIndex++), // Use 'img' from API, fallback to local image
          tagline: cat.tagline || cat.description || "",
          items: items,
          color: cat.color || "",
        };
      }
    });

    return processedCategories;
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
    return []; // Return an empty array on error
  }
}

// No longer exporting hardcoded menuItems or categoryInfo
