const express = require('express')
const organizationV1 = require('./v1/organizations')
const router = express()

router.use('/v1/organizations', organizationV1)

module.exports = router;