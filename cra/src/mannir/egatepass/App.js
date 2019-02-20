import React from 'react';
import MannirCam from './MannirCam'
import Galleries from './Galleries'
import fb from "../fb";

export default class App extends React.Component {

    state = {
        images: []
    }

    componentDidMount = () => {
        fb.database().ref('images').on('value', snap => { if (snap.val()) { this.setState({ images: Object.values(snap.val()) }); } });
    
        // fb.database().ref('images/').once('value').then(function(snap) {
        //   // snap.forEach(function(userSnapshot) {
        //   //     var account = userSnapshot.val();
        //   //     console.log(account.displayName);
        //   // });
        //   if (snap.val()) {
        //     this.setState({images: Object.values(snap.val())})
        //   }
        // });
    
    
      }

    render() {
        const { images } = this.state;
        // console.log(images)

        return (
            <div>
                <MannirCam />
                <Galleries images={images} />
            </div>
        );
    }
}
