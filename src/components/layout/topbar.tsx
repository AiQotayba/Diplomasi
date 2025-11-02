'use client'

import { Search, Bell, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function Topbar() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-4 flex-1">
        {/* <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="بحث..."
            className="pr-10 h-10 bg-card/50 border-border/50 focus:border-primary/50"
          />
        </div> */}
      </div>
      <div className="flex items-center gap-2  ">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative fill-white">
            <Bell className="h-5 w-5 " />
            <Badge className="absolute top-1 left-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-white text-xs fill-white">
              2
            </Badge>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="fill-white " >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border/50">
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
            <DropdownMenuItem>الإعدادات</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
