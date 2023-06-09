-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TABLE top_collector_stats (
--   "collectorId" text,
--   "totalPaid" bigint,
--   "creatorsSupportedCount" bigint,
--   "nftCount" bigint
-- );
--
--
-- CREATE FUNCTION top_collector_stats_fn(afterTime timestamptz)
-- RETURNS SETOF top_collector_stats AS $$
--   SELECT "toUserId" AS "collectorId",
--     SUM(price)::bigint AS "totalPaid",
--     COUNT(DISTINCT "fromUserId") AS "creatorsSupportedCount",
--     COUNT(DISTINCT mint) AS "nftCount"
--   FROM "NftTransaction"
--   WHERE type = 'Sold' AND
--     "timeCreated" >= afterTime
--   GROUP BY "toUserId"
--   ORDER BY "totalPaid" DESC
-- $$ LANGUAGE sql STABLE;
