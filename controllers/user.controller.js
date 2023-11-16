const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { ResponseTemplate } = require('../template/response');

async function updateUser(req, res) {
    const { name, email, password, address, member_id} = req.body;
    const payload = {};
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    if (!name && !email && !password && !address && !member_id) {
        let resp = ResponseTemplate(null, 'bad request', null, 400);
        return res.status(400).json(resp);
    };

    if (name) {
        payload.name = name
    }
    if (email) {
        payload.email = email
    }
    if (password) {
        payload.password = password
    }
    if (address) {
        payload.address = address
    }
    if (member_id) {
        payload.member_id = member_id
    }

    try {
        const user = await prisma.users.update({
            where: {
                email: email
            },
            data: {
                ...payload,
                profile_picture: imageUrl
            },
        });
        let resp = ResponseTemplate(user, 'update data success', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(resp);
    }
}

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
        const hashPass = await bcrypt.hash(password, 10);
        const user = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: hashPass,
                address: true,
                member_id: true,
                profile_picture: true,
                created_at: true,
                updated_at: true
            }
        });
        let resp = ResponseTemplate(user, 'get data success', null, 200);
        return res.status(200).json(resp);
    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(resp);
    }
};



module.exports = {
    getUser,
    updateUser,
}