import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../models/user";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  const { method } = req;

  await connectMongo();

  switch (method) {
    case "POST":
      try {
        const user = await User.create(
          req.body
        ); /* create a new model in the database */
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      //This is placeholder code for now
      try {
        const user = await User.findByIdAndUpdate(
          req.body
        ); /* create a new model in the database */
        res.status(200).json({ userID: user._id });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
