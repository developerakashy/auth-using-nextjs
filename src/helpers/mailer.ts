import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === 'VERIFY'){
            const user = await User.findByIdAndUpdate(userId, {
                verificationToken: hashedToken,
                verificationTokenExpiry: Date.now() + 1200000
            })

        } else if(emailType === 'RESET') {

        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d534c79f109bb9",
              pass: "4f15887a3c5e98"
            }
        });

        const mailOptions = {
            from: 'akash@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html:
            `<div>
                <p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to verify your email</p>
                <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            </div>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (error:any) {
        console.log(error)
        throw new Error(error?.message)
    }
}
