import './App.css';

import Box from './Box';
import React from 'react';
import logo from './logo.svg';

function App() {
    return (
        <div className="App">
            <Box className="ThickBorder" style={{ color: 'blue' }}>
                <div> Inside Box</div>
            </Box>
        </div>
    );
}

export default App;
