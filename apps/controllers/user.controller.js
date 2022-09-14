const db = require('../models')
const users = db.users
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const fs = require('fs')
const crypto = require('crypto')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
require('dotenv').config()
// const client = require('twilio')(accountSid, authToken)

exports.create = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
        return res.status(400).send({ message: "Parameter tidak lengkap" })
    }

    const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        aggreement: req.body.aggreement,
        status: req.body.status,
    }

    try {
        const result = await users.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}