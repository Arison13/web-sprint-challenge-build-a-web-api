// add middlewares here related to projects
const Projects = require("./projects-model");


async function validateProjectId(req, res, next) {
  try {
    const validProject = await Projects.get(req.params.id);
    if (!validProject) {
      next({ status: 404, message: "project not found" });
    } else {
      req.project = validProject;
      next();
    }
  } catch (err) {
    next({ message: "validating project ID error" });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !name.trim()) {
    next({ status: 400, message: "missing required name" });
  } else if (!description || !description.trim()) {
    next({ status: 400, message: "missing required description" });
  } else if (typeof completed !== 'boolean'){
        next({ status: 400, message: "missing completion status" });
    } else {
    next();
  }
}



module.exports = {
  validateProjectId,
  validateProjectBody,
};