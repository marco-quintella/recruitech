import nodemailer from 'nodemailer'

const runtimeConfig = useRuntimeConfig()

export const mailTransport = nodemailer.createTransport({
  host: runtimeConfig.mail.host,
  port: runtimeConfig.mail.port,
  secure: true,
  auth: {
    user: runtimeConfig.mail.auth.user,
    pass: runtimeConfig.mail.auth.pass,
  },
})
