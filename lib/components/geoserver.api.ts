// http://47.102.42.66:8080/geoserver/rest/workspaces/tongshan/datastores/tongshanguandao/featuretypes/guandao.json
import { LatLngTuple } from 'leaflet'

const Authorization = `Basic ${btoa('admin:geoserver')}`

export async function getLayerBound(workspace: string, layer: string): Promise<LatLngTuple[]> {
  const resOrigin = await fetch(
    `/geoserver/rest/workspaces/${workspace}/datastores/${workspace}${layer}/featuretypes/${layer}.json`,
    {
      headers: {
        Authorization
      }
    }
  )
  const res = await resOrigin.json()
  const { minx, miny, maxx, maxy } = res.featureType.nativeBoundingBox
  return [
    [miny, minx],
    [maxy, maxx]
  ]
}

export async function getWmsLayerParam(workspace: string, layers: string[]) {
  const boundsList = await Promise.all(layers.map((item) => getLayerBound(workspace, item)))
  return boundsList.map((bounds, index) => ({ bounds, layers: `${workspace}:${layers[index]}` }))
}
