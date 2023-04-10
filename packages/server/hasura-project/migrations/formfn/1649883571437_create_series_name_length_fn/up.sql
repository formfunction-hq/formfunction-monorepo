CREATE OR REPLACE FUNCTION public.series_name_length_fn(series_row "Series")
 RETURNS int
 LANGUAGE sql
 STABLE
AS $function$
  SELECT LENGTH(name) 
  FROM "Series"
  WHERE id = series_row.id
$function$;
