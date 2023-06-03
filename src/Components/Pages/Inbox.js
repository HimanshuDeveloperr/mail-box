import React from 'react'
import { useSelector } from 'react-redux'

const Inbox = () => {
    const recipient=useSelector(state=>state.auth.email)
    console.log(recipient)
  return (
    <div>Inbox</div>
  )
}

export default Inbox