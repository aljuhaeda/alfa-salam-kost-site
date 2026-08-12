export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Contact</h1>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">WhatsApp</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          [FILL IN: WhatsApp number, e.g. 6281234567890 — once set, link to
          https://wa.me/&#123;number&#125;]
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">Address</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: street address]</p>
      </section>
    </div>
  );
}
