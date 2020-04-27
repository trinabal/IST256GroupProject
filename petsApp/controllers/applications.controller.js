const Application = require('../models/applications.model.js');

// Create and Save a new Application
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Application content can not be empty"
        });
    }

    // Create a Application
    const application = new Application({
        name: req.body.name || "Untitled Application",
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        pet: req.body.pet
    });

    // Save Application in the database
    application.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Application."
        });
    });
};

// Retrieve and return all applications from the database.
exports.findAll = (req, res) => {
    Application.find()
    .then(applications => {
        res.send(applications);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving applications."
        });
    });
};

// Update an application identified by the name in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Application content can not be empty"
        });
    }

    // Find application and update it with the request body
    Application.findOneAndUpdate(req.params.id, {
      name: req.body.name || "Untitled Application",
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      pet: req.body.pet
    }, {new: true})
    .then(application => {
        if(!application) {
            return res.status(404).send({
                message: "Application not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Application not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating application with id " + req.params.id
        });
    });
};

// Delete a application with the specified name as id in the request
exports.delete = (req, res) => {
    Application.findOneAndRemove(req.params.id)
    .then(Application => {
        if(!application) {
            return res.status(404).send({
                message: "Application not found with name " + req.params.id
            });
        }
        res.send({message: "Application deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Application not found with name " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete application with name " + req.params.id
        });
    });
};
