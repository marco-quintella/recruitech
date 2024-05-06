import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { defaultMailAttachments } from './mail/attachments'

const runtimeConfig = useRuntimeConfig()

export const mailTransport = nodemailer.createTransport({
  host: runtimeConfig.mail.host,
  port: runtimeConfig.mail.port,
  secure: true,
  auth: {
    user: runtimeConfig.mail.auth.user,
    pass: runtimeConfig.mail.auth.pass,
  },
  attachments: defaultMailAttachments,
})

mailTransport.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'server/utils/mail/layouts/',
    partialsDir: 'server/utils/mail/partials/',
  },
  viewPath: 'server/utils/mail/views/',
  extName: '.hbs',
}))
