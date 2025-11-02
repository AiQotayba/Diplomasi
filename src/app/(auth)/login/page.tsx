'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // محاكاة تسجيل الدخول
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // في التطبيق الحقيقي، سيتم التحقق من البيانات مع الـ API
    if (formData.email && formData.password) {
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحباً بك في لوحة التحكم',
      })
      router.push('/dashboard')
    } else {
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'يرجى التحقق من البريد الإلكتروني وكلمة المرور',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 text-primary/10 hidden lg:block">
        <Sparkles className="h-32 w-32" />
      </div>
      <div className="absolute bottom-20 left-20 text-purple-500/10 hidden lg:block">
        <Sparkles className="h-24 w-24" />
      </div>

      <Card className="relative w-full max-w-md border-border/50 bg-card/90 backdrop-blur-2xl shadow-2xl z-10">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-xl shadow-primary/30">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <div>
            <CardTitle className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              مرحباً بعودتك
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/80">
              سجل دخولك للوصول إلى لوحة التحكم الإدارية
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold">
                البريد الإلكتروني
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@diplomasi.app"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="pr-12 h-14 bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">
                  كلمة المرور
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-12 pl-12 h-14 bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 cursor-pointer"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal cursor-pointer text-muted-foreground"
              >
                تذكرني
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

