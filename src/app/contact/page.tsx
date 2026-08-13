const WHATSAPP_CONTACTS = [
  { name: "Bu Atin", number: "6281219533455" },
  { name: "Alfa Salam Kost", number: "6282210434840" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="font-display text-3xl font-medium">Contact</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-medium">WhatsApp</h2>
        {WHATSAPP_CONTACTS.map((c) => (
          <a
            key={c.number}
            href={`https://wa.me/${c.number}`}
            className="text-teratai underline"
          >
            {c.name} — +{c.number}
          </a>
        ))}
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Address</h2>
        <p className="opacity-80">
          Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec.
          Cibinong, Kabupaten Bogor, Jawa Barat 16914
        </p>
      </section>
    </div>
  );
}
