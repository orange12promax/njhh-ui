import L from 'leaflet'

L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map)
    map.on('click', this.getFeatureInfo, this)
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map)
    map.off('click', this.getFeatureInfo, this)
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    const url = this.getFeatureInfoUrl(evt.latlng)
    const showResults = L.Util.bind(this.showGetFeatureInfo, this)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const err = typeof data === 'object' ? null : data
        showResults(err, evt.latlng, JSON.stringify(data))
      })
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    const point = this._map.latLngToContainerPoint(latlng, this._map.getZoom())
    const size = this._map.getSize()
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: 'application/json'
    }

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y

    console.log(L.Util.getParamString(params, this._url, true))
    return this._url + L.Util.getParamString(params, this._url, true)
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err)
      return
    } // do nothing if there's an error

    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800 }).setLatLng(latlng).setContent(content).openOn(this._map)
  }
})

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options)
}
