'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import ConfirmDeleteModal from '@/app/components/ConfirmDeleteModal'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [postId, setPostId] = useState(null)

  // states for search, category, and sort
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [sort, setSort] = useState('desc')

  const fetchPosts = async () => {
    try {
      // URLSearchParams is a built-in class to handle query strings from objects
      const query = new URLSearchParams({ categoryId, search, sort }).toString()
      const res = await axios.get(`/api/posts?${query}`)
      setPosts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // เพิ่มการดึง category ผ่าน API เพื่อใช้สำหรับ filter
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const deletePost = async (id: Number| null) => {
    try {
      if (!id || id === null) return
      await axios.delete(`/api/posts/${id}`)
      fetchPosts()
    } catch (error) {
      console.error('Failed to delete the post', error)
    }
  }

  // Event handler for the Apply button
  const handleApplyFilters = () => {
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>

      {/* Search, category, and sort filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setPostId(post.id)
                      setShowModal(true)
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/create"
      >
        Create a New Post
      </Link>
      {showModal ? (
        <ConfirmDeleteModal id={postId} deletePost={deletePost} setShowModal={setShowModal} />
      ) : null}
    </div>
  )
}
