import { useState } from 'react'
import './index.css'
import TeacherDashboard from './components/TeacherDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TeacherDashboard/>
  )
}

export default App
