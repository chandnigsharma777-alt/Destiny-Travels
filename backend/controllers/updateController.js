
import Destination from "../models/Destination.js";

export const updateById = async (req, res, next) => {
    try {
        const data = await Destination.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );

        if (!data) return res.status(404).json({ message: "Not found" });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const updateByName = async (req, res, next) => {
    try {
        const data = await Destination.findOneAndUpdate(
            { name: req.params.name }, req.body,
            { new: true, runValidators: true }
        );

        if (!data) return res.status(404).json({ message: "Not found" });
        res.json(data);
    } catch (err) {
        next(err);
    }
};
