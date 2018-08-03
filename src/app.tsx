import * as React from "react";
import { Provider } from 'react-redux';
import store from './store'
import Test from './components/test/test'


// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Test />
        </Provider>
    }
}