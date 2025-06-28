const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri || !dbName) {
    console.error('Missing MONGODB_URI or MONGODB_DB_NAME');
    process.exit(1);
  }

  console.log('Testing MongoDB connection...');
  console.log('URI format:', uri.split('@')[0] + '@[HIDDEN]');
  console.log('Database:', dbName);
  console.log('GitHub Actions:', process.env.GITHUB_ACTIONS || 'false');

  // Use the MOST BASIC connection possible
  const client = new MongoClient(uri);

  try {
    console.log('Attempting connection...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log(
      'Available collections:',
      collections.map((c) => c.name)
    );

    await client.close();
    console.log('✅ Connection test completed successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.cause) {
      console.error('❌ Cause:', error.cause.message);
    }
    process.exit(1);
  }
}

testConnection();
