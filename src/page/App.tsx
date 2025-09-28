import Logo from '../component/Logo';
import '../style/App.css';
import {Link} from "react-router-dom";

function App() {
  return (
    <nav>
      <div className='wrapper'> 
        <table className='title_table'>
          <div className="title">
            <Logo />
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
