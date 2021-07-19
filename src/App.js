import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AskingPage from './components/askingpageaboutco2'
import Dontknows from './components/dontknows'
import Knows from './components/knows'

function App() {
  const [currentPage, setCurrentPage] = useState("")
  const handleCurrentPage = (data)=>{
    setCurrentPage(data)
  }

  return (
   <div>
    {currentPage==='' && <AskingPage handleCurrentPage={handleCurrentPage}/>}
    {currentPage==='yes' && <Knows handleCurrentPage={handleCurrentPage} />  }
    {currentPage==='no' && <Dontknows handleCurrentPage={handleCurrentPage}/>  }
   </div>
  );
}

export default App;
