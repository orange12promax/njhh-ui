import { isArray, random } from 'lodash'
import { LatLngLiteral } from 'leaflet'

function checkValidLat(lat: number) {
  return lat > 0 && lat < 60
}
function checkValidLng(lng: number) {
  return lng > 70 && lng < 140
}

export function checkValidLatLng(param: any): boolean {
  if (param) {
    if (isArray(param) && param.length === 2) {
      return checkValidLat(param[0]) && checkValidLng(param[1])
    }
    if (param.lat && param.lng) {
      return checkValidLat(param.lat) && checkValidLng(param.lng)
    }
  }
  return false
}

const defaultCenter: LatLngLiteral = { lat: 34.181162, lng: 117.169698 }
export function generateFakeData() {
  const latRange = 0.008
  const lngRange = 0.008
  const { lat, lng } = defaultCenter
  return {
    lat: random(lat - latRange, lat + latRange),
    lng: random(lng - lngRange, lng + lngRange)
  }
}
