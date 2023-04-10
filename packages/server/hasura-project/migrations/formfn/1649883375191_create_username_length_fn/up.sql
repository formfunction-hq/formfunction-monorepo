CREATE OR REPLACE FUNCTION public.username_length_fn(user_row "User")
 RETURNS int
 LANGUAGE sql
 STABLE
AS $function$
  SELECT LENGTH(username) 
  FROM "User"
  WHERE id = user_row.id
$function$;
