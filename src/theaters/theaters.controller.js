const service = require ("./theaters.service")

//CRUD //

async function list (req, res){
    res.json({ data: await service.list()})
}
module.exports = {
    list,
}