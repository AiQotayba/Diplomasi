'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Search, Award, Download, Eye, Calendar } from 'lucide-react'
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

interface Certificate {
  id: string
  learnerName: string
  courseTitle: string
  issuedAt: string
  status: 'issued' | 'pending' | 'revoked'
  certificateNumber: string
  downloadCount: number
  verified: boolean
}

const statusLabels: Record<Certificate['status'], string> = {
  issued: 'صادر',
  pending: 'قيد الانتظار',
  revoked: 'ملغي',
}

const statusColors: Record<Certificate['status'], string> = {
  issued: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  revoked: 'bg-destructive/10 text-destructive',
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCertificates([
        {
          id: '1',
          learnerName: 'أحمد محمد',
          courseTitle: 'فن التفاوض الدبلوماسي',
          issuedAt: '2024-01-15',
          status: 'issued',
          certificateNumber: 'DIP-2024-001',
          downloadCount: 3,
          verified: true,
        },
        {
          id: '2',
          learnerName: 'فاطمة علي',
          courseTitle: 'الذكاء العاطفي في العمل',
          issuedAt: '2024-01-20',
          status: 'issued',
          certificateNumber: 'DIP-2024-002',
          downloadCount: 1,
          verified: true,
        },
        {
          id: '3',
          learnerName: 'محمد حسن',
          courseTitle: 'فن التفاوض الدبلوماسي',
          issuedAt: '2024-01-25',
          status: 'pending',
          certificateNumber: 'DIP-2024-003',
          downloadCount: 0,
          verified: false,
        },
      ])
      setIsLoading(false)
    }

    fetchCertificates()
  }, [])

  const filteredCertificates = certificates.filter((certificate) => {
    const matchesSearch =
      certificate.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || certificate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <PageHeader
        title="الشهادات"
        description="إدارة وإصدار الشهادات للمتعلمين المكملين للدورات"
        action={
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إصدار شهادة جديدة
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
                placeholder="ابحث في الشهادات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="issued">صادر</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="revoked">ملغي</SelectItem>
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
                <p className="text-sm text-muted-foreground mb-1">إجمالي الشهادات</p>
                <p className="text-2xl font-bold">{certificates.length}</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">شهادات صادرة</p>
                <p className="text-2xl font-bold">
                  {certificates.filter((c) => c.status === 'issued').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">قيد الانتظار</p>
                <p className="text-2xl font-bold">
                  {certificates.filter((c) => c.status === 'pending').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الشهادات المطابقة</p>
                <p className="text-2xl font-bold">{filteredCertificates.length}</p>
              </div>
              <Search className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Table */}
      <div className="rounded-lg border bg-card shadow-modern">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} />
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all' ? 'لا توجد نتائج للبحث' : 'لا توجد شهادات'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إصدار أول شهادة
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>المتعلم</TableHead>
                  <TableHead>الدورة</TableHead>
                  <TableHead>رقم الشهادة</TableHead>
                  <TableHead>تاريخ الإصدار</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التحقق</TableHead>
                  <TableHead>التحميلات</TableHead>
                  <TableHead className="text-center w-[150px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((certificate, index) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{certificate.learnerName}</TableCell>
                    <TableCell>{certificate.courseTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{certificate.certificateNumber}</Badge>
                    </TableCell>
                    <TableCell>{certificate.issuedAt}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[certificate.status]}>
                        {statusLabels[certificate.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          certificate.verified
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {certificate.verified ? 'مؤكد' : 'غير مؤكد'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{certificate.downloadCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="تحميل">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmButton
                          onConfirm={() => {
                            // Handle delete
                            console.log('Delete certificate', certificate.id)
                          }}
                          description={`هل أنت متأكد من حذف الشهادة "${certificate.certificateNumber}"؟`}
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
