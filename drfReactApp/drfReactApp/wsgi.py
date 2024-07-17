"""
WSGI config for drfReactApp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# Determine which settings to use based on the environment
settings_module = 'drfReactApp.deployment' if 'WEBSITE_HOSTNAME' in os.environ else 'drfReactApp.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

# Create the WSGI application
application = get_wsgi_application()
