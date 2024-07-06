export async function sendUserProfileUpdateMatching(userId: string) {
  const matchedProcesses = await matchProfileToProcess(userId)

  if (matchedProcesses.length === 0)
    return

  const user = await getPrivateUserById(userId)

  if (!user)
    return

  mailTransport.sendMail({
    // @ts-expect-error ignore this line due to hbs plugin
    context: {
      name: user.name,
      processes: matchedProcesses,
    },
    from: '"GetJobs.Tech" <nao.responda@mqdev.com.br>',
    subject: 'Você têm novas oportunidades de emprego!',
    template: 'user.new.opportunities',
    to: '2om.marco.quintella@gmail.com',
  })
}
