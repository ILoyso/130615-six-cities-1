/** Class for help transforming reducer from server to our places model */
export default class PlacesParser {

  /**
   * Transform data from server to our places model
   * @param {Object} data
   */
  constructor(data) {
    this.bedrooms = data[`bedrooms`];
    this.city = data[`city`][`name`];
    this.coordinates = [
      data[`location`][`latitude`],
      data[`location`][`longitude`]
    ];
    this.description = data[`description`];
    this.goods = data[`goods`];
    this.host = {
      avatar: data[`host`][`avatar_url`],
      id: data[`host`][`id`],
      isPro: data[`host`][`is_pro`],
      name: data[`host`][`name`],
    };
    this.id = data[`id`];
    this.images = data[`images`];
    this.img = data[`preview_image`];
    this.isFavorite = data[`is_favorite`];
    this.isPremium = data[`is_premium`];
    this.maxAdults = data[`max_adults`];
    this.price = data[`price`];
    this.rating = data[`rating`];
    this.title = data[`title`];
    this.type = data[`type`];
    this.zoom = data[`location`][`zoom`];
  }

  /**
   * Method for parse place
   * @param {Object} data
   * @return {Object}
   */
  static parsePlace(data) {
    return new PlacesParser(data);
  }

  /**
   * Method for parse places
   * @param {Array} data
   * @return {Array}
   */
  static parsePlaces(data) {
    return data.map(PlacesParser.parsePlace);
  }
}
