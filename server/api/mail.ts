// Mail testing example

export default defineEventHandler(async () => {
  await mailTransport.sendMail({
    context: {
      link: 'http://localhost:3000/confirm/123',
      name: 'Marco Quintella',
    },
    from: '"Recruitech Test 👻" <nao.responda@mqdev.com.br>', // sender address
    subject: 'Test ✔', // Subject line
    // @ts-expect-error ignore this line
    template: 'register.confirmation.mail',
    to: '2om.marco.quintella@gmail.com', // list of receivers
  })
})
