export default function ContactPage() {
  const whatsappNumber = "[FILL IN: e.g. 6281234567890]";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Contact</h1>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">WhatsApp</h2>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          className="text-zinc-600 underline dark:text-zinc-400"
        >
          {whatsappNumber}
        </a>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">Address</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: street address]</p>
      </section>
    </div>
  );
}
