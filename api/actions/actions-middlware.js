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