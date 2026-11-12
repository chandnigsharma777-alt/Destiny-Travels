
import Destination from "../models/Destination.js";
import mongoose from "mongoose";

// Get all destinations
export const getDestinations = async (req, res, next) => {
    try {
        const { category, minPrice, maxPrice, sortBy = "rating",
            order = "desc", page = 1, limit = 5 } = req.query;

        const filter = {};

        if (category) filter.category = category;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sort = ["price", "rating"].includes(sortBy) ? sortBy : "rating";

        const data = await Destination.find(filter)
            .sort({ [sort]: order === "asc" ? 1 : -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// Get destination by ID
export const getById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid destination ID" });
        }

        const data = await Destination.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// Get destination by name
export const getByName = async (req, res, next) => {
    try {
        const data = await Destination.findOne({ name: req.params.name });

        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// Get unique categories
export const getCategories = async (req, res, next) => {
    try {
        const data = await Destination.distinct("category");
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// Count destinations
export const getCount = async (req, res, next) => {
    try {
        const count = await Destination.countDocuments();
        res.status(200).json({ totalDestinations: count });
    } catch (err) {
        next(err);
    }
};


