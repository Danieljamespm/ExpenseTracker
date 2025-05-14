import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className='text-lg text-white'>Income</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date, 'YYYY-MM-DD').format("Do MMM YYYY")}
                        amount={item.amount.toFixed(2)}
                        type='income'
                        hideDeleteBtn

                    />
                ))}
            </div>
        </div>
    )
}

export default RecentIncome