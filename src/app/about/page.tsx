export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">About</h1>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">Location</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: address / area / nearby landmarks]</p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">Facilities</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: e.g. shared kitchen, wifi, laundry, parking]</p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">House rules</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: curfew, guest policy, quiet hours, etc.]</p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="font-medium text-black dark:text-zinc-50">About Alfa Salam Kost &amp; Rukost</h2>
        <p className="text-zinc-600 dark:text-zinc-400">[FILL IN: a few sentences on who runs it and what makes it worth choosing]</p>
      </section>
    </div>
  );
}
