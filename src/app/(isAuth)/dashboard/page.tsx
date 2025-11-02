'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, BookOpen, DollarSign, Star, Clock, Award, MessageCircle, Target, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageSkeleton } from '@/components/skeletons/page-skeleton'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Stats Data - مرتبط بمهارات الدبلوماسية
const stats = [
  {
    title: 'المتعلمون النشطون',
    value: '2,543',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'متعلمون يطورون مهاراتهم الدبلوماسية',
  },
  {
    title: 'الدورات المتاحة',
    value: '156',
    change: '+8.2%',
    changeType: 'positive',
    icon: BookOpen,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    description: 'برامج في التفاوض والإقناع',
  },
  {
    title: 'معدل إكمال المحتوى',
    value: '87.3%',
    change: '+5.1%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    description: 'التزام المتعلمين بالبرامج',
  },
  {
    title: 'إيرادات الاشتراكات',
    value: '45,230 ر.س',
    change: '+23.8%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    description: 'نمو مستمر في الاشتراكات',
  },
]

// Learning Points Chart Data - نقاط المهارة
const learningPointsData = [
  { month: 'أكتوبر', points: 32 },
  { month: 'مارس', points: 42.5 },
  { month: 'يوليو', points: 28 },
  { month: 'أغسطس', points: 38 },
]

// Course Progress Data - دورات دبلوماسية
const coursesInProgress = [
  {
    id: '1',
    name: 'فن التفاوض الفعال',
    category: 'مهارات التفاوض',
    icon: '🤝',
    progress: 75,
    color: 'bg-blue-500/10',
    description: 'تعلم أساسيات التفاوض الناجح',
  },
  {
    id: '2',
    name: 'الذكاء العاطفي في العمل',
    category: 'الذكاء العاطفي',
    icon: '🧠',
    progress: 60,
    color: 'bg-purple-500/10',
    description: 'فهم وإدارة المشاعر بشكل فعال',
  },
  {
    id: '3',
    name: 'فن الإقناع والتأثير',
    category: 'مهارات الإقناع',
    icon: '💬',
    progress: 85,
    color: 'bg-green-500/10',
    description: 'تقنيات الإقناع الأخلاقية',
  },
  {
    id: '4',
    name: 'إدارة الصراعات والحوار',
    category: 'إدارة الصراعات',
    icon: '⚖️',
    progress: 45,
    color: 'bg-orange-500/10',
    description: 'حل الخلافات بطرق دبلوماسية',
  },
]

// Learning Path Data - مسار تعليمي دبلوماسي
const learningPath = [
  {
    id: '1',
    name: 'مقدمة في الدبلوماسية الحديثة',
    hours: 12,
    students: 423,
    rating: 4.8,
    description: 'أساسيات الممارسة الدبلوماسية المعاصرة',
  },
  {
    id: '2',
    name: 'القائد الدبلوماسي',
    hours: 8,
    students: 648,
    rating: 4.9,
    description: 'مهارات القيادة بالحكمة والذكاء',
  },
  {
    id: '3',
    name: 'الاتصال الفعال عبر الثقافات',
    hours: 24,
    students: 562,
    rating: 4.7,
    description: 'التواصل مع مختلف الثقافات والخلفيات',
  },
]

