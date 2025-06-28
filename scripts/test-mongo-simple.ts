import { MongoClient } from 'mongodb';

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri || !dbName) {
    console.error('❌ Missing MONGODB_URI or MONGODB_DB_NAME environment variables');
    process.exit(1);
  }

  console.log('🔗 Testing MongoDB Atlas connection...');
  console.log('Database:', dbName);

  try {
    // GitHub Actions compatible connection string and options
    let connectionUri = uri;
    let clientOptions: any = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    // Special handling for GitHub Actions environment
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.log('🔧 Using minimal configuration for GitHub Actions...');

      // Use absolutely minimal options - let MongoDB handle everything
      clientOptions = {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        maxPoolSize: 1,
        minPoolSize: 0,
      };
    }

    console.log(
      '🔗 Connection URI modified for environment:',
      process.env.GITHUB_ACTIONS ? 'GitHub Actions' : 'Local'
    );
    const client = new MongoClient(connectionUri, clientOptions);

    console.log('⏳ Connecting...');
    await client.connect();

    console.log('✅ Connected to MongoDB Atlas');

    // Test database access
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    console.log('📁 Available collections:', collections.length);
    collections.forEach((col) => console.log(`  - ${col.name}`));

    await client.close();
    console.log('🔐 Connection closed');
    console.log('🎉 MongoDB connection test PASSED');
  } catch (error) {
    console.error('❌ MongoDB connection test FAILED:', error.message);

    // Additional error details
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('💡 TLS/SSL Error detected. This may be due to:');
      console.error('   - GitHub Actions OpenSSL version incompatibility');
      console.error('   - MongoDB Atlas certificate issues');
      console.error('   - Network restrictions');
    }

    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('💡 DNS Error detected. This may be due to:');
      console.error('   - Invalid MongoDB URI');
      console.error('   - Network connectivity issues');
      console.error('   - MongoDB cluster not accessible');
    }

    process.exit(1);
  }
}

testConnection();
