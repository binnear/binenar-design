import * as React from "react";
import { Provider } from 'react-redux';
import store from 'store'
import Test from 'components/test/test'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Router>
                <React.Fragment>
                    <Route path="/" component={Test} />
                    <Route path="/love" component={Test}></Route>
                </React.Fragment>
            </Router>
        </Provider>
    }
}