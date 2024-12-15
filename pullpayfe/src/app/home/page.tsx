import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to PullPay</h1>
            <p>This is the home page.</p>
            <nav>
                <ul>
                    <li><Link href="/register">register</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;