'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit } from 'lucide-react'
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
import { UserForm } from '@/components/forms/user-form'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'learner' | 'manager' | 'reviewer' | 'support'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
}

const roleLabels: Record<User['role'], string> = {
  learner: 'متعلم',
  manager: 'مدير',
  reviewer: 'مراجع',
  support: 'دعم',
}

const statusLabels: Record<User['status'], string> = {
  active: 'نشط',
  inactive: 'غير نشط',
  suspended: 'معلق',
}

const statusColors: Record<User['status'], string> = {
  active: 'bg-success/10 text-success',
  inactive: 'bg-muted text-muted-foreground',
  suspended: 'bg-destructive/10 text-destructive',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    // محاكاة API call لمدة ثانية
    const fetchUsers = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // بيانات تجريبية
      setUsers([
        {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+966501234567',
          role: 'learner',
          status: 'active',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'فاطمة علي',
          email: 'fatima@example.com',
          phone: '+966502345678',
          role: 'manager',
          status: 'active',
          createdAt: '2024-01-10',
        },
        {
          id: '3',
          name: 'محمد حسن',
          email: 'mohammed@example.com',
          role: 'learner',
          status: 'inactive',
          createdAt: '2024-01-05',
        },
      ])
      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  const handleAddUser = () => {
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    // إعادة تحميل البيانات
    setIsLoading(true)
    setTimeout(() => {
      // في التطبيق الحقيقي، سيتم استدعاء API هنا
      setIsLoading(false)
    }, 500)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
      <PageHeader
        title="المستخدمين"
        description="إدارة المستخدمين والمتعلمين"
        action={
          <Button onClick={handleAddUser}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مستخدم جديد
          </Button>
        }
      />
      <div className="rounded-lg border bg-card shadow-base-lg">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">لا يوجد مستخدمين</p>
            <Button onClick={handleAddUser} variant="outline">
              إضافة أول مستخدم
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{roleLabels[user.role]}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[user.status]}>
                        {statusLabels[user.status]}
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
                            console.log('Delete user', user.id)
                          }}
                          description={`هل أنت متأكد من حذف المستخدم "${user.name}"؟`}
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

      <UserForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={handleFormSuccess}
      />
    </main>
  )
}
