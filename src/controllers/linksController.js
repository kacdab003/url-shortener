const Link = require("../models/Link");
exports.getRedirected = async (req, res, next) => {
  try {
    const name = req.params.name;
    const link = await Link.findOne({ name: name });
    res.redirect(link.route);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
exports.addLink = async (req, res, next) => {
  try {
    const { name, route } = req.body;
    if (!name || !route) {
      return res
        .status(400)
        .send({ status: 400, message: "No provided credentials" });
    }
    const link = new Link({ name, route });
    await link.save();
    res.status(201).send(link);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
exports.editLink = async (req, res, next) => {
  const {linkId} = req.params
  const { name, route } = req.body;
  try {
    const link = await Link.findOne({ _id: linkId });
   if(name) link.name = name;
   if(route) link.route = route;
   await link.save();
   res.status(200).send(link)

  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
exports.removeLink = async (req, res, next) => {
  try {
    //Auth needed!
    const { linkId } = req.params;
    if (!linkId) res.status(400).send("No provided credentials");
    const link = await Link.findOne({ _id: linkId });
    if (!link) res.status(404).send("No link found with such ID");
    await link.remove();
    res.status(200).send(link);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
