import type { User } from '~/db/users'
import { emailTokens } from '~/db/email-tokens'

export async function sendRegisterConfirmationEmail(user: User) {
  const insert = await db.insert(emailTokens).values({
    userId: user.id,
  }).returning()

  const token = insert[0].id

  const { public: { frontend: { url } } } = useRuntimeConfig()

  await mailTransport.sendMail({
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    to: user.email,
    subject: 'Confirmação de e-mail',
    // @ts-expect-error ignore this line
    template: 'register.confirmation.mail',
    context: {
      name: user.name,
      link: `${url}/auth/confirmar-email/${token}`,
    },
  })
}
