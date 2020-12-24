import { connectToDatabase } from "../../utils/mongodb";
import { validateEmail } from "../../utils/utils";

export default async (req, res) => {

  if (req.method === 'POST') {

    const email = req.body.email;

    if (!email) return res.status(500).json({ message: "Email must not be empty" });

    if (!validateEmail(email)) {
      return res.status(500).json({ message: "Invalid email" });
    } else {

      const { db, client } = await connectToDatabase();

      if (client.isConnected()) {
        db.collection("emails").insertOne({ email });
        return res.status(200).json({ message: "Ok" });
      }

      return res.status(500).json({ message: "Client DB is not connected" });
    }

  } else {
    return res.status(404).json({ message: "Not found" });
  }
}
