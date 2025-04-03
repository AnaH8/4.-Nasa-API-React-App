import React from 'react'

export default function Search(props) {
    const {day, setDay} = props
    const today = (new Date()).toISOString().split('T')[0]
  return (
    <div className='search-container'>
        <input type='date' min='1995-06-16' max={today} onChange={(e)=>{
            //console.log("date input: ", e.target.value)
            setDay(e.target.value)
        }}/>
    </div>
  )
}
