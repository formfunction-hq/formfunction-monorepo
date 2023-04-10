import TimezoneObject from "types/TimezoneObject";

/**
 * Using Calendly's labels.
 *
 * Also based on https://github.com/filipdanic/compact-timezone-list/blob/master/index.js.
 */
const TIMEZONES: Array<TimezoneObject> = [
  // US/Canada
  {
    group: "US/Canada",
    label: "Pacific Time - US & Canada",
    tzCode: "America/Los_Angeles",
  },
  {
    group: "US/Canada",
    label: "Mountain Time - US & Canada",
    tzCode: "America/Denver",
  },
  {
    group: "US/Canada",
    label: "Central Time - US & Canada",
    tzCode: "America/Chicago",
  },
  {
    group: "US/Canada",
    label: "Eastern Time - US & Canada",
    tzCode: "America/New_York",
  },
  {
    group: "US/Canada",
    label: "Yukon Time",
    tzCode: "America/Whitehorse",
  },
  {
    group: "US/Canada",
    label: "Alaska Time",
    tzCode: "America/Anchorage",
  },
  {
    group: "US/Canada",
    label: "Arizona Time",
    tzCode: "America/Phoenix",
  },
  {
    group: "US/Canada",
    label: "Newfoundland Time",
    tzCode: "America/St_Johns",
  },
  {
    group: "US/Canada",
    label: "Hawaii Time",
    tzCode: "Pacific/Honolulu",
  },

  // America
  {
    group: "America",
    label: "America/Adak",
    tzCode: "America/Adak",
  },
  {
    group: "America",
    label: "Buenos Aires Time",
    tzCode: "America/Argentina/Buenos_Aires",
  },
  {
    group: "America",
    label: "Asuncion Time",
    tzCode: "America/Asuncion",
  },
  {
    group: "America",
    label: "Bogota, Jamaica, Lima Time",
    tzCode: "America/Bogota",
  },
  {
    group: "America",
    label: "America/Campo Grande",
    tzCode: "America/Campo_Grande",
  },
  {
    group: "America",
    label: "Caracas Time",
    tzCode: "America/Caracas",
  },
  {
    group: "America",
    label: "America/Godthab",
    tzCode: "America/Godthab",
  },
  {
    group: "America",
    label: "Atlantic Time",
    tzCode: "America/Halifax",
  },
  {
    group: "America",
    label: "Saskatchewan, Guatemala, Costa Rica Time",
    tzCode: "America/Guatemala",
  },
  {
    group: "America",
    label: "America/Havana",
    tzCode: "America/Havana",
  },
  {
    group: "America",
    label: "America/Mazatlan",
    tzCode: "America/Mazatlan",
  },
  {
    group: "America",
    label: "Mexico City Time",
    tzCode: "America/Mexico_City",
  },
  {
    group: "America",
    label: "Montevideo Time",
    tzCode: "America/Montevideo",
  },
  {
    group: "America",
    label: "America/Miquelon",
    tzCode: "America/Miquelon",
  },
  {
    group: "America",
    label: "America/Noronha",
    tzCode: "America/Noronha",
  },
  {
    group: "America",
    label: "Santiago Time",
    tzCode: "America/Santiago",
  },
  {
    group: "America",
    label: "America/Santa Isabel",
    tzCode: "America/Santa_Isabel",
  },
  {
    group: "America",
    // Atlantic Time switches to Atlantic Daylight Time.
    label: "Atlantic Standard Time",
    tzCode: "America/Antigua",
  },
  {
    group: "America",
    label: "Brasilia Time",
    tzCode: "America/Sao_Paulo",
  },

  // Africa
  {
    group: "Africa",
    label: "Africa/Cairo",
    tzCode: "Africa/Cairo",
  },
  {
    group: "Africa",
    label: "Central Africa Time",
    tzCode: "Africa/Maputo",
  },
  {
    group: "Africa",
    label: "West Africa Time",
    tzCode: "Africa/Lagos",
  },
  {
    group: "Africa",
    label: "Africa/Windhoek",
    tzCode: "Africa/Windhoek",
  },

  // Asia
  {
    group: "Asia",
    label: "Jordan Time",
    tzCode: "Asia/Amman",
  },
  {
    group: "Asia",
    label: "Baghdad, East Africa Time",
    tzCode: "Asia/Baghdad",
  },
  {
    group: "Asia",
    label: "Asia/Baku",
    tzCode: "Asia/Baku",
  },
  {
    group: "Asia",
    label: "Lebanon Time",
    tzCode: "Asia/Beirut",
  },
  {
    group: "Asia",
    label: "Syria Time",
    tzCode: "Asia/Damascus",
  },
  {
    group: "Asia",
    label: "Asia/Dhaka",
    tzCode: "Asia/Dhaka",
  },
  {
    group: "Asia",
    label: "Dubai Time",
    tzCode: "Asia/Dubai",
  },
  {
    group: "Asia",
    label: "Asia/Gaza",
    tzCode: "Asia/Gaza",
  },
  {
    group: "Asia",
    label: "Asia/Irkutsk",
    tzCode: "Asia/Irkutsk",
  },
  {
    group: "Asia",
    label: "Indochina Time",
    tzCode: "Asia/Bangkok",
  },
  {
    group: "Asia",
    label: "Israel Time",
    tzCode: "Asia/Jerusalem",
  },
  {
    group: "Asia",
    label: "Kabul Time",
    tzCode: "Asia/Kabul",
  },
  {
    group: "Asia",
    label: "Pacific/Majuro",
    tzCode: "Pacific/Majuro",
  },
  {
    group: "Asia",
    label: "Pakistan, Maldives Time",
    tzCode: "Indian/Maldives",
  },
  {
    group: "Asia",
    label: "Kathmandu Time",
    tzCode: "Asia/Kathmandu",
  },
  {
    group: "Asia",
    label: "India, Sri Lanka Time",
    tzCode: "Asia/Colombo",
  },
  {
    group: "Asia",
    label: "Krasnoyarsk Time",
    tzCode: "Asia/Krasnoyarsk",
  },
  {
    group: "Asia",
    label: "Asia/Omsk",
    tzCode: "Asia/Omsk",
  },
  {
    group: "Asia",
    label: "Asia/Rangoon",
    tzCode: "Asia/Rangoon",
  },
  {
    group: "Asia",
    label: "China, Singapore, Perth",
    tzCode: "Asia/Singapore",
  },
  {
    group: "Asia",
    label: "Tehran Time",
    tzCode: "Asia/Tehran",
  },
  {
    group: "Asia",
    label: "Japan, Korea Time",
    tzCode: "Asia/Tokyo",
  },
  {
    group: "Asia",
    label: "Asia/Vladivostok",
    tzCode: "Asia/Vladivostok",
  },
  {
    group: "Asia",
    label: "Asia/Yakutsk",
    tzCode: "Asia/Yakutsk",
  },
  {
    group: "Asia",
    label: "Yekaterinburg Time",
    tzCode: "Asia/Yekaterinburg",
  },
  {
    group: "Asia",
    label: "Asia/Yerevan",
    tzCode: "Asia/Yerevan",
  },

  // Atlantic
  {
    group: "Atlantic",
    label: "Azores Time",
    tzCode: "Atlantic/Azores",
  },
  {
    group: "Atlantic",
    label: "Cape Verde Time",
    tzCode: "Atlantic/Cape_Verde",
  },

  // Australia
  {
    group: "Australia",
    label: "Adelaide Time",
    tzCode: "Australia/Adelaide",
  },
  {
    group: "Australia",
    label: "Brisbane Time",
    tzCode: "Australia/Brisbane",
  },
  {
    group: "Australia",
    label: "Australia/Darwin",
    tzCode: "Australia/Darwin",
  },
  {
    group: "Australia",
    label: "Australia/Eucla",
    tzCode: "Australia/Eucla",
  },
  {
    group: "Australia",
    label: "Australia/Lord Howe",
    tzCode: "Australia/Lord_Howe",
  },
  {
    group: "Australia",
    label: "Australia/Perth",
    tzCode: "Australia/Perth",
  },
  {
    group: "Australia",
    label: "Sydney, Melbourne Time",
    tzCode: "Australia/Sydney",
  },

  // UTC
  {
    group: "UTC",
    label: "UTC Time",
    tzCode: "Etc/UTC",
  },

  // Europe
  {
    group: "Europe",
    label: "Central European Time",
    tzCode: "Europe/Belgrade",
  },
  {
    group: "Europe",
    label: "Eastern European Time",
    tzCode: "Europe/Sofia",
  },
  {
    group: "Europe",
    label: "UK, Ireland, Lisbon Time",
    tzCode: "Europe/Lisbon",
  },
  {
    group: "Europe",
    label: "Minsk Time",
    tzCode: "Europe/Minsk",
  },
  {
    group: "Europe",
    label: "Moscow Time",
    tzCode: "Europe/Moscow",
  },
  {
    group: "Europe",
    label: "Turkey Time",
    tzCode: "Europe/Istanbul",
  },

  // Pacific
  {
    group: "Pacific",
    label: "Pacific/Apia",
    tzCode: "Pacific/Apia",
  },
  {
    group: "Pacific",
    label: "Auckland Time",
    tzCode: "Pacific/Auckland",
  },
  {
    group: "Pacific",
    label: "Pacific/Chatham",
    tzCode: "Pacific/Chatham",
  },
  {
    group: "Pacific",
    label: "Pacific/Easter",
    tzCode: "Pacific/Easter",
  },
  {
    group: "Pacific",
    label: "Pacific/Fiji",
    tzCode: "Pacific/Fiji",
  },
  {
    group: "Pacific",
    label: "Pacific/Gambier",
    tzCode: "Pacific/Gambier",
  },
  {
    group: "Pacific",
    label: "Pacific/Kiritimati",
    tzCode: "Pacific/Kiritimati",
  },
  {
    group: "Pacific",
    label: "Pacific/Majuro",
    tzCode: "Pacific/Majuro",
  },
  {
    group: "Pacific",
    label: "Pacific/Marquesas",
    tzCode: "Pacific/Marquesas",
  },
  {
    group: "Pacific",
    label: "Pacific/Norfolk",
    tzCode: "Pacific/Norfolk",
  },
  {
    group: "Pacific",
    label: "Pacific/Noumea",
    tzCode: "Pacific/Noumea",
  },
  {
    group: "Pacific",
    label: "Pacific/Pago Pago",
    tzCode: "Pacific/Pago_Pago",
  },
  {
    group: "Pacific",
    label: "Pacific/Pitcairn",
    tzCode: "Pacific/Pitcairn",
  },
  {
    group: "Pacific",
    label: "Pacific/Tarawa",
    tzCode: "Pacific/Tarawa",
  },
  {
    group: "Pacific",
    label: "Pacific/Tongatapu",
    tzCode: "Pacific/Tongatapu",
  },
];

export default TIMEZONES;
