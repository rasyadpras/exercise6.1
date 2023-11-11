const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { ResponseTemplate } = require('../template/response');

async function postUser(req, res) {
    const {name, email, password, profile_picture, address} = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const encryptedPass = await bcrypt.hash(password, 10);
    const payload = {
        name,
        email,
        password: encryptedPass,
        profile_picture: imageUrl,
        address,
    }

    try {
        const user = await prisma.users.create({
            data: payload
        });
        let resp = ResponseTemplate(user, 'input data success', null, 201);
        return res.status(201).json(resp);
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(resp);
    }
};

async function getUser(req, res) {
    const { name, address } = req.query;
    const payload = {}

    if (name) {
        payload.name = name
    }
    if (address) {
        payload.address = address
    }

    try {
        const user = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
        });
        let resp = ResponseTemplate(user, 'get data success', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(resp);
    }
};

module.exports = {
    postUser,
    getUser,
    
}