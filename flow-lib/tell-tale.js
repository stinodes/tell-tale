// @flow
declare module 'tell-tale' {
  declare export type Contributors = {}
  declare export type Paragraph = {
    body: string,
  }
  declare export type Tale = {
    title: string,
    paragraphs: Paragraph[],
    lastEdit: number,
    contributors: Contributors[],
  }
}
