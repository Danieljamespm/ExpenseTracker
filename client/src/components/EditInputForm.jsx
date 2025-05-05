import React from 'react'
import Input from './Inputs/Input'
import moment from 'moment'

const EditInputForm = ({transaction, onChange, onCancel, onSave}) => {
    console.log('Current Transaction:', transaction)
    const handleInput = (field, value) => {
        onChange({...transaction, [field]: value})
    }
  return (
    <div>
        <Input 
        value={transaction.source}
        onChange={(e) => {
          const value = e.target.value.trim();
          const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          handleInput('source', formatted);
        }}
        label='Source'
        placeholder=''
        className=''
        type='text'
        />
        <Input 
        value={transaction.amount}
        onChange={(e) => handleInput('amount', e.target.value)}
        label='Amount'
        placeholder=''
        className=''
        type='number'
        />
        <Input 
        value={moment(transaction.date, 'YYYY-MM-DD').format('YYYY-MM-DD')}
        onChange={(e) => handleInput('date', e.target.value)}
        label='Date'
        placeholder=''
        className=''
        type='date'
        />

        <div className="flex justify-end gap-2 mt-6">
        <button onClick={onCancel} className='border-2 rounded-xl p-1 hover:bg-red-500 hover:text-white cursor-pointer'>Cancel</button>
        <button onClick={() => onSave(transaction)} className='border-2 rounded-xl p-1 hover:bg-green-500 hover:text-white cursor-pointer'>Save</button>
        </div>

    </div>
  )
}

export default EditInputForm