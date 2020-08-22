var UserService = require('../services/user.service')
var User = require('../models/user.model')

exports.listAction = async function (req, res, next) {

    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var users = await UserService.getAll()
        return res.status(200).json(users);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.viewAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var user = await UserService.get(req.params.id)

        if (!user) {
            res.status(404).send('Not found');
            return
        }

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createAction = async function (req, res, next) {

    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var user = await UserService.create(req.body)

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.editAction = async function (req, res, next) {

    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var user = await UserService.edit(req.params.id, req.body)

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteAction = async function (req, res, next) {

    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var user = await UserService.delete(req.params.id)

        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}