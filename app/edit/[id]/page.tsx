'use client'

import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import PostForm from '@/app/components/PostForm'

const Edit = ({ params }: { params: { id: string }}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()
  const { id } = params

  const fetchPost = useCallback(async (id: Number) => {
    try {
      const res = await axios.get(`/api/posts/${id}`)
      setTitle(res.data.title)
      setContent(res.data.content)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await axios.put(`/api/posts/${id}`, {
        title,
        content,
      })
      router.push('/')
      setTitle('')
      setContent('')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Post ID: {id}</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </div>
  )
}

export default Edit
