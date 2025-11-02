'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  CreditCard,
  Bell,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'إدارة المحتوى',
    href: '/manage',
    icon: BookOpen,
    children: [
      { name: 'الدورات', href: '/manage/courses' },
      { name: 'المستويات', href: '/manage/levels' },
      { name: 'الدروس', href: '/manage/lessons' },
      { name: 'الأسئلة', href: '/manage/questions' },
      { name: 'المقالات', href: '/manage/articles' },
      { name: 'الشهادات', href: '/manage/certificates' },
    ],
  },
  { name: 'المستخدمين', href: '/users', icon: Users },
  { name: 'الاشتراكات', href: '/subscriptions', icon: CreditCard },
  { name: 'المسرد', href: '/glossary', icon: HelpCircle },
  { name: 'الإشعارات', href: '/notifications', icon: Bell },
  { name: 'التقارير', href: '/reports', icon: BarChart3 },
  { name: 'الإعدادات', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
    )
  }

  // Auto-expand active item's parent
  useEffect(() => {
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.href || pathname?.startsWith(child.href + '/')
        )
        if (hasActiveChild && !expandedItems.includes(item.href)) {
          setExpandedItems((prev) => [...prev, item.href])
        }
      }
    })
  }, [pathname])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-card"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        dir="rtl"
        className={cn(
          'fixed md:static inset-y-0 right-0 z-40 flex flex-col h-full bg-card/95 backdrop-blur-xl border-l border-border/50 w-64 shadow-2xl md:shadow-none',
          isMobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 p-4 md:p-6 border-b border-border/50 bg-gradient-to-l from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20"
            >
              <GraduationCap className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Diplomasi
              </span>
              <p className="text-[10px] text-muted-foreground font-medium">لوحة التحكم</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.href) || isActive

            return (
              <div key={item.name} className="relative">
                <div className="flex items-center group">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                      'hover:bg-secondary/50 hover:shadow-sm',
                      isActive
                        ? 'bg-gradient-to-l from-primary to-primary/90 text-white shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div
                      className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-white/20 shadow-inner'
                          : 'bg-secondary/30 group-hover:bg-secondary/50'
                      )}
                    >
                      <Icon className={cn('h-4 w-4 flex-shrink-0', isActive && 'text-white')} />
                    </div>
                    <span className="flex-1">{item.name}</span>
                  </Link>
                  {hasChildren && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleExpanded(item.href)}
                      className={cn(
                        'p-2 rounded-lg transition-all duration-200 ml-1',
                        isExpanded ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </motion.button>
                  )}
                </div>
                <AnimatePresence>
                  {hasChildren && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mr-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.children?.map((child) => {
                        const isChildActive =
                          pathname === child.href || pathname?.startsWith(child.href + '/')
                        return (
                          <div key={child.name}>
                            <Link
                              href={child.href}
                              className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 relative group',
                                isChildActive
                                  ? 'bg-primary/15 text-primary font-semibold shadow-sm'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                              )}
                            >
                              {isChildActive && (
                                <motion.div
                                  layoutId="activeChildIndicator"
                                  className="absolute right-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-full"
                                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                              )}
                              <div
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full transition-all',
                                  isChildActive
                                    ? 'bg-primary shadow-sm shadow-primary/50'
                                    : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/50'
                                )}
                              />
                              <span>{child.name}</span>
                            </Link>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-border/50 bg-gradient-to-t from-secondary/20 to-transparent">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50 hover:border-border transition-all cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all"
            >
              <span className="text-sm">A</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-card rounded-full shadow-sm" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <p className="text-xs text-muted-foreground">Premium account</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
