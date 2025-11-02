'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, BookOpen } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface GlossaryTerm {
  id: string
  termArabic: string
  termEnglish: string
  definitionArabic: string
  definitionEnglish: string
  category: 'diplomacy' | 'negotiation' | 'communication' | 'protocol' | 'other'
  createdAt: string
}

const categoryLabels: Record<GlossaryTerm['category'], string> = {
  diplomacy: 'دبلوماسية',
  negotiation: 'تفاوض',
  communication: 'تواصل',
  protocol: 'بروتوكول',
  other: 'أخرى',
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchTerms = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTerms([
        {
          id: '1',
          termArabic: 'دبلوماسية',
          termEnglish: 'Diplomacy',
          definitionArabic: 'فن إدارة العلاقات الدولية من خلال التفاوض والحوار',
          definitionEnglish: 'The art of managing international relations through negotiation and dialogue',
          category: 'diplomacy',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          termArabic: 'تفاوض',
          termEnglish: 'Negotiation',
          definitionArabic: 'عملية التوصل إلى اتفاق بين طرفين أو أكثر',
          definitionEnglish: 'The process of reaching an agreement between two or more parties',
          category: 'negotiation',
          createdAt: '2024-01-14',
        },
        {
          id: '3',
          termArabic: 'إقناع',
          termEnglish: 'Persuasion',
          definitionArabic: 'القدرة على التأثير في آراء الآخرين وسلوكهم',
          definitionEnglish: 'The ability to influence others\' opinions and behavior',
          category: 'communication',
          createdAt: '2024-01-13',
        },
        {
          id: '4',
          termArabic: 'بروتوكول دبلوماسي',
          termEnglish: 'Diplomatic Protocol',
          definitionArabic: 'قواعد السلوك والأدب في العلاقات الدبلوماسية',
          definitionEnglish: 'Rules of conduct and etiquette in diplomatic relations',
          category: 'protocol',
          createdAt: '2024-01-12',
        },
      ])
      setIsLoading(false)
    }

    fetchTerms()
  }, [])

  const filteredTerms = terms.filter(
    (term) =>
      term.termArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.termEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definitionArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definitionEnglish.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddTerm = () => {
    setEditingTerm(null)
    setIsFormOpen(true)
  }

  const handleEditTerm = (term: GlossaryTerm) => {
    setEditingTerm(term)
    setIsFormOpen(true)
  }

  const handleDeleteTerm = (id: string) => {
    setTerms(terms.filter((term) => term.id !== id))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا سيتم إرسال البيانات للـ API
    setIsFormOpen(false)
    setEditingTerm(null)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <PageHeader
            title="المسرد"
            description="إدارة المصطلحات والتعريفات ثنائية اللغة (عربي/إنجليزي)"
            action={
              <Button onClick={handleAddTerm}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مصطلح جديد
              </Button>
            }
          />

          {/* Search Bar */}
          <Card className="border-border/50 bg-card/50 mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="بحث في المصطلحات (عربي/إنجليزي)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">إجمالي المصطلحات</p>
                    <p className="text-2xl font-bold">{terms.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">المصطلحات المطابقة</p>
                    <p className="text-2xl font-bold">{filteredTerms.length}</p>
                  </div>
                  <Search className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الفئات</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terms Table */}
          <div className="rounded-lg border bg-card shadow-modern">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton rows={5} />
              </div>
            ) : filteredTerms.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'لا توجد نتائج للبحث' : 'لا توجد مصطلحات'}
                </p>
                {!searchQuery && (
                  <Button onClick={handleAddTerm} variant="outline">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة أول مصطلح
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>المصطلح (عربي)</TableHead>
                      <TableHead>المصطلح (إنجليزي)</TableHead>
                      <TableHead>التعريف (عربي)</TableHead>
                      <TableHead>التعريف (إنجليزي)</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>تاريخ الإضافة</TableHead>
                      <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTerms.map((term, index) => (
                      <TableRow key={term.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{term.termArabic}</TableCell>
                        <TableCell className="font-medium">{term.termEnglish}</TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-xs">
                            {term.definitionArabic}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-xs">
                            {term.definitionEnglish}
                          </p>
                        </TableCell>
                        <TableCell>{categoryLabels[term.category]}</TableCell>
                        <TableCell>{term.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditTerm(term)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DeleteConfirmButton
                              onConfirm={() => handleDeleteTerm(term.id)}
                              description={`هل أنت متأكد من حذف المصطلح "${term.termArabic}"؟`}
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

      {/* Add/Edit Term Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTerm ? 'تعديل المصطلح' : 'إضافة مصطلح جديد'}</DialogTitle>
            <DialogDescription>
              أضف أو عدل المصطلح باللغتين العربية والإنجليزية
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="term-arabic">المصطلح (عربي) *</Label>
                <Input
                  id="term-arabic"
                  defaultValue={editingTerm?.termArabic}
                  required
                  placeholder="أدخل المصطلح بالعربية"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term-english">المصطلح (إنجليزي) *</Label>
                <Input
                  id="term-english"
                  defaultValue={editingTerm?.termEnglish}
                  required
                  placeholder="Enter term in English"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="definition-arabic">التعريف (عربي) *</Label>
              <Textarea
                id="definition-arabic"
                defaultValue={editingTerm?.definitionArabic}
                required
                placeholder="أدخل التعريف بالعربية"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="definition-english">التعريف (إنجليزي) *</Label>
              <Textarea
                id="definition-english"
                defaultValue={editingTerm?.definitionEnglish}
                required
                placeholder="Enter definition in English"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">الفئة *</Label>
              <Select defaultValue={editingTerm?.category || 'other'}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diplomacy">دبلوماسية</SelectItem>
                  <SelectItem value="negotiation">تفاوض</SelectItem>
                  <SelectItem value="communication">تواصل</SelectItem>
                  <SelectItem value="protocol">بروتوكول</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">
                {editingTerm ? 'حفظ التعديلات' : 'إضافة المصطلح'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
