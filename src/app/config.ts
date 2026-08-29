// Shared constants for the public site. Kept in one place so the same
// owner-supplied link / business string isn't re-pasted per page.
export const MAPS_URL = "https://maps.app.goo.gl/MQBGqnYfbb9m3Ei87";

// The whole-house rental. Rows with this property_name follow a different
// business rule (mixed-occupancy) and render in their own section.
export const RUKOST_PROPERTY = "Alfa Salam Rukost";

export const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
