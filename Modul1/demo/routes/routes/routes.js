const getDefault = require ('./default/getDefault');
const getCars = require ('./getCars');

const routes = {
    'default': getDefault,
    'cars': getCars,
}

module.exports = routes;
