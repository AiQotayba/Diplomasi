'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Send,
  Bell,
  Check,
  Eye,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Users,
  AlertCircle,
  Info,
  Award,
  BookOpen,
  X,
} from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'course' | 'achievement'
  target: 'all' | 'specific' | 'course'
  sentAt: string
  readCount: number
  totalUsers: number
}

const typeLabels: Record<Notification['type'], string> = {
  info: 'معلومات',
  success: 'نجاح',
  warning: 'تحذير',
  course: 'دورة جديدة',
  achievement: 'إنجاز',
}

const typeColors: Record<Notification['type'], string> = {
  info: 'bg-blue-500/10 text-blue-400',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  course: 'bg-purple-500/10 text-purple-400',
  achievement: 'bg-accent/10 text-accent',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setNotifications([
        {
          id: '1',
          title: 'دورة جديدة: فن التفاوض المتقدم',
          message: 'تم إطلاق دورة جديدة في التفاوض المتقدم',
          type: 'course',
          target: 'all',
          sentAt: '2024-03-15 10:30',
          readCount: 1245,
          totalUsers: 2543,
        },
        {
          id: '2',
          title: 'تهانينا! إنجاز جديد',
          message: '100 متعلم أكملوا أول دورة لهم',
          type: 'achievement',
          target: 'all',
          sentAt: '2024-03-14 15:20',
          readCount: 2100,
          totalUsers: 2543,
        },
        {
          id: '3',
          title: 'تحديث المنصة',
          message: 'تم إضافة ميزات جديدة لتجربة أفضل',
          type: 'info',
          target: 'all',
          sentAt: '2024-03-13 09:15',
          readCount: 1980,
          totalUsers: 2543,
        },
      ])
      setIsLoading(false)
    }

    fetchNotifications()
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const { toast } = useToast()

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || notification.type === filterType
    return matchesSearch && matchesType
  })

  const handleSendNotification = () => {
    toast({
      title: 'تم الإرسال بنجاح',
      description: 'تم إرسال الإشعار إلى المستخدمين',
    })
    setIsFormOpen(false)
  }

  const totalReadRate =
    notifications.length > 0
      ? Math.round(
          (notifications.reduce((sum, n) => sum + n.readCount, 0) /
            (notifications.length * 2543)) *
            100
        )
      : 0

  return (
    <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
      <PageHeader
        title="الإشعارات"
        description="إدارة الإشعارات والرسائل للمتعلمين والمتابعة على التفاعل"
        action={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إرسال إشعار جديد
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50 bg-card/50 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الإشعارات</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل القراءة</p>
                <p className="text-2xl font-bold text-green-400">{totalReadRate}%</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Check className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إشعارات هذا الشهر</p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.sentAt.includes('2024-03')).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">متوسط التفاعل</p>
                <p className="text-2xl font-bold text-orange-400">
                  {Math.round(
                    notifications.reduce((sum, n) => {
                      const rate = (n.readCount / n.totalUsers) * 100
                      return sum + rate
                    }, 0) / notifications.length
                  )}
                  %
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في الإشعارات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="ml-2 h-4 w-4" />
                <SelectValue placeholder="فلترة حسب النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="info">معلومات</SelectItem>
                <SelectItem value="success">نجاح</SelectItem>
                <SelectItem value="warning">تحذير</SelectItem>
                <SelectItem value="course">دورة جديدة</SelectItem>
                <SelectItem value="achievement">إنجاز</SelectItem>
              </SelectContent>
            </Select>
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Table */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>قائمة الإشعارات</span>
            <Badge variant="outline" className="text-sm">
              {filteredNotifications.length} إشعار
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={5} />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-4">
                {searchQuery || filterType !== 'all'
                  ? 'لا توجد نتائج مطابقة للبحث'
                  : 'لا توجد إشعارات'}
              </p>
              {!searchQuery && filterType === 'all' && (
                <Button onClick={() => setIsFormOpen(true)} variant="outline">
                  <Plus className="ml-2 h-4 w-4" />
                  إرسال أول إشعار
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>العنوان والرسالة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الجمهور</TableHead>
                    <TableHead>تاريخ الإرسال</TableHead>
                    <TableHead>القراءات</TableHead>
                    <TableHead>معدل القراءة</TableHead>
                    <TableHead className="text-center w-[120px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification, index) => {
                    const readRate = Math.round(
                      (notification.readCount / notification.totalUsers) * 100
                    )
                    const typeIcons = {
                      info: Info,
                      success: Check,
                      warning: AlertCircle,
                      course: BookOpen,
                      achievement: Award,
                    }
                    const Icon = typeIcons[notification.type]

                    return (
                      <TableRow key={notification.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-secondary/50 mt-0.5">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium mb-1">{notification.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeColors[notification.type]}>
                            {typeLabels[notification.type]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {notification.target === 'all'
                                ? 'جميع المتعلمين'
                                : notification.target === 'specific'
                                  ? 'محدد'
                                  : 'دورة معينة'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{notification.sentAt}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {notification.readCount.toLocaleString()} /{' '}
                              {notification.totalUsers.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={readRate > 70 ? 'default' : 'outline'}
                            className={
                              readRate > 70
                                ? 'bg-green-500/10 text-green-400'
                                : readRate > 50
                                  ? 'bg-orange-500/10 text-orange-400'
                                  : 'bg-red-500/10 text-red-400'
                            }
                          >
                            {readRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                toast({
                                  title: notification.title,
                                  description: notification.message,
                                })
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DeleteConfirmButton
                              onConfirm={() => {
                                setNotifications((prev) =>
                                  prev.filter((n) => n.id !== notification.id)
                                )
                                toast({
                                  title: 'تم الحذف',
                                  description: `تم حذف الإشعار "${notification.title}"`,
                                })
                              }}
                              description={`هل أنت متأكد من حذف الإشعار "${notification.title}"؟`}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Send Notification Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              إرسال إشعار جديد
            </DialogTitle>
            <DialogDescription>
              أرسل إشعاراً لجميع المتعلمين أو مجموعة محددة، وسيتم تتبع معدل القراءة
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notification-title">عنوان الإشعار</Label>
              <Input
                id="notification-title"
                placeholder="مثال: دورة جديدة متاحة الآن"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-message">محتوى الإشعار</Label>
              <Textarea
                id="notification-message"
                placeholder="اكتب محتوى الإشعار هنا..."
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">يُفضل أن يكون المحتوى مختصراً وواضحاً</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notification-type">نوع الإشعار</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-400" />
                        معلومات
                      </div>
                    </SelectItem>
                    <SelectItem value="success">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400" />
                        نجاح
                      </div>
                    </SelectItem>
                    <SelectItem value="warning">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                        تحذير
                      </div>
                    </SelectItem>
                    <SelectItem value="course">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                        دورة جديدة
                      </div>
                    </SelectItem>
                    <SelectItem value="achievement">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-accent" />
                        إنجاز
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-target">الجمهور المستهدف</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجمهور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        جميع المتعلمين
                      </div>
                    </SelectItem>
                    <SelectItem value="specific">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        متعلمين محددين
                      </div>
                    </SelectItem>
                    <SelectItem value="course">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        متعلمو دورة معينة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSendNotification}>
              <Send className="ml-2 h-4 w-4" />
              إرسال الإشعار
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
