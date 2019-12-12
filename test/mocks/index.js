let mocks = {};

mocks.req = {
  params: {
    id: 1
  }
};

mocks.res = {
  status: function(a) {
    return mocks.res;
  },
  json: function(a) {
    return mocks.res;
  }
};

module.exports = mocks;
