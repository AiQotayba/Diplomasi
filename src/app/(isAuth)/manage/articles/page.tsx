'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, FileEdit, Eye, Calendar } from 'lucide-react'
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

interface Article {
  id: string
  title: string
  content: string
  category: 'diplomacy' | 'negotiation' | 'communication' | 'general'
  status: 'published' | 'draft'
  views: number
  author: string
  createdAt: string
  updatedAt: string
}

const categoryLabels: Record<Article['category'], string> = {
  diplomacy: 'دبلوماسية',
  negotiation: 'تفاوض',
  communication: 'تواصل',
  general: 'عام',
}

const categoryColors: Record<Article['category'], string> = {
  diplomacy: 'bg-primary/10 text-primary',
  negotiation: 'bg-purple-500/10 text-purple-400',
  communication: 'bg-accent/10 text-accent',
  general: 'bg-muted text-muted-foreground',
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setArticles([
        {
          id: '1',
          title: 'أسس الدبلوماسية الحديثة',
          content: 'مقال شامل عن مبادئ الدبلوماسية المعاصرة وأهميتها في العلاقات الدولية...',
          category: 'diplomacy',
          status: 'published',
          views: 1245,
          author: 'أحمد محمد',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20',
        },
        {
          id: '2',
          title: 'تقنيات التفاوض الفعال',
          content: 'كيفية تطبيق استراتيجيات التفاوض الناجحة في المواقف المختلفة...',
          category: 'negotiation',
          status: 'published',
          views: 980,
          author: 'فاطمة علي',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-18',
        },
        {
          id: '3',
          title: 'الذكاء العاطفي في التواصل',
          content: 'دور الذكاء العاطفي في تحسين مهارات التواصل الشخصي والمهني...',
          category: 'communication',
          status: 'draft',
          views: 0,
          author: 'محمد حسن',
          createdAt: '2024-01-17',
          updatedAt: '2024-01-17',
        },
      ])
      setIsLoading(false)
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="p-6">
      <PageHeader
        title="المقالات"
        description="إدارة المقالات التعليمية والمحتوى الإضافي للمنصة"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مقال جديد
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
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="diplomacy">دبلوماسية</SelectItem>
                <SelectItem value="negotiation">تفاوض</SelectItem>
                <SelectItem value="communication">تواصل</SelectItem>
                <SelectItem value="general">عام</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="published">منشور</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
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
                <p className="text-sm text-muted-foreground mb-1">إجمالي المقالات</p>
                <p className="text-2xl font-bold">{articles.length}</p>
              </div>
              <FileEdit className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">مقالات منشورة</p>
                <p className="text-2xl font-bold">
                  {articles.filter((a) => a.status === 'published').length}
                </p>
              </div>
              <FileEdit className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold">
                  {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المقالات المطابقة</p>
                <p className="text-2xl font-bold">{filteredArticles.length}</p>
              </div>
              <Search className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'لا توجد نتائج للبحث'
                : 'لا توجد مقالات'}
            </p>
            {!searchQuery && categoryFilter === 'all' && statusFilter === 'all' && (
              <Button variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إضافة أول مقال
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>المحتوى</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>المشاهدات</TableHead>
                  <TableHead>الكاتب</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>آخر تحديث</TableHead>
                  <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article, index) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.content}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[article.category]}>
                        {categoryLabels[article.category]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          article.status === 'published'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.createdAt}</TableCell>
                    <TableCell>{article.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete article', article.id)
                          }}
                          description={`هل أنت متأكد من حذف المقال "${article.title}"؟`}
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
