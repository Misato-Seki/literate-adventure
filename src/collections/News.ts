import { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News',
    plural: 'News',
  },
  admin: {
    useAsTitle: 'title', // 管理画面でのタイトルに `title` フィールドを使用
    defaultColumns: ['title', 'author', 'status', 'publishedDate', 'requireApproval'], // デフォルトで表示するカラム
    listSearchableFields: ['title', 'author', 'status', 'publishedDate', 'requireApproval'], // 検索対象のフィールド
  },
  access: {
    read: () => true, // All users
    create: ({ req }) => !!req.user, // 認証済みユーザーのみ作成可能
    update: ({ req, data }) => {
      if(!req.user) return false;
      if(req.user.role === 'admin' || req.user.role === "moderator") return true;
      if(req.user.role === 'editor') return data?.author === req.user.email; // Only own article
      return false
    },
    delete: ({ req }) => {
      if(req.user && (req.user.role === 'admin' || req.user.role === 'moderator')) return true;
      return false // 認証済みユーザーのみ削除可能
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'text',
      label: 'Text',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft', // デフォルト値
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if(value === 'published' && req.user?.role === 'editor') {
              throw new Error('Editor cannot publish')
            }
            return value
          }
        ]
      },
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        hidden: true
      },
      required: true,
    },
    {
      name: "tag",
      type: "select",
      options: [
        { label: "Tech", value: "tech" },
        { label: "Culture", value: "culture" },
        { label: "Politics", value: "politics" },
      ],
      hasMany: true
    }
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if(req.user) {
          const updatedData: {author?: string; publishedDate?: Date} = {
            ...data
          }

          if(!data.author) {
            updatedData.author = req.user.email
          }

          if(data.status === 'published' && !data.publishedDate) {
            updatedData.publishedDate = new Date()
          } 
          return updatedData
        }
        return data
      }
    ]
  },
}