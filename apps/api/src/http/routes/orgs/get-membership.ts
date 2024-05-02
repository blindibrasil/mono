import { auth } from '@/http/middlewares/auth'

import { z } from 'zod'
import { roleSchema } from '@blindi/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organization/:slug/membership',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const { membership } = await request.getUserMembership(slug)

        return reply.status(200).send({
          membership: {
            id: membership.id,
            role: membership.role,
            organizationId: membership.organizationId,
          },
        })
      },
    )
}
