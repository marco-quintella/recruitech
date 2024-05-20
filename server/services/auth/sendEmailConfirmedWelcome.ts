import type { User } from '~/db/users'

export async function sendEmailConfirmedWelcome(user: User) {
  await mailTransport.sendMail({
    context: {
      link: `http://localhost:3000/`,
      name: user.name,
    },
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    subject: 'Bem-vindo ao Recruitech',
    // @ts-expect-error ignore this line
    template: 'confirmed.mail',
    to: user.email,
  })
}
