import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages', // コレクションのスラッグ（識別子）
  admin: {
    useAsTitle: 'title', // 管理画面でのタイトルに `title` フィールドを使用
    defaultColumns: ['title', 'slug', 'publishedDate'], // デフォルトの表示カラム
    listSearchableFields: ['title', 'slug'], // 検索可能なフィールド
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // 一意のスラッグを保証
      admin: {
        position: 'sidebar', // 管理画面のサイドバーに表示
      },
    },
    {
      name: 'content',
      type: 'richText',
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
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // `media` コレクションと紐付け
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
  ],
  timestamps: true, // `createdAt` と `updatedAt` を自動生成
};

export default Pages;
