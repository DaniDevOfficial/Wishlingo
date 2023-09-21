import React from 'react';
import '../Styles/PrivacyPolicy.css';
export function PrivacyPolicy() {
    return (
        <div className="centerBox">
            <div className="background-Privacy">
                <h1>Privacy Policy</h1>
                <p className="policy-text">
                    Last Update: 21.09.2023
                </p>
                <p className="policy-text">
                    Thank you for using Wishlingo. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use this app.
                </p>
                <h2>Information We Collect</h2>
                <p className="policy-text">
                    We collect and store the following information:
                </p>
                <ul className="policy-list">
                    <li>Email address</li>
                    <li>Exercise data and content you create within the App</li>
                    <li>Usage data, including app usage statistics and device information</li>
                </ul>
                <h2>How We Use Your Information</h2>
                <p className="policy-text">
                    We use your personal information only for the purpose of providing and improving our App. We do not use your data for any other purpose.
                </p>
                <h2>Data Security</h2>
                <p className="policy-text">
                    We employ industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration. While we strive to maintain the security of your information, please be aware that no method of transmission over the internet is completely secure.
                </p>
                <h2>Data Retention</h2>
                <p className="policy-text">
                    We retain your data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by applicable laws. If you delete your account, your data will be removed from our active databases. We may delete your Account or created Data on occations. If you are not happy with the outcome you will be able to contact us. 
                </p> 
                <h2>Third-Party Services</h2>
                <p className="policy-text">
                    Our App may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.
                </p>
                <h2>Changes to this Privacy Policy</h2>
                <p className="policy-text">
                    We may update this Privacy Policy to reflect changes in our practices or for other reasons. We will notify you of any material changes through the App.
                </p>
                <h2>Contact Us</h2>
                <p className="policy-text">
                    If you have any questions or concerns regarding this Privacy Policy or your personal information, please contact me via my <a href='mailto:bischof.david.db@gmail.com'>Email</a>.
                </p>
            </div>
        </div>
    );
};

