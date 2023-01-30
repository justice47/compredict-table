export const enum SensorType {
  WFT = 'WFT',
  WTT = 'WTT',
  SES = 'SES',
  FBG = 'FBG'
}

export const enum StatusType {
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  Deployed = 'Deployed',
  Deploying = 'Deploying',
  Training = 'Training',
  Trained = 'Trained'
}

export const enum Actions {
  Train = 'Train',
  Deploy = 'Deploy',
  Reconnect = 'Reconnect',
  Delete = 'Delete'
}

export type SensorModel = {
  id: string,
  tags: string,
  sensorType: SensorType,
  version: string,
  name: string,
  status: StatusType,
  lastChanged: string
}

export type Column = {
  name: string,
  dataProperty: keyof SensorModel
}

export type SortDirection = 'asc' | 'desc'
