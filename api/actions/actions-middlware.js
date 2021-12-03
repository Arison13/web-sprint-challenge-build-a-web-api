// add middlewares here related to actions
const Action = require('./actions-model');

async function checkId (req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if(action) {
            req.action = action
            next();
        }else {
            next({ status: 404, message: 'not found!' });//message changes depending on the README
        }
    }
    catch (error) {
        next(error)
    }
}

function checkActionBody(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id) {
      next({ status: 400, message: "missing project id" });
    } else if (!description || !description.trim()) {
      next({ status: 400, message: "missing required description" });
    } else if (!notes || !notes.trim()) {
      next({ status: 400, message: "missing required notes" });
    } else {
      next();
    }
  }


module.exports = {
    checkId,
    checkActionBody
}