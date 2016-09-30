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

  makeRequest (endpoint, payload) {
    payload.key = this.key
    let data

    https.get('https://backpack.tf/api/' + endpoint + '/v' + requestVersion[endpoint] + '?' + queryString.encode(payload), (res) => {
      res.on('data', (d) => {
        data = d
      }).on('error', (err) => {
        throw err
      })
    })

    return data
  }

  getPrices (appId, raw, since) {
    return this.makeRequest('IGetPrices', {
      appid: appId,
      raw: raw,
      since: since
    })
  }

  getPriceHistory (appId, item, quality, tradable, craftable, priceIndex) {
    return this.makeRequest('IPriceHistory', {
      appid: appId,
      item: item,
      quality: quality,
      tradable: tradable,
      craftable: craftable,
      priceindex: priceIndex
    })
  }

  getCurrencies (appId) {
    return this.makeRequest('IGetCurrencies', {
      appid: appId
    })
  }

  getSpecialItems (appId) {
    return this.makeRequest('IGetSpecialItems', {
      appid: appId
    })
  }

  getMarketPrices (appId) {
    return this.makeRequest('IGetMarketPrices', {
      appid: appId
    })
  }

  getUsers (steamIds) {
    return this.makeRequest('IGetUsers', {
      steamids: steamIds
    })
  }

  getUserListings (appId, steamId) {
    return this.makeRequest('IGetUserListings', {
      appid: appId,
      steamid: steamId
    })
  }
}

module.exports = {
  APIHandler: APIHandler
}
