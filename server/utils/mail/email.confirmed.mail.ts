import type { User } from '~/db/users'

export async function sendEmailConfirmedWelcome(user: User) {
  await mailTransport.sendMail({
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    to: user.email,
    subject: 'Bem-vindo ao Recruitech',
    text: `Olá ${user.name},\n\n`
    + 'Seu e-mail foi confirmado com sucesso!\n\n'
    + 'Bem-vindo ao Recruitech!\n\n'
    + 'Atenciosamente,\n'
    + 'Recruitech',
    html: `Olá ${user.name},<br><br>`
    + 'Seu e-mail foi confirmado com sucesso!<br><br>'
    + 'Bem-vindo ao Recruitech!<br><br>'
    + 'Atenciosamente,<br>'
    + 'Recruitech',
  })
}
