const OrgModel = require('../models/organizations.model');
const messaging = require('../utils/messaging')

const create = async (orgname, address, tel) => {
    let org = {
        org_name: orgname,
        address: address,
        tel: tel
    }

    const created =  await OrgModel.create(org);
    const event = {
        orgId: created._id,
        orgName: created.org_name
    }

    await messaging.publish('org_creates', event);
    return created;
}

const get = async (id) => {
    return await OrgModel.findById(id)
}

const getAll = async() => {
    return await OrgModel.find();
}

const update = async(id, orgname, address, tel) => {
    let org = {}
    if (orgname !== '' && orgname != null && orgname != undefined) {
        org.org_name = orgname;
    }

    if (address !== '' && address != null && address != undefined){
        org.address = address;
    }

    if (tel !== '' && tel != null && tel != undefined ){
        org.tel = tel
    }

    const updated = await OrgModel.findByIdAndUpdate(id, org, {new: true});
    const event = {
        orgId: id,
        orgName: updated.org_name
    }

    await messaging.publish('org_updates', event);
    return updated;
}

module.exports = {
    create,
    update,
    get, 
    getAll
}