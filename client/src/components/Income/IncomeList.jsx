import React, {useState} from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import EditInputForm from '../EditInputForm'

const IncomeList = ({transactions, onDelete, onDownload, updateTransaction}) => {
    const [editingId, setEditingId] = useState(null)
    const [editedTransaction, setEditedTransaction] = useState(null)
    
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-white"> Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((income) => (
                 editingId === income._id ? (
                    <EditInputForm 
                        key={income._id}
                        transaction={editedTransaction}
                        onChange={setEditedTransaction}
                        onCancel={() => setEditingId(null)}
                        onSave={(updated) => {
                            updateTransaction(income._id, updated)
                            setEditingId(null)
                        }}
                    />
                ) : (
                <TransactionInfoCard 
                    key={income._id}
                    title={income.source}
                    icon={income.icon}
                    date={moment(income.date, 'YYYY-MM-DD').format("Do MMM YYYY")}
                    amount={income.amount}
                    type='income'
                    onDelete={() => onDelete(income._id)}
                    onClick={() => {
                        setEditingId(income._id)
                        setEditedTransaction(income)
                    }}
                />
                )
            ))}
        </div>
    </div>
  )
}

export default IncomeList