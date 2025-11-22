from django.urls import path
from . import views

urlpatterns = [
    path('booking/<pk>/', views.BookTicket.as_view(), name='seat_booking'),
    path('booking/', views.BookingTickets.as_view(), name='booking'),
    path('bus/', views.CreateBus.as_view(), name='create_bus'),
    path('bus/<pk>', views.BusDetail.as_view(), name='bus_detail'),
]