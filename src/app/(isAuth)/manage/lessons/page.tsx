'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, FileText, Clock, BookOpen } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Lesson {
  id: string
  title: string
  courseTitle: string
  levelTitle: string
  order: number
  duration: number
  questionsCount: number
  status: 'active' | 'draft'
  createdAt: string
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLessons([
        {
          id: '1',
          title: 'مقدمة في التفاوض',
          courseTitle: 'فن التفاوض الدبلوماسي',
          levelTitle: 'المستوى الأول: أساسيات التفاوض',
          order: 1,
          duration: 30,
          questionsCount: 10,
          status: 'active',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'أنواع التفاوض',
          courseTitle: 'فن التفاوض الدبلوماسي',
          levelTitle: 'المستوى الأول: أساسيات التفاوض',
          order: 2,
          duration: 45,
          questionsCount: 15,
          status: 'active',
          createdAt: '2024-01-16',
        },
        {
          id: '3',
          title: 'استراتيجيات الإقناع',
          courseTitle: 'فن التفاوض الدبلوماسي',
          levelTitle: 'المستوى الثاني: تقنيات متقدمة',
          order: 1,
          duration: 50,
          questionsCount: 20,
          status: 'active',
          createdAt: '2024-01-17',
        },
        {
          id: '4',
          title: 'ما هو الذكاء العاطفي؟',
          courseTitle: 'الذكاء العاطفي في العمل',
          levelTitle: 'المستوى الأول: فهم المشاعر',
          order: 1,
          duration: 25,
          questionsCount: 8,
          status: 'active',
          createdAt: '2024-01-18',
        },
      ])
      setIsLoading(false)
    }

    fetchLessons()
  }, [])

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.levelTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === 'all' || lesson.courseTitle === courseFilter
    return matchesSearch && matchesCourse
  })

  const courses = Array.from(new Set(lessons.map((l) => l.courseTitle)))

  return (
    <div className="p-6">
      <PageHeader
        title="الدروس"
        description="عرض شامل لجميع الدروس من كل الدورات في مكان واحد للوصول السريع"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة درس جديد
          </Button>
        }
      />

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث في الدروس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فلترة حسب الدورة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدورات</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الدروس</p>
                <p className="text-2xl font-bold">{lessons.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المدة</p>
                <p className="text-2xl font-bold">
                  {lessons.reduce((sum, l) => sum + l.duration, 0)} دقيقة
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الدروس المطابقة</p>
                <p className="text-2xl font-bold">{filteredLessons.length}</p>
              </div>
              <Search className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lessons Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || courseFilter !== 'all'
                ? 'لا توجد نتائج للبحث'
                : 'لا توجد دروس'}
            </p>
            {!searchQuery && courseFilter === 'all' && (
              <Button variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إضافة أول درس
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>عنوان الدرس</TableHead>
                  <TableHead>الدورة</TableHead>
                  <TableHead>المستوى</TableHead>
                  <TableHead>الترتيب</TableHead>
                  <TableHead>المدة</TableHead>
                  <TableHead>الأسئلة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLessons.map((lesson, index) => (
                  <TableRow key={lesson.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{lesson.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{lesson.courseTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lesson.levelTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lesson.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration} د</span>
                      </div>
                    </TableCell>
                    <TableCell>{lesson.questionsCount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lesson.status === 'active'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {lesson.status === 'active' ? 'نشط' : 'مسودة'}
                      </Badge>
                    </TableCell>
                    <TableCell>{lesson.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete lesson', lesson.id)
                          }}
                          description={`هل أنت متأكد من حذف الدرس "${lesson.title}"؟`}
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
    </div>
  )
}
