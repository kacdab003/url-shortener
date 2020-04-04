const Link = require("../models/Link");
exports.getRedirected = async (req, res, next) => {
  const name = req.params.name;

  
  Link.findOne({name:name}).then(link=>{
      console.log(link);
      res.redirect(link.route)
  })
  

};
exports.addLink = async (req, res, next) => {
  const { name, route } = req.body;
  if (!name || !route) {
    return res
      .status(400)
      .send({ status: 400, message: "No provided credentials" });
  }
  const link = new Link({ name, route });
  await link.save();
  res.status(201).send(link);
};
