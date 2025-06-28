console.log('=== ENVIRONMENT VARIABLES DEBUG ===');

console.log('GitHub Actions Environment:');
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS || 'NOT SET');
console.log('GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY || 'NOT SET');
console.log('GITHUB_REF:', process.env.GITHUB_REF || 'NOT SET');

console.log('\nMongoDB Environment Variables:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
console.log('MONGODB_URI starts with mongodb:', process.env.MONGODB_URI?.startsWith('mongodb') || false);

console.log('MONGODB_DB_NAME exists:', !!process.env.MONGODB_DB_NAME);
console.log('MONGODB_DB_NAME value:', process.env.MONGODB_DB_NAME || 'NOT SET');

console.log('\nOther Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');

console.log('\nAll Environment Variables containing "MONGO":');
Object.keys(process.env)
  .filter(key => key.toLowerCase().includes('mongo'))
  .forEach(key => {
    const value = process.env[key];
    console.log(`${key}: ${value ? (value.length > 50 ? `[${value.length} chars]` : value) : 'NOT SET'}`);
  });

console.log('\n=== END DEBUG ===');
