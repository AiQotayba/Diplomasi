'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Edit, HelpCircle, FileText } from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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

interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  lessonId: string
  lessonTitle: string
}

interface CourseQuestionsFormProps {
  courseId: string
  questions: Question[]
}

const typeLabels: Record<Question['type'], string> = {
  'multiple-choice': 'اختيار متعدد',
  'true-false': 'صح/خطأ',
  'short-answer': 'إجابة قصيرة',
}

const difficultyColors: Record<Question['difficulty'], string> = {
  easy: 'bg-success/10 text-success',
  medium: 'bg-warning/10 text-warning',
  hard: 'bg-destructive/10 text-destructive',
}

const difficultyLabels: Record<Question['difficulty'], string> = {
  easy: 'سهل',
  medium: 'متوسط',
  hard: 'صعب',
}

export function CourseQuestionsForm({
  courseId,
  questions: initialQuestions,
}: CourseQuestionsFormProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const handleAddQuestion = () => {
    setEditingQuestion(null)
    setIsDialogOpen(true)
  }

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setIsDialogOpen(true)
  }

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  const handleSaveQuestion = (data: {
    text: string
    type: Question['type']
    difficulty: Question['difficulty']
    points: number
    lessonId: string
    lessonTitle: string
  }) => {
    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id ? { ...q, ...data } : q
        )
      )
    } else {
      const newQuestion: Question = {
        id: `question-${Date.now()}`,
        ...data,
      }
      setQuestions([...questions, newQuestion])
    }
    setIsDialogOpen(false)
    setEditingQuestion(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          الأسئلة ({questions.length})
        </h4>
        <Button onClick={handleAddQuestion} variant="outline" size="sm">
          <Plus className="ml-2 h-4 w-4" />
          إضافة سؤال
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          لا توجد أسئلة. أضف سؤالاً جديداً
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>السؤال</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الدرس</TableHead>
                <TableHead>الصعوبة</TableHead>
                <TableHead>النقاط</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium max-w-md">
                    <p className="line-clamp-2">{question.text}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeLabels[question.type]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="max-w-xs truncate">{question.lessonTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficultyColors[question.difficulty]}>
                      {difficultyLabels[question.difficulty]}
                    </Badge>
                  </TableCell>
                  <TableCell>{question.points}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmButton
                        onConfirm={() => handleDeleteQuestion(question.id)}
                        description={`هل أنت متأكد من حذف هذا السؤال؟`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <QuestionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        question={editingQuestion}
        onSave={handleSaveQuestion}
      />
    </div>
  )
}

function QuestionDialog({
  open,
  onOpenChange,
  question,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
  onSave: (data: {
    text: string
    type: Question['type']
    difficulty: Question['difficulty']
    points: number
    lessonId: string
    lessonTitle: string
  }) => void
}) {
  const [text, setText] = useState(question?.text || '')
  const [type, setType] = useState<Question['type']>(question?.type || 'multiple-choice')
  const [difficulty, setDifficulty] = useState<Question['difficulty']>(
    question?.difficulty || 'easy'
  )
  const [points, setPoints] = useState(question?.points || 5)
  const [lessonId, setLessonId] = useState(question?.lessonId || '')
  const [lessonTitle, setLessonTitle] = useState(question?.lessonTitle || '')

  React.useEffect(() => {
    if (question) {
      setText(question.text)
      setType(question.type)
      setDifficulty(question.difficulty)
      setPoints(question.points)
      setLessonId(question.lessonId)
      setLessonTitle(question.lessonTitle)
    } else {
      setText('')
      setType('multiple-choice')
      setDifficulty('easy')
      setPoints(5)
      setLessonId('')
      setLessonTitle('')
    }
  }, [question, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ text, type, difficulty, points, lessonId, lessonTitle })
    setText('')
    setType('multiple-choice')
    setDifficulty('easy')
    setPoints(5)
    setLessonId('')
    setLessonTitle('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{question ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</DialogTitle>
          <DialogDescription>أدخل معلومات السؤال</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="نص السؤال" required>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="نوع السؤال" required>
              <Select value={type} onValueChange={(value) => setType(value as Question['type'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">اختيار متعدد</SelectItem>
                  <SelectItem value="true-false">صح/خطأ</SelectItem>
                  <SelectItem value="short-answer">إجابة قصيرة</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="الصعوبة" required>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as Question['difficulty'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">سهل</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="hard">صعب</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="النقاط" required>
              <Input
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                min={1}
                required
              />
            </FormField>

            <FormField label="الدرس" required>
              <Input
                value={lessonTitle}
                onChange={(e) => {
                  setLessonTitle(e.target.value)
                  setLessonId(`lesson-${Date.now()}`)
                }}
                placeholder="اسم الدرس"
                required
              />
            </FormField>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

