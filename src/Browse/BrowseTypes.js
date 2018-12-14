// @flow
export type Contributors = {}
export type Paragraph = {
  body: string,
}
export type Tale = {
  title: string,
  paragraphs: Paragraph[],
  lastEdit: number,
  contributors: Contributors[],
}