// Featured Course - دورة مميزة للإدارة
const featuredCourse = {
  title: 'إتقان فن التفاوض الدبلوماسي',
  description:
    'دورة رائدة تتصدر قائمة الأكثر نجاحاً في المنصة. تُظهر معدلات إكمال عالية وتفاعلاً ممتازاً من المتعلمين. راجع التحليلات التفصيلية وأداء المحتوى، أو قم بتحديث المواد التعليمية.',
  rating: 4.9,
  learners: 1245,
  category: 'مهارات التفاوض المتقدمة',
  completionRate: '87%',
  engagementRate: '92%',
  newEnrollments: '+156 هذا الشهر',
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageSkeleton />
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            نظرة شاملة على أداء المنصة وإحصائيات المتعلمين والمحتوى التعليمي
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="hover-lift border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} ${stat.borderColor} border`}>
                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-400' : 'text-destructive'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground/70 hidden sm:block">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Featured Course Card */}
      <Card className="bg-gradient-blue border-none shadow-glow overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-8">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4 flex-wrap">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 md:h-5 md:w-5 fill-orange-400 text-orange-400"
                  />
                ))}
                <span className="text-white/90 font-medium text-sm md:text-base">{featuredCourse.rating}</span>
                <span className="text-white/70 text-xs md:text-sm">({featuredCourse.category})</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                {featuredCourse.title}
              </h2>
              <p className="text-white/80 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{featuredCourse.description}</p>
              
              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                  <div className="flex items-center gap-1 md:gap-2 mb-1">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-white/70" />
                    <p className="text-[10px] md:text-xs text-white/70">المتعلمون</p>
                  </div>
                  <p className="text-sm md:text-lg font-bold text-white">{featuredCourse.learners}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                  <div className="flex items-center gap-1 md:gap-2 mb-1">
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-white/70" />
                    <p className="text-[10px] md:text-xs text-white/70">معدل الإكمال</p>
                  </div>
                  <p className="text-sm md:text-lg font-bold text-white">{featuredCourse.completionRate}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                  <div className="flex items-center gap-1 md:gap-2 mb-1">
                    <Star className="h-3 w-3 md:h-4 md:w-4 text-white/70" />
                    <p className="text-[10px] md:text-xs text-white/70">التفاعل</p>
                  </div>
                  <p className="text-sm md:text-lg font-bold text-white">{featuredCourse.engagementRate}</p>
                </div>
              </div>

              {/* إحصائيات إضافية */}
              <div className="mb-4 md:mb-6 p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] md:text-xs text-white/70 mb-1">اشتراكات جديدة</p>
                <p className="text-xs md:text-sm font-medium text-green-300">{featuredCourse.newEnrollments}</p>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <button className="px-3 md:px-5 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-colors border border-white/20 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                  <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">إدارة المحتوى</span>
                  <span className="sm:hidden">المحتوى</span>
                </button>
                <button className="px-3 md:px-5 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-colors border border-white/20 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">تحليل الأداء</span>
                  <span className="sm:hidden">التحليل</span>
                </button>
                <button className="px-2 md:px-4 py-2 md:py-2.5 text-white/70 hover:text-white transition-colors text-xs md:text-sm border border-white/20 hover:border-white/30 rounded-lg">
                  <span className="hidden sm:inline">عرض المتعلمين</span>
                  <span className="sm:hidden">المتعلمون</span>
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
              <div className="relative text-8xl">🤝</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Course In Progress */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50">
          <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-sm md:text-lg">برامجك التعليمية قيد التقدم</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="space-y-2 md:space-y-3">
              {coursesInProgress.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-2 md:gap-4 p-3 md:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer border border-border/30"
                >
                  <div className={`text-xl md:text-2xl p-1.5 md:p-2 rounded-lg ${course.color} flex-shrink-0`}>
                    {course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base truncate">{course.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{course.category}</p>
                    <div className="mt-2 w-full bg-background rounded-full h-1.5 md:h-2">
                      <div
                        className="bg-primary h-1.5 md:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-accent" />
              <span className="text-sm md:text-lg">مسارك التعليمي</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="space-y-3 md:space-y-4">
              {learningPath.map((course) => (
                <div
                  key={course.id}
                  className="p-3 md:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer border border-border/30"
                >
                  <h4 className="font-medium text-sm md:text-base mb-1">{course.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.hours} ساعة
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {course.students} متعلم
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-orange-400 text-orange-400" />
                      <span className="text-xs md:text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Points Chart */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
          <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
            <span className="text-sm md:text-lg">تطور مهاراتك الدبلوماسية</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="mb-3 md:mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              تتبع تطورك في المهارات الدبلوماسية والتفاوضية على مدار الأشهر
            </p>
          </div>
          <div className="h-48 md:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningPointsData}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  labelFormatter={(value) => `الشهر: ${value}`}
                  formatter={(value: any) => [`${value} نقطة مهارة`, 'المستوى']}
                />
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="hsl(270, 70%, 60%)"
                  strokeWidth={2}
                  fill="url(#colorPoints)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 md:mt-4 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500" />
              <span>نمو المهارات الشهرية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity / Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <span className="text-xl md:text-2xl font-bold text-accent">342</span>
            </div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">الشهادات المُصدرة</h3>
            <p className="text-xs text-muted-foreground/70">إتمام البرامج التعليمية</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-primary">89</span>
            </div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">محتوى جديد هذا الشهر</h3>
            <p className="text-xs text-muted-foreground/70">دروس وبرامج حديثة</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <Heart className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
              <span className="text-xl md:text-2xl font-bold text-green-400">94%</span>
            </div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">معدل رضا المتعلمين</h3>
            <p className="text-xs text-muted-foreground/70">رضا عالي عن التجربة</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
