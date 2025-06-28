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

  // Test 2: Connection with TLS disabled (if possible)
  console.log('\n=== TEST 2: Connection with explicit TLS settings ===');
  try {
    const client = new MongoClient(uri, {
      tls: true,
      tlsInsecure: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    });
    await client.connect();
    console.log('✅ TLS permissive connection SUCCESS');
    await client.close();
  } catch (error) {
    console.log('❌ TLS permissive connection failed:', error.message);
  }

  // Test 3: No TLS at all (will probably fail for Atlas but worth trying)
  console.log('\n=== TEST 3: Force no TLS ===');
  try {
    const noTlsUri = uri.replace('mongodb+srv://', 'mongodb://').split('?')[0];
    const client = new MongoClient(noTlsUri, {
      tls: false,
    });
    await client.connect();
    console.log('✅ No TLS connection SUCCESS');
    await client.close();
  } catch (error) {
    console.log('❌ No TLS connection failed (expected):', error.message);
  }

  console.log('\n=== DIAGNOSIS COMPLETE ===');
}

debugConnection().catch(console.error);
