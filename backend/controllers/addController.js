
import Destination from "../models/Destination.js";

export const createDestination = async (req, res, next) => {
    try {
        const data = await Destination.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

export const addMany = async (req, res, next) => {
    try {
        const data = await Destination.insertMany(req.body);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};
