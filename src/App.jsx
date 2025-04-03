import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Main from './components/Main'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import Search from './components/Search'


function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const [day, setDay] = useState((new Date()).toISOString().split('T')[0])

  function handleToggleModal () {
    setShowModal(!showModal)
  }

  useEffect(()=>{
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`  + `&date=${day}` 

    
      const localKey = `NASA-${day}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        //console.log('media type: ', apiData.media_type)
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log(`fetched from api today`, apiData)
        
      } catch(err){
        console.log(err.message)
      }
    }
    fetchAPIData()
  },[day])
  



  return ( 
    <>
    {data ? (<Main data={data}/>): (<div className='loadingState'>
      <i className='fa-solid fa-gear'></i></div>)}
    {showModal && (<SideBar  data={data} handleToggleModal={handleToggleModal}></SideBar>)}
    {data && (<Footer data={data} showModal={showModal} handleToggleModal={handleToggleModal}></Footer>)}
    <Search today={day} setDay={setDay}/>
    </>
  )
}

export default App
