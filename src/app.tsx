import * as React from "react";
import { Provider } from 'react-redux';
import store from 'store'
import Root from 'container/root/root';
import 'public/css/common.pcss';
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
                    <Route path="/" component={Root} />
                </React.Fragment>
            </Router>
        </Provider>
    }
}