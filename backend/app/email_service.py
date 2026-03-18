"""
Email Service using Resend API with Production Mode Support
"""

import resend
from .config import settings
import logging

logger = logging.getLogger(__name__)

# Initialize Resend client
resend.api_key = settings.RESEND_API_KEY

def get_recipient_email(original_email: str) -> str:
    """
    Get the actual recipient email based on the email mode.
    In production mode, emails go to the original recipient.
    """
    if settings.EMAIL_MODE == "development":
        logger.info(f"Development mode: Redirecting email from {original_email} to {settings.DEV_EMAIL_RECIPIENT}")
        return settings.DEV_EMAIL_RECIPIENT
    return original_email

def send_password_reset_email(email: str, reset_token: str, username: str) -> bool:
    """Send password reset email"""
    try:
        recipient_email = get_recipient_email(email)
        reset_link = f"http://localhost:3001/reset-password?token={reset_token}"
        
        # Add production notice if sending to different email
        production_notice = ""
        if settings.EMAIL_MODE == "production" and recipient_email != email:
            production_notice = f"""
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                <p style="color: #92400e; font-size: 12px; margin: 0;">
                    <strong>Note:</strong> This password reset was requested for {email}. If this wasn't you, please ignore this email.
                </p>
            </div>
            """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #22c55e;">TrashVerse</h1>
                        <p style="color: #666;">Password Reset Request</p>
                    </div>
                    
                    {production_notice}
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p>Hi {username},</p>
                        
                        <p>We received a request to reset your password for the account: <strong>{email}</strong></p>
                        
                        <p>Click the button below to create a new password:</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{reset_link}" style="background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Reset Password
                            </a>
                        </div>
                        
                        <p style="color: #666; font-size: 14px;">Or copy this link: <br/>{reset_link}</p>
                        
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">
                            This link will expire in 30 minutes. If you didn't request this, please ignore this email.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                        <p>&copy; 2024 TrashVerse. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Try to send to original email first, fallback to registered email if restricted
        try:
            response = resend.Emails.send({
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": recipient_email,
                "subject": "Reset Your TrashVerse Password",
                "html": html_content,
            })
            
            logger.info(f"Password reset email sent to {recipient_email} (original: {email})")
            return True
            
        except Exception as send_error:
            # If sending fails due to domain restrictions, try sending to registered email
            if "verify a domain" in str(send_error) and recipient_email != "onyewuchiscepter@gmail.com":
                logger.warning(f"Domain restriction detected, sending to registered email instead")
                
                # Update the email content to indicate this is a forwarded email
                forwarded_html = f"""
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #22c55e;">TrashVerse</h1>
                                <p style="color: #666;">Password Reset Request (Forwarded)</p>
                            </div>
                            
                            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
                                <p style="color: #92400e; font-size: 14px; margin: 0;">
                                    <strong>⚠️ Forwarded Email:</strong> This password reset was requested for <strong>{email}</strong> but is being sent to you due to domain verification requirements. Please forward this to the correct recipient if needed.
                                </p>
                            </div>
                            
                            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                                <p>Hi {username},</p>
                                
                                <p>A password reset was requested for the account: <strong>{email}</strong></p>
                                
                                <p>Click the button below to reset the password:</p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="{reset_link}" style="background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                        Reset Password for {email}
                                    </a>
                                </div>
                                
                                <p style="color: #666; font-size: 14px;">Or copy this link: <br/>{reset_link}</p>
                                
                                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                                    This link will expire in 30 minutes. This email was forwarded due to domain verification requirements.
                                </p>
                            </div>
                            
                            <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                                <p>&copy; 2024 TrashVerse. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>
                """
                
                response = resend.Emails.send({
                    "from": settings.DEFAULT_FROM_EMAIL,
                    "to": "onyewuchiscepter@gmail.com",
                    "subject": f"[FORWARDED] Password Reset for {email} - TrashVerse",
                    "html": forwarded_html,
                })
                
                logger.info(f"Password reset email forwarded to onyewuchiscepter@gmail.com for {email}")
                return True
            else:
                raise send_error
        
    except Exception as e:
        logger.error(f"Failed to send password reset email to {email}: {e}")
        return False

