import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProfileBlank() {  
  const nav = useNavigate();
  useEffect(() => {
    if(true)
      nav("/profile/dashboard")
  })
  
  return (
    <div className="container w-100 h-100 text-white rounded-1 p-3">

    </div>
  )
}
