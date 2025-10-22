require('dotenv').config();
const mongoose = require('mongoose');

const dropOldIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    
    // Drop the old 'emai' index
    await mongoose.connection.db.collection('users').dropIndex('emai_1');
    console.log('✅ Old index "emai_1" dropped successfully!');
    
  } catch (error) {
    if (error.code === 27 || error.codeName === 'IndexNotFound') {
      console.log('Index not found - it may have been already removed or collection is empty');
    } else if (error.codeName === 'NamespaceNotFound') {
      console.log('Users collection does not exist yet - no action needed');
    } else {
      console.log('Error:', error.message);
    }
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  }
};

dropOldIndex();
