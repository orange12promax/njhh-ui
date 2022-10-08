import { LatLngTuple } from 'leaflet'
import { GeoserverConfigAuth, GeoserverConfigLayerItem } from '../njhh-wms-map'

export async function getLayerBound(
  workspace: string,
  layer: string,
  auth: GeoserverConfigAuth
): Promise<LatLngTuple[]> {
  const Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`
  const {
    layer: { resource }
  } = await fetch(`${auth.url}/geoserver/rest/layers/${workspace}:${layer}.json`, {
    headers: {
      Authorization
    }
  }).then((res) => res.json())
  const resOrigin = await fetch(resource.href, {
    headers: {
      Authorization
    }
  }).then((res) => res.json())
  const { minx, miny, maxx, maxy } = resOrigin[resource['@class']].nativeBoundingBox
  return [
    [miny, minx],
    [maxy, maxx]
  ]
}

export async function getWmsLayerParam(layerInfo: GeoserverConfigLayerItem) {
  // const bounds = await getLayerBound(layerInfo.workspace, layerInfo.name, layerInfo.server)
  return {
    url: `${layerInfo.server.url}/geoserver/${layerInfo.workspace}/wms`,
    // bounds,
    layers: `${layerInfo.workspace}:${layerInfo.name}`
  }
}
