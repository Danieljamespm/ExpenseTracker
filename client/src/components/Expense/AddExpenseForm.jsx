import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    })

    const handleChange = (key, value) => setIncome({...income, [key]: value})
    
    return (
        <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

        <Input 
            value={income.category}
            onChange={({target}) => {
                const value = target.value.trim()
                const formatted= value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
                handleChange('category', formatted)
            }}
            label='Category'
            placeholder='Gas, Groceries, Dining Out etc'
            type='text'
        />

        <Input 
            value={income.amount}
            onChange={({target}) => handleChange('amount', target.value)}
            label='Amount'
            placeholder=''
            type='number'
        />
        
        <Input 
            value={income.date}
            onChange={({target}) => handleChange('date', target.value)}
            label='Date'
            placeholder=''
            type='date'
        />

        <div className="flex justify-end mt-6">
            <button
                type='button'
                className='add-btn add0btn-fill'
                onClick={() => onAddExpense(income)}
            >
                Add Expense
            </button>
        </div>

        </div>
    )
}

export default AddExpenseForm