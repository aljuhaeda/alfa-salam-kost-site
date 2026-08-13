export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="font-display text-3xl font-medium">About</h1>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Location</h2>
        <p className="opacity-80">
          Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8, Tengah, Kec.
          Cibinong, Kabupaten Bogor, Jawa Barat — a quiet residential street
          just minutes from GOR Pakansari and Cibinong&apos;s main
          shopping/dining strip.
        </p>
        <a
          href="https://maps.app.goo.gl/MQBGqnYfbb9m3Ei87"
          className="text-teratai underline"
        >
          View on Google Maps
        </a>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">Facilities</h2>
        <ul className="list-disc pl-5 opacity-80">
          <li>Bed, drawer, AC, water heater, and (in most rooms) a table</li>
          <li>Private indoor bathroom in every room</li>
          <li>CCTV coverage around the whole kost</li>
          <li>Single gated entry — each tenant has their own key</li>
          <li>Free wifi</li>
          <li>Front parking lot</li>
          <li>Two shared kitchens</li>
          <li>Dedicated drying area (jemuran) for laundry</li>
        </ul>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">House rules</h2>
        <p className="opacity-80">
          Alfa Salam Kost is women-only, so male guests aren&apos;t allowed
          past the entrance or in the rooms. Beyond that: be a good
          neighbor, keep shared spaces clean, and no funny business.
        </p>
      </section>

      <section className="string-divider flex flex-col gap-1 pt-6">
        <h2 className="font-medium">About Alfa Salam Kost &amp; Rukost</h2>
        <p className="opacity-80">
          A women-only kost in a gated Cibinong residential complex, built
          for tenants who want their own locked room, their own bathroom,
          and a landlady who actually answers the phone. Every room comes
          fully equipped — bed, AC, water heater, private bath — so you can
          move in with a suitcase, not a truck. CCTV and single-entry
          access keep the place secure, and being minutes from GOR
          Pakansari and Cibinong&apos;s main strip means errands, gym, and
          food are never far. Want the whole house instead? Alfa Salam
          Rukost next door rents as a single unit, mixed-occupancy, for
          families or groups.
        </p>
      </section>
    </div>
  );
}
