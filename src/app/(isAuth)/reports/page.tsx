'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Download, Calendar, TrendingUp, Users, BookOpen, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
} from 'recharts'

const monthlyData = [
  { month: 'يناير', users: 1200, courses: 45, revenue: 35000 },
  { month: 'فبراير', users: 1450, courses: 52, revenue: 42000 },
  { month: 'مارس', users: 1800, courses: 61, revenue: 51000 },
  { month: 'أبريل', users: 2100, courses: 68, revenue: 58000 },
  { month: 'مايو', users: 2400, courses: 75, revenue: 65000 },
  { month: 'يونيو', users: 2543, courses: 89, revenue: 72000 },
]

const courseCompletionData = [
  { name: 'فن التفاوض الدبلوماسي', completions: 450, rate: 87 },
  { name: 'الذكاء العاطفي', completions: 320, rate: 82 },
  { name: 'مهارات الإقناع', completions: 280, rate: 79 },
  { name: 'إدارة الصراعات', completions: 195, rate: 75 },
]

const planDistributionData = [
  { name: 'أساسي', value: 45, color: '#3b82f6' },
  { name: 'مميز', value: 35, color: '#a855f7' },
  { name: 'مؤسسي', value: 20, color: '#f59e0b' },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  return (
    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
      <PageHeader
        title="التقارير والتحليلات"
        description="عرض وتحليل بيانات المنصة وأداء المتعلمين"
        action={
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="ml-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">آخر أسبوع</SelectItem>
                <SelectItem value="month">آخر شهر</SelectItem>
                <SelectItem value="3months">آخر 3 أشهر</SelectItem>
                <SelectItem value="6months">آخر 6 أشهر</SelectItem>
                <SelectItem value="year">آخر سنة</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير PDF
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير CSV
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-400" />
              <span className="text-sm text-green-400">+12.5%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">نمو المستخدمين</p>
            <p className="text-2xl font-bold">+1,343</p>
            <p className="text-xs text-muted-foreground mt-1">في آخر 6 أشهر</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-purple-400" />
              <span className="text-sm text-green-400">+44</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">دورات جديدة</p>
            <p className="text-2xl font-bold">89</p>
            <p className="text-xs text-muted-foreground mt-1">هذا الشهر</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-accent" />
              <span className="text-sm text-green-400">+18.2%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">معدل إكمال</p>
            <p className="text-2xl font-bold">87.3%</p>
            <p className="text-xs text-muted-foreground mt-1">متوسط المنصة</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <span className="text-sm text-green-400">+23.8%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">النمو الشهري</p>
            <p className="text-2xl font-bold">313,000</p>
            <p className="text-xs text-muted-foreground mt-1">ر.س إجمالي الإيرادات</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Growth Chart */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">نمو المنصة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(210, 100%, 50%)"
                    strokeWidth={2}
                    name="المستخدمون"
                  />
                  <Line
                    type="monotone"
                    dataKey="courses"
                    stroke="hsl(270, 70%, 60%)"
                    strokeWidth={2}
                    name="الدورات"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">الإيرادات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()} ر.س`, 'الإيرادات']}
                  />
                  <Bar dataKey="revenue" fill="hsl(142, 70%, 50%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Completion & Plan Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course Completion */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">أداء الدورات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseCompletionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="completions" fill="hsl(210, 100%, 50%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">توزيع خطط الاشتراك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              {planDistributionData.map((plan) => (
                <div key={plan.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                  <span className="text-sm text-muted-foreground">{plan.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
