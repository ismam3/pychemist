import React from 'react';

function Header(props) {
    return (
        <div>
            <div style={{display:'flex'}}>
                <img style={{width:'65px'}} src={process.env.PUBLIC_URL + '/icon.png'}></img>
                <h1>Deal with chemicals</h1>
            </div>
        </div>
    );
}

export default Header;