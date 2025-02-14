import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req }) => req.user && req.user.role === 'admin',
    create: ({ req }) => req.user && req.user.role === 'admin',
    update: ({ req }) => req.user && req.user.role === 'admin',
    delete: ({ req }) => req.user && req.user.role === 'admin',
  },
  fields: [
    // Role
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
        { label: "Editor", value: "editor" },
      ]
    }
  ],
}
