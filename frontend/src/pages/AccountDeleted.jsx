import React from 'react'

function AccountDeleted() {
  return (

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Account Deleted Successfully</h2>
          <p className="text-gray-700 mb-4">Your account has been successfully deleted.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
  )
}

export default AccountDeleted