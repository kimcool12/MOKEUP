import FlightSearch from './components/FlightSearch';

export default function Home() {
  return (
    <main className="main-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="title">SkyTrack <span className="highlight">Premium</span></h1>
          <p className="subtitle">Real-time flight status at your fingertips</p>
        </header>
        <FlightSearch />
      </div>
    </main>
  );
}
