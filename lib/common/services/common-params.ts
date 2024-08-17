import { Database } from "@/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export type CommonParams = {
  db: SupabaseClient<Database>;
};
