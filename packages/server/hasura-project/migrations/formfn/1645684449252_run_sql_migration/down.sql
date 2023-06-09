-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TABLE top_creator_stats (
--   "creatorId" text,
--   "totalSales" bigint,
--   "collectorCount" bigint,
--   "nftCount" bigint
-- );
--
--
-- CREATE FUNCTION top_creator_stats_fn(afterTime timestamptz)
-- RETURNS SETOF top_creator_stats AS $$
--   SELECT "creatorId",
--     SUM(price)::bigint AS "totalSales",
--     COUNT(DISTINCT "toUserId") AS "collectorCount",
--     COUNT(DISTINCT mint) AS "nftCount"
--   FROM "NftTransaction"
--   WHERE type = 'Sold' AND
--     "timeCreated" >= afterTime
--   GROUP BY "creatorId"
--   ORDER BY "totalSales"
-- $$ LANGUAGE sql STABLE;
