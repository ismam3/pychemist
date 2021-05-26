import React from 'react';
import Balancer from './Balancer';
import Header from './Header';

function Home(props) {
    return (
        <div>
            <Header></Header>
            <Balancer></Balancer>
        </div>
    );
}

export default Home;