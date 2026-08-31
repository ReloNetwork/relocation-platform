# Active database migrations

This directory contains only migrations required by the redesigned public launch.

The production project existed before Supabase CLI migration tracking was introduced. Historical SQL files therefore live in `supabase/legacy-migrations` and must not be passed to `supabase db push`.

Before applying a migration:

1. Link to the intended Supabase project.
2. Run `supabase migration list`.
3. Run `supabase db push --dry-run`.
4. Confirm that the dry run lists only the expected active migrations.
5. Apply with `supabase db push` and verify the resulting tables and access controls.

Every active filename must begin with a unique 14-digit UTC timestamp.
