module.exports = {
  hello: function(req, res) {
    res.status(200).send({cathy: 123});
    console.log("Hello");
  },
  signin: function(req, res) {
    console.log("this is req", req);
    console.log("this is the req.body", req.body);
    if(req.body.name) {
      res.status(200).send(req.body.name);
    } else {
      res.sendStatus(300);
    }
  }
};