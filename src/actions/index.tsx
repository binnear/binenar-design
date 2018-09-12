export const UPDATECSS = 'UPDATECSS';

export function updatecss(data: object) {
  return {
    type: UPDATECSS,
    payload: data
  }
}