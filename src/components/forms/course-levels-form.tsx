'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Edit,
  FileText,
  Layers,
  GripVertical,
  Clock,
  PlayCircle,
  Image,
  Video,
  File,
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react'
import { DeleteConfirmButton } from '@/components/ui/delete-confirm-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { FormField } from '@/components/forms/form-field'

export interface Level {
  id: string
  title: string
  description?: string
  order: number
  isActive?: boolean
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description?: string
  order: number
  duration: number
  videoUrl?: string
  content?: string
  resources?: Resource[]
  isActive?: boolean
  type?: 'video' | 'reading' | 'interactive'
}

interface Resource {
  id: string
  name: string
  type: 'pdf' | 'image' | 'video' | 'document'
  url: string
}

interface CourseLevelsFormProps {
  courseId: string
  levels: Level[]
}

export function CourseLevelsForm({ courseId, levels: initialLevels }: CourseLevelsFormProps) {
  const [levels, setLevels] = useState<Level[]>(
    initialLevels.map((level) => ({
      ...level,
      isActive: true,
      lessons: level.lessons.map((lesson) => ({
        ...lesson,
        isActive: true,
        type: 'video' as const,
        content: '',
        resources: [],
      })),
    }))
  )
  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false)
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false)
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null)
  const [editingLevel, setEditingLevel] = useState<Level | null>(null)
  const [editingLesson, setEditingLesson] = useState<{ levelId: string; lesson: Lesson | null } | null>(null)

  const handleAddLevel = () => {
    setEditingLevel(null)
    setIsLevelDialogOpen(true)
  }

  const handleEditLevel = (level: Level) => {
    setEditingLevel(level)
    setIsLevelDialogOpen(true)
  }

  const handleAddLesson = (levelId: string) => {
    setSelectedLevelId(levelId)
    setEditingLesson({ levelId, lesson: null })
    setIsLessonDialogOpen(true)
  }

  const handleEditLesson = (levelId: string, lesson: Lesson) => {
    setSelectedLevelId(levelId)
    setEditingLesson({ levelId, lesson })
    setIsLessonDialogOpen(true)
  }

  const handleDeleteLevel = (levelId: string) => {
    setLevels(levels.filter((l) => l.id !== levelId))
  }

  const handleDeleteLesson = (levelId: string, lessonId: string) => {
    setLevels(
      levels.map((level) =>
        level.id === levelId
          ? { ...level, lessons: level.lessons.filter((l) => l.id !== lessonId) }
          : level
      )
    )
  }

  const handleToggleLevel = (levelId: string) => {
    setLevels(
      levels.map((level) =>
        level.id === levelId ? { ...level, isActive: !level.isActive } : level
      )
    )
  }

  const handleToggleLesson = (levelId: string, lessonId: string) => {
    setLevels(
      levels.map((level) =>
        level.id === levelId
          ? {
              ...level,
              lessons: level.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, isActive: !lesson.isActive } : lesson
              ),
            }
          : level
      )
    )
  }

  const handleSaveLevel = (data: { title: string; description: string; order: number }) => {
    if (editingLevel) {
      setLevels(
        levels.map((l) =>
          l.id === editingLevel.id ? { ...l, ...data } : l
        )
      )
    } else {
      const newLevel: Level = {
        id: `level-${Date.now()}`,
        title: data.title,
        description: data.description,
        order: data.order,
        isActive: true,
        lessons: [],
      }
      setLevels([...levels, newLevel].sort((a, b) => a.order - b.order))
    }
    setIsLevelDialogOpen(false)
    setEditingLevel(null)
  }

  const handleSaveLesson = (data: {
    title: string
    description: string
    order: number
    duration: number
    type: Lesson['type']
    videoUrl: string
    content: string
  }) => {
    if (!selectedLevelId) return

    if (editingLesson?.lesson) {
      setLevels(
        levels.map((level) =>
          level.id === selectedLevelId
            ? {
                ...level,
                lessons: level.lessons.map((l) =>
                  l.id === editingLesson.lesson!.id
                    ? { ...l, ...data, resources: editingLesson.lesson.resources }
                    : l
                ),
              }
            : level
        )
      )
    } else {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title: data.title,
        description: data.description,
        order: data.order,
        duration: data.duration,
        type: data.type,
        videoUrl: data.videoUrl,
        content: data.content,
        resources: [],
        isActive: true,
      }
      setLevels(
        levels.map((level) =>
          level.id === selectedLevelId
            ? {
                ...level,
                lessons: [...level.lessons, newLesson].sort((a, b) => a.order - b.order),
              }
            : level
        )
      )
    }
    setIsLessonDialogOpen(false)
    setSelectedLevelId(null)
    setEditingLesson(null)
  }

  const totalLessons = levels.reduce((sum, level) => sum + level.lessons.length, 0)
  const totalDuration = levels.reduce(
    (sum, level) =>
      sum + level.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration, 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المستويات</p>
                <p className="text-2xl font-bold">{levels.length}</p>
              </div>
              <Layers className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الدروس</p>
                <p className="text-2xl font-bold">{totalLessons}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المدة</p>
                <p className="text-2xl font-bold">{totalDuration}</p>
                <p className="text-xs text-muted-foreground">دقيقة</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الدروس النشطة</p>
                <p className="text-2xl font-bold">
                  {levels.reduce(
                    (sum, level) =>
                      sum + level.lessons.filter((l) => l.isActive).length,
                    0
                  )}
                </p>
              </div>
              <PlayCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Levels Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              إدارة المستويات والدروس
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              قم بإنشاء وإدارة مستويات الدورة ودروسها بشكل هرمي
            </p>
          </div>
          <Button onClick={handleAddLevel}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مستوى جديد
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {levels.map((level) => (
            <Card key={level.id} className="border-border/50">
              <AccordionItem value={level.id} className="border-0">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                        {level.order}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          {level.title}
                          {!level.isActive && (
                            <Badge variant="outline" className="text-xs">
                              مخفي
                            </Badge>
                          )}
                        </CardTitle>
                        {level.description && (
                          <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {level.lessons.length} درس
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {level.lessons.reduce((sum, l) => sum + l.duration, 0)} دقيقة
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleLevel(level.id)}
                        title={level.isActive ? 'إخفاء المستوى' : 'إظهار المستوى'}
                      >
                        {level.isActive ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <AccordionTrigger className="w-auto px-3" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditLevel(level)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                                    <DeleteConfirmButton
                                      onConfirm={() => handleDeleteLevel(level.id)}
                                      description={`هل أنت متأكد من حذف المستوى "${level.title}"؟ سيتم حذف جميع الدروس المرتبطة به.`}
                                      size="icon"
                                      customSize="h-8 w-8"
                                    />
                    </div>
                  </div>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-semibold flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          دروس المستوى ({level.lessons.length})
                        </h5>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddLesson(level.id)}
                        >
                          <Plus className="ml-2 h-3 w-3" />
                          إضافة درس
                        </Button>
                      </div>

                      {level.lessons.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground border rounded-lg">
                          لا توجد دروس في هذا المستوى
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {level.lessons.map((lesson) => (
                            <Card
                              key={lesson.id}
                              className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3 flex-1">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary text-sm font-medium mt-1">
                                      {lesson.order}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h6 className="font-semibold">{lesson.title}</h6>
                                        {!lesson.isActive && (
                                          <Badge variant="outline" className="text-xs">
                                            مخفي
                                          </Badge>
                                        )}
                                        <Badge
                                          variant="outline"
                                          className={
                                            lesson.type === 'video'
                                              ? 'bg-blue-500/10 text-blue-400'
                                              : lesson.type === 'interactive'
                                              ? 'bg-purple-500/10 text-purple-400'
                                              : 'bg-green-500/10 text-green-400'
                                          }
                                        >
                                          {lesson.type === 'video'
                                            ? 'فيديو'
                                            : lesson.type === 'interactive'
                                            ? 'تفاعلي'
                                            : 'قراءة'}
                                        </Badge>
                                      </div>
                                      {lesson.description && (
                                        <p className="text-sm text-muted-foreground mb-2">
                                          {lesson.description}
                                        </p>
                                      )}
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {lesson.duration} دقيقة
                                        </span>
                                        {lesson.videoUrl && (
                                          <span className="flex items-center gap-1">
                                            <Video className="h-3 w-3" />
                                            فيديو
                                          </span>
                                        )}
                                        {lesson.resources.length > 0 && (
                                          <span className="flex items-center gap-1">
                                            <File className="h-3 w-3" />
                                            {lesson.resources.length} مرفق
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleToggleLesson(level.id, lesson.id)}
                                      title={lesson.isActive ? 'إخفاء الدرس' : 'إظهار الدرس'}
                                    >
                                      {lesson.isActive ? (
                                        <Eye className="h-4 w-4" />
                                      ) : (
                                        <EyeOff className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditLesson(level.id, lesson)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <DeleteConfirmButton
                                      onConfirm={() => handleDeleteLesson(level.id, lesson.id)}
                                      description={`هل أنت متأكد من حذف الدرس "${lesson.title}"؟`}
                                      size="icon"
                                      customSize="h-7 w-7"
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>
      </div>

      {/* Level Dialog */}
      <LevelDialog
        open={isLevelDialogOpen}
        onOpenChange={setIsLevelDialogOpen}
        level={editingLevel}
        onSave={handleSaveLevel}
      />

      {/* Lesson Dialog */}
      <LessonDialog
        open={isLessonDialogOpen}
        onOpenChange={setIsLessonDialogOpen}
        lesson={editingLesson?.lesson || null}
        onSave={handleSaveLesson}
      />
    </div>
  )
}

function LevelDialog({
  open,
  onOpenChange,
  level,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  level: Level | null
  onSave: (data: { title: string; description: string; order: number }) => void
}) {
  const [title, setTitle] = useState(level?.title || '')
  const [description, setDescription] = useState(level?.description || '')
  const [order, setOrder] = useState(level?.order || 1)

  React.useEffect(() => {
    if (level) {
      setTitle(level.title)
      setDescription(level.description || '')
      setOrder(level.order)
    } else {
      setTitle('')
      setDescription('')
      setOrder(1)
    }
  }, [level, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, description, order })
    setTitle('')
    setDescription('')
    setOrder(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{level ? 'تعديل المستوى' : 'إضافة مستوى جديد'}</DialogTitle>
          <DialogDescription>أدخل معلومات المستوى التعليمي</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="عنوان المستوى" required>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: المستوى الأول: أساسيات التفاوض"
              required
            />
          </FormField>

          <FormField label="وصف المستوى (اختياري)">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر عن محتوى هذا المستوى..."
              rows={3}
            />
          </FormField>

          <FormField label="ترتيب المستوى" required>
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              min={1}
              required
            />
          </FormField>

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

function LessonDialog({
  open,
  onOpenChange,
  lesson,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  lesson: Lesson | null
  onSave: (data: {
    title: string
    description: string
    order: number
    duration: number
    type: Lesson['type']
    videoUrl: string
    content: string
  }) => void
}) {
  const [title, setTitle] = useState(lesson?.title || '')
  const [description, setDescription] = useState(lesson?.description || '')
  const [order, setOrder] = useState(lesson?.order || 1)
  const [duration, setDuration] = useState(lesson?.duration || 30)
  const [type, setType] = useState<Lesson['type']>(lesson?.type || 'video')
  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl || '')
  const [content, setContent] = useState(lesson?.content || '')

  React.useEffect(() => {
    if (lesson) {
      setTitle(lesson.title)
      setDescription(lesson.description || '')
      setOrder(lesson.order)
      setDuration(lesson.duration)
      setType(lesson.type)
      setVideoUrl(lesson.videoUrl || '')
      setContent(lesson.content || '')
    } else {
      setTitle('')
      setDescription('')
      setOrder(1)
      setDuration(30)
      setType('video')
      setVideoUrl('')
      setContent('')
    }
  }, [lesson, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, description, order, duration, type, videoUrl, content })
    setTitle('')
    setDescription('')
    setOrder(1)
    setDuration(30)
    setType('video')
    setVideoUrl('')
    setContent('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lesson ? 'تعديل الدرس' : 'إضافة درس جديد'}</DialogTitle>
          <DialogDescription>أدخل معلومات الدرس التعليمي</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="عنوان الدرس" required>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: مقدمة في التفاوض"
                required
              />
            </FormField>

            <FormField label="نوع الدرس" required>
              <Select value={type} onValueChange={(value) => setType(value as Lesson['type'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">فيديو</SelectItem>
                  <SelectItem value="reading">قراءة</SelectItem>
                  <SelectItem value="interactive">تفاعلي</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label="وصف الدرس (اختياري)">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر عن محتوى هذا الدرس..."
              rows={2}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="الترتيب" required>
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                min={1}
                required
              />
            </FormField>

            <FormField label="المدة (دقيقة)" required>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={1}
                required
              />
            </FormField>
          </div>

          {type === 'video' && (
            <FormField label="رابط الفيديو">
              <Input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://..."
              />
            </FormField>
          )}

          <FormField label="محتوى الدرس (اختياري)">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="المحتوى التعليمي للدرس..."
              rows={6}
            />
          </FormField>

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
