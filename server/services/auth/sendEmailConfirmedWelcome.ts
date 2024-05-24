import type { User } from '~/db/users'

export async function sendEmailConfirmedWelcome(user: User) {
  const { public: { frontend: { url } } } = useRuntimeConfig()

  await mailTransport.sendMail({
    // @ts-expect-error ignore this line
    context: {
      link: url,
      name: user.name,
    },
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    subject: 'Bem-vindo ao Recruitech',
    template: 'confirmed.mail',
    to: user.email,
  })
}
