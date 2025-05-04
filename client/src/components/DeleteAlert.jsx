import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div className="cl">
        <p className='text-sm'>{content}</p>

        <div className="flex justify-end mt-6">
            <button
                type='button'
                className='add-btn add-button-fill'
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert