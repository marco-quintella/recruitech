import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { defaultMailAttachments } from './mail/attachments'

const runtimeConfig = useRuntimeConfig()

export const mailTransport = nodemailer.createTransport({
  attachments: defaultMailAttachments,
  auth: {
    pass: runtimeConfig.mail.auth.pass,
    user: runtimeConfig.mail.auth.user,
  },
  host: runtimeConfig.mail.host,
  port: runtimeConfig.mail.port,
  secure: true,
})

mailTransport.use('compile', hbs({
  extName: '.hbs',
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'server/utils/mail/layouts/',
    partialsDir: 'server/utils/mail/partials/',
  },
  viewPath: 'server/utils/mail/views/',
}))
