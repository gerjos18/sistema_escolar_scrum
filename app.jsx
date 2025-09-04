
const { useMemo, useState } = React;

function Badge({ children, kind = "neutral" }) {
  const classes = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warn: "bg-amber-100 text-amber-800 border-amber-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200"
  }[kind];
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded border ${classes}`}>
      {children}
    </span>
  );
}

function Section({ title, children, right = null }) {
  return (
    <section className="bg-white rounded-2xl shadow border border-slate-200 mb-6">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function ProductBacklog({ items }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      [it.id, it.title, it.priority, it.status].join(" ").toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <Section
      title="Product Backlog"
      right={
        <input
          placeholder="Buscar…"
          className="border rounded px-3 py-1 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="p-2">ID</th>
              <th className="p-2">Historia (User Story)</th>
              <th className="p-2">Prioridad</th>
              <th className="p-2">Pts</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="p-2 font-mono">{it.id}</td>
                <td className="p-2">{it.title}</td>
                <td className="p-2">
                  <Badge kind={it.priority === "Alta" ? "danger" : it.priority === "Media" ? "warn" : "neutral"}>
                    {it.priority}
                  </Badge>
                </td>
                <td className="p-2">{it.points}</td>
                <td className="p-2">
                  <Badge kind={it.status === "Done" ? "success" : it.status === "En progreso" ? "info" : "neutral"}>
                    {it.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-3">Tip: Filtra por id, prioridad, estado o palabras clave.</p>
    </Section>
  );
}

function SprintPlanning({ sprints, backlog }) {
  const lookup = useMemo(() => Object.fromEntries(backlog.map(b => [b.id, b])), [backlog]);
  return (
    <Section title="Sprint Planning">
      <div className="grid md:grid-cols-2 gap-4">
        {sprints.map(sp => {
          const totalPoints = sp.items.reduce((acc, id) => acc + (lookup[id]?.points || 0), 0);
          return (
            <div key={sp.id} className="border rounded-xl p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{sp.id}</h3>
                <Badge kind="info">{sp.start} → {sp.end}</Badge>
              </div>
              <p className="text-slate-700 mb-2"><span className="font-semibold">Objetivo:</span> {sp.goal}</p>
              <p className="text-slate-700 mb-2">
                <span className="font-semibold">Capacidad:</span> {sp.capacity} pts ·
                <span className="ml-2 font-semibold">Compromiso:</span> {totalPoints} pts
                {" "}{totalPoints > sp.capacity ? <Badge kind="danger">Sobre-carga</Badge> : <Badge kind="success">OK</Badge>}
              </p>
              <ul className="list-disc pl-5 text-slate-700">
                {sp.items.map(id => (
                  <li key={id}>
                    <span className="font-mono">{id}</span> — {lookup[id]?.title || "Historia no encontrada"} ({lookup[id]?.points ?? "?"} pts)
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <p className="text-slate-700 font-semibold">Definition of Done</p>
                <ul className="list-disc pl-5 text-slate-700">
                  {sp.definitionOfDone.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Ceremonies({ items }) {
  return (
    <Section title="Ceremonias & Calendario">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((c, i) => (
          <div key={i} className="border rounded-xl p-3 bg-white">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-800">{c.type}</span>
              <Badge kind="neutral">{c.sprint}</Badge>
            </div>
            <p className="text-slate-700"><span className="font-semibold">Fecha:</span> {c.date}</p>
            <p className="text-slate-700"><span className="font-semibold">Hora:</span> {c.time}</p>
            {c.repeat && <p className="text-xs text-slate-500 mt-1">{c.repeat}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function BacklogCards({ items }) {
  const [openId, setOpenId] = useState(null);
  return (
    <Section title="Fichas de Backlog (User Stories)">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it => (
          <div key={it.id} className="border rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-800">{it.id}</div>
              <Badge kind={it.priority === "Alta" ? "danger" : it.priority === "Media" ? "warn" : "neutral"}>
                {it.priority}
              </Badge>
            </div>
            <p className="mt-2 text-slate-700">{it.title}</p>
            <div className="mt-2 text-sm text-slate-600">Puntos: {it.points} · Estado: {it.status}</div>

            <button
              className="mt-3 text-sm px-3 py-1 rounded bg-slate-900 text-white hover:bg-slate-700"
              onClick={() => setOpenId(openId === it.id ? null : it.id)}
            >
              {openId === it.id ? "Ocultar criterios" : "Ver criterios de aceptación"}
            </button>

            {openId === it.id && (
              <ul className="list-disc pl-5 mt-3 text-slate-700">
                {it.acceptance.map((a, idx) => <li key={idx}>{a}</li>)}
              </ul>
            )}
            {it.notes && <p className="mt-3 text-xs text-slate-500">{it.notes}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function App() {
  const data = window.appData;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Section title="Resumen">
          <ul className="text-slate-700 list-disc pl-5">
            <li><strong>Historias:</strong> {data.productBacklog.length}</li>
            <li><strong>Sprints planificados:</strong> {data.sprints.length}</li>
            <li><strong>Ceremonias:</strong> {data.ceremonies.length}</li>
          </ul>
        </Section>
        <Section title="Cómo usar">
          <ol className="text-slate-700 list-decimal pl-5">
            <li>Edita <code>data.js</code> con tu backlog real.</li>
            <li>Abre <code>index.html</code> en el navegador o publícalo con GitHub Pages.</li>
            <li>Entrega el enlace y captura de pantalla del dashboard.</li>
          </ol>
        </Section>
      </div>

      <ProductBacklog items={window.appData.productBacklog} />
      <BacklogCards items={window.appData.productBacklog} />
      <SprintPlanning sprints={window.appData.sprints} backlog={window.appData.productBacklog} />
      <Ceremonies items={window.appData.ceremonies} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
