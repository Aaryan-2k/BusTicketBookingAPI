from django.urls import path
from . import views

urlpatterns = [
    path('booking/<pk>/', views.BookTicket.as_view(), name='seat_booking'),
    path('bus/', views.CreateBus.as_view(), name='create_bus'),
]