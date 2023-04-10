CREATE FUNCTION is_collector_fn(user_row "User")
RETURNS BOOLEAN AS $$
  SELECT COUNT(*) > 0 
  FROM "NftTransaction"
  WHERE type = 'Sold'
    AND 'toUserId' = user_row.id
$$ LANGUAGE sql STABLE;
