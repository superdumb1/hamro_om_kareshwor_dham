import mongoose from 'mongoose'

const { DATABASE_URL, MONGODB_URI, NODE_ENV } = process.env
const uri = MONGODB_URI || DATABASE_URL || 'mongodb://localhost:27017/om_kareshwor' 

declare global {
  // We cache the Mongoose instance AND the initialization promise
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined
}

// Ensure the cache object exists globally in development
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export default mongoose;

export async function connect(dbName?: string) {
  // If we already have an active, resolved connection, return it immediately
  if (global.mongooseCache?.conn && mongoose.connection.readyState === 1) {
    // If a different dbName is provided on the fly, switch contexts cleanly without re-connecting
    if (dbName && mongoose.connection.db?.databaseName !== dbName) {
      mongoose.connection.useDb(dbName, { useCache: true });
    }
    return global.mongooseCache.conn;
  }

  // If no connection is active but an initialization promise is pending, await it
  if (!global.mongooseCache?.promise) {
    const opts = {
      bufferCommands: false, // Fail fast if the database goes down instead of hanging requests
    };

    // Append default dbName to base URI safely if provided initially
    const finalUri = dbName ? `${uri.replace(/\/?$/, '')}/${dbName}` : uri;

    global.mongooseCache!.promise = mongoose.connect(finalUri, opts).then((m) => {
      return m;
    });
  }

  try {
    // Resolve the connection promise
    global.mongooseCache!.conn = await global.mongooseCache!.promise;
  } catch (e) {
    // Reset cache on failure so subsequent requests can try to reconnect cleanly
    global.mongooseCache!.promise = null;
    throw e;
  }

  return global.mongooseCache!.conn;
}

export function getDb() {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    throw new Error('Mongoose not connected. Call connect() first.');
  }
  return mongoose.connection.db;
}

export async function close() {
  await mongoose.disconnect();
  if (global.mongooseCache) {
    global.mongooseCache.conn = null;
    global.mongooseCache.promise = null;
  }
}