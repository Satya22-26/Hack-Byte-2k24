from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv
import os
import requests


load_dotenv()  
BOT_USERNAME: Final = '@firbrig_bot'

TOKEN = os.getenv("TOKEN")

# Commands
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Hello! Thanks for chatting with me! I am a banana!')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Help menu: /start /help /custom. You can also send me your location!')

async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Custom command response')

# Handle location input
async def handle_location(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_location = update.message.location
    print(f'User ({update.message.chat.id}) sent a location: latitude {user_location.latitude}, longitude {user_location.longitude}')
    
    # Your website's API endpoint for receiving location alerts
    api_url = 'http://127.0.0.1:5000/api/location_data'
    
    # Payload to send (you might need to adjust this according to your API's requirements)
    payload = {
        'chat_id': update.message.chat.id,
        'latitude': user_location.latitude,
        'longitude': user_location.longitude
    }
    
    try:
        # Send a POST request to your website's API with adjusted timeout
        response = requests.post(api_url, json=payload, timeout=10)  # Adjust timeout value as needed
        response.raise_for_status()  # This will raise an exception for HTTP errors
        
        # You can log or process the response if you wish
        print('Location sent to website successfully:', response.json())
        
        await update.message.reply_text(f"Received your location and alerted the website! (Latitude: {user_location.latitude}, Longitude: {user_location.longitude})")
    except requests.exceptions.RequestException as e:
        print('Failed to send location to website:', e)
        await update.message.reply_text("Received your location, but couldn't alert the website.")

# Responses to text
def handle_response(text: str) -> str:
    processed: str = text.lower()
    if 'hello' in processed:
        return 'Hey there!'

    if 'how are you' in processed:
        return 'I am good!'
    if 'i love python' in processed:
        return 'Remember to subscribe!'
    return 'I do not understand what you wrote...'

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text
    print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')
    if message_type == 'group':
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = handle_response(new_text)
        else:
            return
    else:
        response: str = handle_response(text)
    print('Bot:', response)
    await update.message.reply_text(response)

# Error handler
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

def start_bot():
    print('Starting bot...')
    app = Application.builder().token(TOKEN).build()

    # Command Handlers
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('custom', custom_command))

    # Message Handlers
    app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_message))
    app.add_handler(MessageHandler(filters.LOCATION, handle_location))  # Location handler

    # Error Handler
    app.add_error_handler(error)

    # Start polling
    print('Polling...')
    app.run_polling(poll_interval=3)

if __name__ == '__main__':
    start_bot()

