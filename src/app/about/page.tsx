export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="font-display text-3xl font-medium">About</h1>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Location</h2>
        <p className="opacity-80">[FILL IN: address / area / nearby landmarks]</p>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Facilities</h2>
        <p className="opacity-80">[FILL IN: e.g. shared kitchen, wifi, laundry, parking]</p>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">House rules</h2>
        <p className="opacity-80">[FILL IN: curfew, guest policy, quiet hours, etc.]</p>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">About Alfa Salam Kost &amp; Rukost</h2>
        <p className="opacity-80">[FILL IN: a few sentences on who runs it and what makes it worth choosing]</p>
      </section>
    </div>
  );
}