def send_account_recovery_email(email: str, recovery_token: str, username: str) -> bool:
    """Send account recovery email"""
    try:
        recipient_email = get_recipient_email(email)
        recovery_link = f"http://localhost:3001/recover-account?token={recovery_token}"
        
        # Add production notice if sending to different email
        production_notice = ""
        if settings.EMAIL_MODE == "production" and recipient_email != email:
            production_notice = f"""
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                <p style="color: #92400e; font-size: 12px; margin: 0;">
                    <strong>Note:</strong> This account recovery was requested for {email}. If this wasn't you, please ignore this email.
                </p>
            </div>
            """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #22c55e;">TrashVerse</h1>
                        <p style="color: #666;">Account Recovery</p>
                    </div>
                    
                    {production_notice}
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p>Hi {username},</p>
                        
                        <p>We received a request to recover your account: <strong>{email}</strong></p>
                        
                        <p>Click the button below to verify your identity and regain access:</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{recovery_link}" style="background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Recover Account
                            </a>
                        </div>
                        
                        <p style="color: #666; font-size: 14px;">Or copy this link: <br/>{recovery_link}</p>
                        
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">
                            This link will expire in 30 minutes. If you didn't request this, please ignore this email.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                        <p>&copy; 2024 TrashVerse. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Try to send to original email first, fallback to registered email if restricted
        try:
            response = resend.Emails.send({
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": recipient_email,
                "subject": "Recover Your TrashVerse Account",
                "html": html_content,
            })
            
            logger.info(f"Account recovery email sent to {recipient_email} (original: {email})")
            return True
            
        except Exception as send_error:
            # If sending fails due to domain restrictions, try sending to registered email
            if "verify a domain" in str(send_error) and recipient_email != "onyewuchiscepter@gmail.com":
                logger.warning(f"Domain restriction detected, sending recovery email to registered email instead")
                
                # Update the email content to indicate this is a forwarded email
                forwarded_html = f"""
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #22c55e;">TrashVerse</h1>
                                <p style="color: #666;">Account Recovery (Forwarded)</p>
                            </div>
                            
                            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
                                <p style="color: #92400e; font-size: 14px; margin: 0;">
                                    <strong>⚠️ Forwarded Email:</strong> This account recovery was requested for <strong>{email}</strong> but is being sent to you due to domain verification requirements.
                                </p>
                            </div>
                            
                            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                                <p>Hi {username},</p>
                                
                                <p>An account recovery was requested for: <strong>{email}</strong></p>
                                
                                <p>Click the button below to recover the account:</p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="{recovery_link}" style="background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                        Recover Account for {email}
                                    </a>
                                </div>
                                
                                <p style="color: #666; font-size: 14px;">Or copy this link: <br/>{recovery_link}</p>
                                
                                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                                    This link will expire in 30 minutes. This email was forwarded due to domain verification requirements.
                                </p>
                            </div>
                            
                            <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                                <p>&copy; 2024 TrashVerse. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>
                """
                
                response = resend.Emails.send({
                    "from": settings.DEFAULT_FROM_EMAIL,
                    "to": "onyewuchiscepter@gmail.com",
                    "subject": f"[FORWARDED] Account Recovery for {email} - TrashVerse",
                    "html": forwarded_html,
                })
                
                logger.info(f"Account recovery email forwarded to onyewuchiscepter@gmail.com for {email}")
                return True
            else:
                raise send_error
        
    except Exception as e:
        logger.error(f"Failed to send account recovery email to {email}: {e}")
        return False

def send_welcome_email(email: str, username: str) -> bool:
    """Send welcome email to new users"""
    try:
        recipient_email = get_recipient_email(email)
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #22c55e;">Welcome to TrashVerse!</h1>
                    </div>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p>Hi {username},</p>
                        
                        <p>Welcome to TrashVerse! We're excited to have you join our community of environmental champions.</p>
                        
                        <h3 style="color: #22c55e;">Get Started:</h3>
                        <ul>
                            <li>Complete your profile</li>
                            <li>Start logging waste entries</li>
                            <li>Earn points and rewards</li>
                            <li>Join the leaderboard</li>
                        </ul>
                        
                        <p>Every piece of waste you recycle helps our planet and earns you rewards!</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="http://localhost:3001/dashboard" style="background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Go to Dashboard
                            </a>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                        <p>&copy; 2024 TrashVerse. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Try to send to original email first, fallback to registered email if restricted
        try:
            response = resend.Emails.send({
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": recipient_email,
                "subject": "Welcome to TrashVerse!",
                "html": html_content,
            })
            
            logger.info(f"Welcome email sent to {recipient_email} (original: {email})")
            return True
            
        except Exception as send_error:
            # If sending fails due to domain restrictions, try sending to registered email
            if "verify a domain" in str(send_error) and recipient_email != "onyewuchiscepter@gmail.com":
                logger.warning(f"Domain restriction detected, sending welcome email to registered email instead")
                
                response = resend.Emails.send({
                    "from": settings.DEFAULT_FROM_EMAIL,
                    "to": "onyewuchiscepter@gmail.com",
                    "subject": f"[FORWARDED] Welcome to TrashVerse - {email}",
                    "html": html_content,
                })
                
                logger.info(f"Welcome email forwarded to onyewuchiscepter@gmail.com for {email}")
                return True
            else:
                raise send_error
        
    except Exception as e:
        logger.error(f"Failed to send welcome email to {email}: {e}")
        return False
