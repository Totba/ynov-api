import transporter from '#config/mailer.js'

export function sendWelcomeEmail (user, token) {
    if(!user || !token) throw new Error ('user or validation token missing ')
    const messageToUser = {
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: 'Welcome to our todo app',
        html: '<h1> Welcome to our wonderful todo application here yout validation token :</h1>'
    }
    return transporter.sendMail(messageToUser)
}