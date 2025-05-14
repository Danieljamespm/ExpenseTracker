import React, {useState} from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import EditTransactionForm from '../EditTransactionForm'

const ExpenseTransactions = ({transactions, onSeeMore, updateTransaction}) => {
    const [editingId, setEditingId] = useState(null)
    const [editedTransaction, setEditedTransaction] = useState(null)
    
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-white">Expenses</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
                </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5)?.map((expense) => (
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
                    hideDeleteBtn
                />
                )
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions