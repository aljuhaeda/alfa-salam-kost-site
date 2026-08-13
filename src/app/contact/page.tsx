export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="font-display text-3xl font-medium">Contact</h1>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium">WhatsApp</h2>
        <p className="opacity-80">
          [FILL IN: WhatsApp number, e.g. 6281234567890 — once set, link to
          https://wa.me/&#123;number&#125;]
        </p>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Address</h2>
        <p className="opacity-80">[FILL IN: street address]</p>
      </section>
    </div>
  );
}
