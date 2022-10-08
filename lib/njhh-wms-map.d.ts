export interface GeoserverConfigAuth {
  url: string
  username: string
  password: string
}
export interface GeoserverConfigLayerItem {
  workspace: string
  name: string
  server: GeoserverConfigAuth
}
