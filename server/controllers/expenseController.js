const xlsx = require('xlsx')
const Expense = require('../models/Expense')




//Add Expense Source

exports.addExpense = async(req, res) => {
    const userId = req.user.id 

    try {
        const {icon, category, amount, date} = req.body

        //Validation Check for missing fields

        if(!category || !amount || !date) {
            return res.status(400).json({message: 'All fields required'})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()
        res.status(200).json(newExpense)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//Get All Expenses Source

exports.getAllExpense = async(req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({userId}).sort({date: -1})
        res.json(expense)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// Update Expense Source

exports.updateExpense = async (req, res) => {
    const userId= req.user.id
    const {id} = req.params
    const {category, amount, date, icon} = req.body

    //Check for missing fields
    if(!category || !amount || !date) {
        return res.status(400).json({message: 'All fields required'})
    }

    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            {_id: id, userId},
            {category, amount, date: new Date(date), icon},
            {new: true}
        )

        if(!updatedExpense) {
            return res.status(404).json({message: 'Expense not found or you do not have permission to edit it'})
        }

        res.status(200).json(updatedExpense)
    } catch (error) {
        console.error('Error updating expense:', error)
        res.status(500).json({message: 'Server Error'})
    }
}

//Delete Expense Source

exports.deleteExpense = async(req, res) => {
    

    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message: "Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}

//Download Excel

exports.downloadExpenseExcel = async(req, res) => {
    const userId = req.user.id
    
    try {
        const expense = await Expense.find({userId}).sort({date: -1})

        //Prepare data for Excel

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,

        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, 'Expense')
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

