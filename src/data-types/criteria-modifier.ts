export interface CriteriaModifier<T> {
  eq?: T
  lt?: T
  lte?: T
  gt?: T
  gte?: T
  ne?: T
  in?: T[]
  nin?: T[]
  contains?: T
}
