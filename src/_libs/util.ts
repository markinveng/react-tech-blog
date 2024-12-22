/* eslint-disable @typescript-eslint/no-unused-vars */
export function removeAfterHyphen(input: string): string {
  const index: number | string = input.indexOf("-");
  if (index === -1) {
    // ハイフンが含まれていない場合は元の文字列を返す
    return input;
  }
  // ハイフンより前の文字列を返す
  return input.slice(0, index);
}