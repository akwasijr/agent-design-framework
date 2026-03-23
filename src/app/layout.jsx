import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import themeConfig from '../../theme.config'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Agent Design Framework',
    template: '%s – Agent Design Framework'
  },
  description: 'A design thinking framework for agent-managed work across industries'
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Layout
          pageMap={pageMap}
          navbar={<Navbar logo={themeConfig.logo} />}
          docsRepositoryBase={themeConfig.docsRepositoryBase}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
