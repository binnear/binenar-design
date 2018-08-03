export const TEST = 'TEST';

export function test(data: any) {
  return {
    type: TEST,
    payload: data
  }
}