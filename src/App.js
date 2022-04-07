import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SubmitResults from "./results/SubmitResults";
import MapFinder from "./map/MapFinder";

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={MapFinder}/>
                    <Route path="/results" exact component={SubmitResults}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
