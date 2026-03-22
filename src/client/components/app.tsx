import styles from './app.module.css'

import { DeckGL } from '@deck.gl/react'
import { MapView } from '@deck.gl/core'
import { TileLayer } from '@deck.gl/geo-layers'
import { BitmapLayer, PathLayer } from '@deck.gl/layers'

import type { Position, MapViewState } from '@deck.gl/core'
import type { TileLayerPickingInfo, TileLayerProps } from '@deck.gl/geo-layers'
import Buttons from './buttons'





const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 47.65,
  longitude: 7,
  zoom: 4.5,
  maxZoom: 20,
  maxPitch: 89,
  bearing: 0
}

/* global window */
const devicePixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1


function getTooltip({ tile }: TileLayerPickingInfo<any, any>) {
  if (tile) {
    const { x, y, z } = tile.index
    return `tile: x: ${x}, y: ${y}, z: ${z}`
  }
  return null
}


function Copyright() {
  return (
    <div className={styles.copyrightStyle}>
      {'© '}
      <a className={styles.copyrightLink} href="http://www.openstreetmap.org/copyright" target="blank">
        OpenStreetMap contributors
      </a>
    </div>
  )
}


type AppParams = {
  showBorder?: boolean
  onTilesLoad?: () => void
}

export default function App({ showBorder = true, onTilesLoad }: AppParams) {
  const tileLayer = new TileLayer<ImageBitmap>({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],

    // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    // and we aren't limited by the browser to a certain number per domain.
    maxRequests: 20,

    pickable: true,
    onViewportLoad: onTilesLoad,
    autoHighlight: showBorder,
    highlightColor: [60, 60, 60, 40],
    // https://wiki.openstreetmap.org/wiki/Zoom_levels
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    zoomOffset: devicePixelRatio === 1 ? -1 : 0,
    renderSubLayers: props => {
      const [[west, south], [east, north]] = props.tile.boundingBox
      const { data, ...otherProps } = props

      return [
        new BitmapLayer(otherProps, {
          image: data,
          bounds: [west, south, east, north]
        }),
        showBorder &&
        new PathLayer<Position[]>({
          id: `${props.id}-border`,
          data: [
            [
              [west, north],
              [west, south],
              [east, south],
              [east, north],
              [west, north]
            ]
          ],
          getPath: d => d,
          getColor: [255, 0, 0],
          widthMinPixels: 4
        })
      ]
    }
  })

  return (
    <DeckGL
      layers={[tileLayer]}
      views={new MapView({ repeat: true })}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <Buttons />
      <Copyright />
    </DeckGL>
  )
}

