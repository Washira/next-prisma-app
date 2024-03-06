const PostForm = (
  {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    handleSubmit,
    buttonText
  }
  : {
    title: string,
    setTitle: (title: string) => void,
    content: string,
    setContent: (content: string) => void,
    category: string,
    setCategory: (category: string) => void,
    handleSubmit: (e: React.FormEvent) => void,
    buttonText: string
  }
) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-lg"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="space-x-2">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {/* Example static categories, replace or populate dynamically */}
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
        <div></div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonText || 'Submit'}
          </button>
        </div>
      </form>
  )
}

export default PostForm
