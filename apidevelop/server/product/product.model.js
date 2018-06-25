const Promise = require('bluebird');
const mongoose = require('mongoose');
// const Category = require('../category/category.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  pictures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture'
  }],
  code: {
    type: Number,
    required: true,
  },
  price: {
    value: { type: Number, trim: true },
    currency: { type: String,
      uppercase: true,
      required: true,
      trim: true,
      default: 'USD' }
  },
  availability: {
    type: Boolean,
    default: true
  },
  dimensions: {
    length: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    height: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    width: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    netto: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    brutto: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    volume: { type: Number,
      unit: {
        type: String,
        required: true
      }
    }
  },
  promotion: {
    type: Boolean,
    default: false
  },
  discount: Number,

  order: {
    type: Number,
    required: true
  }
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
ProductSchema.method({
});

/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get product
   * @param {ObjectId} id - The objectId of product.
   * @returns {Promise<Product, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
        }
        const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List products in descending order of 'order' output.
   * @param {number} skip - Number of products to be skipped.
   * @param {number} limit - Limit number of products to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ availability: true })
      .sort({ order: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Product
 */
module.exports = mongoose.model('Product', ProductSchema);
