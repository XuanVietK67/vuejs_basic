// import { z } from 'zod'

// export const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, 'Name must be at least 2 characters'),

//     email: z
//       .string()
//       .email('Invalid email address'),

//     password: z
//       .string()
//       .min(6, 'Password must be at least 6 characters'),

//     confirmPassword: z
//       .string()
//       .min(6, 'Please confirm your password'),
//   })

//   .refine(
//     (data) => data.password === data.confirmPassword,
//     {
//       message: 'Passwords do not match',
//       path: ['confirmPassword'], 
//     }
//   )

// export type RegisterInput = z.infer<typeof registerSchema>

import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required and minium 2 characters'),

    email: z.string().email('Invalid email'),

    password: z.string().min(8, 'Minimum 8 characters'),

    confirmPassword: z.string(),

    acceptTerms: z.literal(true, {
      message: 'You must accept the Terms of Service',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type RegisterInput = z.infer<typeof registerSchema>