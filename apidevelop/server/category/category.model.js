const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    ref: 'Category'
  },
  order: {
    type: Number,
    required: true
  },
  pictures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture'
  }]
});
  /**
   * Add your
   * - pre-save hooks
   * - validations
   * - virtuals
   */

  /**
   * Methods
   */
CategorySchema.method({
});
  /**
   * Statics
   */
CategorySchema.statics = {
    /**
     * Get category
     * @param {ObjectId} id - The objectId of category.
     * @returns {Promise<Product, APIError>}
     */
  get(id) {
    return this.findById(id)
        .exec()
        .then((category) => {
          if (category) {
            return category;
          }
          const err = new APIError('No such category exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
  },
      /**
     * List categories in descending order of 'order' output.
     * @param {number} skip - Number of categories to be skipped.
     * @param {number} limit - Limit number of categories to be returned.
     * @returns {Promise<Category[]>}
     */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ status: true })
        .sort({ order: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
  }
};

/**
 * @typedef Category
 */
module.exports = mongoose.model('Category', CategorySchema);
