import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPath'
import axiosInstance from '../../utils/axiosinstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import toast from 'react-hot-toast'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'
import RecentExpensesWithChart from '../../components/Charts/RecentExpensesWithChart'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log('Something went wrong. Please try again')
    } finally {
      setLoading(false)
    }
  }

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    //Validation Checks
    if (!category.trim()) {
      toast.error("Category is required")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than zero')
      return
    }

    if (!date) {
      toast.error('Date is required')
      return
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })

      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        'Error adding expense',
        error.response?.data?.message || error.message
      )
    }
  }

  //Update Expense
  const updateTransaction = async (id, updatedExpense) => {
    try {
      const response = await axiosInstance.put(`${API_PATHS.EXPENSE.UPDATE_EXPENSE}/${id}`, updatedExpense)
      toast.success('Expense updated successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error('Error updating expense', error)
      toast.error('Failed to update expense')
    }
  }


  //Delete Income
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Expense details deleted successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        'Error deleting Expense:',
        error.response?.data?.message || error.message
      )
    }
  }

  // handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob',
        }
      )

      //Create URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading expense details')
      toast.error('Failed to download expense details. PLease try again')
    }
  }

  useEffect(() => {
    fetchExpenseDetails()

    return () => { }
  }, [])


  const totalExpenses=expenseData.reduce((acc, curr) => acc + Number(curr.amount),0)


  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
            updateTransaction={updateTransaction}
          />

            <RecentExpensesWithChart data={expenseData} totalExpenses={totalExpenses}/>

        </div>

        

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title='Delete Expense'
        >
          <DeleteAlert
            content='Are you sure you want to delete this expense'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Expense