import React from 'react';
import MannirCam from './MannirCam'
import Galleries from './Galleries'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <MannirCam />
                <Galleries />
            </div>
        );
    }
}
