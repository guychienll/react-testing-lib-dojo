import React from 'react';
import './App.css';
import Image from './components/Image';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Image
                    src="https://via.placeholder.com/300x300"
                    lazy
                    sizes={[
                        {
                            width: 300,
                            height: 300,
                            density: 1,
                        },
                        {
                            width: 500,
                            height: 500,
                            density: 2,
                        },
                    ]}
                />
            </header>
        </div>
    );
}

export default App;
