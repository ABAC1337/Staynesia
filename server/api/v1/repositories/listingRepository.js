const DB = require("../../../models/schema");

const createListing = async (data) => {
  return await DB.Listing.create(data);
};

const findById = async (data) => {
  return await DB.Listing.findById(data);
};

const findListing = async (queryObj) => {
  const { filterObj = {}, optionsObj = {} } = queryObj;
  const { populate, select, sort, skip, limit } = optionsObj;
  let query = DB.Listing.find(filterObj);
  if (populate)
    if (Array.isArray(populate)) {
      optionsObj.populate.forEach((pop) => {
        query = query.populate(pop);
      });
    } else query = query.populate(populate);
  if (select) query = query.select(select);
  if (sort) query = query.sort(sort);
  if (skip) query = query.skip(skip);
  if (limit) query = query.limit(limit);
  return await query;
};

const updateListing = async (id, data) => {
  return await DB.Listing.findByIdAndUpdate(id, data, { runValidation: true });
};

const deleteListing = async (id) => {
  return await DB.Listing.findByIdAndDelete(id);
};

module.exports = {
  createListing,
  findListing,
  updateListing,
  deleteListing,
  findById,
};
