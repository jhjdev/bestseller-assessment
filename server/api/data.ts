import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { defineEventHandler, createError, setHeader } from 'h3';
import type { Category } from '../../types';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for development/small scale use
let cache: {
  data: any;
  timestamp: number;
  source: string;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper to check if cache is valid
const isCacheValid = () => {
  return cache && Date.now() - cache.timestamp < CACHE_DURATION;
};

// Helper function to flatten nested categories into a Record<string, Category>
// while preserving the nested 'categories' array for component compatibility
function flattenCategories(categoriesTree: Category, result: Record<string, Category>) {
  if (!categoriesTree) return result;

  // Add the current category to the result with its full structure preserved
  if (categoriesTree.id) {
    result[categoriesTree.id] = {
      ...categoriesTree,
      // Keep the original name structure, don't flatten it
      name: categoriesTree.name || { en: 'Unknown Category', dk: 'Ukendt kategori' },
    };
  }

  // Process child categories if they exist
  if (Array.isArray(categoriesTree.categories)) {
    categoriesTree.categories.forEach((category) => {
      flattenCategories(category, result);
    });
  }

  return result;
}

// Helper function to recursively resolve nested categories from MongoDB
function resolveNestedCategories(categories: Category[], parentId = ''): Category[] {
  const resolvedCategories: Category[] = [];
  const categoryMap: Record<string, Category> = {};

  // First, create a map of all categories with empty subcategories array
  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, categories: [] };
  });

  // Then, build the nested structure by linking children to parents
  categories.forEach((category) => {
    if (category.parent_category_id === parentId) {
      // This is a root level category for this parentId
      resolvedCategories.push(categoryMap[category.id]);
    } else if (categoryMap[category.parent_category_id]) {
      // This category has a parent, add it to the parent's categories array
      if (!categoryMap[category.parent_category_id].categories) {
        categoryMap[category.parent_category_id].categories = [];
      }
      categoryMap[category.parent_category_id]?.categories?.push(categoryMap[category.id]);
    }
  });

  return resolvedCategories;
}

export default defineEventHandler(async (event) => {
  // Set cache headers
  setHeader(event, 'Cache-Control', 's-maxage=300, stale-while-revalidate=60');

  // Check cache first
  if (isCacheValid()) {
    console.log('Serving data from cache');
    return cache!.data;
  }

  // Access environment variables
  const mongodbUri = process.env.MONGODB_URI;
  const mongodbDbName = process.env.MONGODB_DB_NAME;

  try {
    // Try to connect to MongoDB first
    if (!mongodbUri) {
      throw new Error('MongoDB URI is not configured');
    }

    const client = new MongoClient(mongodbUri);
    await client.connect();

    const db = client.db(mongodbDbName);

    // Fetch data from collections
    const products = await db.collection('products').find({}).toArray();
    const categoriesFromMongo = await db.collection('categories').find({}).toArray();
    const promotionalSpots = await db.collection('promotionalSpots').find({}).toArray();

    // Build the nested structure from flat categories
    const categoriesMap: Record<string, Category> = {};

    // First pass: create all categories in the map
    categoriesFromMongo.forEach((cat: any) => {
      categoriesMap[cat.id] = {
        id: cat.id,
        parent_category_id: cat.parent_category_id,
        level: cat.level,
        name: cat.name,
        categories: [], // Will be populated in second pass
      };
    });

    // Second pass: build the nested structure
    categoriesFromMongo.forEach((cat: any) => {
      if (cat.parent_category_id && categoriesMap[cat.parent_category_id]) {
        categoriesMap[cat.parent_category_id].categories!.push(categoriesMap[cat.id]);
      }
    });

    await client.close();

    const result = {
      source: 'mongodb',
      products,
      categories: categoriesMap,
      promotionalSpots: promotionalSpots || [],
    };

    // Update cache
    cache = {
      data: result,
      timestamp: Date.now(),
      source: 'mongodb',
    };

    return result;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Falling back to data.json file');

    // Fallback to data.json with robust path resolution
    try {
      // Try multiple path strategies for different environments
      const possiblePaths = [
        path.join(process.cwd(), 'data', 'data.json'),
        path.join(__dirname, '../../data/data.json'),
        path.join(process.cwd(), '../../data/data.json'),
        './data/data.json',
      ];

      let dataFilePath = '';
      let jsonData = '';

      for (const testPath of possiblePaths) {
        try {
          if (fs.existsSync(testPath)) {
            dataFilePath = testPath;
            jsonData = fs.readFileSync(testPath, 'utf8');
            console.log(`Successfully loaded data from: ${testPath}`);
            break;
          }
        } catch (pathError) {
          console.log(`Path ${testPath} failed:`, pathError.message);
          continue;
        }
      }

      if (!jsonData) {
        throw new Error(
          `Could not find data.json in any of these paths: ${possiblePaths.join(', ')}`
        );
      }

      const parsedData = JSON.parse(jsonData);

      // Transform the nested categories structure into a flat Record<string, Category>
      // but keep the nested structure for accessing subcategories
      const flattenedCategories = flattenCategories(
        parsedData.categories,
        {} as Record<string, Category>
      );

      const result = {
        source: 'local_file',
        products: parsedData.products,
        categories: flattenedCategories,
        promotionalSpots: parsedData.promotionalSpots || [],
      };

      // Update cache
      cache = {
        data: result,
        timestamp: Date.now(),
        source: 'local_file',
      };

      return result;
    } catch (fallbackError) {
      console.error('Fallback to data.json failed:', fallbackError);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch data from both MongoDB and fallback file',
        data: {
          mongoError: error instanceof Error ? error.message : String(error),
          fallbackError:
            fallbackError instanceof Error ? fallbackError.message : String(fallbackError),
        },
      });
    }
  }
});
