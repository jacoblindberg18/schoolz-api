const sql = require("mssql");
const config = require("./config");

createHateoasLinks = (req, records, hateoas) => {

    return records.recordset.map((record) => {
        record.links = {};

        hateoas.forEach(link =>
            record.links[link.property.toLowerCase() === 'customerid' ? 'self' : link.property.toLowerCase()] =
            `http://${req.headers.host}/api/${link.endpoint}?${hateoas[0].property}=${record[link.property]}`);
        return record;
    });
}

jsonKeysToLowerCase = (record) => Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k[0].toLowerCase()+k.substring(1), v]));

createSqlParameters = (req, res, ...bodyProperties) => {
    try {
        let hasAllBodyProperties = false;
        let id = '';

        if(req.method == 'PUT' && req.params.hasOwnProperty('Id') && req.params.Id > 0)
            id = `${req.params.Id},`;
        else if(req.method == 'DELETE' && req.params.hasOwnProperty('Id') && req.params.Id > 0)
            id = `${req.params.Id}`;
        // else{
        //     res.status(400);
        //     return res.send('Valid Id URI parameter is required.')
        // }

        let sqlParameters = `${id} `;

        bodyProperties.forEach(prop => {
            let hasProperty = false;
            let value = null;
            if(typeof prop === 'string') 
            {
                hasProperty = req.body.hasOwnProperty(prop);
                hasAllBodyProperties = hasAllBodyProperties || hasProperty;
                value = req.body[prop];
                console.log(value, 'parameters')
            }
            else if(typeof prop === 'object') {
                let propertyName = Object.getOwnPropertyNames(prop)[0];
                hasProperty = req.body.hasOwnProperty(propertyName);
                if(hasProperty){
                    hasAllBodyProperties = hasAllBodyProperties || hasProperty;
                    value = req.body[propertyName];
                }
                else value = prop[propertyName];
            }

            if (typeof value === 'string')
                sqlParameters += `'${value}',`
            else if (typeof value === 'number')
                sqlParameters += `${value},`
            else if (typeof value === 'boolean')
                sqlParameters += value ? `1,` : `0,`;
        });

        if (!hasAllBodyProperties && bodyProperties.length > 0) {
            res.sqlError = 'Missing or erroneous properties.';
            res.status(400);
            return;
        }

        res.sqlParameters = sqlParameters.substring(0, sqlParameters.length - 1)
        res.status(201);
    }
    catch (err) {
        res.sqlError = 'Missing or erroneous properties.';
        res.status(500);
    }
}
    
get = async (req, res, endpoint, hateoas = [], ...params) => {
    try {
        let parameters = "";
        params.forEach((param) => (parameters += `, ${param}`));

        let query = `EXEC Get${endpoint} ${req.query.CustomerId}${parameters}`;

        await sql.connect(config);
        result = await sql.query(query);

        if (result.recordset.length == 0) {
            res.status(404);
            return result;
        }
        hateoas.push({ property: 'Id', endpoint: `${endpoint}product` });
        
        const records = createHateoasLinks(req, result, hateoas);
        // console.log(hateoas[0].property, "hej")

        return req.params.Id > 0 ? records[0] : records;
    } 
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { get };