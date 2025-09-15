import mongoose from "mongoose";
import { URLs } from "../../src/api/url-model.js";
import { ConnectMongoDb } from "../../src/api/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { longUrl } = req.body;

  try {
    await ConnectMongoDb();
    
    const newURL = new URLs({ longUrl: longUrl });
    const savedRef = await newURL.save();
    const shortURLId = savedRef._id;
    const shortURL = `${req.headers.origin || 'http://localhost:3000'}/api/url/${shortURLId}`;
    
    res.status(200).json({
      ok: true,
      shortUrl: shortURL,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
}
