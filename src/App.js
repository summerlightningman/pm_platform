import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/login/login";
import UserPage from "./components/user-page/user-page";

import './App.css';

function App() {
    return <Router>
        <Switch>
            <Route path="/login/" exact><Login/></Route>
            <Route path="/"><UserPage/></Route>
        </Switch>
    </Router>

}

export default App;
