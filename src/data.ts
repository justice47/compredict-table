import { SensorType, StatusType } from '@/types'
import type { SensorModel } from '@/types'

export const tableData : SensorModel[] = [
  {
    id: '23231',
    tags: 'Tesla, Breakdev',
    sensorType: SensorType.WFT,
    version: '1.12',
    name: 'WFT 4W V1.23',
    status: StatusType.Connected,
    lastChanged: '11.11.2022'
  },

  {
    id: '23232',
    tags: 'RoughRoad, Curvy',
    sensorType: SensorType.WFT,
    version: '1.12',
    name: 'WFT RD V1.12',
    status: StatusType.Deployed,
    lastChanged: '19.12.2022'
  },

  {
    id: '23233',
    tags: 'Tesla, MountainRoad',
    sensorType: SensorType.WFT,
    version: '1.08',
    name: 'WFT FD V1.08',
    status: StatusType.Trained,
    lastChanged: '03.12.2022'
  },
]
