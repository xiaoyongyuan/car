import React,{Component} from 'react';
import {Switch,HashRouter as Router,Route} from 'react-router-dom'
import Home from "./components/home/Home";
import HeaderLayOut from "./components/header/HeaderLayOut";
class App extends Component{
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/index" component={HeaderLayOut}/>
                    </Switch>
                </Router>
        </div>
        );
    }
}
export default App;
