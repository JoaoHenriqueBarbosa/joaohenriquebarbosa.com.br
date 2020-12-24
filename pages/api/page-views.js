import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {

  if (req.method === 'POST') {

    const slug = req.body.slug;

    if (!slug) return res.status(404).json({ message: "Not found" });

    const { db, client } = await connectToDatabase();

    if (client.isConnected()) {
      const pageViewBySlug = await db
        .collection("pageviews")
        .findOne({ slug });

      let total = 0;
      if (pageViewBySlug) {
        total = pageViewBySlug.total + 1;
        await db.collection('pageviews').updateOne({ slug }, { $set: { total } });
      } else {
        total = 1;
        await db.collection('pageviews').insertOne({ slug, total });
      }

      return res.status(200).json({ views: total });
    }

    return res.status(500).json({ error: 'client DB is not connected' });
  } else {
    return res.status(404).json({ message: "Not found" });
  }

}