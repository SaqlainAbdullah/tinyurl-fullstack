import mongoose from "mongoose";
import { URLs } from "../../src/api/url-model.js";
import { ConnectMongoDb } from "../../src/api/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { shortId } = req.query;

  try {
    await ConnectMongoDb();
    
    const resUrls = await URLs.find({ _id: shortId });
    const element = resUrls[0];
    
    if (!element) {
      return res.status(404).json({ ok: false, message: 'URL not found' });
    }

    res.redirect(element.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
}
