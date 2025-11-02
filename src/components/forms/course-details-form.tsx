'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/components/forms/form-field'
import { useToast } from '@/hooks/use-toast'
import { Save } from 'lucide-react'

const courseSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  category: z.string().min(1, 'اختر الفئة'),
  status: z.enum(['active', 'draft', 'archived']),
  duration: z.number().min(1, 'المدة يجب أن تكون على الأقل 1 دقيقة'),
  price: z.number().min(0, 'السعر يجب أن يكون موجب'),
  instructor: z.string().min(2, 'اسم المدرب مطلوب'),
})

type CourseFormData = z.infer<typeof courseSchema>

interface CourseDetailsFormProps {
  course: {
    id: string
    title: string
    description: string
    status: 'active' | 'draft' | 'archived'
    category: string
    duration: number
    price: number
    instructor: string
  }
}

export function CourseDetailsForm({ course }: CourseDetailsFormProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      category: course.category,
      status: course.status,
      duration: course.duration,
      price: course.price,
      instructor: course.instructor,
    },
  })

  const statusValue = watch('status')

  const onSubmit = async (data: CourseFormData) => {
    setIsSaving(true)
    try {
      // هنا سيتم إرسال البيانات للـ API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: 'تم الحفظ بنجاح',
        description: 'تم تحديث معلومات الدورة بنجاح',
      })
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'فشل في حفظ التغييرات',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="عنوان الدورة"
          error={errors.title?.message}
          required
        >
          <Input {...register('title')} placeholder="أدخل عنوان الدورة" />
        </FormField>

        <FormField
          label="الفئة"
          error={errors.category?.message}
          required
        >
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="تفاوض ودبلوماسية">تفاوض ودبلوماسية</SelectItem>
              <SelectItem value="ذكاء عاطفي">ذكاء عاطفي</SelectItem>
              <SelectItem value="تواصل">تواصل</SelectItem>
              <SelectItem value="قيادة">قيادة</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        label="وصف الدورة"
        error={errors.description?.message}
        required
      >
        <Textarea
          {...register('description')}
          placeholder="أدخل وصف الدورة"
          rows={4}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          label="المدة (دقيقة)"
          error={errors.duration?.message}
          required
        >
          <Input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            placeholder="125"
          />
        </FormField>

        <FormField
          label="السعر (ر.س)"
          error={errors.price?.message}
          required
        >
          <Input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="299"
          />
        </FormField>

        <FormField
          label="الحالة"
          error={errors.status?.message}
          required
        >
          <Select value={statusValue} onValueChange={(value) => setValue('status', value as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="archived">مؤرشف</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        label="المدرب"
        error={errors.instructor?.message}
        required
      >
        <Input {...register('instructor')} placeholder="أدخل اسم المدرب" />
      </FormField>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSaving}>
          <Save className="ml-2 h-4 w-4" />
          {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </form>
  )
}

