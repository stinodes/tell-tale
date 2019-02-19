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
    id: string,
    title: string,
    description: ?string,
    paragraphs: Paragraph[],
    lastEdit: number,
    tags: ?(Tag[]),
    contributors: Contributors[],
  }

  declare export type Profile = {
    pseudonym: string,
    firstName: string,
    lastName: string,
    email: string,
  }
}
