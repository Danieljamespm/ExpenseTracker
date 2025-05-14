import React, { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import EditTransactionForm from '../EditTransactionForm'

const ExpenseList = ({ transactions, onDelete, onDownload, updateTransaction }) => {
    const [editingId, setEditingId] = useState(null)
    const [editedTransaction, setEditedTransaction] = useState(null)
    return (
        <div className="card">
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-white'>All Expenses</h5>

                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense) => (
                    editingId === expense._id ? (
                        <EditTransactionForm 
                            key={expense._id}
                            transaction={editedTransaction}
                            onChange={setEditedTransaction}
                            onCancel={() => setEditingId(null)}
                            onSave={(updated) => {
                                updateTransaction(expense._id, updated)
                                setEditingId(null)
                            }}
                        />
                    ) : (
                        
                    <TransactionInfoCard 
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date, 'YYYY-MM-DD').format("Do MMM YYYY")}
                        amount={expense.amount.toFixed(2)}
                        type='expense'
                        onDelete={() => onDelete(expense._id)}
                        onClick={() => {
                            setEditingId(expense._id)
                            setEditedTransaction(expense)
                        }}
                    />
                    
                    )
                ))}
            </div>
        </div>
    )
}

export default ExpenseList