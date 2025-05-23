import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {
    const[income, setIncome] = useState({
        source: '',
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
            value={income.source}
            onChange={({target}) => {
                const value = target.value.trim()
                const formatted= value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
                handleChange('source', formatted)
            }}
            label='Income Source'
            placeholder="Salary, Sidehustle, Found $20 etc"
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
                className='add-btn add-btn-fill'
                onClick={() => onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm