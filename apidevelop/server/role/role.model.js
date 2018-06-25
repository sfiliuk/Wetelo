const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Role Schema
 */
const RoleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  supervisor: {
    type: Boolean,
    default: false
  },
  permissions: {
    type: Array
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
RoleSchema.method({
});

/**
 * Statics
 */
RoleSchema.statics = {
  /**
   * Get Role
   * @param {ObjectId} id - The objectId of Role.
   * @returns {Promise<Role, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((role) => {
        if (role) {
          return role;
        }
        const err = new APIError('No such role exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List roles in descending order of 'status' true.
   * @param {number} skip - Number of roles to be skipped.
   * @param {number} limit - Limit number of roles to be returned.
   * @returns {Promise<Role[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ status: true })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Role
 */
module.exports = mongoose.model('Role', RoleSchema);
