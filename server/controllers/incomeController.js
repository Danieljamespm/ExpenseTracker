const xlsx = require('xlsx')
const Income = require('../models/Income')




//Add Income Source

exports.addIncome = async(req, res) => {
    const userId = req.user.id 

    try {
        const {icon, source, amount, date} = req.body

        //Validation Check for missing fields

        if(!source || !amount || !date) {
            return res.status(400).json({message: 'All fields required'})
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()
        res.status(200).json(newIncome)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//Get All Income Source

exports.getAllIncome = async(req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({userId}).sort({date: -1})
        res.json(income)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//Update Income Source

exports.updateIncome = async(req, res) => {
    const userId= req.user.id
        const {id} = req.params
        const {source, amount, date, icon} = req.body
    
        //Check for missing fields
        if(!source || !amount || !date) {
            return res.status(400).json({message: 'All fields required'})
        }
    
        try {
            const updatedIncome = await Income.findOneAndUpdate(
                {_id: id, userId},
                {source, amount, date: new Date(date), icon},
                {new: true}
            )
    
            if(!updatedIncome) {
                return res.status(404).json({message: 'Income not found or you do not have permission to edit it'})
            }
    
            res.status(200).json(updatedIncome)
        } catch (error) {
            console.error('Error updating income:', error)
            res.status(500).json({message: 'Server Error'})
        }
}

//Delete Income Source

exports.deleteIncome = async(req, res) => {
    

    try {
        await Income.findByIdAndDelete(req.params.id)
        res.json({message: "Income deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}

//Download Excel

exports.downloadIncomeExcel = async(req, res) => {
    const userId = req.user.id
    
    try {
        const income = await Income.find({userId}).sort({date: -1})

        //Prepare data for Excel

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,

        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, 'Income')
        xlsx.writeFile(wb, 'income_details.xlsx')
        res.download('income_details.xlsx')
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

