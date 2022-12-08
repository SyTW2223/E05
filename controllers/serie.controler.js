const db = require("../models");
const serie = db.series;

// Create and Save a new serie
exports.create = (req, res) => {/*
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Debe tener un titulo!" });
    return;
  }

  // Create a serie
  const serie = new serie({
    title: req.body.title,
    description: req.body.description,
    categorys: req.body.categorys,
  });

  // Save serie in the database
  serie.save(serie).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear el elemento."
      });
    });*/
};



// Update a serie by the title in the request
exports.update = (req, res) => {/*
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const title = req.params.title;

  serie.findOneAndUpdate(title, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update serie with title=${title}. Maybe serie was not found!`
        });
      } else res.send({ message: "serie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating serie with title=" + title
      });
    });*/
};


// Retrieve all elements from the database.
exports.findAll = (req, res) => {/*
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  serie.find(condition)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al buscar los elementos."
      });
    });*/
};

// Find a element with an title
exports.findOne = (req, res) => {/*
  const title = req.query.name?{name: req.query.name.toString()}:{};
  serie.find(title).then(data => {
      if (!data)
        res.status(404).send({ message: "Not found serie with title " + id });
      else res.send(data);
    }).catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving serie with title=" + title });
    });*/
};


// Delete a serie with the specified id in the request
exports.delete = (req, res) => {/*
  const title = req.params.title;

  serie.findByIdAndRemove(title, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete serie with title=${title}. Maybe serie was not found!`
        });
      } else {
        res.send({
          message: "serie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete serie with title=" + title
      });
    });*/
};

// Delete all series from the database.
exports.deleteAll = (req, res) => {/*
  serie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} series were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all series."
      });
    });*/
};
