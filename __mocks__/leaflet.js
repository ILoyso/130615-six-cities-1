const leaflet = jest.genMockFromModule(`leaflet`);

const marker = {
  getLatLng: () => {
    return {lat: 0, lng: 0};
  },
  addTo: () => {
    return {};
  }
};

leaflet.setView = () => {};
leaflet.map = () => leaflet;
leaflet.marker = () => marker;

export default leaflet;
