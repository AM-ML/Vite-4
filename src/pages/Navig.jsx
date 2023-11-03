import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navig = ({ to }) => {
    useEffect(() => {
        const navigate = useNavigate();

        navigate(to);
    }, [])
  return (
    <div>
      
    </div>
  )
}
