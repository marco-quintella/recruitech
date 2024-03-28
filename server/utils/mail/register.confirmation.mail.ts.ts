import type { User } from '~/db/users'
import { emailTokens } from '~/db/email-tokens'

export async function sendRegisterConfirmationEmail(user: User) {
  const insert = await db.insert(emailTokens).values({
    userId: user.id,
  }).returning()

  const token = insert[0].id

  await mailTransport.sendMail({
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    to: user.email,
    subject: 'Confirmação de e-mail',
    text: `Olá ${user.name},\n\n`
    + 'Para confirmar seu e-mail, clique no link abaixo:\n\n'
    + `http://localhost:3000/confirm-email/${token}\n\n`
    + 'Se você não se cadastrou no site, por favor ignore este e-mail.\n\n'
    + 'Atenciosamente,\n'
    + 'Recruitech',
    html: `Olá ${user.name},<br><br>`
    + 'Para confirmar seu e-mail, clique no link abaixo:<br><br>'
    + `<a href="http://localhost:3000/confirm-email/${token}">Confirmar e-mail</a><br><br>`
    + 'Se você não se cadastrou no site, por favor ignore este e-mail.<br><br>'
    + 'Atenciosamente,<br>'
    + 'Recruitech',
  })
}
