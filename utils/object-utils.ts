export type RecordOrArray = Record<string, unknown> | ArrayLike<unknown>

function pickNonEmpty(obj: RecordOrArray = {}): RecordOrArray {
  return Object
    .fromEntries(Object.entries(obj)
      .filter(([, v]) => v))
}

export const ObjectUtils = Object.freeze({
  pickNonEmpty
})
