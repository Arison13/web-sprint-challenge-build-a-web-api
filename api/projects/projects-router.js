// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { validateProjectBody, validateProjectId} = require('./projects-middleware')
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch({ message: "error retrieving projects" });
});

router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project);
  });


module.exports = router