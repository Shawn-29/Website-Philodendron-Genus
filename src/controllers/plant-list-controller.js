const connector = require('../connector');
const { ServerError } = require('../errors');

const controller = async (req, res, next) => {
    const sql = `
        SELECT p.id AS id, name, growth_type, light_requirement, 
            difficulty, mature_size_description, filename 
        FROM plants p INNER JOIN images i
            ON p.id = i.plant_id
        WHERE filename LIKE "%2%"
        ORDER BY name ASC
    `;
    const response = await connector.runQuery(sql)
        .catch(err => {
            throw new ServerError({
                message: 'Could not retreive single plant data',
                reason: err
            });
        });
    res.locals.plantData = response;
    res.render('plant-list');
};

module.exports = controller;