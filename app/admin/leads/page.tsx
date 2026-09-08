import { AdminNav } from "@/components/AdminNav";
import { getLeads } from "@/lib/blob";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <>
      <AdminNav current="leads" />

      <div className="flex flex-col gap-6 px-8 py-10 md:px-16">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-2xl">Solicitudes de contacto</h1>
          <p className="text-sm text-ink/65">
            Lo que llega por el formulario del sitio. Cuando el flujo de WhatsApp/n8n esté listo,
            estas solicitudes se calificarán ahí — por ahora quedan aquí para no perder ninguna.
          </p>
        </div>

        {leads.length === 0 ? (
          <p className="text-sm text-ink/45">Todavía no hay solicitudes.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="flex flex-col gap-2 border border-taupe p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-lg">{lead.name}</span>
                  <span className="text-[11px] text-ink/45">{formatDate(lead.createdAt)}</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink/65">
                  <span>{lead.email}</span>
                  {lead.eventDate && <span>Fecha: {lead.eventDate}</span>}
                  {lead.venue && <span>Venue: {lead.venue}</span>}
                  {lead.budget && <span>Presupuesto: {lead.budget}</span>}
                </div>
                {lead.message && <p className="mt-1 text-sm text-ink/80">{lead.message}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
