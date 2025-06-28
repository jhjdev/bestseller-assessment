import { MongoClient } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Environment variables are provided by GitHub Actions
// No need to load .env file in CI environment

// Handle ES module dirname issues
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection details
const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || '';

if (!MONGODB_URI || !MONGODB_DB_NAME) {
  console.error('Missing MongoDB connection details in .env file');
  console.error('MONGODB_URI:', MONGODB_URI);
  console.error('MONGODB_DB_NAME:', MONGODB_DB_NAME);
  process.exit(1);
}

// Create the directory path relative to the project root
const dataPath = path.join(__dirname, '..', 'data', 'data.json');

async function seed() {
  console.log('Starting seed process...');
  console.log(`Reading data from: ${dataPath}`);

  // Check if file exists
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: File not found at ${dataPath}`);
    process.exit(1);
  }
  // Configure MongoDB client for GitHub Actions compatibility
  let connectionUri = MONGODB_URI;
  let mongoOptions: any = {
    // Atlas-optimized connection settings
    retryWrites: true,
    retryReads: true,
    writeConcern: { w: 'majority' },

    // Generous timeouts for CI environment
    serverSelectionTimeoutMS: 30000, // 30 seconds
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 0, // No socket timeout - let Atlas handle it

    // Minimal connection pool for CI
    maxPoolSize: 3,
    minPoolSize: 0,
    maxIdleTimeMS: 30000,

    // Network stability options
    heartbeatFrequencyMS: 10000,
  };

  // GitHub Actions specific adjustments - configure for OpenSSL compatibility
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.log('Detected GitHub Actions - configuring for OpenSSL compatibility');

    // Set Node.js environment variables to handle TLS issues
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // Use minimal driver options that work with Atlas
    mongoOptions = {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      maxPoolSize: 1,
      minPoolSize: 0,
    };

    console.log('Applied GitHub Actions OpenSSL compatibility settings');
  }

  const client = new MongoClient(connectionUri, mongoOptions);
  try {
    // Read data from JSON file
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    console.log(`File content length: ${fileContent.length} bytes`);

    // Parse JSON
    const jsonData = JSON.parse(fileContent);

    // Validate data structure
    if (!jsonData.products || !jsonData.categories || !jsonData.promotionalSpots) {
      console.error('Data file missing required structure. Found:', Object.keys(jsonData));
      process.exit(1);
    }

    console.log(`Found ${jsonData.products.length} products in data file`);
    console.log(`Found categories structure in data file`);
    console.log(`Found ${jsonData.promotionalSpots.length} promotional spots in data file`);

    // Connect to MongoDB with retry mechanism
    console.log(`Connecting to MongoDB at ${MONGODB_URI.substring(0, 20)}...`);

    let retries = 3;
    let connected = false;

    while (retries > 0 && !connected) {
      try {
        await client.connect();
        connected = true;
        console.log('✅ Connected to MongoDB successfully');
      } catch (error) {
        retries--;
        console.log(`❌ Connection attempt failed. Retries left: ${retries}`);
        if (retries > 0) {
          console.log('Waiting 5 seconds before retry...');
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } else {
          throw error;
        }
      }
    }

    const db = client.db(MONGODB_DB_NAME);
    console.log(`Using database: ${MONGODB_DB_NAME}`);

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    console.log('Existing collections:', collectionNames);

    // Handle products collection
    if (!collectionNames.includes('products')) {
      console.log('Creating products collection...');
      await db.createCollection('products');
    }
    const productsCollection = db.collection('products');
    console.log('Deleting existing products...');
    const deletedProducts = await productsCollection.deleteMany({});
    console.log(`Deleted ${deletedProducts.deletedCount} existing products`);

    if (jsonData.products && jsonData.products.length > 0) {
      console.log(`Inserting ${jsonData.products.length} products...`);
      const productResult = await productsCollection.insertMany(jsonData.products);
      console.log(`Inserted ${productResult.insertedCount} products`);
    }

    // Handle categories collection - flatten the nested structure
    if (!collectionNames.includes('categories')) {
      console.log('Creating categories collection...');
      await db.createCollection('categories');
    }
    const categoriesCollection = db.collection('categories');
    console.log('Deleting existing categories...');
    const deletedCategories = await categoriesCollection.deleteMany({});
    console.log(`Deleted ${deletedCategories.deletedCount} existing categories`);

    if (jsonData.categories) {
      console.log('Flattening and inserting categories structure...');

      // Helper function to flatten categories recursively
      function flattenCategories(category: any, result: any[] = []): any[] {
        if (!category) return result;

        // Add the current category to the result
        result.push({
          id: category.id,
          parent_category_id: category.parent_category_id || '',
          level: category.level || 0,
          name: category.name || { en: 'Unknown Category', dk: 'Ukendt kategori' },
          // Store subcategory IDs for reference, but not the full objects
          subcategory_ids: category.categories ? category.categories.map((c: any) => c.id) : [],
        });

        // Process child categories recursively
        if (Array.isArray(category.categories)) {
          category.categories.forEach((subCategory: any) => {
            flattenCategories(subCategory, result);
          });
        }

        return result;
      }

      const flattenedCategories = flattenCategories(jsonData.categories);
      console.log(`Flattened ${flattenedCategories.length} categories`);

      if (flattenedCategories.length > 0) {
        const categoryResult = await categoriesCollection.insertMany(flattenedCategories);
        console.log(`Inserted ${categoryResult.insertedCount} categories`);
      }
    }
    // Handle promotional spots collection
    if (!collectionNames.includes('promotionalSpots')) {
      console.log('Creating promotionalSpots collection...');
      await db.createCollection('promotionalSpots');
    }
    const spotsCollection = db.collection('promotionalSpots');
    console.log('Deleting existing promotional spots...');
    const deletedSpots = await spotsCollection.deleteMany({});
    console.log(`Deleted ${deletedSpots.deletedCount} existing promotional spots`);

    if (jsonData.promotionalSpots && jsonData.promotionalSpots.length > 0) {
      console.log(`Inserting ${jsonData.promotionalSpots.length} promotional spots...`);
      const spotsResult = await spotsCollection.insertMany(jsonData.promotionalSpots);
      console.log(`Inserted ${spotsResult.insertedCount} promotional spots`);
    }

    console.log('Seeded data successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// IMPORTANT: Actually call the seed function
seed();
