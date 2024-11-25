import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to the Singapore Weather Index</h1>
                <p>
                    Your one-stop platform for real-time weather updates, forecasts, and insights.
                </p>
            </header>
            <section className="home-features">
                <div className="feature">
                    <h2>Live Weather Updates</h2>
                    <p>Stay informed with the latest weather data across Singapore.</p>
                </div>
                <div className="feature">
                    <h2>Accurate Forecasts</h2>
                    <p>Plan ahead with our reliable weather forecasts for the coming days.</p>
                </div>
                <div className="feature">
                    <h2>Interactive Maps</h2>
                    <p>Explore detailed weather patterns and trends using our interactive maps.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
