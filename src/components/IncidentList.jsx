
import { useState, useEffect } from "react";
import incidentsService from "../services/incidents";

const severityStyles = {
  critical: "border-red-500/30 bg-red-500/10 text-red-300",
  high: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

const statusStyles = {
  open: "bg-red-500/10 text-red-300",
  investigating: "bg-blue-500/10 text-blue-300",
  resolved: "bg-emerald-500/10 text-emerald-300",
  closed: "bg-slate-700 text-slate-300",
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    incidentsService
      .getAll()
      .then((data) => {
        setIncidents(data);
      })
      .catch(() => {
        setError("Could not load incidents from the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-slate-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />
        <p>Loading incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300"
      >
        <h2 className="font-semibold">Unable to load incidents</h2>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Incidents
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Monitor and track operational issues.
          </p>
        </div>

        <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300">
          {incidents.length} total
        </span>
      </div>

      {incidents.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center">
          <p className="font-medium text-slate-300">
            No incidents found
          </p>
          <p className="mt-2 text-sm text-slate-500">
            New incidents will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {incidents.map((incident) => {
            const severity = String(
              incident.severity || "unknown"
            ).toLowerCase();

            const status = String(
              incident.status || "unknown"
            ).toLowerCase();

            const severityClass =
              severityStyles[severity] ||
              "border-slate-700 bg-slate-800 text-slate-300";

            const statusClass =
              statusStyles[status] ||
              "bg-slate-800 text-slate-300";

            return (
              <article
                key={incident.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition duration-200 hover:border-slate-600 hover:bg-slate-900/80"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words font-semibold text-slate-100">
                      {incident.title || "Untitled incident"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Reported{" "}
                      {formatTimestamp(incident.timestamp)}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${severityClass}`}
                  >
                    {severity}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                  <span className="text-sm text-slate-400">
                    Current status
                  </span>

                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default IncidentList;
