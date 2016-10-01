const https = require('https')
const queryString = require('querystring')

const requestVersion = {
  'IGetPrices': 4,
  'IGetPriceHistory': 1,
  'IGetCurrencies': 1,
  'IGetSpecialItems': 1,
  'IGetMarketPrices': 1,
  'IGetUsers': 3,
  'IGetUserListings': 2
}

class APIHandler {
  constructor (key) {
    this.key = key
  }

  setKey (key) {
    this.key = key
  }

  makeRequest (endpoint, payload, cb) {
    payload.key = this.key
    let data

    https.get('https://backpack.tf/api/' + endpoint + '/v' + requestVersion[endpoint] + '?' + queryString.encode(payload), (res) => {
      res.on('data', (d) => {
        cb(d)
      }).on('error', (err) => {
        throw err
      })
    })
  }

  getPrices (appId, raw, since, cb) {
    cb(this.makeRequest('IGetPrices', {
      appid: appId,
      raw: raw,
      since: since
    })
  }

  getPriceHistory (appId, item, quality, tradable, craftable, priceIndex, cb) {
    this.makeRequest('IPriceHistory', {
      appid: appId,
      item: item,
      quality: quality,
      tradable: tradable,
      craftable: craftable,
      priceindex: priceIndex
    }, cb)
  }

  getCurrencies (appId, cb) {
    this.makeRequest('IGetCurrencies', {
      appid: appId
    }, cb)
  }

  getSpecialItems (appId, cb) {
    this.makeRequest('IGetSpecialItems', {
      appid: appId
    }, cb)
  }

  getMarketPrices (appId, cb) {
    this.makeRequest('IGetMarketPrices', {
      appid: appId
    }, cb)
  }

  getUsers (steamIds, cb) {
    this.makeRequest('IGetUsers', {
      steamids: steamIds
    }, cb)
  }

  getUserListings (appId, steamId, cb) {
    this.makeRequest('IGetUserListings', {
      appid: appId,
      steamid: steamId
    }, cb)
  }
}

module.exports = APIHandler
