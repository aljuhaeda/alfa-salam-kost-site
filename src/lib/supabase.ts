import { createClient } from "@supabase/supabase-js";

// Public site has no auth -- this is the anon key only, used exclusively to
// call rpc/public_rooms(). No cookies/session handling needed.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
