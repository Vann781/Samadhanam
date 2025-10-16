
import './App.css'

import { Outlet } from 'react-router-dom'

function App() {
    return (
      // <Login></Login>
      <div>
          <Outlet></Outlet>
      </div>
      // <ComplaintItem></ComplaintItem>
    )
  
}

export default App
