// @flow
declare module 'tell-tale' {
  declare export type Contributors = {}
  declare export type Paragraph = {
    body: string,
  }
  declare export type Tag = {
    label: string,
  }
  declare export type Tale = {
    title: string,
    description: ?string,
    paragraphs: Paragraph[],
    lastEdit: number,
    tags: ?(Tag[]),
    contributors: Contributors[],
  }
}
