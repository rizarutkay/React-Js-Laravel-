import ReactDOM from 'react-dom';
import './index.css';
import Tablecomponent from './components/table/table';
import Logincomponent from './components/login/login'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./protectedroutes";
import Signupcomponent from './components/signup/signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home=()=>{
const test=localStorage.getItem('usertoken')


return(
<div>
 <Switch>
{(test==='null')   ?   
<Route exact path="/" component={Logincomponent} /> :   
<Route exact path="/" component={Tablecomponent} />        }

<ProtectedRoute exact path="/table" component={Tablecomponent} />
<Route exact path="/signup" component={Signupcomponent} />
<Route path="*" component={() => "404 NOT FOUND"} />
</Switch>


</div>

)
  
}



ReactDOM.render(
 <Router>   <Home />         </Router> ,
  document.getElementById('root')
);
