from services.auth_service import signup_user, login_user


async def signup_controller(user):
    return await signup_user(user)


async def login_controller(user):
    return await login_user(user)