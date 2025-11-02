'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, HelpCircle, BookOpen, FileText } from 'lucide-react'
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

interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  lessonTitle: string
  courseTitle: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  createdAt: string
}

const typeLabels: Record<Question['type'], string> = {
  'multiple-choice': 'اختيار متعدد',
  'true-false': 'صح/خطأ',
  'short-answer': 'إجابة قصيرة',
}

const difficultyColors: Record<Question['difficulty'], string> = {
  easy: 'bg-success/10 text-success',
  medium: 'bg-warning/10 text-warning',
  hard: 'bg-destructive/10 text-destructive',
}

const difficultyLabels: Record<Question['difficulty'], string> = {
  easy: 'سهل',
  medium: 'متوسط',
  hard: 'صعب',
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setQuestions([
        {
          id: '1',
          text: 'ما هي أول خطوة في عملية التفاوض الناجح؟',
          type: 'multiple-choice',
          lessonTitle: 'مقدمة في التفاوض',
          courseTitle: 'فن التفاوض الدبلوماسي',
          difficulty: 'easy',
          points: 5,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          text: 'التفاوض هو عملية تواصل بين طرفين فقط',
          type: 'true-false',
          lessonTitle: 'أنواع التفاوض',
          courseTitle: 'فن التفاوض الدبلوماسي',
          difficulty: 'medium',
          points: 3,
          createdAt: '2024-01-16',
        },
        {
          id: '3',
          text: 'اشرح مفهوم الإقناع الدبلوماسي',
          type: 'short-answer',
          lessonTitle: 'استراتيجيات الإقناع',
          courseTitle: 'فن التفاوض الدبلوماسي',
          difficulty: 'hard',
          points: 10,
          createdAt: '2024-01-17',
        },
        {
          id: '4',
          text: 'ما هو الذكاء العاطفي؟',
          type: 'multiple-choice',
          lessonTitle: 'ما هو الذكاء العاطفي؟',
          courseTitle: 'الذكاء العاطفي في العمل',
          difficulty: 'easy',
          points: 5,
          createdAt: '2024-01-18',
        },
      ])
      setIsLoading(false)
    }

    fetchQuestions()
  }, [])

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === 'all' || question.courseTitle === courseFilter
    const matchesType = typeFilter === 'all' || question.type === typeFilter
    return matchesSearch && matchesCourse && matchesType
  })

  const courses = Array.from(new Set(questions.map((q) => q.courseTitle)))

  return (
    <div className="p-6">
      <PageHeader
        title="الأسئلة"
        description="إدارة قاعدة بيانات شاملة لجميع أسئلة الاختبارات والامتحانات"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة سؤال جديد
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
                placeholder="ابحث في الأسئلة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="الدورة" />
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="نوع السؤال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="multiple-choice">اختيار متعدد</SelectItem>
                <SelectItem value="true-false">صح/خطأ</SelectItem>
                <SelectItem value="short-answer">إجابة قصيرة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الأسئلة</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي النقاط</p>
                <p className="text-2xl font-bold">
                  {questions.reduce((sum, q) => sum + q.points, 0)}
                </p>
              </div>
              <HelpCircle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الأسئلة المطابقة</p>
                <p className="text-2xl font-bold">{filteredQuestions.length}</p>
              </div>
              <Search className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الدورات</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || courseFilter !== 'all' || typeFilter !== 'all'
                ? 'لا توجد نتائج للبحث'
                : 'لا توجد أسئلة'}
            </p>
            {!searchQuery && courseFilter === 'all' && typeFilter === 'all' && (
              <Button variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إضافة أول سؤال
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>السؤال</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الدرس</TableHead>
                  <TableHead>الدورة</TableHead>
                  <TableHead>الصعوبة</TableHead>
                  <TableHead>النقاط</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question, index) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium max-w-md">
                      <p className="line-clamp-2">{question.text}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{typeLabels[question.type]}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-xs truncate">{question.lessonTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-xs truncate">{question.courseTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={difficultyColors[question.difficulty]}>
                        {difficultyLabels[question.difficulty]}
                      </Badge>
                    </TableCell>
                    <TableCell>{question.points}</TableCell>
                    <TableCell>{question.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete question', question.id)
                          }}
                          description={`هل أنت متأكد من حذف هذا السؤال؟`}
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
