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

router.post("/", validateProjectBody, (req, res, next) => {
    Projects.insert(req.body)
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch(next);
});

router.put("/:id",validateProjectId,validateProjectBody,(req, res, next) => {
      Projects.update(req.params.id, req.body)
        .then((updatedPost) => {
          res.status(202).json(updatedPost);
        })
        .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
        res.status(204).json({});
        })
        .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
      .then((actions) => {
        res.status(202).json(actions);
      })
      .catch(next);
  });

module.exports = router