// @flow
import * as React from 'react'
import {} from '@reach/router'

type Context = {
  setTitle: (?string) => any,
  title: ?string,
}
const PageContext = React.createContext<Context>({
  title: '',
  setTitle: () => {},
})

type Props = {
  title?: string,
  children: React.Node,
}
const Page = ({ title, children }: Props) => {
  const { setTitle } = React.useContext(PageContext)
  React.useEffect(
    () => {
      setTitle(title)
    },
    [title],
  )

  return children
}

const PageProvider = ({ children }: { children: React.Node }) => {
  const [title, setTitle] = React.useState(null)
  return (
    <PageContext.Provider value={{ title, setTitle }}>
      {children}
    </PageContext.Provider>
  )
}

export { Page, PageContext, PageProvider }
