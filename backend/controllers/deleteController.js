
import Destination from "../models/Destination.js";

export const deleteById = async (req, res, next) => {
    try {
        const data = await Destination.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Destination deleted" });
    } catch (err) {
        next(err);
    }
};

export const deleteByName = async (req, res, next) => {
    try {
        const data = await Destination.findOneAndDelete({ name: req.params.name });
        if (!data) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Destination deleted" });
    } catch (err) {
        next(err);
    }
};

export const deleteMany = async (req, res, next) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const data = await Destination.deleteMany({ category });
        res.json({ deletedCount: data.deletedCount });
    } catch (err) {
        next(err);
    }
};
