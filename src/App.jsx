import incidentsService from "./services/incidents";

import IncidentList from "./components/IncidentList";

const App = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-10 border-b border-slate-800 pb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Operations / Monitoring
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Ops Board
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor incidents and track operational health.
          </p>
        </header>

        <IncidentList />
      </div>
    </main>
  );
};

export default App;
