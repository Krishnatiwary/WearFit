from datetime import datetime


def get_daily_outfit_message():
    today = datetime.now().strftime("%A")

    return {
        "title": "WearFit 👕",
        "message": f"Good morning! It's {today}. Time to plan your outfit for today!"
    }