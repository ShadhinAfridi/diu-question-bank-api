const baseEmailTemplate = require('./email.base');

module.exports = {
    verificationEmail(recipientName, otp) {
        const subject = 'Verification Email'; // Define subject here
        const content = `
            <p>Dear ${recipientName},</p>
            <p>We're glad you made an account with us. To finish signing up, please confirm your email address by typing the verification code below:</p>
            <p><strong>Verification Code:</strong> <span class="verification-code">${otp}</span></p>
            <p>To confirm your account, please enter the verification code in the space provided on the register page. Delete this email if you didn't sign up for an account.</p>
            <p>Please feel free to contact our support team at if you have any questions or need more help <a href="mailto:diuquestionbank@gmail.com">diuquestionbank@gmail.com</a>.</p>
            <p>We appreciate your willingness to collaborate.</p>`;

        return baseEmailTemplate(subject, content);
    },

    passRecoverEmail(recipientName, otp) {
        const subject = 'Password Recovery Email'; // Define subject here
        const content = `
            <p>Dear ${recipientName},</p>
            <p>We've gotten a request to change the password for your account. In order to keep your account safe, we need you to prove who you are by entering the verification code shown below.</p>
            <p>Please put the verification code in the field on the form where it says to do so. If you did not send this request to change your password, please delete this email.</p>
            <p><strong>Verification Code:</strong> <span class="verification-code">${otp}</span></p>
            <p>Please feel free to contact our support team at if you have any questions or need more help <a href="mailto:diuquestionbank@gmail.com">diuquestionbank@gmail.com</a>.</p>
            <p>We appreciate your willingness to collaborate.</p>`;

        return baseEmailTemplate(subject, content);
    },

    welcomeEmail(recipientName) {
        const subject = 'Welcome to DIU Question Bank'; // Define subject here
        const content = `
            <p>Dear ${recipientName},</p>
            <p>Welcome to DIU Question Bank! We are thrilled to have you as a new member of our growing community of learners and educators. This email serves as a warm welcome and an introduction to the exciting features and opportunities available on our platform.</p>
            
            <p>DIU Question Bank is an innovative online platform designed to empower students and educators like yourself to access, share, and contribute to a vast collection of questions and solutions across various academic disciplines. Our goal is to create a collaborative environment where knowledge can be shared and learning can be enhanced.</p>
            
            <h2>Key Features:</h2>
            <ol>
                <li>Extensive Question Database: Access a diverse range of questions across different subjects, levels, and difficulty levels. We believe in providing a comprehensive resource for learners at every stage of their educational journey.</li>
                <li>Solution Repository: Gain access to well-structured solutions for the questions available on our platform. These solutions are provided by experts and enthusiasts in their respective fields, ensuring accuracy and clarity.</li>
                <li>Community Interaction: Connect with a vibrant community of students, educators, and experts who share a passion for learning. Engage in discussions, seek help, and share your knowledge with others.</li>
            </ol>
            
            <p>Now, we invite you to contribute to the growth of our platform and make a meaningful impact on the learning experience of countless individuals. We encourage you to upload questions and provide solutions to existing ones. By doing so, you will help build a comprehensive database and contribute to the success of fellow learners.</p>
            
            <h3>How to Get Started:</h3>
            <ol>
                <li>Log in to your DIU Question Bank account using your registered credentials. If you haven't set up your account yet, please follow the instructions provided in the registration confirmation email.</li>
                <li>Navigate to the "Upload Questions" section on the platform. Choose the subject and topic for which you would like to contribute questions.</li>
                <li>Upload your questions in a well-organized format. Feel free to add relevant details, such as question type, difficulty level, and any supporting materials.</li>
                <li>Additionally, if you have solutions to questions already available on the platform, we encourage you to share them. Simply navigate to the corresponding question and submit your solution using the provided interface.</li>
            </ol>
            
            <p>We value your expertise and believe that your contributions will enhance the learning experience of our community. Your efforts will undoubtedly make a difference in the academic journeys of countless individuals.</p>
            
            <p>Should you encounter any issues, have suggestions, or need assistance, our support team is here to help. You can reach us at <a href="mailto:diuquestionbank@gmail.com">diuquestionbank@gmail.com</a>, and we'll be glad to assist you.</p>
            
            <p>Thank you for joining DIU Question Bank, and we look forward to witnessing your valuable contributions. Together, let's create a thriving educational ecosystem that benefits learners worldwide.</p>
            `;

        return baseEmailTemplate(subject, content);
    },
    questionApprovedEmail(data) {
        const subject = data.subject; // Define subject here
        const content = `
        <p>Dear ${data.recipientName},</p>
        <p>We're delighted to inform you that your question for the ${data.courseCode} (${data.courseName})  course in ${data.department} on ${data.date} has been approved.</p>
        <p>Thank you for your valuable contribution. Keep sharing your knowledge by uploading more questions to the DIU Question Bank.</p>
        `;
        return baseEmailTemplate(subject, content);
    },

    questionRejectedEmail(data) {
        const subject = data.subject; // Define subject here
        const content = `
        <p>Dear ${data.recipientName},</p>
        <p>We regret to inform you that your recent question submission for the ${data.courseCode} (${data.courseName}) course in ${data.department} on ${data.date} has not been approved due to "${data.reason}".</p>
        <p>We value your contributions and encourage you to make necessary improvements based on the feedback provided. Please feel free to resubmit your question, and we will be happy to review it again.</p>
        <p>If you have any questions or need assistance, please contact us at <a href="mailto:diuquestionbank@gmail.com">diuquestionbank@gmail.com</a>.</p>
        <p>Thank you for your understanding and continued participation.</p>
        `;
        return baseEmailTemplate(subject, content);
    }
};
