'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, Layers, BookOpen, FileText } from 'lucide-react'
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

interface Level {
  id: string
  title: string
  courseTitle: string
  order: number
  lessonsCount: number
  createdAt: string
}

export default function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  useEffect(() => {
    const fetchLevels = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLevels([
        {
          id: '1',
          title: 'المستوى الأول: أساسيات التفاوض',
          courseTitle: 'فن التفاوض الدبلوماسي',
          order: 1,
          lessonsCount: 2,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'المستوى الثاني: تقنيات متقدمة',
          courseTitle: 'فن التفاوض الدبلوماسي',
          order: 2,
          lessonsCount: 1,
          createdAt: '2024-01-16',
        },
        {
          id: '3',
          title: 'المستوى الأول: فهم المشاعر',
          courseTitle: 'الذكاء العاطفي في العمل',
          order: 1,
          lessonsCount: 1,
          createdAt: '2024-01-17',
        },
      ])
      setIsLoading(false)
    }

    fetchLevels()
  }, [])

  const filteredLevels = levels.filter((level) => {
    const matchesSearch =
      level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      level.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === 'all' || level.courseTitle === courseFilter
    return matchesSearch && matchesCourse
  })

  const courses = Array.from(new Set(levels.map((l) => l.courseTitle)))

  return (
    <div className="p-6">
      <PageHeader
        title="المستويات"
        description="عرض جميع مستويات الدورات من كل الدورات في قائمة شاملة"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مستوى جديد
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
                placeholder="ابحث في المستويات..."
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
                <p className="text-sm text-muted-foreground mb-1">إجمالي المستويات</p>
                <p className="text-2xl font-bold">{levels.length}</p>
              </div>
              <Layers className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الدروس</p>
                <p className="text-2xl font-bold">
                  {levels.reduce((sum, l) => sum + l.lessonsCount, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المستويات المطابقة</p>
                <p className="text-2xl font-bold">{filteredLevels.length}</p>
              </div>
              <Search className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Levels Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : filteredLevels.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || courseFilter !== 'all'
                ? 'لا توجد نتائج للبحث'
                : 'لا توجد مستويات'}
            </p>
            {!searchQuery && courseFilter === 'all' && (
              <Button variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إضافة أول مستوى
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>عنوان المستوى</TableHead>
                  <TableHead>الدورة</TableHead>
                  <TableHead>الترتيب</TableHead>
                  <TableHead>عدد الدروس</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLevels.map((level, index) => (
                  <TableRow key={level.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{level.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{level.courseTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{level.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{level.lessonsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>{level.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete level', level.id)
                          }}
                          description={`هل أنت متأكد من حذف المستوى "${level.title}"؟`}
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
