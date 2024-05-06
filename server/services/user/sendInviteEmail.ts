export async function sendInviteEmail(
  id: string,
  email: string,
  company: Company,
) {
  await mailTransport.sendMail({
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    to: email,
    subject: `${company.name} te convidou para se juntar ao Recruitech`,
    // @ts-expect-error ignore this line
    template: 'user.invite',
    context: {
      email,
      company: company.name,
      link: `http://localhost:3000/convite/${id}`,
    },
  })
}
