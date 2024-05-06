import type { User } from '~/db/users'

export async function sendEmailConfirmedWelcome(user: User) {
  await mailTransport.sendMail({
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    to: user.email,
    subject: 'Bem-vindo ao Recruitech',
    // @ts-expect-error ignore this line
    template: 'confirmed.mail',
    context: {
      name: user.name,
      link: `http://localhost:3000/`,
    },
  })
}
