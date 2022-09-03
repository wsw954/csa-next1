import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../models/user";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function createNewUser(req, res) {
  try {
    await connectMongo();
    var newUser = {};
    newUser.firstName = req.body.first;
    newUser.lastName = req.body.last;
    newUser.email = req.body.email;
    newUser.userType = req.body.userType;

    User.create(newUser, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/users/dashboard");
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
