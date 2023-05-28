export function intersection<T>(arr1: T[], arr2: T[]) {
  return arr1.filter((elem) => arr2.includes(elem));
}

export function difference(arr1: any[], arr2: any[]): any[] {
  return arr1.filter((elem) => !arr2.includes(elem));
}

export function filterArrByIDs<T extends {id: string}>(arr: T[], ids: string[]): T[] {
  return arr.filter((el) => ids.includes(el.id));
}