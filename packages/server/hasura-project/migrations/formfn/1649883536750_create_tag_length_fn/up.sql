CREATE OR REPLACE FUNCTION public.tag_length_fn(tag_row "Tag")
 RETURNS int
 LANGUAGE sql
 STABLE
AS $function$
  SELECT LENGTH(value) 
  FROM "Tag"
  WHERE id = tag_row.id
$function$;
