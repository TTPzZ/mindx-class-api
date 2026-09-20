const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) return cachedClient;
    const client = await MongoClient.connect(uri);
    cachedClient = client;
    return client;
}

module.exports = async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const client = await connectToDatabase();
        const collection = client.db('MindX_Class').collection('Leaderboard');


        if (req.method === 'POST') {
            await collection.insertOne(req.body);
            return res.status(200).json({ message: 'Lưu điểm thành công!' });
        }

        if (req.method === 'GET') {
            const leaderboard = await collection.find().sort({ score: -1 }).limit(100).toArray();
            return res.status(200).json(leaderboard);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi hệ thống' });
    }
};