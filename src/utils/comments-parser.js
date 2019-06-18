/** Class for help transforming reducer from server to our comments model */
export default class CommentsParser {

  /**
   * Transform data from server to our comments model
   * @param {Object} data
   */
  constructor(data) {
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.id = data[`id`];
    this.rating = data[`rating`];
    this.user = {
      avatar: data[`user`][`avatar_url`],
      id: data[`user`][`id`],
      isPro: data[`user`][`is_pro`],
      name: data[`user`][`name`],
    };
  }

  /**
   * Method for parse comment
   * @param {Object} data
   * @return {Object}
   */
  static parseComment(data) {
    return new CommentsParser(data);
  }

  /**
   * Method for parse comments
   * @param {Array} data
   * @return {Array}
   */
  static parseComments(data) {
    return data.map(CommentsParser.parseComment);
  }
}
