'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, CreditCard, DollarSign, Calendar } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Subscription {
  id: string
  userId: string
  userName: string
  plan: 'basic' | 'premium' | 'enterprise'
  status: 'active' | 'expired' | 'cancelled'
  amount: number
  startDate: string
  endDate: string
  autoRenew: boolean
}

const planLabels: Record<Subscription['plan'], string> = {
  basic: 'أساسي',
  premium: 'مميز',
  enterprise: 'مؤسسي',
}

const statusLabels: Record<Subscription['status'], string> = {
  active: 'نشط',
  expired: 'منتهي',
  cancelled: 'ملغي',
}

const statusColors: Record<Subscription['status'], string> = {
  active: 'bg-success/10 text-success',
  expired: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubscriptions([
        {
          id: '1',
          userId: 'user1',
          userName: 'أحمد محمد',
          plan: 'premium',
          status: 'active',
          amount: 299,
          startDate: '2024-01-15',
          endDate: '2024-07-15',
          autoRenew: true,
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'فاطمة علي',
          plan: 'enterprise',
          status: 'active',
          amount: 799,
          startDate: '2024-02-01',
          endDate: '2025-02-01',
          autoRenew: true,
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'محمد حسن',
          plan: 'basic',
          status: 'expired',
          amount: 99,
          startDate: '2023-12-01',
          endDate: '2024-06-01',
          autoRenew: false,
        },
      ])
      setIsLoading(false)
    }

    fetchSubscriptions()
  }, [])

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active').length

  return (
    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
      <PageHeader
        title="الاشتراكات"
        description="إدارة خطط الاشتراك والدفع والمتعلمين"
      />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الاشتراكات النشطة</p>
                <p className="text-2xl font-bold">{activeSubscriptions}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الاشتراكات</p>
                <p className="text-2xl font-bold">{subscriptions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">لا توجد اشتراكات</p>
            <Button variant="outline">
              <Plus className="ml-2 h-4 w-4" />
              إضافة اشتراك جديد
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>المتعلم</TableHead>
                  <TableHead>خطة الاشتراك</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>تاريخ البداية</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تجديد تلقائي</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription, index) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{subscription.userName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{planLabels[subscription.plan]}</Badge>
                    </TableCell>
                    <TableCell>{subscription.amount} ر.س</TableCell>
                    <TableCell>{subscription.startDate}</TableCell>
                    <TableCell>{subscription.endDate}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[subscription.status]}>
                        {statusLabels[subscription.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscription.autoRenew ? 'default' : 'outline'}>
                        {subscription.autoRenew ? 'نعم' : 'لا'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete subscription', subscription.id)
                          }}
                          description={`هل أنت متأكد من حذف الاشتراك للمتعلم "${subscription.userName}"؟`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  )
}
