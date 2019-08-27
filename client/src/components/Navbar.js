import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
        </>
    );
};

export default Navbar;
