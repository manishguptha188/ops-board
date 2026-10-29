
import { useState } from "react";
import incidentsService from "../services/incidents";

const IncidentForm = ({ onIncidentCreated }) => {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [status, setStatus] = useState("open");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newIncident = {
      title: title.trim(),
      severity,
      status,
      timestamp: new Date().toISOString(),
    };

    if (!newIncident.title) return;

    setSubmitting(true);
    setError(null);

    incidentsService
      .create(newIncident)
      .then(() => {
        onIncidentCreated();
        setTitle("");
        setSeverity("medium");
        setStatus("open");
      })
      .catch(() => {
        setError("Could not create the incident. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="text-lg font-semibold text-white">
        Create incident
      </h2>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Incident title
        </label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. API latency spike"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Severity
        </label>
        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
        >
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Status
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
        >
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Creating incident..." : "Create incident"}
      </button>
    </form>
  );
};

export default IncidentForm;
