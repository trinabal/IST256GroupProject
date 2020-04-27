module.exports = (app) => {
    const applications = require('../controllers/applications.controller.js');

    // Create a new application
    app.post('/applications', applications.create);

    //Retrieve all applications
    app.get('/applications', applications.findAll);

    // Update a application with applicationId
    app.put('/applications/:id', applications.update);

    // Delete a application with applicationId
    app.delete('/applications/:id', applications.delete);
}
