'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Search, Users } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface Student {
  id: string
  name: string
  email: string
  progress: number
  status: 'active' | 'completed' | 'inactive'
  enrolledAt: string
}

interface CourseStudentsFormProps {
  courseId: string
  students: Student[]
}

const statusColors: Record<Student['status'], string> = {
  active: 'bg-success/10 text-success',
  completed: 'bg-primary/10 text-primary',
  inactive: 'bg-muted text-muted-foreground',
}

const statusLabels: Record<Student['status'], string> = {
  active: 'نشط',
  completed: 'مكتمل',
  inactive: 'غير نشط',
}

export function CourseStudentsForm({
  courseId,
  students: initialStudents,
}: CourseStudentsFormProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStudent = (data: { email: string }) => {
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name: 'متعلم جديد', // سيتم جلب الاسم من API
      email: data.email,
      progress: 0,
      status: 'active',
      enrolledAt: new Date().toISOString().split('T')[0],
    }
    setStudents([...students, newStudent])
    setIsDialogOpen(false)
  }

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          المتعلمون ({students.length})
        </h4>
        <Button onClick={() => setIsDialogOpen(true)} variant="outline" size="sm">
          <Plus className="ml-2 h-4 w-4" />
          إضافة متعلم
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="ابحث عن متعلم..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? 'لا توجد نتائج' : 'لا يوجد متعلمون مسجلون'}
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>التقدم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[student.status]}>
                      {statusLabels[student.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.enrolledAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <DeleteConfirmButton
                        onConfirm={() => handleRemoveStudent(student.id)}
                        description={`هل أنت متأكد من إزالة "${student.name}" من هذه الدورة؟`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AddStudentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleAddStudent}
      />
    </div>
  )
}

function AddStudentDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: { email: string }) => void
}) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ email })
    setEmail('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة متعلم جديد</DialogTitle>
          <DialogDescription>أدخل بريد المتعلم الإلكتروني للتسجيل</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-email">البريد الإلكتروني</Label>
            <Input
              id="student-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">إضافة</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

