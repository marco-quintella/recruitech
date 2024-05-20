export async function sendInviteEmail(
  id: string,
  email: string,
  company: Company,
) {
  await mailTransport.sendMail({
    context: {
      company: company.name,
      email,
      link: `http://localhost:3000/convite/${id}`,
    },
    from: '"Recruitech" <nao.responda@mqdev.com.br>',
    subject: `${company.name} te convidou para se juntar ao Recruitech`,
    // @ts-expect-error ignore this line
    template: 'user.invite',
    to: email,
  })
}
