'use client';

import { useState } from 'react';
import { flights } from '../utils/mockData';

export default function FlightSearch() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
        const foundFlight = flights.find(
            (f) => f.flightNumber.toLowerCase() === query.toLowerCase()
        );

        if (foundFlight) {
            setResult(foundFlight);
            setError('');
        } else {
            setResult(null);
            setError('Flight not found. Please check the flight number.');
        }
    };

    const generateCalendarUrl = (flight) => {
        if (!flight) return '#';

        // Helper to parse "HH:MM AM/PM" to 24h format
        const parseTime = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}${minutes}00`;
        };

        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateStr = tomorrow.toISOString().split('T')[0].replace(/-/g, '');

        const startTime = parseTime(flight.startTime);
        const endTime = parseTime(flight.endTime);

        const startDateTime = `${dateStr}T${startTime}`;
        const endDateTime = `${dateStr}T${endTime}`;

        const title = `Flight ${flight.flightNumber}`;
        const details = `Flight from ${flight.startLocation} to ${flight.endLocation}`;
        const location = `${flight.startLocation} to ${flight.endLocation}`;

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter Flight Number (e.g., AA123)"
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search Flight
                    </button>
                </div>
            </form>

            {hasSearched && (
                <div className={`result-container ${result ? 'success' : 'error'}`}>
                    {result ? (
                        <a
                            href={generateCalendarUrl(result)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flight-card-link"
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                            <div className="flight-card">
                                <div className="flight-header">
                                    <h2>Flight {result.flightNumber}</h2>
                                    <span className="badge">On Time</span>
                                </div>

                                <div className="flight-route">
                                    <div className="location">
                                        <span className="code">{result.startLocation.split('(')[1].replace(')', '')}</span>
                                        <span className="city">{result.startLocation.split('(')[0]}</span>
                                        <span className="time">{result.startTime}</span>
                                    </div>

                                    <div className="duration-line">
                                        <span className="plane-icon">✈</span>
                                    </div>

                                    <div className="location">
                                        <span className="code">{result.endLocation.split('(')[1].replace(')', '')}</span>
                                        <span className="city">{result.endLocation.split('(')[0]}</span>
                                        <span className="time">{result.endTime}</span>
                                    </div>
                                </div>

                                <div className="flight-details">
                                    <div className="detail-item">
                                        <span className="label">Time Zone</span>
                                        <span className="value">{result.timeZone}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ) : (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
