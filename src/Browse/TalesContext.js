// @flow
import * as React from 'react'
import { append, update, remove, findIndex, propEq, find } from 'ramda'
import uuid from 'uuid/v4'
import type { Tale } from 'tell-tale'

const initialTales: Tale[] = [
  {
    id: '1',
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'fantasy' }, { label: 'amateur' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    id: '2',
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'drama' }, { label: 'solo' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    id: '3',
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff. A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'first' }, { label: 'historical' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    id: '4',
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [
      { label: 'professional' },
      { label: 'romance' },
      { label: 'comedy' },
    ],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },

  {
    id: '5',
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'fantasy' }, { label: 'amateur' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    id: '6',
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'drama' }, { label: 'solo' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
]

type Context = {
  tales: Tale[],
  addTale: Tale => any,
  removeTale: Tale => any,
  editTale: Tale => any,
  tale: string => ?Tale,
}

const TalesContext = React.createContext<Context>({
  tales: [],
  addTale(tale: Tale) {},
  removeTale(tale: Tale) {},
  editTale(tale: Tale) {},
  tale(id: string) {},
})

const getIndex = (id: string, tales: Tale[]) =>
  findIndex(propEq('id', id), tales)

const TalesProvider = ({ children }: { children: React.Node }) => {
  const [tales, setTales] = React.useState(initialTales)
  const addTale = (tale: Tale) => setTales(append(tale, tales))
  const removeTale = ({ id }: Tale) =>
    setTales(remove(getIndex(id, tales), tales))
  const editTale = (tale: Tale) =>
    setTales(update(getIndex(tale.id, tales), tale, tales))
  const tale = (id: string) => find(propEq('id', id), tales)

  const value: Context = {
    tales,
    addTale,
    editTale,
    removeTale,
    tale,
  }
  return <TalesContext.Provider value={value}>{children}</TalesContext.Provider>
}

const useTalesContext = () => React.useContext(TalesContext)
const useTales = () => useTalesContext().tales
const useTale = (id: string) => useTalesContext().tale(id)

export { TalesProvider, TalesContext, useTalesContext, useTales, useTale }
