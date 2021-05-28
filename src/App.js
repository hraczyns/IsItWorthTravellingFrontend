import { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MapFunction from "./MapFunction";
import SubmitResults from "./SubmitResults";

class App extends Component {
render(){
  return (
    <div>
      <Router>
        <Switch>
            <Route path ="/" exact component={MapFunction}/>
            <Route path="/results" exact component={SubmitResults}/>
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
