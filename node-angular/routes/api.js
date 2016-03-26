/*
 * Serve JSON to our AngularJS client
 */

// initialize our dummy(simulated) database
// Will hook this up to FireBase in future.
var data = {
  "items": [
    {
      "title": "Bananas",
      "text": "Wonderfully sweet with firm and creamy flesh, bananas come prepackaged in their own yellow jackets and are available for harvest throughout the year."+
			  "The banana plant grows 10 to 26 feet and belongs to the Musaceae family of plants along with plantains."+
			  "The cluster of fruits contain anywhere from 50 to 150 bananas with individual fruits grouped in bunches, known as hands, containing 10 to 25 bananas."
    },
    {
      "title": "Milk",
      "text": "Milk is a pale liquid produced by the mammary glands of mammals. It is the primary source of nutrition for infant mammals before they are able to digest other types of food."
    }
  ]
};


// GET
exports.items = function (req, res) {
  var items = [];
  data.items.forEach(function (item, i) {
    items.push({
      id: i,
      title: item.title,
      text: item.text.substr(0, 50) + '...'
    });
  });
  res.json({
    items: items
  });
};

exports.item = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.items.length) {
    res.json({
      item: data.items[id]
    });
  } else {
    res.json(false);
  }
};


// POST
exports.addItem = function (req, res) {
  data.items.push(req.body);
  res.json(req.body);
};


// PUT
exports.editItem = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.items.length) {
    data.items[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};


// DELETE
exports.deleteItem = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.items.length) {
    data.items.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};