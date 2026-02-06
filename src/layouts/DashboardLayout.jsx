import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProgressBar, StageIndicator } from '../pages'

const DashboardLayout = ({progress}) => {
  return (
   <div className="min-h-screen flex flex-col items-center pt-10">
      <h1 className=" text-2xl mb-10">Registration App</h1>

      <div className=" rounded-xl shadow-lg p-6 w-120">
        <StageIndicator progress={progress} />
        <ProgressBar progress={progress} />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
