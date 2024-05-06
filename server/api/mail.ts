// Mail testing example

export default defineEventHandler(async () => {
  await mailTransport.sendMail({
    from: '"Recruitech Test 👻" <nao.responda@mqdev.com.br>', // sender address
    to: '2om.marco.quintella@gmail.com', // list of receivers
    subject: 'Test ✔', // Subject line
    // @ts-expect-error ignore this line
    template: 'register.confirmation.mail',
    context: {
      name: 'Marco Quintella',
      link: 'http://localhost:3000/confirm/123',
    },
  })
})
