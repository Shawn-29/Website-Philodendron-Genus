const connector = require('../connector');
const { NotFoundError, ServerError } = require('../errors');

/* replace brackets with HTML closing tags */
const replaceBrackets = (str) => {
    return str.replace(/(\[)|(\])/g, (match) => {
        return match === '[' ? '<' : '>';
    });
}

const controller = async (req, res) => {
    const { id } = req.params;
    if (typeof id !== 'string' || id.length === 0 || !Number.isSafeInteger(+id)) {
        return res.render('not-found');
    }
    const sqlInfo = `
        SELECT name, growth_type, light_requirement,
            difficulty, mature_size_description, description,
            growing_advice
        FROM plants
        WHERE id = ?
        LIMIT 1;
    `;
    const sqlImages = `
        SELECT i.filename
        FROM images i
        INNER JOIN plants p
            ON i.plant_id = p.id
        WHERE p.id = ?;
    `;
    const sqlOrigins = `
        SELECT country_name
        FROM countries
        WHERE country_id IN (
            SELECT country_id
            FROM origins
            WHERE plant_id = ?
        );
    `;
    const response = await connector.runQuery(`${sqlInfo}${sqlImages}${sqlOrigins}`, id, id, id)
        .catch(err => {
            throw new ServerError({
                message: 'Could not retreive single plant data',
                reason: err,
                data: {
                    params: req.params
                }
            });
        });

    if (response[0].length === 0) {
        throw new NotFoundError({
            message: 'Could not retreive single plant data',
            reason: 'Invalid id',
            data: {
                params: req.params
            }
        });
    }

    const info = response[0][0];
    res.locals.plantData = {
        info: {
            ...info,
            description: replaceBrackets(info.description),
            growing_advice: replaceBrackets(info.growing_advice),
        },
        imageURLs: response[1].map(obj => obj.filename),
        origins: response[2].map(obj => obj.country_name).join(', ')
    };
    return res.render('article');
};

module.exports = controller;