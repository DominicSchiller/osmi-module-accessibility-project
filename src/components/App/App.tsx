import React, {Component, FunctionComponent} from 'react';
import './App.scss';
import {Senso} from "../Senso/Senso";

export const Header: FunctionComponent = () =>
    <aside>
        <header>
            <h1>Accessible Senso</h1>
        </header>
    </aside>

export default class App extends Component {
    render() {
        return <div className="App">
            <Header />
            <Senso />
        </div>
    }
}