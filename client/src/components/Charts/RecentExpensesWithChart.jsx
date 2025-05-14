import React, {useState, useEffect} from 'react'
import CustomPieChart from './CustomPieChart'

const EXPENSE_COLORS = ['#FF5C8A', '#FFAA00', '#00C49F', '#FF8042', '#8884d8', '#82ca9d']

const RecentExpensesWithChart = ({data, totalExpenses}) => {
  
    const groupExpensesByCategory = (expenseData) => {
        const grouped = {}
    
        expenseData.forEach(({ category, amount }) => {
          if (!grouped[category]) {
            grouped[category] = 0
          }
          grouped[category] += Number(amount)
        })
    
        return Object.entries(grouped).map(([category, total]) => ({
          name: category,
          amount: Number(total,toFixed(2)),
        }))
      }
    
      const [chartData, setChartData] = useState([])
    
      useEffect(() => {
        const grouped = groupExpensesByCategory(data)
        setChartData(grouped)
      }, [data])
      
      
  
      return (
        <div className="card">
          <div className="flex items-center justify-between">
            <h5 className="text-lg text-white">Last 60 Days Expenses</h5>
          </div>
    
          <CustomPieChart
            data={chartData}
            label="Total Expenses"
            totalAmount={`$${totalExpenses}`}
            showTextAnchor
            colors={EXPENSE_COLORS}
          />
        </div>
      )
}

export default RecentExpensesWithChart