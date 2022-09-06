import connectMongo from "../../../../utils/connectMongo";
import Vehicle from "../../../../models/vehicle";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createNewVehicle(req, res) {
  try {
    await connectMongo();
    var newVehicle = {};
    newVehicle.make = req.body.make;
    newVehicle.model = req.body.model;

    newVehicle = await Vehicle.create(newVehicle);
    res.json({ newVehicle });
  } catch (error) {
    res.json({ error });
    res.status(405).end();
  }
}
