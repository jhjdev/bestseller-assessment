import { MongoClient } from 'mongodb';

async function debugConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  console.log('=== MONGODB CONNECTION DIAGNOSIS ===');
  console.log('Raw URI (hidden):', uri ? 'SET' : 'NOT SET');
  console.log('Database name:', dbName);
  console.log('GitHub Actions:', process.env.GITHUB_ACTIONS || 'false');

  if (!uri || !dbName) {
    console.error('❌ Missing MongoDB credentials');
    process.exit(1);
  }

  // Parse the URI to check format
  try {
    const url = new URL(uri);
    console.log('✅ URI format is valid');
    console.log('Protocol:', url.protocol);
    console.log('Host:', url.hostname);
    console.log('Port:', url.port || 'default');
    console.log('Pathname:', url.pathname);
    console.log('Search params:', url.searchParams.toString());
  } catch (error) {
    console.error('❌ Invalid URI format:', error.message);
    process.exit(1);
  }

  // Test 1: Absolute minimal connection (no modifications)
  console.log('\n=== TEST 1: Minimal connection (original URI) ===');
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Minimal connection SUCCESS');
    await client.close();
  } catch (error) {
    console.log('❌ Minimal connection failed:', error.message);
  }

  // Test 2: Connection with GitHub Actions compatible TLS settings
  console.log('\n=== TEST 2: GitHub Actions compatible TLS ===');
  try {
    const client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    await client.connect();
    console.log('✅ GitHub Actions TLS connection SUCCESS');
    await client.close();
  } catch (error) {
    console.log('❌ GitHub Actions TLS connection failed:', error.message);
  }

  // Test 3: Connection with modified URI for GitHub Actions
  console.log('\n=== TEST 3: Modified URI for CI ===');
  try {
    // Add explicit query parameters for GitHub Actions environment
    const ciUri = uri.includes('?')
      ? `${uri}&ssl=true&retryWrites=true&w=majority`
      : `${uri}?ssl=true&retryWrites=true&w=majority`;

    const client = new MongoClient(ciUri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    await client.connect();
    console.log('✅ CI-optimized connection SUCCESS');
    await client.close();
  } catch (error) {
    console.log('❌ CI-optimized connection failed:', error.message);
  }

  // Test 4: Standard Atlas connection with minimal options
  console.log('\n=== TEST 4: Standard Atlas connection ===');
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('✅ Standard Atlas connection SUCCESS');
    console.log(
      'Available collections:',
      collections.map((c) => c.name)
    );
    await client.close();
  } catch (error) {
    console.log('❌ Standard Atlas connection failed:', error.message);
  }

  console.log('\n=== DIAGNOSIS COMPLETE ===');
}

debugConnection().catch(console.error);
