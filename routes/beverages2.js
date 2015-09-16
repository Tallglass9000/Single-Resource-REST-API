var bevs = [{name: 'coffee'}, {name: 'tea'}, {name: 'cider'}, {name: 'beer'}]; 

exports.readAll = function (req, res) {
  res.send(bevs);
};

exports.readByElement = function (req, res) {
};
