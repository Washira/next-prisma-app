'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import PostForm from '@/app/components/PostForm'

const Create = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/posts', { title, content, categoryId })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </div>
  )
}

export default Create
