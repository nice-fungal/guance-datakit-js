import {
  LifeCycleEventType,
  RumEventType,
  startBatchWithReplica
} from '@cloudcare/browser-core'
// import { DeflateEncoderStreamId } from '../domain/deflate'
export function startRumBatch(
  configuration,
  lifeCycle,
  telemetryEventObservable,
  reportError,
  pageExitObservable,
  sessionExpireObservable,
  createEncoder
) {
  const batch = startBatchWithReplica(
    configuration,
    {
      endpoint: configuration.rumEndpoint,
      encoder: createEncoder(2), // DeflateEncoderStreamId.RUM
    },
    reportError,
    pageExitObservable,
    sessionExpireObservable
  )
  lifeCycle.subscribe(
    LifeCycleEventType.RUM_EVENT_COLLECTED,
    function (serverRumEvent) {
      // NOTE: upsert 和 add 其实是同一个方法；只是 upsert 会根据 key 来覆盖之前的内容
      if (serverRumEvent.type === RumEventType.VIEW) {
        batch.upsert(serverRumEvent, serverRumEvent.view.id)
      } else {
        batch.add(serverRumEvent)
      }
    }
  )
  telemetryEventObservable.subscribe(function (event) {
    batch.add(event)
  })
  return batch
}
