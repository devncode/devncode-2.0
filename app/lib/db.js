import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

/**
 * Serialize MongoDB document to plain object
 * Converts ObjectIds to { $oid: "..." } format and Dates to { $date: "..." } format
 * to match the original JSON structure
 */
function serializeDocument(doc) {
  if (doc === null || doc === undefined) {
    return doc;
  }

  // Handle ObjectId - convert to { $oid: "..." } format
  if (doc instanceof ObjectId) {
    return { $oid: doc.toString() };
  }

  // Handle Date - convert to { $date: "..." } format
  if (doc instanceof Date) {
    return { $date: doc.toISOString() };
  }

  // Handle arrays
  if (Array.isArray(doc)) {
    return doc.map(serializeDocument);
  }

  // Handle plain objects
  if (typeof doc === "object" && doc.constructor === Object) {
    const serialized = {};
    for (const [key, value] of Object.entries(doc)) {
      serialized[key] = serializeDocument(value);
    }
    return serialized;
  }

  // Handle Buffer objects (like in createdBy fields)
  if (Buffer.isBuffer(doc)) {
    // Convert Buffer to ObjectId format if it's 12 bytes (ObjectId size)
    if (doc.length === 12) {
      try {
        const objectId = new ObjectId(doc);
        return { $oid: objectId.toString() };
      } catch (e) {
        // If it's not a valid ObjectId, return as hex string
        return { $oid: doc.toString("hex") };
      }
    }
    return { $oid: doc.toString("hex") };
  }

  // Handle other object types (like Buffer, etc.)
  if (typeof doc === "object") {
    // For objects with toJSON method, try calling it first
    if (typeof doc.toJSON === "function") {
      return serializeDocument(doc.toJSON());
    }
    // Otherwise, try to convert to string or return empty object
    if (doc instanceof ObjectId) {
      return { $oid: doc.toString() };
    }
    // Return empty object for other special objects
    return {};
  }

  return doc;
}

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

// Connection singleton pattern for Next.js
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
 * Get all communities from MongoDB
 * @returns {Promise<Array>} Array of community documents
 */
export async function getCommunities() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const communities = await db.collection("communities").find({}).toArray();
    // Serialize MongoDB documents to plain objects for client components
    return communities.map(serializeDocument);
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

/**
 * Get all events from MongoDB with populated community and venue
 * @returns {Promise<Array>} Array of event documents with populated community and venue
 */
export async function getEvents() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Use aggregation to populate community and venue references
    const events = await db
      .collection("events")
      .aggregate([
        {
          $lookup: {
            from: "communities",
            localField: "community",
            foreignField: "_id",
            as: "communityData",
          },
        },
        {
          $lookup: {
            from: "venues",
            localField: "venue",
            foreignField: "_id",
            as: "venueData",
          },
        },
        {
          $addFields: {
            community: {
              $cond: {
                if: { $gt: [{ $size: "$communityData" }, 0] },
                then: { $arrayElemAt: ["$communityData", 0] },
                else: null,
              },
            },
            venue: {
              $cond: {
                if: { $gt: [{ $size: "$venueData" }, 0] },
                then: { $arrayElemAt: ["$venueData", 0] },
                else: null,
              },
            },
          },
        },
        {
          $project: {
            communityData: 0,
            venueData: 0,
          },
        },
      ])
      .toArray();
    
    // Serialize MongoDB documents to plain objects for client components
    return events.map(serializeDocument);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

/**
 * Get community statistics directly from MongoDB using aggregation
 * @returns {Promise<Object>} Statistics object with total and city-specific counts
 */
export async function getCommunityStats() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const result = await db
      .collection("communities")
      .aggregate([
        // Filter active communities
        {
          $match: {
            isActive: true,
            isDeleted: { $ne: true },
          },
        },
        // Extract city from title using regex matching
        {
          $addFields: {
            city: {
              $switch: {
                branches: [
                  { case: { $regexMatch: { input: "$title", regex: "\\bKarachi\\b", options: "i" } }, then: "Karachi" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bLahore\\b", options: "i" } }, then: "Lahore" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bIslamabad\\b", options: "i" } }, then: "Islamabad" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bPeshawar\\b", options: "i" } }, then: "Peshawar" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bHyderabad\\b", options: "i" } }, then: "Hyderabad" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bAbbottabad\\b", options: "i" } }, then: "Abbottabad" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bSahiwal\\b", options: "i" } }, then: "Sahiwal" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bRawalpindi\\b", options: "i" } }, then: "Rawalpindi" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bQuetta\\b", options: "i" } }, then: "Quetta" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bFaisalabad\\b", options: "i" } }, then: "Faisalabad" },
                  { case: { $regexMatch: { input: "$title", regex: "\\bMultan\\b", options: "i" } }, then: "Multan" },
                ],
                default: null,
              },
            },
          },
        },
        // Group by city and count
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    
    // Calculate total and city-specific counts
    let total = 0;
    const cityCounts = {
      Karachi: 0,
      Lahore: 0,
      Islamabad: 0,
      Peshawar: 0,
    };
    
    result.forEach((item) => {
      if (item._id) {
        total += item.count;
        if (cityCounts.hasOwnProperty(item._id)) {
          cityCounts[item._id] = item.count;
        }
      } else {
        // Count communities without a matched city
        total += item.count;
      }
    });
    
    return {
      total,
      karachi: cityCounts.Karachi,
      lahore: cityCounts.Lahore,
      islamabad: cityCounts.Islamabad,
      peshawar: cityCounts.Peshawar,
    };
  } catch (error) {
    console.error("Error fetching community stats:", error);
    throw error;
  }
}

/**
 * Get event statistics directly from MongoDB using aggregation
 * @returns {Promise<Object>} Statistics object with total count
 */
export async function getEventStats() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const result = await db
      .collection("events")
      .aggregate([
        // Filter active events
        {
          $match: {
            status: true,
            isDeleted: { $ne: true },
          },
        },
        // Count total
        {
          $count: "total",
        },
      ])
      .toArray();
    
    return {
      total: result[0]?.total ?? 0,
    };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    throw error;
  }
}
