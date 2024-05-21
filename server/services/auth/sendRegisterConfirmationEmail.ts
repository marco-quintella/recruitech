import { emailTokens } from '~/db/email-tokens'
import type { User } from '~/db/users'

export async function sendRegisterConfirmationEmail(user: User) {
  const insert = await db.insert(emailTokens).values({
    userId: user.id,
  }).returning()

  const token = insert[0].id

  const { public: { frontend: { url } } } = useRuntimeConfig()

  mailTransport.sendMail({
    // @ts-expect-error ignore this line due to hbs plugin
    context: {
      link: `${url}/auth/confirmar-email/${token}`,
      name: user.name,
    },
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    subject: 'Confirmação de e-mail',
    template: 'register.confirmation.mail',
    to: user.email,
  })
}
