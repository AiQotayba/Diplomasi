'use client'

import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
      <PageHeader
        title="الإعدادات"
        description="إدارة إعدادات النظام والمنصة والصلاحيات"
      />

      <div className="grid gap-6 max-w-4xl">
        {/* General Settings */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>إعدادات عامة</CardTitle>
            </div>
            <CardDescription>الإعدادات الأساسية للمنصة والمعلومات العامة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">اسم المنصة</Label>
              <Input id="site-name" defaultValue="Diplomasi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">وصف المنصة</Label>
              <Input
                id="site-description"
                defaultValue="منصة تعليمية متخصصة في مهارات الدبلوماسية والتفاوض"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">البريد الإلكتروني للدعم</Label>
              <Input id="contact-email" type="email" defaultValue="support@diplomasi.app" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>تفعيل الصيانة</Label>
                <p className="text-sm text-muted-foreground">
                  إخفاء المنصة عن المتعلمين للصيانة
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>السماح بالتسجيل الجديد</Label>
                <p className="text-sm text-muted-foreground">
                  السماح للمستخدمين الجدد بالتسجيل
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>حفظ التغييرات</Button>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
