'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import {
    ArrowRight,
    Edit,
    Save,
    BookOpen,
    Users,
    HelpCircle,
    FileText,
    Layers,
    Settings,
    Award,
    BarChart3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { CourseDetailsForm } from '@/components/forms/course-details-form'
import { CourseLevelsForm, type Level, type Lesson } from '@/components/forms/course-levels-form'
import { CourseQuestionsForm } from '@/components/forms/course-questions-form'
import { CourseStudentsForm } from '@/components/forms/course-students-form'

interface Course {
    id: string
    title: string
    description: string
    status: 'active' | 'draft' | 'archived'
    learners: number
    completionRate: number
    category: string
    duration: number
    price: number
    instructor: string
    levels: Level[]
    students: Student[]
    questions: Question[]
}

interface Student {
    id: string
    name: string
    email: string
    progress: number
    status: 'active' | 'completed' | 'inactive'
    enrolledAt: string
}

interface Question {
    id: string
    text: string
    type: 'multiple-choice' | 'true-false' | 'short-answer'
    difficulty: 'easy' | 'medium' | 'hard'
    points: number
    lessonId: string
    lessonTitle: string
}

export default function CourseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string
    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setCourse({
                id: courseId,
                title: 'فن التفاوض الدبلوماسي',
                description: 'دورة شاملة لتعلم مهارات التفاوض والدبلوماسية المتقدمة',
                status: 'active',
                learners: 1245,
                completionRate: 87,
                category: 'تفاوض ودبلوماسية',
                duration: 125,
                price: 299,
                instructor: 'د. أحمد محمد',
                levels: [
                    {
                        id: '1-1',
                        title: 'المستوى الأول: أساسيات التفاوض',
                        order: 1,
                        isActive: true,
                        lessons: [
                            {
                                id: '1-1-1',
                                title: 'مقدمة في التفاوض',
                                order: 1,
                                duration: 30,
                                isActive: true,
                                type: 'video',
                            },
                            {
                                id: '1-1-2',
                                title: 'أنواع التفاوض',
                                order: 2,
                                duration: 45,
                                isActive: true,
                                type: 'video',
                            },
                        ],
                    },
                    {
                        id: '1-2',
                        title: 'المستوى الثاني: تقنيات متقدمة',
                        order: 2,
                        isActive: true,
                        lessons: [
                            {
                                id: '1-2-1',
                                title: 'استراتيجيات الإقناع',
                                order: 1,
                                duration: 50,
                                isActive: true,
                                type: 'interactive',
                            },
                        ],
                    },
                ],
                students: [
                    {
                        id: 's1',
                        name: 'أحمد محمد',
                        email: 'ahmed@example.com',
                        progress: 75,
                        status: 'active',
                        enrolledAt: '2024-01-15',
                    },
                    {
                        id: 's2',
                        name: 'فاطمة علي',
                        email: 'fatima@example.com',
                        progress: 100,
                        status: 'completed',
                        enrolledAt: '2024-01-10',
                    },
                    {
                        id: 's3',
                        name: 'محمد حسن',
                        email: 'mohammed@example.com',
                        progress: 45,
                        status: 'active',
                        enrolledAt: '2024-01-20',
                    },
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'ما هي أول خطوة في عملية التفاوض الناجح؟',
                        type: 'multiple-choice',
                        difficulty: 'easy',
                        points: 5,
                        lessonId: '1-1-1',
                        lessonTitle: 'مقدمة في التفاوض',
                    },
                    {
                        id: 'q2',
                        text: 'التفاوض هو عملية تواصل بين طرفين فقط',
                        type: 'true-false',
                        difficulty: 'medium',
                        points: 3,
                        lessonId: '1-1-2',
                        lessonTitle: 'أنواع التفاوض',
                    },
                ],
            })
            setIsLoading(false)
        }

        if (courseId) {
            fetchCourse()
        }
    }, [courseId])

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

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="mb-6">
                    <Button variant="ghost" onClick={() => router.push('/manage/courses')}>
                        <ArrowRight className="ml-2 h-4 w-4" />
                        العودة للدورات
                    </Button>
                </div>
                <TableSkeleton rows={5} />
            </div>
        )
    }

    if (!course) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">الدورة غير موجودة</p>
                    <Button onClick={() => router.push('/manage/courses')}>العودة للدورات</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" onClick={() => router.push('/manage/courses')} className="mb-4">
                    <ArrowRight className="ml-2 h-4 w-4" />
                    العودة للدورات
                </Button>
                <PageHeader
                    title={course.title}
                    description={course.description}
                    action={
                        <Badge className={statusColors[course.status]}>
                            {statusLabels[course.status]}
                        </Badge>
                    }
                />
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">المتعلمون</p>
                                <p className="text-2xl font-bold">{course.learners.toLocaleString()}</p>
                            </div>
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">معدل الإكمال</p>
                                <p className="text-2xl font-bold">{course.completionRate}%</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">المستويات</p>
                                <p className="text-2xl font-bold">{course.levels.length}</p>
                            </div>
                            <Layers className="h-8 w-8 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">الأسئلة</p>
                                <p className="text-2xl font-bold">{course.questions.length}</p>
                            </div>
                            <HelpCircle className="h-8 w-8 text-accent" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full" >
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="details">
                        <Edit className="ml-2 h-4 w-4" />
                        تفاصيل الدورة
                    </TabsTrigger>
                    <TabsTrigger value="levels">
                        <Layers className="ml-2 h-4 w-4" />
                        المستويات والدروس
                    </TabsTrigger>
                    <TabsTrigger value="questions">
                        <HelpCircle className="ml-2 h-4 w-4" />
                        الأسئلة
                    </TabsTrigger>
                    <TabsTrigger value="students">
                        <Users className="ml-2 h-4 w-4" />
                        المتعلمون
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                        <BarChart3 className="ml-2 h-4 w-4" />
                        التحليلات
                    </TabsTrigger>
                </TabsList>

                {/* Tab: Course Details */}
                <TabsContent value="details" className="mt-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>معلومات الدورة</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CourseDetailsForm course={course} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Levels & Lessons */}
                <TabsContent value="levels" className="mt-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>المستويات والدروس</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CourseLevelsForm courseId={course.id} levels={course.levels} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Questions */}
                <TabsContent value="questions" className="mt-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>أسئلة الدورة</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CourseQuestionsForm courseId={course.id} questions={course.questions} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Students */}
                <TabsContent value="students" className="mt-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>المتعلمون المسجلون</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CourseStudentsForm courseId={course.id} students={course.students} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Analytics */}
                <TabsContent value="analytics" className="mt-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>تحليلات الأداء</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card className="bg-muted/50">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-muted-foreground mb-1">معدل الإكمال</p>
                                            <p className="text-2xl font-bold">{course.completionRate}%</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-muted/50">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-muted-foreground mb-1">المتعلمون النشطون</p>
                                            <p className="text-2xl font-bold">
                                                {course.students.filter((s) => s.status === 'active').length}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-muted/50">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-muted-foreground mb-1">المكملون</p>
                                            <p className="text-2xl font-bold">
                                                {course.students.filter((s) => s.status === 'completed').length}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <h4 className="font-semibold mb-4">توزيع التقدم</h4>
                                    <div className="space-y-2">
                                        {course.students.map((student) => (
                                            <div key={student.id} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span>{student.name}</span>
                                                    <span>{student.progress}%</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all"
                                                        style={{ width: `${student.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

