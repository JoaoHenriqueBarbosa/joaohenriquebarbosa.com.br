import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {

    const popular = await db
      .collection("pageviews")
      .find({})
      .sort({ total: -1 })
      .limit(req.query.limit || 0)
      .toArray();

    return res.status(200).json(popular);
  }

  return res.status(500).json({ error: 'client DB is not connected' })

}