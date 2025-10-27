export function buildCommonContext(
  globalContextManager,
  userContextManager,
  recorderApi
) {
  return {
    context: globalContextManager.getContext(),
    user: userContextManager.getContext(),
    hasReplay: false, // recorderApi.isRecording() ? true : undefined
  }
}
