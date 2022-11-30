
from django.contrib import admin
from . import settings
from django.urls import path, include
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')),
    path('api/', include('API.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
