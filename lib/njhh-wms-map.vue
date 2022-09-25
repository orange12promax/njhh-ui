<template>
  <div ref="mapElement" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.chinatmsproviders'
import { getWmsLayerParam } from './components/geoserver.api'

const mapElement = ref()

interface Props {
  origin: string
}

const props = withDefaults(defineProps<Props>(), {
  origin: ''
})
const emits = defineEmits(['featureClick'])

onMounted(() => {
  const map = L.map(mapElement.value, {
    center: [34.15754, 117.20851],
    zoom: 15,
    zoomControl: false
  })

  L.tileLayer
    .chinaProvider('TianDiTu.Normal.Map', {
      key: 'f2ae54b1dcb16d4a9f478401edf0054e',
      maxZoom: 18,
      minZoom: 5
    })
    .addTo(map)
  L.tileLayer
    .chinaProvider('TianDiTu.Normal.Annotion', {
      key: 'f2ae54b1dcb16d4a9f478401edf0054e',
      maxZoom: 18,
      minZoom: 5
    })
    .addTo(map)

  const workspace = 'tongshan'
  const layers = ['guandao', 'bengzhan']
  const url = `${props.origin}/geoserver/${workspace}/wms`

  const layerTransparent = true
  const layerFormat = 'image/png'

  let wmsLayers: L.TileLayer.WMS[] = []
  getWmsLayerParam(workspace, layers, props.origin).then((params) => {
    wmsLayers = params.map((param) =>
      L.tileLayer
        .wms(url, {
          ...param,
          transparent: layerTransparent,
          format: layerFormat
        })
        .addTo(map)
    )
  })
  // 需要获取每一个layer对应的bound

  map.on('click', (event) => {
    // const clickLatLng = event.latlng
    // 给定地理坐标，返回相对于地图container容器的相应像素坐标
    const point = map.latLngToContainerPoint(event.latlng)
    const size = map.getSize()

    const featureRequests = wmsLayers.map((wmsLayer) => {
      const url = (wmsLayer as any)._url
      const featureParam = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: wmsLayer.wmsParams.styles,
        transparent: layerTransparent,
        version: wmsLayer.wmsParams.version,
        format: layerFormat,
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: wmsLayer.wmsParams.layers,
        query_layers: wmsLayer.wmsParams.layers,
        info_format: 'application/json',
        x: point.x,
        y: point.y
      }
      return fetch(url + L.Util.getParamString(featureParam, url, true)).then((res) => res.json())
    })
    Promise.all(featureRequests).then((res) => {
      let result = []
      res.forEach((item) => {
        result = [...result, ...item.features]
      })
      emits('featureClick', result)
    })
  })
})
</script>

<style scoped lang="less"></style>
