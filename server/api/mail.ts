export default defineEventHandler(async () => {
  await mailTransport.sendMail({
    // from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: '2om.marco.quintella@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })
})
