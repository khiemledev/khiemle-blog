import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Footer from './Footer'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()

  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <motion.span
                    onMouseEnter={() => setHoveredItem(link.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={classNames(
                      'relative cursor-pointer rounded-md p-1 duration-200 ease-in-out md:p-4',
                      {
                        'font-medium': link.href != router.asPath,
                        'font-bold ': link.href == router.asPath,
                      }
                    )}
                  >
                    <AnimatePresence>
                      {hoveredItem == link.title && (
                        <motion.span
                          layoutId="hoverItem"
                          className="absolute inset-0 z-0 h-full w-full rounded-md bg-primary-500 bg-opacity-20"
                          initial={false}
                          animate={{
                            opacity: 1.0,
                            scale: 1.0,
                          }}
                          exit={{
                            opacity: 0.3,
                            scale: 0.3,
                          }}
                          transition={{
                            scale: { duration: 0.2, ease: 'easeIn' },
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="relative z-10">{link.title}</span>
                  </motion.span>
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.div
            key={router.asPath}
            initial={{
              opacity: 0,
              y: 50,
            }}
            layout
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <motion.main className="mb-auto">{children}</motion.main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
