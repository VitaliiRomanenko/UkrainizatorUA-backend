import nodemailer, {Transporter} from 'nodemailer'

class MailService {
    private transporter: Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string): Promise<void> {

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activating account at " + process.env.API_URL,
            text:'',
            html: `
                <div>
                    <h1>To activate your account, follow the link below</h1>
                    <a href="${link}"><button>Activate!!</button></a>
                </div>
            `
        })
    }
}

export default new MailService()