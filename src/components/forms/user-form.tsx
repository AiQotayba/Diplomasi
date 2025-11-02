'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/forms/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

const userFormSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().optional(),
  role: z.enum(['learner', 'manager', 'reviewer', 'support'], {
    required_error: 'يجب اختيار الدور',
  }),
  status: z.enum(['active', 'inactive', 'suspended'], {
    required_error: 'يجب اختيار الحالة',
  }),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function UserForm({ open, onOpenChange, onSuccess }: UserFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      status: 'active',
      role: 'learner',
    },
  })

  const roleValue = watch('role')
  const statusValue = watch('status')

  const onSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true)
    try {
      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة المستخدم بنجاح',
      })
      
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'فشل في إضافة المستخدم',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          <DialogDescription>أدخل معلومات المستخدم الجديد</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="الاسم الكامل" error={errors.name?.message} required>
            <Input {...register('name')} placeholder="أحمد محمد" />
          </FormField>

          <FormField label="البريد الإلكتروني" error={errors.email?.message} required>
            <Input type="email" {...register('email')} placeholder="ahmed@example.com" />
          </FormField>

          <FormField label="رقم الهاتف" error={errors.phone?.message}>
            <Input type="tel" {...register('phone')} placeholder="+966501234567" />
          </FormField>

          <FormField label="الدور" error={errors.role?.message} required>
            <Select value={roleValue} onValueChange={(value) => setValue('role', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="learner">متعلم</SelectItem>
                <SelectItem value="manager">مدير</SelectItem>
                <SelectItem value="reviewer">مراجع</SelectItem>
                <SelectItem value="support">دعم</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="الحالة" error={errors.status?.message} required>
            <Select value={statusValue} onValueChange={(value) => setValue('status', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'جاري الحفظ...' : 'إضافة'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

