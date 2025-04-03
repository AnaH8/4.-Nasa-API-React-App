import React from 'react'
import Search from './Search'

export default function Main(props) {

  const {data} = props 
  
    if(data.media_type === 'video') {
      return (
        <div className='video-container'>
          <iframe src={data.url} title="description"></iframe>
        </div>
      )
    }
  
  return (
    <div className='image-container'>
      
        <img className="bgImage" src={data.hdurl} alt={data.title || 'bg-img'}/>
    </div>
  )
}
