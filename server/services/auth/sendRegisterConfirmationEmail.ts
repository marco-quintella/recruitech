import type { users } from '@prisma/client'

export async function sendRegisterConfirmationEmail(user: users) {
  const insert = await prisma.emailTokens.create({
    data: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  })

  const token = insert.id

  const { public: { frontend: { url } } } = useRuntimeConfig()

  mailTransport.sendMail({
    // @ts-expect-error ignore this line due to hbs plugin
    context: {
      link: `${url}/auth/confirmar-email/${token}`,
      name: user.name,
    },
    from: '"GetJobs.Tech" <nao.responda@mqdev.com.br>',
    subject: 'Confirmação de e-mail',
    template: 'register.confirmation.mail',
    to: user.email,
  })
}
