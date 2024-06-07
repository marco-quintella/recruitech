export async function sendInviteEmail(
  id: string,
  email: string,
  company: Company,
) {
  const { public: { frontend: { url } } } = useRuntimeConfig()

  await mailTransport.sendMail({
    // @ts-expect-error ignore this line
    context: {
      company: company.name,
      email,
      link: `${url}/convite/${id}`,
    },
    from: '"GetJobs.Tech" <nao.responda@mqdev.com.br>',
    subject: `${company.name} te convidou para se juntar ao GetJobs.Tech`,
    template: 'user.invite',
    to: email,
  })
}
