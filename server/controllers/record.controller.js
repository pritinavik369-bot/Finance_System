import FinancialRecord from "../models/record.model.js";
import { errorHandler } from "../middleware/error.js";
import mongoose from "mongoose";

export const createRecord = async (req, res, next) => {
  try {
    if (!["admin", "analyst"].includes(req.user.role)) {
      return next(errorHandler(403, "You are not allowed to create records"));
    }

    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return next(errorHandler(400, "Amount, type, and category are required"));
    }

    const newRecord = await FinancialRecord.create({
      user_id: req.user.userId, // from token
      amount,
      type,
      category,
      date,
      notes,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};
export const updateRecord = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to update records"));
    }

    const { amount, type, category, date, notes } = req.body;
    const recordId = req.params.id;

    const updatedRecord = await FinancialRecord.findOneAndUpdate(
      { _id: recordId, user_id: req.user.userId },
      { amount, type, category, date, notes },
      { new: true }
    );

    if (!updatedRecord) {
      return next(errorHandler(404, "Record not found"));
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};
export const deleteRecord = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(403, "You are not allowed to delete records"));
    }

    const recordId = req.params.id;

    const deletedRecord = await FinancialRecord.findOneAndDelete({
      _id: recordId,
      user_id: req.user.userId,
    });

    if (!deletedRecord) {
      return next(errorHandler(404, "Record not found"));
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    if (!["admin", "analyst"].includes(req.user.role)) {
      return next(errorHandler(403, "You are not allowed to view records"));
    }

    const { type, category, startDate, endDate } = req.query;
    let filter = { user_id: req.user.userId };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await FinancialRecord.find(filter);
    
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Total income and expenses
    const incomeTotal = await FinancialRecord.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId), type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const expenseTotal = await FinancialRecord.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId), type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = incomeTotal[0]?.total || 0;
    const totalExpenses = expenseTotal[0]?.total || 0;
    const netBalance = totalIncome - totalExpenses;

    // Category wise totals
    const categoryTotals = await FinancialRecord.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: { category: "$category", type: "$type" }, total: { $sum: "$amount" } } }
    ]);

    // Recent activity (last 10)
    const recentActivity = await FinancialRecord.find({ user_id: new mongoose.Types.ObjectId(userId) })
      .sort({ date: -1 })
      .limit(10);

    // Monthly trends (last 12 months)
    const monthlyTrends = await FinancialRecord.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 24 } // last 12 months * 2 types
    ]);

    res.status(200).json({
      totalIncome,
      totalExpenses,
      netBalance,
      categoryTotals,
      recentActivity,
      monthlyTrends
    });
  } catch (error) {
    next(error);
  }
};