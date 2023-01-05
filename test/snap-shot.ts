import * as fs from "fs";

/** JSONスナップショットのエンコード */
const encode = "utf-8";

/**
 * スナップショットを更新するか否かを判定する
 *
 * @return 判定結果、trueでスナップショットを更新する
 */
export function shouldUpdateSnapShot(): boolean {
  return process.env.SHOULD_UPDATE_SNAPSHOT === "true";
}

/**
 * 任意のオブジェクトをjson形式でエクスポートする
 *
 * @param path エクスポート先のパス
 * @param json エクスポートするオブジェクト
 */
export function exportSnapShotJSON(
  path: string,
  json: Record<string, any>
): void {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  fs.writeFileSync(path, JSON.stringify(json, null, 2), encode);
}

/**
 * スナップショット用JSONをファイルから読み込む
 *
 * @param path 読み込み先のパス
 * @return 読み込み結果
 */
export function importSnapShotJSON(path: string): any {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  const origin = fs.readFileSync(path, encode);
  return JSON.parse(origin);
}
