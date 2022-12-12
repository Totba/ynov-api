if(process.env.NODE_ENV === 'developement') {
    async function startMailDev  () {
        const { default: MailDev } = await import('maildev')
        const maildev = new MailDev({
            basePathname: '/maildev'
        })
        maildev.listen((err, data) => {
            if(err) return console.log(`Failed to load maildev : ${e}` )
            return console.log('Maildev server listening check your inbox at http://0.0.0.0:1080/maildev')
        })
    }
    startMailDev()
}
