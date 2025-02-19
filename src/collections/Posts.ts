import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts', // コレクションの一意な識別子
  admin: {
    useAsTitle: 'title', // 管理画面でのタイトルに `title` フィールドを使用
    defaultColumns: ['title', 'author', 'publishedDate'], // デフォルトで表示するカラム
    listSearchableFields: ['title', 'author'], // 検索対象のフィールド
  },
  access: {
    read: () => true, // すべてのユーザーが閲覧可能
    create: ({ req }) => !!req.user, // 認証済みユーザーのみ作成可能
    update: ({ req }) => !!req.user, // 認証済みユーザーのみ更新可能
    delete: ({ req }) => !!req.user, // 認証済みユーザーのみ削除可能
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true, // 必須フィールド
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users', // ユーザーコレクションと紐付け
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly', // 日付ピッカーの表示
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft', // デフォルト値
    },
  ],
  timestamps: true, // `createdAt` と `updatedAt` を自動生成
};

export default Posts;
