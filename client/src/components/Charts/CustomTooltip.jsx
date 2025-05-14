import React from 'react'

const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length) {
        const value = Number(payload[0].value.toFixed(2))
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300 opactiy-100">
                <p className="text-xs font-semibold text-[var(--color-primary)] mb-1 opactiy-100">{payload[0].name}</p>
                <p className="text-sm text-gray-600 opacity-100">
                    Amount: {' '} <span className='text-sm font-medium text-gray-900 opacity-100'>${value}</span>
                </p>
            </div>
        )
    }
    return null
}

export default CustomTooltip