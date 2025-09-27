import '../style/App.css';
import {Link} from "react-router-dom";

function App() {
  return (
    <nav>
      <div className='wrapper'> 
        <table className='title_table'>
          <div className='title'>
            <span style={{color:"#ca1515ff"}}>IN</span>
            <span style={{color:"#1e8b1eff"}}>FI</span>
            <span style={{color:"#4123c5ff"}}>NI</span>
            <span style={{color:"#fffc3dff"}}>TE </span>
            simon
          </div>
          <tr>
            <Link to='/game'><div className='navButton'>Play!</div></Link>
          </tr>
          <tr>
            <Link to='/score'><div className='navButton' id='nonFirstButton'>Scoreboard!</div></Link>
          </tr>
        </table>
      </div>
    </nav>
  );
}

export default App;
