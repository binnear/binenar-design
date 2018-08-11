import * as React from "react";
import { Provider } from 'react-redux';
import store from 'store'
import Index from 'components/index/index'
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
                    <Route path="/" component={Index} />
                </React.Fragment>
            </Router>
        </Provider>
    }
}