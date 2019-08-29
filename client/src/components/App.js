import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Fib from './Fib';
import OtherPage from './OtherPage';

function App() {
    return (
        <>
            <Navbar />
            <h1>Fib Calculator v5</h1>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
        </>
    );
}

export default App;
