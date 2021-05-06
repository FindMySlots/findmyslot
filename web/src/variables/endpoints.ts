const END_POINTS = {
  State: {
    url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    key: 'State',
  },
  District: {
    url: 'https://cdn-api.co-vin.in/api/v2/admin/location/districts',
    key: 'District',
  },
  Calendar: {
    url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=',
    key: 'Calendar',
  },
  Pin: {
    url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=',
    key: 'Pin',
  },
};

export default END_POINTS;
