'use client'

import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  FileEdit,
  Award,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'courses',
    title: 'الدورات',
    description: 'إدارة الدورات التعليمية بشكل هرمي متداخل - الدورات، المستويات، الدروس، والاختبارات',
    icon: BookOpen,
    href: '/manage/courses',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    features: ['إدارة شاملة هرمية', 'مستويات متعددة', 'دروس واختبارات', 'إحصائيات مفصلة'],
  },
  {
    id: 'lessons',
    title: 'الدروس',
    description: 'عرض وإدارة جميع الدروس من كل الدورات في مكان واحد للوصول السريع',
    icon: FileText,
    href: '/manage/lessons',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    features: ['عرض شامل لكل الدروس', 'بحث متقدم', 'فلترة حسب الدورة', 'تحرير سريع'],
  },
  {
    id: 'questions',
    title: 'الأسئلة',
    description: 'إدارة قاعدة بيانات شاملة لجميع أسئلة الاختبارات والامتحانات',
    icon: HelpCircle,
    href: '/manage/questions',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    features: ['قاعدة بيانات شاملة', 'فلترة متعددة', 'تصنيفات ذكية', 'إحصائيات'],
  },
  {
    id: 'articles',
    title: 'المقالات',
    description: 'إدارة المقالات التعليمية والمحتوى الإضافي للمنصة',
    icon: FileEdit,
    href: '/manage/articles',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    features: ['مقالات تعليمية', 'محتوى إضافي', 'تصنيفات وفئات', 'محرر غني'],
  },
  {
    id: 'certificates',
    title: 'الشهادات',
    description: 'إدارة وإصدار الشهادات للمتعلمين المكملين للدورات',
    icon: Award,
    href: '/manage/certificates',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    features: ['إصدار تلقائي', 'تصاميم قابلة للتخصيص', 'تتبع الإصدارات', 'تحميل PDF'],
  },
  {
    id: 'levels',
    title: 'المستويات',
    description: 'عرض جميع مستويات الدورات من كل الدورات في قائمة شاملة',
    icon: Layers,
    href: '/manage/levels',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    features: ['عرض شامل', 'فلترة حسب الدورة', 'ترتيب هرمي', 'إحصائيات'],
  },
]

export default function ManagePage() {
  return (
    <div className="p-6">
      <PageHeader
        title="استوديو المحتوى"
        description="مركز إدارة شامل لجميع المواد التعليمية والمنهجية - من الدورات إلى الشهادات"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link key={section.id} href={section.href}>
              <Card className="h-full border-border/50 bg-card/50 hover:shadow-modern hover:border-primary/50 transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`${section.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${section.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {section.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {section.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-[-4px] transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 rounded-lg border bg-card/50 p-6">
        <h3 className="text-lg font-semibold mb-2">💡 نصائح للاستخدام</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>قسم الدورات</strong> هو المكان الرئيسي للإدارة الهرمية - افتح دورة لعرض مستوياتها ودروسها واختباراتها
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              الأقسام الأخرى (<strong>الدروس، الأسئلة، المستويات</strong>) تعرض كل المحتوى في جداول شاملة للوصول السريع
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              استخدم البحث والفلترة للعثور على المحتوى بسرعة في الأقسام الشاملة
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
