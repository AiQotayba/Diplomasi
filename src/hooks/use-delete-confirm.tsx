'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface UseDeleteConfirmOptions {
  title?: string
  description?: string
  onConfirm: () => void
}

export function useDeleteConfirm({ title, description, onConfirm }: UseDeleteConfirmOptions) {
  const [isOpen, setIsOpen] = useState(false)

  const triggerDelete = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const DeleteDialog = () => (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'تأكيد الحذف'}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || 'هل أنت متأكد من رغبتك في الحذف؟ لا يمكن التراجع عن هذا الإجراء.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { triggerDelete, DeleteDialog }
}

