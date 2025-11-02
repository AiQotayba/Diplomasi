'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // محاكاة إرسال البريد
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email) {
      setEmailSent(true)
      toast({
        title: 'تم إرسال البريد',
        description: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
      })
    } else {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال بريدك الإلكتروني',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Card className="relative w-full max-w-md border-border/50 bg-card/90 backdrop-blur-2xl shadow-2xl z-10">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse" />
                <div className="relative p-5 rounded-full bg-gradient-to-br from-green-500 to-green-400 shadow-xl shadow-green-500/30">
                  <Mail className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                تم إرسال البريد
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground/80">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                إذا لم تستلم البريد، تحقق من مجلد الرسائل المزعجة أو حاول مرة أخرى
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 pb-8">
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => {
                setEmailSent(false)
                setEmail('')
              }}
            >
              إعادة المحاولة
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full h-12">
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة لتسجيل الدخول
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
              نسيت كلمة المرور؟
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/80">
              لا تقلق، سنجد لك طريقة للعودة إلى حسابك
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-12 h-14 bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground/70">
                سنرسل رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  إرسال رابط إعادة التعيين
                  <ArrowRight className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-8">
          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full h-12">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة لتسجيل الدخول
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

