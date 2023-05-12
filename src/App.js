import React from 'react';
import './App.css';
import { Picture } from './components/Picture/Picture';

function App() {
    return (
        <div className="App">
            <Picture
                src="https://via.placeholder.com/300x300.jpg"
                alt="react testing library"
            />
        </div>
    );
}

export default App;
