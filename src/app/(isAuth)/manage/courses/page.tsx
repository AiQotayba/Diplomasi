'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit,
  ChevronRight,
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  Settings,
} from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Course {
  id: string
  title: string
  description: string
  status: 'active' | 'draft' | 'archived'
  learners: number
  completionRate: number
  levels: Level[]
}

interface Level {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  order: number
  duration: number
  questions: number
}

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCourses([
        {
          id: '1',
          title: 'فن التفاوض الدبلوماسي',
          description: 'دورة شاملة لتعلم مهارات التفاوض والدبلوماسية المتقدمة',
          status: 'active',
          learners: 1245,
          completionRate: 87,
          levels: [
            {
              id: '1-1',
              title: 'المستوى الأول: أساسيات التفاوض',
              order: 1,
              lessons: [
                {
                  id: '1-1-1',
                  title: 'مقدمة في التفاوض',
                  order: 1,
                  duration: 30,
                  questions: 10,
                },
                {
                  id: '1-1-2',
                  title: 'أنواع التفاوض',
                  order: 2,
                  duration: 45,
                  questions: 15,
                },
              ],
            },
            {
              id: '1-2',
              title: 'المستوى الثاني: تقنيات متقدمة',
              order: 2,
              lessons: [
                {
                  id: '1-2-1',
                  title: 'استراتيجيات الإقناع',
                  order: 1,
                  duration: 50,
                  questions: 20,
                },
              ],
            },
          ],
        },
        {
          id: '2',
          title: 'الذكاء العاطفي في العمل',
          description: 'تطوير مهارات الذكاء العاطفي والعلاقات المهنية',
          status: 'active',
          learners: 890,
          completionRate: 82,
          levels: [
            {
              id: '2-1',
              title: 'المستوى الأول: فهم المشاعر',
              order: 1,
              lessons: [
                {
                  id: '2-1-1',
                  title: 'ما هو الذكاء العاطفي؟',
                  order: 1,
                  duration: 25,
                  questions: 8,
                },
              ],
            },
          ],
        },
      ])
      setIsLoading(false)
    }

    fetchCourses()
  }, [])

  const statusColors: Record<Course['status'], string> = {
    active: 'bg-success/10 text-success',
    draft: 'bg-muted text-muted-foreground',
    archived: 'bg-destructive/10 text-destructive',
  }

  const statusLabels: Record<Course['status'], string> = {
    active: 'نشط',
    draft: 'مسودة',
    archived: 'مؤرشف',
  }

  return (
    <div className="p-6">
      <PageHeader
        title="إدارة الدورات"
        description="إدارة شاملة للدورات التعليمية - عرض هرمي متداخل للدورات، المستويات، الدروس، والاختبارات"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة دورة جديدة
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الدورات</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الدورات النشطة</p>
                <p className="text-2xl font-bold">
                  {courses.filter((c) => c.status === 'active').length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المتعلمين</p>
                <p className="text-2xl font-bold">
                  {courses.reduce((sum, c) => sum + c.learners, 0).toLocaleString()}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل الإكمال</p>
                <p className="text-2xl font-bold">
                  {courses.length > 0
                    ? Math.round(
                        courses.reduce((sum, c) => sum + c.completionRate, 0) / courses.length
                      )
                    : 0}
                    %
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Accordion */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">لا توجد دورات</p>
            <Button variant="outline">
              <Plus className="ml-2 h-4 w-4" />
              إضافة أول دورة
            </Button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {courses.map((course) => {
              const totalLevels = course.levels.length
              const totalLessons = course.levels.reduce(
                (sum, level) => sum + level.lessons.length,
                0
              )
              const totalQuestions = course.levels.reduce(
                (sum, level) =>
                  sum + level.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.questions, 0),
                0
              )

              return (
                <AccordionItem key={course.id} value={course.id} className="border-b">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-right">
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Layers className="h-4 w-4" />
                            <span>{totalLevels} مستويات</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{totalLessons} دروس</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HelpCircle className="h-4 w-4" />
                            <span>{totalQuestions} سؤال</span>
                          </div>
                        </div>
                        <Badge className={statusColors[course.status]}>
                          {statusLabels[course.status]}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/manage/courses/${course.id}`)
                            }}
                            title="فتح صفحة الدورة"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DeleteConfirmButton
                            onConfirm={() => {
                              setCourses(courses.filter((c) => c.id !== course.id))
                            }}
                            description={`هل أنت متأكد من حذف الدورة "${course.title}"؟ سيتم حذف جميع المستويات والدروس المرتبطة بها.`}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="mt-4 space-y-4">
                      {/* Course Info */}
                      <Card className="bg-muted/50 border-border/50">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">المتعلمون</p>
                              <p className="font-semibold">{course.learners.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">معدل الإكمال</p>
                              <p className="font-semibold">{course.completionRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">المستويات</p>
                              <p className="font-semibold">{totalLevels}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">الدروس</p>
                              <p className="font-semibold">{totalLessons}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Levels */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-base font-semibold flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            المستويات ({totalLevels})
                          </h4>
                          <Button variant="outline" size="sm">
                            <Plus className="ml-2 h-4 w-4" />
                            إضافة مستوى
                          </Button>
                        </div>

                        {course.levels.map((level) => (
                          <Card key={level.id} className="border-border/50 bg-card/50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                                    {level.order}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold">{level.title}</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {level.lessons.length} درس
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <DeleteConfirmButton
                                    onConfirm={() => {
                                      setCourses(
                                        courses.map((c) =>
                                          c.id === course.id
                                            ? {
                                                ...c,
                                                levels: c.levels.filter((l) => l.id !== level.id),
                                              }
                                            : c
                                        )
                                      )
                                    }}
                                    description={`هل أنت متأكد من حذف المستوى "${level.title}"؟`}
                                    size="icon"
                                    customSize="h-8 w-8"
                                  />
                                </div>
                              </div>

                              {/* Lessons Table */}
                              <div className="mr-12 border-r-2 border-primary/20 pr-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h6 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-3 w-3" />
                                    الدروس ({level.lessons.length})
                                  </h6>
                                  <Button variant="ghost" size="sm" className="h-7">
                                    <Plus className="ml-1 h-3 w-3" />
                                    إضافة درس
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {level.lessons.map((lesson) => (
                                    <div
                                      key={lesson.id}
                                      className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/10 text-primary text-xs font-medium">
                                          {lesson.order}
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">{lesson.title}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {lesson.duration} دقيقة • {lesson.questions} سؤال
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <DeleteConfirmButton
                                          onConfirm={() => {
                                            setCourses(
                                              courses.map((c) =>
                                                c.id === course.id
                                                  ? {
                                                      ...c,
                                                      levels: c.levels.map((l) =>
                                                        l.id === level.id
                                                          ? {
                                                              ...l,
                                                              lessons: l.lessons.filter(
                                                                (les) => les.id !== lesson.id
                                                              ),
                                                            }
                                                          : l
                                                      ),
                                                    }
                                                  : c
                                              )
                                            )
                                          }}
                                          description={`هل أنت متأكد من حذف الدرس "${lesson.title}"؟`}
                                          size="icon"
                                          customSize="h-7 w-7"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </div>
    </div>
  )
}
