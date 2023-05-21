const express = require('express')
const service = require('../../services/organizations')
const validators = require('./validators')
const router = express.Router();

router.get('/', async (req, res) => {
    let orgs = await service.getAll();
    res.status(200).json(orgs);
});

router.get('/:orgId', async (req, res) => {
    const orgId = req.params.orgId;
    console.log(`Getting organization detail (${orgId})`);
    let org = await service.get(orgId)

    if (org == null){
        res.status(404).json({
            error: "Organization not found"
        })
        return;
    }
    res.status(200).json(org);
})

router.post('/', async (req, res) => {
    const schema = validators.createOrgRequestValidator;
    const data = req.body;
    const { error, value } = schema.validate(data)
    if (error){
        console.log('Invalid request');
        res.status(400).json({
            error: "Invalid Request"
        });
        return;
    }

    const org = await service.create(value.org_name, value.address, value.tel)
    if (org == null){
        console.log("unable to create organization");
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

    res.status(201).json(org)
})

router.put('/:orgId', async (req, res) => {
    const orgId = req.params.orgId;
    const data = req.body
    const updated =  await service.update(orgId, data.org_name, data.address, data.tel)
    if (updated == null){
        res.status(404).json({
            error: "Organization not found"
        })
        return;
    }

    res.status(200).json(updated)
})


module.exports = router;