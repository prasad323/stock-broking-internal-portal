const Client = require("../model/client.model");

const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);

        res.status(201).json({
            success: true,
            message: "Client created successfully",
            data: client,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getClients = async (req, res) => {
    try {
        const clients = await Client.find();

        res.status(200).json({
            success: true,
            count: clients.length,
            data: clients,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await Client.findOne({
            clientId: req.params.clientId,
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found",
            });
        }

        res.status(200).json({
            success: true,
            data: client,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


const updateClient = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate(
            { clientId: req.params.clientId },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Client updated successfully",
            data: client,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({
            clientId: req.params.clientId,
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Client deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
};